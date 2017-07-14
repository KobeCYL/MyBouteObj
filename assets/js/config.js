
require.config({
    baseUrl:"/bxg/node_modules",
    paths:{
        jquery:"./jquery/dist/jquery",
        cookie:"./jquery.cookie/jquery.cookie",
        nprogress:"./nprogress/nprogress",
        template:"./art-template/lib/template-web",
        bootstrap:"./bootstrap/dist/js/bootstrap",
        getHttpData:"../assets/js/getHttpData",
        datepicker:"./bootstrap-datepicker/dist/js/bootstrap-datepicker",
        validate:"./jquery-validation/dist/jquery.validate",
        form:"./jquery-form/dist/jquery.form.min",
        zh_CN:"./bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min",
        webuploader:"./webuploader/dist/webuploader",
        jcrop:"../assets/js/lib/jcrop/js/jquery.Jcrop"

    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        zh_CN:{
            deps:["jquery","datepicker"]
        },
        jcrop:{
            deps:["jquery"]
        },
    }
})