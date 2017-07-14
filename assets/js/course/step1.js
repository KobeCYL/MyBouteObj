define(["jquery",
    "getHttpData",
    "template",
    "webuploader",
    "/bxg/assets/js/common.js",
    "datepicker",
    "validate",
    "form",
    "zh_CN"], function ($, http, template, WebUploader) {
        console.log($);

        AjaxRender();

        //公共的pcd

        //第一步,先跟根据信息进行渲染页面,
        function AjaxRender() {
            var option = {
                url: "/api/course/basic",
                type: "get",
                data: http,
                success: function (info) {
                    console.log(info);

                    var str = template("template", { list: info.result });
                    // console.log(str);
                    $(".content").html(str);

                    twoChange()

                    validateInit();
                }
            }
            $.ajax(option);
        }
        //二级联动
        function twoChange() {
            $("#top").on("change", function () {

                        var value = $(this).val();

                        var option = {
                            url: "/api/category/child",
                            type: "get",
                            data: {
                                cg_id: value
                            },
                            success: function (info) {
                                console.log(info);
                                var str = '';
                                info.result.forEach(function (v) {
                                    str += `<option value='${v.cg_id}'>${v.cg_name}</option>`
                                })
                                $("#childs").html(str);

                            }
                        }
                        $.ajax(option);
                    })
        }
        //表单验证
        function validateInit() {
            var option = {
                rules: {
                    cs_tags: {
                        required: true,
                        rangelength: [3, 20]
                    }
                },
                messages: {
                    cs_tags: {
                        required: "true",
                        rangelength: "[3,20]"
                    }
                },
                submitHandler: function () {
                    var option = {
                        url: "/api/course/update/basic",
                        type: "post",
                        data: http,
                        success: function (info) {
                            console.log(info);
                            window.location.href = "./step2.html?cs_id="+info.result.cs_id;
                        }
                    }
                    $("form").ajaxSubmit(option)
                }
            }
            $("form").validate(option);
        }

    })