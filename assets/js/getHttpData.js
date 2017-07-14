define(["jquery"],function(){
    var http = location.search;
    console.log(http);
    var obj = {};
      (http.split("?")[1] || "").split("&").forEach(function(v){
       var key =  v.split("=")[0];
       var value = v.split("=")[1];
       obj[key]=value
       console.log(obj);
     })
     return obj;
      
})