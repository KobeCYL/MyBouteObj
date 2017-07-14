define(["jquery", "template","bootstrap"], function ($, template) {
    console.log($);
    renderList();
    LookInfo();
    setSignOut();
    //第一步先进性渲染页面
    function renderList() {
        var option = {
            url: "/api/teacher",
            type: "get",
            success: function (info) {
                // console.log(info.result);
                var data = template("tmpl-list", { list: info.result });
                // console.log(data);
                $("#list").html(data);
            }
        }
        $.ajax(option);
    }

    //设置template的提取引擎
    function getAge(birthday) {
        var birthDate = new Date(birthday).getFullYear();
        var nowDate = new Date().getFullYear();
        return nowDate - birthDate;
    }
    template.defaults.imports.getTcAge = getAge;
    //第三部,创建点击事件,创建模态框;
    function LookInfo() {
        $("tbody").on("click", ".preview", function () {
            console.log("sdf")
            $("#teacherModal").modal();
            var tcId = $(this).closest("tr").attr("tc-id");
            console.log(tcId);
            var option = {
                url:"/api/teacher/view",
                data:{
                    tc_id:tcId
                },
                success:function(info){
                    console.log(info.result);
                    var obj = info.result;
                    var Tbody =`<tbody>

                                        <tr>
                                            <th>姓名:</th>
                                            <td>${obj.tc_name}</td>
                                            <th>职位:</th>
                                            <td colspan="3">${obj.tc_roster}</td>
                                            <td rowspan="4" width="128">
                                                <div class="avatar">
                                                    <img src="${obj.tc_avatar}" alt="">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>花名:</th>
                                            <td>麻衣长老</td>
                                            <th>入职日期:</th>
                                            <td colspan="3">${obj.tc_join_date}</td>
                                        </tr>
                                        <tr>
                                            <th>性别:</th>
                                            <td>${obj.tc_gender === 0 ? "男":"女"}</td>
                                            <th>出生日期:</th>
                                            <td colspan="3">${obj.tc_birthday}</td>
                                        </tr>
                                        <tr>
                                            <th>手机号码:</th>
                                            <td colspan="2">${obj.tc_cellphone}</td>
                                            <th>邮箱:</th>
                                            <td colspan="2">${obj.tc_email}</td>
                                        </tr>
                                        <tr>
                                            <th>籍贯:</th>
                                            <td colspan="6">${obj.tc_hometown}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">
                                                <div class="introduce">
                                                    <p>${obj.tc_avatar}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>`;


                
                        
            
                                        $(".table-condensed").html(Tbody);
    


                }
            };
            $.ajax(option);
            
        })
    }
    //第四部/点击注销事件
    //tc_id	是	number	讲师id
    //tc_status	是	number
    function setSignOut(){
        $("#list").on("click",".start-stop",function(){
            var $this = $(this);
            var tc_id = $(this).closest("tr").attr("tc-id");
            var tc_status = $(this).closest("tr").attr("tc-status")
            var option = {
                url:"/api/teacher/handle",
                type:"post",
                data:{
                    tc_id:tc_id,
                    tc_status:tc_status
                },
                success:function(info){
                    console.log(info);
                    console.log(info.result.tc_status,"status")
                    
                    var text = info.result.tc_status ===0?"注销":"启动";
                    $this.closest("tr").attr("tc-status",info.result.tc_status);
                    $this.text(text);
                }
            }
            $.ajax(option);
        })
    }
})