window.onload= function () {
    //////////////////阻止冒泡事件
    function cancelBubble(e) {
        var event = e ? e : window.event;
        if (event.stopPropagation) {//W3C
            event.stopPropagation();
        } else {//IE
            event.cancelBubble = true;
        }
    }
    ////////////////////导航
    var headerLis=$(".header-nav li");
    var headerLisDl=$(".header-nav li dl");
    var headerLisDds=$(".header-nav li dl dd");
    headerLis.mouseenter(function(e) {
        $(this).children("dl").show();
        cancelBubble(e);
    });
    headerLisDl.mouseenter(function(e) {
        cancelBubble(e);
    });
    headerLis.mouseleave(function() {
        $(this).children("dl").hide();
    });
    headerLisDds.mouseenter(function(){
        $(this).children("dl").show();
    });
    headerLisDds.mouseleave(function(){
        $(this).children("dl").hide();
    });
    headerLisDds.click(function(){
        $(this).children("dl").hide();
    });
    ////////////////////淡入淡出效果
    var slideNode=$("#slide");
    slideNode.hover(
        function(){
            $("#slide .left,#slide .right").show();
            clearInterval(autoGo);
        },
        function(){
            $("#slide .left,#slide .right").hide();
            autoGo=window.setInterval(function () {
                $("#slide .right").click();
            },3000);
        }
    );
    var slideLis=$(".slide-img li");
    var slideNav=$("#slide-nav");
    var spansNode=$(".slideNav-list span");
    spansNode.mouseenter(function(){
        if($(this).hasClass("slideNav-cur")){
            return;
        }
        var curPos=$(this).index(".slideNav-list span");
        var oldPos=$(".slideNav-list .slideNav-cur").index();
        slideFun(oldPos,curPos);
    });
    $("#slide .left").click(function(){
        var oldPos=$('.slideNav-list .slideNav-cur').index();
        var lastPos=$('.slideNav-list span:last').index();
        var curPos=oldPos==0?lastPos:oldPos-1;

        slideFun(oldPos,curPos);
    });
    $("#slide  .right").click(function(){
        var oldPos=$('.slideNav-list .slideNav-cur').index();
        var lastPos=$('.slideNav-list span:last').index();
        var curPos=oldPos==lastPos?0:oldPos+1;

        slideFun(oldPos,curPos);
    });
    function slideFun(oldPos,curPos){
        spansNode.eq(curPos).addClass("slideNav-cur");
        spansNode.eq(oldPos).removeClass("slideNav-cur");
        slideLis.eq(oldPos).stop(false,true).fadeOut(1000);
        slideLis.eq(curPos).stop(false,true).fadeIn(1000);
    }
    var autoGo=window.setInterval(function () {
        $("#slide .right").click();
    },3000);

    /////////////////鼠标移入标签时展开
    var switchLis=$(".switch-main li");
    var switchH3=$(".switch-main li h3");
    switchLis.mouseenter(function(){
        if($(this).hasClass("switch-cur")){
            return;
        }
        var curPos=$(this).index(".switch-main li");
        var oldPos=$(".switch-main .switch-cur").index();
        var curNum=curPos+1;
        var oldNum=oldPos+1;
        switchH3.eq(curPos).addClass("switchLi-cur"+curNum);
        switchLis.eq(curPos).addClass("switch-cur");
        switchH3.eq(oldPos).removeClass("switchLi-cur"+oldNum);
        switchLis.eq(oldPos).removeClass("switch-cur");
    });
    ////////////////鼠标移入出现蓝底文字
    $(".aboutUs-left").hover(
        function(){
            $(".aboutUs-left em").stop().animate({top:"0"},500);
            $(".aboutUs-left img").stop().animate({width:"540px",height:"265px",marginTop:'-25px',marginLeft:'-12px'},500);
        },
        function(){
            $(".aboutUs-left em").stop().animate({top:"241px"},500);
            $(".aboutUs-left img").stop().animate({width:"491px",height:"241px",marginTop:'0px',marginLeft:'0px'},500);
        }
    );
    /////////////////about右侧点击事件
    var aboutRightLis=$(".aboutUs-right li");
    $(".aboutUsA-left").click(function(){
        var oldPos=$(".aboutUs-right .aboutUs-cur").index();
        var lastPos=$('.aboutUs-right li:last').index();
        var curPos=oldPos==0?lastPos:oldPos-1;
        aboutUsFun(oldPos,curPos);
    });
    $(".aboutUsA-right").click(function(){
        var oldPos=$(".aboutUs-right .aboutUs-cur").index();
        var lastPos=$('.aboutUs-right li:last').index();
        var curPos=oldPos==lastPos?0:oldPos+1;
        aboutUsFun(oldPos,curPos);
    });
    function aboutUsFun(oldPos,curPos){
        aboutRightLis.css({display:"none"});
        aboutRightLis.eq(curPos).addClass("aboutUs-cur").css({display:"block"});
        aboutRightLis.eq(oldPos).removeClass("aboutUs-cur");
    }

    /////////////////合作伙伴左右移动事件
    var ourClientLis=$(".ourImg-list li");
    var ourClientList=$(".ourImg-list");
    var ourClientWidth=parseInt(ourClientLis.css("width"));
    $(".ourClientA-left").click(function(){
        ourClientList.prepend(ourClientLis.eq(ourClientLis.length-1));
        ourClientList.css({marginLeft:-ourClientWidth+"px"});
        ourClientList.stop().animate({
            marginLeft:"0px"
        }, 500);
    });
    $(".ourClientA-right").click(function(){
        ourClientList.stop().animate({
            marginLeft:-ourClientWidth+"px"
        }, 500,function(){
            ourClientList.append(ourClientLis.eq(0));
            ourClientList.css({marginLeft:"0px"});
        });
    });
    /////////////////视差滚动
    var topNum;
    var topNode=$("#top");
    $(window).scroll(function(){
        var scrollTopNum=document.documentElement.scrollTop+document.body.scrollTop;//全兼容；窗口滚动条滚去的距离
        topNum=scrollTopNum;
        var winHeight=document.documentElement.clientHeight;//可视窗口的高度
        if(scrollTopNum>winHeight){
            topNode.css({display:""})
        }else{
            topNode.css({display:"none"})
        }
    });
    topNode.click(function(){
        $("HTML").stop().animate({scrollTop:"0"},100);
        $("body").stop().animate({scrollTop:"0"},100);
    });

    //////////////////////////aboutUs菜单单击事件
    var abtUsMenuLis=$("#aboutUsMenuList li");
    abtUsMenuLis.click(function(){
        if($(this).hasClass("aboutUsMenu-cur")){
            return;
        }
        var curPos=$(this).index("#aboutUsMenuList li");
        var oldPos=$("#aboutUsMenuList .aboutUsMenu-cur").index();
        abtUsMenuLis.eq(curPos).addClass("aboutUsMenu-cur");
        abtUsMenuLis.eq(oldPos).removeClass("aboutUsMenu-cur");
    });

    /////////////////////////products导航栏点击事件
    var produceNavAs=$("#produce-nav .produceNav a");
    produceNavAs.click(function(){
        if($(this).hasClass("produceNav-cur")){
            return;
        }
        var curPos=$(this).index("#produce-nav .produceNav a");
        var oldPos=$("#produce-nav .produceNav .produceNav-cur").index();
        produceNavAs.eq(curPos).addClass("produceNav-cur");
        produceNavAs.eq(oldPos).removeClass("produceNav-cur");
    });

    ////////////////自动滚动
    var dynamicNews=$(".dynamic-news");
    function autoMove() {
        var firstLi=$(".dynamic-news li:first");
        var height=firstLi.outerHeight();//整个盒子的宽度；不变的总路程
        var speed=height/2000;//不变的速度

        var widthDo=parseInt(firstLi.css("margin-top"))+height;//第一个dl在变化的路程
        var time=widthDo/speed;//在变化的动画完成时间

        firstLi.animate({marginTop: "-24px"}, time,"linear", function () {
            $(this).appendTo(dynamicNews).css({marginTop: "0px"});
            autoMove();
        });
    }
    autoMove();
    dynamicNews.mouseenter(function(){
        $(".dynamic-news li:first").stop();
    });
    dynamicNews.mouseleave(function(){
        autoMove();
    });
    var dynamicLinks=$(".dynamic-links");
    function autooMove() {
        var firstLi=$(".dynamic-links li:first");
        var height=firstLi.outerHeight();//整个盒子的宽度；不变的总路程
        var speed=height/2000;//不变的速度

        var widthDo=parseInt(firstLi.css("margin-top"))+height;//第一个dl在变化的路程
        var time=widthDo/speed;//在变化的动画完成时间

        firstLi.animate({marginTop: "-24px"}, time,"linear", function () {
            $(this).appendTo(dynamicLinks).css({marginTop: "0px"});
            autooMove();
        });
    }
    autooMove();
    dynamicLinks.mouseenter(function(){
        $(".dynamic-links li:first").stop();
    });
    dynamicLinks.mouseleave(function(){
        autooMove();
    });





};

