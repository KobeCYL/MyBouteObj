define(["jquery",
    "getHttpData",
    "template",
    "webuploader",
    "/bxg/assets/js/common.js",
    "datepicker",
    "validate",
    "form",
    "zh_CN",
    "jcrop"], function ($, http, template, WebUploader) {
        console.log($);

        var common = {}

        Uploader();

        clipBtn();

        //插件生成头像
        function Uploader() {
            var uploader = WebUploader.create({
                auto: true,
                swf: "/bxg/node_modules/webuploader/dist/Uploader.swf",
                server: "/api/uploader/cover",
                formData: http,
                pick: "#filePicker",
                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                // pick: '#upload',
                fileVal: 'cs_cover_original'
            })
            uploader.on('uploadSuccess', function (file, info) {
                $('#' + file.id).addClass('upload-state-done');
                console.log(arguments);
                console.log(info.result.path)
                $(".preview img").attr("src", info.result.path).on("load", function () {
                    clipPic();
                });
            });
        }
        //剪切函数;
        function clipPic() {
            var option = {
                boxWidth: 300,  // 设置图片的宽度
                aspectRatio: 1.618,
                onSelect: function (c) {
                    console.log(c);
                    common = c;
                }
            }
            $(".preview img").Jcrop(option);
        }
        //裁剪按钮事件函数
        function clipBtn() {
            $(".btn-warning").on("click", function () {
                common.cs_id = http.cs_id;
                console.log(common);
                var option = {
                    url: "/api/course/update/picture",
                    type: "post",
                    data: common,
                    success: function (info) {
                        // console.log(info);
                        window.location.href = "./step3.html?cs_id="+info.result.cs_id;
                    }
                }
                $.ajax(option);
            })
        }
    })