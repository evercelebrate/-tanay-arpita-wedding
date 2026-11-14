const weddingDate = new Date("2027-02-14T18:00:00+05:30").getTime();
function updateCountdown(){
  const now=Date.now(), distance=weddingDate-now;
  const ids=["days","hours","minutes","seconds"];
  if(distance<=0){ids.forEach(id=>document.getElementById(id).textContent="0");return;}
  const values=[Math.floor(distance/86400000),Math.floor((distance%86400000)/3600000),Math.floor((distance%3600000)/60000),Math.floor((distance%60000)/1000)];
  ids.forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,"0"));
}
updateCountdown();setInterval(updateCountdown,1000);
document.getElementById("openInvite").addEventListener("click",()=>document.getElementById("invitation").scrollIntoView({behavior:"smooth"}));
document.getElementById("shareButton").addEventListener("click",async()=>{
  const shareData={title:"Tanay & Arpita — Wedding Invitation",text:"You are warmly invited to the wedding of Tanay Mondal & Arpita Gayen on 14 February 2027.",url:location.href};
  try{if(navigator.share){await navigator.share(shareData);}else{await navigator.clipboard.writeText(location.href);alert("Invitation link copied. Share it on WhatsApp!");}}
  catch(e){if(e.name!=="AbortError"){prompt("Copy and share this invitation link:",location.href);}}
});
const audio=document.getElementById("weddingMusic"),musicButton=document.getElementById("musicButton");
musicButton.addEventListener("click",async()=>{
  if(audio.paused){try{await audio.play();musicButton.textContent="Ⅱ Pause music";}catch(e){alert("Add your permitted instrumental MP3 as music/bengali-instrumental.mp3 first.");}}
  else{audio.pause();musicButton.textContent="♫ Play music";}
});