$(function(){
    let myScroll = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
    });

    $.ajax({
        url: "https://api.jisuapi.com/news/channel?appkey=d844b0839ff12da9",
        dataType: "jsonp",
        success: function(val){
            var arr=val.result;
            console.log(arr)
            var str="";
            arr.forEach((value,index)=>{
                if(index==0){
                    str+=`<li class="active">${value}</li>`
                }else{
                    str+=`<li>${value}</li>`
                }

            });
            $("#scroller > ul").html(str);

            function render(obj){
                let start=obj.start||"0";
                let num=obj.num||"10";
                let act=obj.act||$("li.active");
                $.ajax({
                    url: "https://api.jisuapi.com/news/get?channel="+act.text()+"&start="+start+"&num="+num+"&appkey=d844b0839ff12da9",
                    dataType: "jsonp",
                    success: function(val){
                        let arr=val.result.list;
                        let str="";
                        arr.forEach((val)=>{
                            if(val.pic===""){
                                str+=`
                                <a href="${val.url}">
                            <li class="list" style="height: 0.5rem;">
                               
                                <div class="right noimg" style="height: 100%;">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                            }else{
                                str+=`
                        <a href="${val.url}">
                            <li class="list">
                                <div class="left">
                                     <img src="${val.pic}" alt="">
                                </div>
                                <div class="right">
                                     <p>
                                        ${val.title}
                                     </p>
                                     <section class="time">
                                        时间: ${val.time}
                                        来源: ${val.src}
                                     </section>
                                </div>
                            </li>
                         </a>`;
                            }
                        });
                        $("ul.content").html(str);
                    }
                })
            }

            render({
                start:0,
                num:10,
                act:$("li.active"),
            });

            $("#scroller ul").on("click","li",function(){
                let act=$(this).siblings().removeClass("active").end().addClass("active");
                render(act);
                $("header input").val("");
            });
            let num=10;
            $(".go").on("click",function(){
                num+=10;
                render({
                    num:num,
                });
            });


            $("input.lookfor").focus(function(){
                location.href="sousuo.html";
            })

        }
    })

})