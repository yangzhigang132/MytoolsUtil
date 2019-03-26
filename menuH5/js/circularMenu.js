/**
 * Created by zz on 2017/11/15.
 */

//初始化数据
var myMenu =(function(){
    var defaultIcon;//默认的图标 一定是数组 路径
    var selcetedIcon;//选中后的图标 一定是数组 路径
    var loginIcon='';//中间的图标  路径

    var bigradius=0;//大圆的半径
    var smallradius=0;//小圆的半径
    var middleradius=0;//大圆的背景颜色
    var middle2radius=0;//小圆的背景颜色

    var bigBgcolor;//大圆内部的突出颜色
    var middle1Bgcolor;//小圆的外部突出颜色
    var middle2Bgcolor;//大圆内部的突出颜色
    var smallBgcolor;//小圆的外部突出颜色
    var divideline;//大圆内部的突出颜色
    var selectline;//小圆的外部突出颜色

    var eventfun={"click":null,"onmouse":null};//事件；
    var selectMenu=0;

    var canvasWidth;//画布的宽度
    var canvasHeight;//画布的高度
    var canvasHAndWmin;//画布的宽度和高度最小值
    var cxt;//
    var divewidth=2;
    var menuTotal;//菜单的个数
    var menuRotate=[];
    var share_angle_menue=[];
    var share_angle;
    var ring_radiu;      // 扇形的中间
    var selectArea=-1111;
    var isOldSelectArea=false;
    var oldSelctArea;
    var loginImage;
    var canvasObe;
    var menuRotates={
        "10":[75,45,0,-30,-70,-110,-140,-180,-210,-250],
         "8":[70,15,-25,-65,-115,-160,160,110],
         "6":[60,0,-60,-125,180,120],
         "4":[45,-45,-135,135],
        "12":[75,45,15,-15,-45,-75,-100,-135,-165,-195,-220,-255]
    };
    var MenuDescrib=["出差","下班","值班","事假","日志",
        "加班","统计","上班","培训","休假"];
    //绘制开始的入口
    var canvasMunue=function(){
        menuRotate=menuRotates[menuTotal+''];
        ring_radiu=(bigradius-middle2radius)/ 2 +middle2radius*1.2 ;
        share_angle= 360 / menuTotal;
        for(var j=1;j<menuTotal+1;j++) {
            share_angle_menue.push(Math.PI / 180 * share_angle * j);
        }
        loginImage=new Image();
        loginImage.src=loginIcon;
        loginImage.onload=function(){
            canvasCircular();
        };
    };
    var canvasCircular=function(){
        canvasBigCircular();
        loadPicture(menuTotal-1);
    }

    var canvasBigCircular =function() {
        cxt.beginPath();
        cxt.fillStyle = setShadow(bigradius);
        cxt.arc(canvasWidth / 2, canvasHeight / 2, bigradius , 0 ,Math.PI*2,false);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    };
    var setShadow=function(r){
        cxt.save();
        //cxt.shadowOffsetX = 2;
        //cxt.shadowOffsetY = 7;
        //cxt.shadowBlur = 4;
        //cxt.shadowColor = 'rgba(0, 0, 0, 0.3)';
        cxt.shadowOffsetX = 2;
        cxt.shadowOffsetY = 7;
        cxt.shadowBlur =10;
        cxt.shadowColor = 'rgba(0, 0, 0, 0.2)';
        var grd=cxt.createRadialGradient(canvasWidth / 2, canvasHeight / 2,middleradius,canvasWidth / 2, canvasHeight / 2,r);
        grd.addColorStop(0,middle1Bgcolor);
        grd.addColorStop(0.94,bigBgcolor);
        grd.addColorStop(1,"#fff");
        return grd;
    }


    /**
     *初始化
     * @param canvasObeject 画布  例如document.getElementById("main")
     * @returns {{setOption: Function}}  设置数据
     */
    var  initMenue=function(canvasObeject){
        canvasObe=canvasObeject;
        cxt=canvasObeject.getContext("2d");
        canvasObeject.width=canvasObeject.width;
        canvasWidth= canvasObeject.width;
        canvasHeight= canvasObeject.height;
        canvasHAndWmin=Math.min(canvasWidth,canvasHeight);
        return {
            setOption: init_menue_data
        }
    }
    /**
     * {   icon:{
     *      defaultIcon:[], 默认显示的图标
     *      selcetedIcon:[], 选择后的图标
     *      loginIcon:''    中间的图标  必须给的
     *    }
     *    redius:{
     *          bigradius:数值,
     *          middleradius:数值,
     *          middle2radius:数值,
     *          smallradius:数值
     *        }
     *    color:{
     *          bigBgcolor:"",
     *          middle1Bgcolor:"",
     *          middle2Bgcolor:"",
     *          smallBgcolor:"",
     *          divideline:""
     *          selectline:""
     *    }
     * }
     * @param data 初始化需要的数据 解析数据
     */
    var init_menue_data=function(data){
            var len=0;
            //图标
            if(hasProporty(data.icon)){
                var icon=data.icon;
                if(hasProporty(icon.defaultIcon)){
                    defaultIcon=icon.defaultIcon;
                    len=defaultIcon.length;
                }
                if(hasProporty(icon.selcetedIcon)){
                    selcetedIcon=icon.selcetedIcon;
                    menuTotal=Math.max(len,selcetedIcon.length);
                }else{
                    menuTotal=len;
                }
                if(hasProporty(icon.loginIcon)){
                    loginIcon=icon.loginIcon;
                }
                if(hasProporty(icon.MenuDescribet)){
                    MenuDescrib=icon.MenuDescribet;
                }
            }
            if(hasProporty(data.redius)){
                var redius=data.redius;
                if(hasProporty(redius.bigradius)){
                    bigradius=redius.bigradius;
                }
                if(hasProporty(redius.smallradius)){
                    smallradius=redius.smallradius;
                }
                if(hasProporty(redius.middleradius)){
                    middleradius=redius.middleradius;
                }
                if(hasProporty(redius.middle2radius)){
                    middle2radius=redius.middle2radius;
                }
            }
            if(hasProporty(data.color)){
                var color=data.color;
                if(hasProporty(color.bigBgcolor)){
                    bigBgcolor=color.bigBgcolor;
                }
                if(hasProporty(color.middle1Bgcolor)){
                    middle1Bgcolor=color.middle1Bgcolor;
                }
                if(hasProporty(color.middle2Bgcolor)){
                    middle2Bgcolor=color.middle2Bgcolor;
                }
                if(hasProporty(color.smallBgcolor)){
                    smallBgcolor=color.smallBgcolor;
                }
                if(hasProporty(color.selectline)){
                    selectline=color.selectline;
                }
                if(hasProporty(color.divideline)){
                    divideline=color.divideline;
                }
            }
            if(hasProporty(data.setMenu)) {
                var setMenu = data.setMenu;
                if (hasProporty(setMenu.selectMenu)) {
                    selectMenu = setMenu.selectMenu;
                }
            }
            if(selectMenu<0 && selectMenu>=menuTotal){
            }else{
                localStorage.setItem("menuLocation",selectMenu);
            }
            canvasMunue();
    };
    var hasProporty=function(proporty){
            if(typeof(proporty)!=="undefined" && proporty!=null){
                return true;
            }else{
                return false;
            }
    };
    function loadPicture(n){
            var image=new Image();
            image.src=defaultIcon[n];
            image.onload=function(){
                showMenu_Icon(image,n);
                loadPicture(n-1);
                if(n==0){
                    showCircular();
                    return;
                }
            }
    }
    function showCircular(){
        var gr;
        cxt.beginPath();
        cxt.strokeStyle="#CCCCCC";
        cxt.lineWidth = 1;
        cxt.fillStyle = middle2Bgcolor;
        cxt.arc(canvasWidth/2,canvasHeight/2,middle2radius ,0,Math.PI*2,true);
        cxt.fill();
        cxt.stroke();
        cxt.save();
        cxt.shadowOffsetX = 2;
        cxt.shadowOffsetY = 7;
        cxt.shadowBlur = 4;
        cxt.shadowColor = 'rgba(0, 0, 0, 0.3)';
        cxt.beginPath();
        gr = cxt.createRadialGradient(canvasWidth/2 - smallradius,canvasHeight/2-smallradius,smallradius-40,canvasWidth/2,canvasHeight/2,smallradius-1);
        gr.addColorStop(0,'#f4f4f4');
        gr.addColorStop(1,'#e8e8e8');
        cxt.fillStyle = smallBgcolor;
        cxt.arc(canvasWidth/2,canvasHeight/2,smallradius,0,(Math.PI/180)*360,false);
        cxt.fill();
        cxt.restore();
        if(Math.sqrt(Math.pow(loginImage.width,2)+Math.pow(loginImage.height,2))/2>smallradius){
            var a=Math.sqrt(2)*smallradius;
            var scale;
            if(loginImage.width>=loginImage.height){
                scale=a/loginImage.width;
                var heights=scale*loginImage.height;
                cxt.drawImage(loginImage,(canvasWidth-a)/2,(canvasHeight-heights)/2,a, heights);
            }else{
                scale=a/loginImage.height;
                var widths=scale*loginImage.width;
                cxt.drawImage(loginImage,(canvasWidth-widths)/2
                    ,(canvasHeight-a)/2,widths,a);
            }
        }else{
            cxt.drawImage(loginImage,(canvasWidth-loginImage.width)/2,(canvasHeight-loginImage.height)/2);
        }

        //initCanvasImage=cxt.getImageData(0,0,canvasWidth,canvasHeight);
        if(hasProporty(localStorage.getItem("menuLocation"))){
            changStudu(true,localStorage.getItem("menuLocation"));
            localStorage.removeItem("menuLocation");
            initCanvas=false;
        }
        localStorage.clear();
    }

    function loadImage(imgeUrl,calls){
            var image=new Image();
            image.src=imgeUrl;
            image.onload=function(){
              calls.call(image);
            }
    }

    function isAreaInside(x,y){
            var xx=Math.pow((x - canvasWidth/2),2);
            var yy=Math.pow((y - canvasHeight/2),2);
            if(Math.sqrt(xx+yy)<middle2radius || Math.sqrt(xx+yy)>bigradius){
                return false;
            }else{
                var aa;
                aa=Math.asin(Math.abs((y - canvasHeight/2))/Math.sqrt(xx+yy));
                if(x< canvasWidth/2 && y < canvasHeight/2){
                    aa=Math.PI -aa;
                }else if(x< canvasWidth/2 && y >= canvasHeight/2){
                    aa=Math.PI +aa;
                }else if(x>= canvasWidth/2 && y < canvasHeight/2){

                }else if(x>= canvasWidth/2 && y >= canvasHeight/2){
                    aa= Math.PI * 2 -aa;
                }
                for(var k=0;k<share_angle_menue.length;k++){
                    if(k==0){
                        if(0<=aa && aa< share_angle_menue[k]){
                            isOldSelectArea= k===selectArea?false:true;
                            oldSelctArea= isOldSelectArea?selectArea:-1;
                            selectArea=k;
                            break;
                        }
                    }else{
                        if(share_angle_menue[k-1]<aa&& aa<=share_angle_menue[k]){
                            isOldSelectArea= k===selectArea?false:true;
                            oldSelctArea= isOldSelectArea?selectArea:-1;
                            selectArea=k;
                            break;
                        }
                    }
                }
                return true;
            }
    }

    document.onclick=function(event){
        var event_x=event.offsetX;
        var event_y=event.offsetY;
        if(!isAreaInside(event_x,event_y)){
            return ;
        }
        if(isOldSelectArea){
            var pic=false;
            var index=oldSelctArea;
            changStudu(pic,index);
            pic=true;
            index=selectArea;
            changStudu(pic,index);
        }else{
            return;
        }
        setLocalStorageData(selectArea);
        if(event.type==="click"){
            eventfun.click(selectArea+1);
        }
    };
    function eventInit(eventType,callback){
        if(eventType==="click"){
            eventfun.click= callback;
        }
    }

    var setLocalStorageData=function(menuLocation){
         localStorage.setItem("menuLocation",menuLocation);
    }

    var selectedArea=function(index){
        var aa=middle2radius-smallradius;
        aa=aa*0.8;
        cxt.save();
        cxt.beginPath();
        cxt.strokeStyle="#fff";
        cxt.lineWidth=aa;
        cxt.shadowOffsetX = 2;
        cxt.shadowOffsetY = 7;
        cxt.shadowBlur =3;
        cxt.shadowColor = 'rgba(0, 0, 0, 0.2)';
        var grd=cxt.createRadialGradient(canvasWidth / 2, canvasHeight / 2,middleradius,canvasWidth / 2,
            canvasHeight / 2,bigradius+aa);
        grd.addColorStop(0,middle1Bgcolor);
        grd.addColorStop(0.7,bigBgcolor);
        grd.addColorStop(1,"#fff");
        var radius=middle2radius;
        cxt.fillStyle=grd;
        var r_sin=share_angle_menue[share_angle_menue.length-1-index];
        var r_cos=share_angle_menue[share_angle_menue.length-1-index] - Math.PI / 180 * share_angle;
        cxt.arc(canvasWidth / 2, canvasHeight / 2,middleradius - aa*2,r_sin,r_cos,true);
        cxt.arc(canvasWidth / 2, canvasHeight / 2,bigradius + aa,r_cos,r_sin,false);
        cxt.closePath();
        cxt.stroke();
        cxt.fill();
        cxt.restore();
    }
    function changStudu(pic,index){
        selectedArea(index);
        if(pic){
            var select_image=new Image();
            if(hasProporty(selcetedIcon)&&selcetedIcon.length>0&&selcetedIcon.length==menuTotal){
                select_image.src=selcetedIcon[selcetedIcon.length-1-index];
            }else{
                select_image.src=defaultIcon[defaultIcon.length-1-index];
            }
            var r_sin;
            var r_cos;
            select_image.onload=function(){
                cxt.restore();
                cxt.save();
                cxt.beginPath();
                r_sin=Math.sin(share_angle_menue[share_angle_menue.length-1-index] - Math.PI / 180 * share_angle / 2);
                r_cos=Math.cos(share_angle_menue[share_angle_menue.length -1-index] - Math.PI / 180 * share_angle / 2);
                cxt.translate(ring_radiu * r_cos + canvasWidth / 2 ,ring_radiu * r_sin + canvasHeight / 2);
                cxt.rotate(Math.PI / 180 * menuRotate[index] );
                if(Math.max(select_image.width,select_image.height)>=bigradius-middleradius){
                    var a= (bigradius-middleradius);
                    var scale;
                    if(select_image.width>select_image.height){
                        scale=a/select_image.width;
                        var heights=scale * select_image.height;
                        cxt.drawImage(select_image,-a/2,-heights/2,a,heights);
                        drawText(MenuDescrib[MenuDescrib.length-1-index],-a,heights,a);
                    }else{
                        scale=a/select_image.height;
                        var widths=scale * select_image.width;
                        cxt.drawImage(select_image,-widths/2,-a/2,widths,a);
                        drawText(MenuDescrib[MenuDescrib.length-1-index],-widths, a,widths);
                    }
                }else{
                    cxt.drawImage(select_image,-select_image.width/2,-select_image.height/2);
                    drawText(MenuDescrib[MenuDescrib.length-1-index],-select_image.width,select_image.height,select_image.width);
                }
                cxt.fill();
                cxt.restore();
            }
        }else {
            canvasObe.width= canvasObe.width;
            canvasMunue();
            //cxt.putImageData(initCanvasImage, 0, 0);
        }
    }

    function showMenu_Icon(imgev,i){
        cxt.beginPath();
        cxt.strokeStyle = divideline;
        cxt.lineWidth = divewidth;
        var r_sin=Math.sin(Math.PI / 180 * share_angle * i);
        var r_cos=Math.cos(Math.PI / 180 * share_angle * i);
        cxt.moveTo(middle2radius * r_cos  + canvasWidth / 2 ,middle2radius * r_sin+canvasHeight / 2);
        cxt.lineTo(bigradius * r_cos   + canvasWidth / 2,bigradius * r_sin + canvasHeight / 2);
        cxt.stroke();

        r_sin=Math.sin(Math.PI / 180 * share_angle * i + Math.PI / 180 * share_angle / 2);
        r_cos=Math.cos(Math.PI / 180 * share_angle * i + Math.PI / 180 * share_angle / 2);
        cxt.save();
        cxt.translate(ring_radiu * r_cos + canvasWidth / 2,ring_radiu * r_sin + canvasHeight / 2);
        cxt.rotate(Math.PI / 180 * menuRotate[menuRotate.length-i-1] );
        if(Math.max(imgev.width,imgev.height)>=bigradius-middleradius){
            var a= (bigradius-middleradius);
            var scale;
            if(imgev.width>imgev.height){
                scale=a/imgev.width;
                var heights=scale * imgev.height;
                cxt.drawImage(imgev,-a/2,-heights/2,a,heights);
                drawText(MenuDescrib[i],-a,heights,a);
            }else{
                scale=a/imgev.height;
                var widths=scale * imgev.width;
                cxt.drawImage(imgev,-widths/2,-a/2,widths,a);
                drawText(MenuDescrib[i],-widths,a,widths);
            }
        }else{
            cxt.drawImage(imgev,-imgev.width/2,-imgev.height/2);
            drawText(MenuDescrib[i],-imgev.width,imgev.height,imgev.width);
        }
        cxt.restore();
    }
    function drawText(content,x,y,fonsize){
        cxt.font="normal small-caps bold "+fonsize * 0.4+"px arial";
        cxt.fillStyle="#848484";
        cxt.fillText(content,x*0.48,y*0.8);
    }
    return{
        initMenue:initMenue,
        on:eventInit
    }
})();