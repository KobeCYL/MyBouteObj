define(["jquery",
    "getHttpData"
    , "datepicker"
    , "validate"
    , "zh_CN"
    , "form"], function ($, obj) {
        //编辑里面的首先要进行渲染页面,让用户知道当前的信息

        //第二部,引入表单验证插件,以及引入时间下拉菜单插件,

        //第三部,让用户表单验证通过的时候,通过创建点击事件,进行提交数据;
        console.log($);
        console.log(obj);
        editInfo();
        setInputTime();
        formSet();
        addPoem();
        //编辑里面的首先要进行渲染页面,让用户知道当前的信息
        function editInfo() {
            var option = {
                url: "/api/teacher/edit",
                data: obj,
                success: function (info) {
                    console.log(info);
                    //第二部,引入表单验证插件,以及引入时间下拉菜单插件,
                    $("input[name='tc_name']").val(info.result.tc_name);

                    $("input[name='tc_join_date']").val(info.result.tc_join_date);

                    console.log(info.result.tc_type)
                    var seletNum = info.result.tc_type == 0 ? 1 : 0;
                    console.log(seletNum, "seletNum")
                    console.log($("select[name='tc_type']").find("option"));
                    $("select[name='tc_type']").find("option").eq(seletNum).attr("selected", true);

                    var genderNum = info.result.tc_gender;
                    console.log($("input[name='tc_gender']")[genderNum])
                    $("input[name='tc_gender']").eq(genderNum).attr("checked", true);
                }
            }
            $.ajax(option);
        }
        ////第二部,引入表单验证插件,以及引入时间下拉菜单插件,
        function setInputTime() {
            $('input[name="tc_join_date"]').datepicker({
                language: "zh-CN",
                format: "yyyy/mm/dd",
                todayHigtlight: true
            })
        }
        //第三部.让用户表单验证通过的时候,通过创建点击事件,进行提交数据;
        function formSet() {
            $("#form").validate({
                rules: {
                    tc_name: {
                        required: true,
                        rangelength: [3, 20]
                    }
                },
                messages: {
                    tc_name: {
                        required: "不能为空",
                        rangelength: "[3,20]"
                    }
                },
                submitHandler: function () {
                    //通过创建点击事件,进行提交数据;
                    $(".btn-success").on("click", function () {
                        console.log("pap")
                        $("#form").ajaxSubmit({
                            url: "/api/teacher/update",
                            type: "post",
                            data: {
                                tc_id: obj.tc_id
                            },
                            success: function (info) {
                                console.log("编辑成功", info);
                            }
                        })
                    })
                }
            })
        }


        function addPoem() {
            var poem = `你见，或者不见我</p>
                                        <p>我就在那里</p>
                                        <p>不悲 不喜</p>
                                        <p>你念，或者不念我</p>
                                        <p>情就在那里</p>
                                        <p> 不来 不去</p>
                                        <p> 你爱，或者不爱我</p>
                                        <p>爱就在那里</p>
                                        <p>不增 不减</p>
                                        <p>你跟，或者不跟我</p>
                                        <p>我的手就在你手里</p>
                                        <p>不舍不弃</p>
                                        <p> 来我的怀里</p>
                                        <p>或者</p>
                                        <p> 让我住进你的心里</p>
                                        <p>默然 相爱</p>
                                        <p> 寂静 欢喜`.split(`</p>
                                        <p>`)
            // console.log(poem);
            poem.forEach(function (v, i) {

                // console.log("v", v);
                // console.log(i);
                var data = "&tc_id=" + (i + 1);
                // $(".btn-success").trigger("click")
                $("input[name='tc_join_date']").val("2017/07/07");
                $("form").on("submit", function (e) {
                    e.preventDefault();
                    $("input[name='tc_name']").val(v);

                    // console.log($("input[name='tc_name']").val(), "val")
                    var formData = $("form").serialize()
                    data = formData + data;
                    console.log(data);
                    $.ajax({
                        url: "/api/teacher/update",
                        type: "post",
                        data: data,
                        success: function (info) {
                            console.log("编辑成功", info);
                        }
                    })
                })
                $("form").trigger("submit");

            })
        }
    })