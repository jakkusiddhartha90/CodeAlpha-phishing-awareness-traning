const questions = [
  {q:"An email says your account will be closed in 10 minutes unless you confirm your password and OTP. What should you do?",a:["Reply with the requested details","Click the link immediately","Do not use the link; verify through the official app or website and report it","Forward it to everyone"],c:2,e:"Urgency plus a request for passwords or OTPs is a major warning sign. Verify independently."},
  {q:"What is phishing?",a:["A method of backing up files","A deceptive attempt to steal information or make someone take an unsafe action","A type of firewall","A secure login method"],c:1,e:"Phishing uses impersonation and deception to steal information or trigger harmful actions."},
  {q:"What is smishing?",a:["Phishing through SMS or text messages","Phishing through voice calls","A software update","A password encryption method"],c:0,e:"Smishing is phishing delivered through SMS or text messaging."},
  {q:"Which detail should you inspect in a suspicious email?",a:["Only the sender's display name","The full sender address and actual link destination","The font color only","The number of images"],c:1,e:"Display names can be faked. Inspect the full sender address and destination carefully."},
  {q:"A caller claims to be IT support and asks for your one-time password. What is the safest response?",a:["Share it because they are IT","Read it slowly","End the call and contact IT using a known official channel","Send it by text"],c:2,e:"Never disclose OTPs or authentication approvals. Contact support through a trusted channel."},
  {q:"What is spear phishing?",a:["A random software bug","A targeted phishing attempt customized for a person or organization","A type of antivirus","A public Wi-Fi network"],c:1,e:"Spear phishing is personalized and targeted, often using information about the victim."},
  {q:"You receive an unexpected attachment from a familiar contact. What should you do?",a:["Open it because you know the sender","Check with the sender through a separate trusted channel before opening","Disable antivirus first","Upload it to social media"],c:1,e:"A familiar account may be compromised or spoofed. Verify unexpected files separately."},
  {q:"Which is a strong everyday security practice?",a:["Reuse one password everywhere","Turn off updates","Use unique passwords and enable MFA","Share passwords with colleagues"],c:2,e:"Unique passwords and multi-factor authentication reduce account-takeover risk."},
  {q:"You accidentally entered your password on a suspicious website. What should you do first?",a:["Ignore it","Report it promptly and change the exposed password from a trusted device","Delete the browser","Send the password to a friend"],c:1,e:"Report the incident promptly, change exposed credentials from a trusted device, and follow your organization's response process."},
  {q:"What is the best way to verify an unexpected payment request from a manager?",a:["Reply to the same email","Use a known phone number or trusted company channel to confirm","Trust the signature","Pay quickly"],c:1,e:"Verify unusual financial requests out of band using a known, trusted contact method."}
];
let current = 0, score = 0, selected = null, answered = false;
const $ = id => document.getElementById(id);
function renderQuestion(){
  const item=questions[current]; selected=null; answered=false;
  $("questionCount").textContent=`QUESTION ${String(current+1).padStart(2,"0")}`;
  $("questionText").textContent=item.q;
  $("progressText").textContent=`Question ${current+1} of ${questions.length}`;
  $("progressBar").style.width=`${(current/questions.length)*100}%`;
  $("feedback").textContent="";
  $("nextButton").disabled=true;
  $("nextButton").textContent=current===questions.length-1?"See results →":"Next question →";
  $("answerOptions").innerHTML="";
  item.a.forEach((answer,index)=>{
    const button=document.createElement("button");
    button.className="answer-option";button.type="button";button.textContent=`${String.fromCharCode(65+index)}. ${answer}`;
    button.addEventListener("click",()=>chooseAnswer(index));
    $("answerOptions").appendChild(button);
  });
}
function chooseAnswer(index){
  if(answered)return;answered=true;selected=index;
  const item=questions[current],buttons=[...$("answerOptions").children];
  buttons.forEach((button,i)=>{button.disabled=true;if(i===item.c)button.classList.add("correct");if(i===index&&i!==item.c)button.classList.add("wrong");});
  if(index===item.c){score++;$("feedback").textContent="Correct! "+item.e;}else{$("feedback").textContent="Not quite. "+item.e;}
  $("nextButton").disabled=false;
}
function showResult(){
  $("quizCard").hidden=true;$("quizResult").hidden=false;$("restartButton").hidden=false;
  $("progressText").textContent="Training assessment complete";$("progressBar").style.width="100%";
  const percent=Math.round(score/questions.length*100);
  let message=percent>=80?"Excellent work! You have a strong understanding of phishing awareness.":percent>=60?"Good effort. Review the explanations and keep practicing.":"Keep learning. Revisit the modules and try again to strengthen your awareness.";
  $("quizResult").innerHTML=`<div class="eyebrow">YOUR TRAINING RESULT</div><strong>${score}/${questions.length} · ${percent}%</strong><h3>${percent>=80?"Great job!":percent>=60?"Good progress!":"Keep practicing!"}</h3><p>${message}</p><p>Remember: Stop. Think. Verify. Report.</p>`;
}
$("nextButton").addEventListener("click",()=>{if(!answered)return;if(current<questions.length-1){current++;renderQuestion();}else showResult();});
$("restartButton").addEventListener("click",()=>{current=0;score=0;$("quizCard").hidden=false;$("quizResult").hidden=true;$("restartButton").hidden=true;renderQuestion();});
$("menuToggle").addEventListener("click",()=>{const nav=$("mainNav");const open=nav.classList.toggle("open");$("menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#mainNav a").forEach(link=>link.addEventListener("click",()=>{$("mainNav").classList.remove("open");$("menuToggle").setAttribute("aria-expanded","false");}));
$("year").textContent=new Date().getFullYear();
renderQuestion();
