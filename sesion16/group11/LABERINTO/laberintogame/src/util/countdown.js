window.onload = updateClock;

var totalTime = 120;

function updateClock() {
  document.getElementById('countdown').innerHTML = totalTime;
  
  if(totalTime==0){
    document.getElementById('countdown').innerHTML = 'EXPIRED!';
    //close();
    lose();
  }else{
    totalTime-=1;
    setTimeout("updateClock()",1000);
  }


}