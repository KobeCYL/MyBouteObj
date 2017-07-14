
define(["jquery","cookie","nprogress"],function($,xx,NProgress){
    console.log($);
    NProgress.start();
    isSignIn();
    setAvants();
    console.log($(".fa-sign-out").closest("a"));
    clickSignOut();
    navSlide();
    setNProgress();
    //第一步,先获取里面的cook值,判断用户有没有登录
    function isSignIn(){
        console.log($.cookie("PHPSESSID"));
        var sessionId = $.cookie("PHPSESSID")
        console.log(sessionId);
        //如果id为undefined 
        if(!sessionId){
            window.location.href = "/bxg/views/index/login.html";
        }
    }
    //第二步,根据里面的数据渲染页面好了
    function setAvants(){
        var info = JSON.parse($.cookie("info"));
        console.log(info);
        $(".profile img").attr("src",info.tc_avatar);
        $(".profile h4").text(info.tc_name);
    }
    //第三部.点击退出事件
    function clickSignOut(){
        $(".fa-sign-out").closest("a").on("click",function(){
            console.log("a");
            var option = {
                url:"/api/logout",
                type:"get",
                success:function(info){
                    console.log(info);
                    window.location.href = "/bxg/views/index/login.html";
                }
            };
            $.ajax(option);
        })
    }
    //第四部.点击产生下拉导航菜单
    function navSlide(){
        $(".fa-cog").closest("a").on("click",function(){
            $(this).next().slideToggle();
        })
    }
    //第五步:全局ajax进度框
    function setNProgress(){
        $(document).ajaxStart(function(){
            NProgress.start();
        });
        $(document).ajaxStop(function(){
            NProgress.done();
        })
    }
    $(function(){
        NProgress.done();
    })
})