define(["jquery",
    "getHttpData",
    "template",
    "webuploader",
    "/bxg/assets/js/common.js",
    "datepicker",
    "validate",
    "form",
    "zh_CN"], function ($,httpObj, template, WebUploader) {
        console.log($);

    validateInit();
        function validateInit() {
            var option = {
                rules: {
                    required:true,
                    rangelength:[1,9]
                },
                messages: {
                    required:"true",
                    rangelength:"[1,9]"
                },
                submitHandler: function () {

                    var option = {
                        url: "/api/course/create",
                        type: "post",
                        success: function (info) {
                            console.log(info);
                            window.location.href = "/bxg/views/course/step1.html?cs_id="+info.result.cs_id
                        }
                    }
                    $("form").ajaxSubmit(option)
                }
            }
            $("form").validate(option);
        }

    })