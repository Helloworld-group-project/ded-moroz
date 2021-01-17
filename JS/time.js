

function newYearIn()
{
  var days=" дней "
  var now = new Date();
  var newYear = new Date("Jan 1,2021,00:00:00");
  var totalRemains = (newYear.getTime()-now.getTime());


  if (totalRemains>1)
  {
    var RemainsSec=(parseInt(totalRemains/1000));
    var RemainsFullDays=(parseInt(RemainsSec/(24*60*60)));
    if (
      RemainsFullDays==2 ||
      RemainsFullDays==3 ||
      RemainsFullDays==4 ||
      RemainsFullDays==22 ||
      RemainsFullDays==23 ||
      RemainsFullDays==24 ||
      RemainsFullDays==32 ||
      RemainsFullDays==33 ||
      RemainsFullDays==34
      ) {
      days=" дня "
  }
  if (
    RemainsFullDays==1 ||
    RemainsFullDays==21 ||
    RemainsFullDays==31 
    ) {
    days=" день "
}
var secInLastDay=RemainsSec-RemainsFullDays*24*3600;
var RemainsFullHours=(parseInt(secInLastDay/3600));
if (RemainsFullHours<10){RemainsFullHours="0"+RemainsFullHours};
var secInLastHour=secInLastDay-RemainsFullHours*3600;
var RemainsMinutes=(parseInt(secInLastHour/60));
if (RemainsMinutes<10){RemainsMinutes="0"+RemainsMinutes};
var lastSec=secInLastHour-RemainsMinutes*60;
if (lastSec<10){lastSec="0"+lastSec};
        //document.getElementById('newyear').innerHTML = "<p style='font-size:22px;'>До Нового Года осталось: "+RemainsFullDays+days+RemainsFullHours+":"+RemainsMinutes+":"+lastSec+"</p>";
        document.getElementById('newyear').innerHTML = "<p>До Нового Года осталось: "+RemainsFullDays+' '+incline(['день', 'дня', 'дней'], RemainsFullDays)+' '+RemainsFullHours+" часов "+RemainsMinutes+" минут "+lastSec+" секунд "+"</p>";
        setTimeout("newYearIn()",10);
      } 
      else {document.getElementById("newyear").innerHTML = "C НОВЫМ ГОДОМ!!!";}
    }

function incline(words,n){ // первый параметр -- 3-и варианта склонения существительного по правилу 1, 2, 5; второй -- сама переменная с числом
 return words[(n%100>4 && n%100<20)?2:[2,0,1,1,1,2][Math.min(n%10,5)]];
}

newYearIn();



// количество снежинок, которое будет на экране одновременно.
var snowmax=40
 
// Цвета для снежинок. Для каждой конкретной снежинки цвет выбирается случайно из этого массива.
var snowcolor=new Array("#b9dff5","#7fc7ff","#7fb1ff","#7fc7ff","#b9dff5")
 
// Шрифт для снежинок
var snowtype=new Array("Times")
 
// Символ (*) и есть снежинка, в место нее можно вставить любой другой символ.
var snowletter="&#10052;"
 
// Скорость движения снежинок (от 0.3 до 2)
var sinkspeed=0.4
 
// Максимальный размер для снежинок
var snowmaxsize=40
 
// Минимальный размер для снежинок
var snowminsize=10
 
// Зона для снежинок
// 1 для всей страницы, 2 в левой части страницы
// 3 в центральной части, 4 в правой части страницы
var snowingzone=1
 
////////////////////////
///////// Конец настроек
////////////////////////
 
var snow=new Array()
var marginbottom
var marginright
var timer
var i_snow=0
var x_mv=new Array();
var crds=new Array();
var lftrght=new Array();
var browserinfos=navigator.userAgent
var ie5=document.all&&document.getElementById&&!browserinfos.match(/Opera/)
var ns6=document.getElementById&&!document.all
var opera=browserinfos.match(/Opera/)
var browserok=ie5||ns6||opera
 
function randommaker(range) {
    rand=Math.floor(range*Math.random())
    return rand
}
 
function initsnow() {
    if (ie5 || opera) {
        marginbottom = document.documentElement.clientHeight+50
        marginright = document.body.clientWidth-15
    }
    else if (ns6) {
        marginbottom = document.documentElement.clientHeight+50
        marginright = window.innerWidth-15
    }
    var snowsizerange=snowmaxsize-snowminsize
    for (i=0;i<=snowmax;i++) {
        crds[i] = 0;
        lftrght[i] = Math.random()*15;
        x_mv[i] = 0.03 + Math.random()/10;
        snow[i]=document.getElementById("s"+i)
        snow[i].style.fontFamily=snowtype[randommaker(snowtype.length)]
        snow[i].size=randommaker(snowsizerange)+snowminsize
        snow[i].style.fontSize=snow[i].size+'px';
        snow[i].style.color=snowcolor[randommaker(snowcolor.length)]
        snow[i].style.zIndex=1000
        snow[i].sink=sinkspeed*snow[i].size/5
        if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
        if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
        if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
        if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
        snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size)
        snow[i].style.left=snow[i].posx+'px';
        snow[i].style.top=snow[i].posy+'px';
    }
    movesnow()
}
 
function movesnow() {
    for (i=0;i<=snowmax;i++) {
        crds[i] += x_mv[i];
        snow[i].posy+=snow[i].sink
        snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+'px';
        snow[i].style.top=snow[i].posy+'px';
        
        if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])){
            if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            snow[i].posy=0
        }
    }
    var timer=setTimeout("movesnow()",50)
}
 
for (i=0;i<=snowmax;i++) {
    document.body.insertAdjacentHTML('beforeend', "<span id='s"+i+"' style='user-select:none;position:fixed;top:-"+snowmaxsize+"'>"+snowletter+"</span>")
}
 
if (browserok) {
    window.onload=initsnow    
}