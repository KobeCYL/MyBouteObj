define(["jquery", "/bxg/assets/js/common.js", "datepicker", "zh_CN", "validate", "form"], function ($) {
    console.log($);

    setTimeInput();
    FormWatch();

    addPoem();
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
        console.log(poem);
        poem.forEach(function (v) {
            
            
            $("input[name='tc_name']").val(v);
            $("input[name='tc_pass']").val("123123");
            $("input[name='tc_join_date']").val("2017/07/07");
            
            $("form").on("submit", function () {
                
            })
            $("form").trigger("submit");
        })
    }

    console.log($(".form-horizontal"));
    //因为要对用户的参数进行判定,所以引入插件:
    //第四部,点击编辑,创建事件
    function setTimeInput() {
        $("input[name='tc_join_date']").datepicker({
            language: "zh-CN",
            format: "yyyy/mm/dd",
        })
    }

    //第二部.表单验证
    function FormWatch() {
        $("#form").validate({
            rules: {
                tc_name: {
                    required: true,
                    rangelength: [2, 20]
                },
                tc_join_date: {
                    date: true
                },
                tc_pass: {
                    required: true
                }
            },
            messages: {
                tc_name: {
                    required: "兄弟里面不能为空",
                    rangelength: "哥们最少三个字符哦,么么哒"
                },
                tc_pass: {
                    required: "密码不填,你傻不傻"
                }
            },
            submitHandler: function () {
                $("#form").ajaxSubmit({
                    url: "/api/teacher/add",
                    type: "post",
                    success: function (info) {
                        console.log("pap", info);
                    }
                })
            }
        })
    }
})