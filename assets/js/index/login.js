define(["jquery","cookie"], function ($) {
    console.log($);
    $("#log_submit").on("click", function (e) {
        //首先做禁止事件默认时间
        e.preventDefault();
        //2.获取里面username以及pass
        var userName = $("#name").val();
        console.log(userName);
        var password = $("#pass").val();
        console.log(password);
        //判断参数传入是非非空,如果非空则进行return
        if (!userName.trim() || !password.trim()) {
            return false;
        }
        //通过ajax进行获取数据,
        var option = {
            url: "/api/login",
            data: {
                tc_name: userName,
                tc_pass: password
            },
            type: "post",
            success: function (info) {
                console.log(info);
                console.log(JSON.stringify(info.result))
                $.cookie("info",JSON.stringify(info.result),{expires:7,path:"/"});
                // console.log($.cookie.('info'))
                window.location.href = "/bxg/views/index/dashboard.html"
            }
        }
        $.ajax(option);
        
    })
})