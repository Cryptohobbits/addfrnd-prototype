/* Actions: chat, create, safety, feedback, demo */
Object.assign(ACT,{
 openChat:(cid)=>{ if(cid.startsWith("dm:")&&!isFriend(cid.slice(3)))return ACT.lockedMsg(cid.slice(3)); go("chat",{id:cid}); },
 send:(cid,el,e,force)=>{const inp=$("#chatInput");if(!inp)return;const t=inp.value.trim();if(!t)return;
  if(PII.test(t)&&!force){openSheet(`<div class="row gap10" style="margin-bottom:8px"><div style="width:40px;height:40px;border-radius:12px;background:var(--amber-l);color:#A35A0B;display:flex;align-items:center;justify-content:center;flex:none">${ic("shield-alert",20)}</div><div class="h2">Share personal details?</div></div>
   <p class="muted" style="margin-bottom:14px">This looks like a phone number, address, email or social handle. We suggest keeping personal details private until you've met and feel comfortable.</p>
   <div class="row gap8"><button class="btn ghost md" data-act="closeSheet">Edit message</button><button class="btn primary md" data-act="piiSend" data-arg="${cid}">Send anyway</button></div>`);return;}
  inp.value="";appendMsg(cid,{from:"me",text:t});scheduleReply(cid,t);},
 piiSend:(cid)=>{closeSheet();ACT.send(cid,null,null,true);},
 quickMsg:(t)=>{const cid=cur().params.id;appendMsg(cid,{from:"me",text:t});scheduleReply(cid,t);},
 sendPhoto:(cid)=>{const k="ph-me-"+Date.now();S.revealed[k]=true;appendMsg(cid,{from:"me",photo:k});toast("Photo sent · others see it blurred until they tap");scheduleReply(cid,"photo");},
 reveal:(k,el)=>{ if(S.revealed[k]){el.classList.add("blur");delete S.revealed[k];} else {S.revealed[k]=true;el.classList.remove("blur");} save(); },
 checkin:(pid)=>{const s=safety(pid);if(s.here){toast("Already checked in at "+s.here);return;}markShared(pid);s.here=nowTime();s.missed=false;appendMsg("plan:"+pid,{sys:"You checked in: I'm here · "+s.here,k:"ok"});refresh();toast("Checked in ✓ "+esc(S.contact.name)+"'s Safety Card is updated");},
 chatMenu:(cid)=>{const c=chatInfo(cid);
  openSheet(`<div class="h2" style="margin-bottom:6px">Safety options</div>
  ${sheetOpt("reportPick",cid,"flag","Report a message or person")}${sheetOpt("blockPick",cid,"ban","Block someone")}
  ${c.type==="plan"&&c.p.host!=="me"&&!c.closed?sheetOpt("leaveChat",c.id,"log-out","Leave plan & chat"):""}
  ${sheetOpt("safetyTips",null,"shield-check","Safety tips")}${sheetOpt("closeSheet",null,"x","Cancel")}`);},
 reportPick:(cid)=>{const c=chatInfo(cid),ppl=c.type==="plan"?others(c.p):[c.id];
  openSheet(`<div class="h2">Report</div><p class="muted small" style="margin:4px 0 10px">Who is this about? Nobody is told who reported.</p>${ppl.map(id=>`<div class="opt" data-act="reportPerson" data-arg="${id}">${av(id,36)}${per(id).name}</div>`).join("")}`);},
 reportPerson:(id)=>openSheet(`<div class="h2">Report ${per(id).name}</div><p class="muted small" style="margin:4px 0 12px">Reports are private. Our team reviews every one.</p>
  <div class="chips">${["Made me uncomfortable","Inappropriate messages","Asked for personal info","Fake profile","Didn't show up","Something else"].map(r=>`<span class="chip sm" data-act="rReason">${r}</span>`).join("")}</div>
  <button class="btn primary md" style="margin-top:16px" data-act="sendReport" data-arg="${id}">Send report</button><button class="btn ghost md" style="margin-top:8px" data-act="blockPerson" data-arg="${id}">Report & block</button>`),
 rReason:(a,el)=>el.classList.toggle("on"),
 reportThing:()=>{closeSheet();toast("Thanks — our team will review this. Nobody is told who reported.");},
 sendReport:(id)=>{S.reported.push(id);closeSheet();toast("Report sent. Thanks for keeping ADDFRND safe 💛");},
 blockPick:(cid)=>{const c=chatInfo(cid),ppl=c.type==="plan"?others(c.p):[c.id];
  openSheet(`<div class="h2">Block someone</div><p class="muted small" style="margin:4px 0 10px">They won't be able to see you, message you or join your plans. They're not told.</p>${ppl.map(id=>`<div class="opt" data-act="blockPerson" data-arg="${id}">${av(id,36)}${per(id).name}</div>`).join("")}`);},
 blockPerson:(id)=>{ if(!S.blocked.includes(id))S.blocked.push(id); delete S.friends[id]; closeSheet(); const c=cur();
  const leave=(c.name==="person"&&c.params.id===id)||(c.name==="planDetail"&&plan(c.params.id).host===id)||(c.name==="chat"&&c.params.id==="dm:"+id);
  if(leave)goBack(); else render();
  toast(per(id).name+" is blocked. They can't see or message you.");},
 leaveChat:(pid)=>{unjoin(pid);closeSheet();go("chats",{},"tab");toast("You've left the plan");},
 safetyTips:()=>openSheet(`<div class="h2">Safety tips</div><ul style="margin:10px 0 0 18px;line-height:1.7" class="small"><li>Meet in the public venue on the plan — never at someone's home.</li><li>Share your Safety Card with someone you trust.</li><li>Tap “I'm here” when you arrive and “All good” when you're home.</li><li>Keep personal details private until you're comfortable.</li><li>Anything off? Report or block — it's private.</li><li>In an emergency, call 999.</li></ul><button class="btn primary md" style="margin-top:16px" data-act="closeSheet">Got it</button>`),
 create:()=>{S.draft=newDraft();go("create",{},"modal");},
 dAct:(a)=>{S.draft.act=a;render();},
 dVenue:(v)=>{S.draft.venue=v;render();},
 dDay:(d)=>{S.draft.day=d;render();},
 dSpots:(n)=>{S.draft.spots=Math.max(2,Math.min(10,S.draft.spots+ +n));$("#dSpotsN").textContent=S.draft.spots;save();},
 dApproval:()=>{S.draft.approval=!S.draft.approval;render();},
 dSafety:()=>{S.draft.safety=!S.draft.safety;render();},
 postPlan:()=>{const d=S.draft;if(!d.title.trim())return toast("Give your plan a title");
  const id="m"+Date.now();const p={id,act:d.act,title:d.title.trim(),venue:d.venue,day:d.day,time:d.time,dur:+d.dur,spots:d.spots,host:"me",att:["me"],band:myBand(),approval:d.approval,safety:d.safety,desc:d.desc.trim(),req:[]};
  S.plans.push(p);S.join[id]="joined";seedPlanChat(p);S.draft=null;save();
  go("planDetail",{id},"replaceTop");
  setTimeout(()=>{ if(d.safety)notify("Plan posted 🎉","It's on Discover and in Plans. Tap to share your Safety Card.",()=>go("safety",{id})); else toast("Plan posted! It's on Discover and in Plans.");},450);
  pushHostRequest(id);},
 openSafety:(pid)=>go("safety",{id:pid}),
 safetyInfo:()=>openSheet(`<div class="h2">How the Safety Card works</div><ul style="margin:10px 0 0 18px;line-height:1.7" class="small"><li>Share it by WhatsApp, text or link — no app needed to view.</li><li>It shows first names, avatars, the venue, time and when you expect to be home.</li><li>Tap “I'm here” on arrival and “All good” when you're home — it updates live.</li><li>Miss a check-in and your trusted contact gets a text.</li><li>It never shows your chats or live location, and expires 24h after the plan.</li></ul><button class="btn primary md" style="margin-top:16px" data-act="closeSheet">Got it</button>`),
 editHome:(pid)=>{const p=plan(pid),opts=[30,60,90,120,180].map(m=>addMins(p.time,p.dur+m));openSheet(`<div class="h2">Expected home by</div><div class="chips" style="margin-top:12px">${opts.map(t=>`<span class="chip${homeBy(p)===t?" on":""}" data-act="setHome" data-arg="${pid}|${t}">${t}</span>`).join("")}</div>`);},
 setHome:(a)=>{const [pid,t]=a.split("|");S.home[pid]=t;closeSheet();render();},
 pickContact:()=>openSheet(`<div class="h2">Trusted contact</div><p class="muted small" style="margin:4px 0 8px">Who gets your Safety Cards and missed check-in alerts?</p>${["Mum","Dad","My sister","A friend"].map(n=>`<div class="opt" data-act="setContact" data-arg="${n}">${av("mum",36)}<span class="grow">${n}</span>${S.contact.name===n?ic("check",18,3,"color:var(--mint)"):""}</div>`).join("")}`),
 setContact:(n)=>{S.contact.name=n;closeSheet();render();},
 toggleAlert:()=>{S.contact.alert=!S.contact.alert;render();toast(S.contact.alert?"Missed check-in alerts on":"Missed check-in alerts off");},
 share:async(kind)=>{
  const pid=cur().params.id,p=plan(pid),v=venue(p),url=cardURL();
  const text=S.me.name+"'s ADDFRND Safety Card: "+p.title+", "+p.day+" "+p.time+" at "+v.name+". Home by "+homeBy(p)+". Live updates:";
  markShared(pid);save();
  if(kind!=="copy"&&navigator.share){try{await navigator.share({title:"ADDFRND Safety Card",text,url});toast("Shared ✓ "+esc(S.contact.name)+" will see live updates");refresh();return;}catch(e){if(e&&e.name==="AbortError"){toast("Share cancelled");return;}}}
  if(kind==="copy"){toast((await copyText(url))?"Link copied ✓ — paste it anywhere":"Your link: "+esc(url));}
  else{const ok=await copyText(text+" "+url);toast(ok?"Message copied — paste it into "+(kind==="wa"?"WhatsApp":"your text app"):(kind==="wa"?"WhatsApp":"Text")+" sharing isn't available here (demo)");}
  refresh();},
 openMum:(pid)=>{markShared(pid);go("mum",{id:pid});},
 simHere:(pid)=>{const s=safety(pid);markShared(pid);if(!s.here){s.here=nowTime();chatMsgs("plan:"+pid).push({sys:"You checked in: I'm here · "+s.here,k:"ok"});}s.missed=false;save();refresh();
  notify("ADDFRND",esc(S.me.name)+" checked in: <b>I'm here</b> at "+esc(venue(plan(pid)).name)+" ✓");},
 simGood:(pid)=>{const s=safety(pid);markShared(pid);if(!s.here)s.here=addMins(plan(pid).time,-3);s.allgood=nowTime();s.missed=false;save();refresh();
  notify("ADDFRND",esc(S.me.name)+" is home — <b>All good</b> ✓ · tap to leave feedback",()=>go("feedback",{id:pid}));},
 simMissed:(pid)=>{const s=safety(pid);markShared(pid);s.allgood=null;s.missed=nowTime();save();
  if(!onScreen("mum"))go("mum",{id:pid});else refresh();
  setTimeout(()=>notify("Text to "+S.contact.name,esc(S.me.name)+" hasn't checked in “All good” (due "+homeBy(plan(pid))+")"),450);},
 simReset:(pid)=>{S.safety[pid]={shared:nowTime(),here:null,allgood:null,missed:false};S.chats["plan:"+pid]=chatMsgs("plan:"+pid).filter(m=>!(m.sys&&m.sys.startsWith("You checked in")));render();toast("Safety Card reset");},
 resolveMissed:(pid)=>{const s=safety(pid);s.missed=false;s.allgood=nowTime();render();toast("Marked as OK — everyone's been updated");},
 callDemo:()=>toast("📞 Calling "+esc(S.me.name)+"… (demo — no call is made)"),
 directions:(vid)=>toast("Would open maps to "+esc(VENUES[vid].name)+" (demo)"),
 openApp:()=>{history.replaceState(null,"",location.pathname+location.search);init(true);},
 goFeedback:(pid)=>go("feedback",{id:pid}),
 fbVote:(a)=>{const [pid,id,v]=a.split("|"),fb=S.fb[pid];fb.v[id]=v;if(v==="yes"&&!S.friends[id])fb.add[id]=true;if(v==="no")fb.add[id]=false;render();},
 fbAdd:(a)=>{const [pid,id]=a.split("|"),fb=S.fb[pid];fb.add[id]=!fb.add[id];render();},
 fbDone:(pid)=>{const fb=S.fb[pid]||{v:{},add:{}};const adds=Object.keys(fb.add).filter(k=>fb.add[k]&&!S.friends[k]);
  if(!S.done[pid]){S.done[pid]=true;chatMsgs("plan:"+pid).push({sys:"Meet-up finished · this chat has closed",k:""});}
  adds.forEach((id,i)=>befriend(id,1600+i*2400));
  go("chats",{},"tab");
  setTimeout(()=>toast(adds.length?"Thanks! Friend request"+(adds.length>1?"s":"")+" sent to "+adds.map(a=>per(a).name).join(" & "):"Thanks — your feedback is private"),350);},
 demoMenu:()=>openSheet(`<div class="row between"><div class="h2">Prototype demo</div><span class="tag sun">Example data</span></div>
  <p class="muted small" style="margin:4px 0 8px">A clickable prototype of ADDFRND. Everyone here is fictional; venues are real local places. Nothing is sent anywhere.</p>
  ${JUMPS.map(j=>`<div class="opt" data-act="jump" data-arg="${j[0]}"><div class="oi">${ic(j[2],17)}</div><span class="grow">${j[1]}</span>${ic("chevron-right",16,2,"color:var(--mist)")}</div>`).join("")}
  <div class="opt" data-act="resetAll" style="color:var(--coral-d)"><div class="oi" style="background:var(--coral-l)">${ic("rotate-ccw",17)}</div>Reset prototype</div>`),
 resetAll:()=>{localStorage.removeItem(LS);S=seed();closeSheet(true);go("welcome",{},"reset");toast("Prototype reset");},
 jump:(k)=>{closeSheet(true);JUMP[k]();}
});
const JUMPS=[["onboard","1 · Onboarding: welcome → verify → profile","user"],["discover","2 · Discover nearby (list & map)","compass"],["plan","2 · Join “Lunch at Porth Eirias”","utensils"],["person","3 · Jess's profile → Add friend","user-plus"],["create","4 · Create a plan","plus"],["chat","5 · Group chat","message-circle"],["safety","6 · Safety Card: share","shield-check"],["mum","6 · What Mum sees (live)","eye"],["missed","6 · Missed check-in alert","bell"],["feedback","7 · After the meet-up: feedback","thumbs-up"]];
const later=f=>setTimeout(f,260);
const JUMP={
 onboard:()=>{S.onboarded=false;S.verify.id=false;S.me.band=null;go("welcome",{},"reset");},
 discover:()=>{ensureOnboarded();S.view="list";go("discover",{},"reset");},
 plan:()=>{ensureOnboarded();unjoin("p1");go("discover",{},"reset");later(()=>go("planDetail",{id:"p1"}));},
 person:()=>{ensureOnboarded();delete S.friends.jess;delete S.chats["dm:jess"];S.blocked=S.blocked.filter(x=>x!=="jess");go("discover",{},"reset");later(()=>go("person",{id:"jess"}));},
 create:()=>{ensureOnboarded();go("plans",{},"reset");later(()=>ACT.create());},
 chat:()=>{ensureOnboarded();S.blocked=S.blocked.filter(x=>x!=="priya"&&x!=="jess");joinPlan(plan("p1"));delete S.done.p1;go("chats",{},"reset");later(()=>go("chat",{id:"plan:p1"}));},
 safety:()=>{ensureOnboarded();joinPlan(plan("p1"));go("plans",{},"reset");later(()=>go("safety",{id:"p1"}));},
 mum:()=>{ensureOnboarded();joinPlan(plan("p1"));safety("p1").missed=false;markShared("p1");go("plans",{},"reset");later(()=>go("mum",{id:"p1"}));},
 missed:()=>{ensureOnboarded();joinPlan(plan("p1"));const s=safety("p1");markShared("p1");s.here=s.here||"12:27";s.allgood=null;s.missed=nowTime();go("plans",{},"reset");later(()=>go("mum",{id:"p1"}));},
 feedback:()=>{ensureOnboarded();joinPlan(plan("p1"));delete S.fb.p1;delete S.done.p1;["priya","jess"].forEach(k=>{if(S.friends[k]==="requested")delete S.friends[k];});go("plans",{},"reset");later(()=>go("feedback",{id:"p1"}));}
};

/* ---------- events & boot ---------- */
document.addEventListener("click",e=>{
 const n=e.target.closest("#notif");if(n){n.classList.remove("show");if(_notifAct){const a=_notifAct;_notifAct=null;a();}return;}
 const el=e.target.closest("[data-act]");if(!el||!el.dataset.act)return;
 const f=ACT[el.dataset.act];if(f){e.preventDefault();f(el.dataset.arg,el,e);}
});
document.addEventListener("input",e=>{
 const b=e.target.dataset&&e.target.dataset.bind;if(!b)return;
 const [o,k]=b.split(".");const tgt=o==="me"?S.me:S.draft;if(!tgt)return;
 tgt[k]=e.target.dataset.num?+e.target.value:e.target.value;
 if(o==="draft"&&k==="title")S.draft.titleEdited=true;
 save();
});
document.addEventListener("change",e=>{const b=e.target.dataset&&e.target.dataset.bind;if(!b)return;const [o,k]=b.split(".");if(o==="draft"&&S.draft){S.draft[k]=e.target.dataset.num?+e.target.value:e.target.value;save();}});
document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.id==="chatInput"){e.preventDefault();ACT.send(cur().params.id);} });
let _lp;
document.addEventListener("pointerdown",e=>{ if(e.target.closest("img[alt=ADDFRND]"))_lp=setTimeout(()=>ACT.demoMenu(),650); });
["pointerup","pointercancel"].forEach(t=>document.addEventListener(t,()=>clearTimeout(_lp)));
function layout(){
 const framed=window.innerWidth>=600&&window.innerHeight>=560;
 document.body.classList.toggle("framed",framed);
 const d=$("#device");
 if(framed){const s=Math.min(1,(window.innerHeight-48)/868,(window.innerWidth-40)/416);d.style.transform=s<1?"scale("+s+")":"";}
 else d.style.transform="";
 const c=cur(); if(c&&c.name==="discover"&&S.view==="map")positionMap(c.el);
}
window.addEventListener("resize",layout);
window.addEventListener("hashchange",()=>{ if(location.hash==="#card")init(); else if(location.hash==="#demo")ACT.demoMenu(); });
function init(fromLink){
 $("#viewport").innerHTML="";stack.length=0;
 if(!fromLink&&location.hash==="#card"){ if(!S.onboarded)ensureOnboarded(); if(!joined(S.safetyPlan))joinPlan(plan(S.safetyPlan)); markShared(S.safetyPlan); go("mum",{id:S.safetyPlan,standalone:true},"reset"); return; }
 go(S.onboarded?"discover":"welcome",{},"reset");
 if(location.hash==="#demo")setTimeout(()=>ACT.demoMenu(),300);
}
function boot(){
 load();
 $(".fakestatus").innerHTML=statusIcons();
 $("#tabbar").innerHTML=[["discover","compass","Discover"],["plans","calendar","Plans"],["create","plus",""],["chats","message-circle","Chats"],["friends","users","Friends"]].map(t=>t[0]==="create"?`<button class="t" data-act="create" aria-label="Create plan"><span class="plus">${svgIcon("plus",26,2.6)}</span></button>`:`<button class="t" data-tab="${t[0]}" data-act="tab" data-arg="${t[0]}">${svgIcon(t[1],24)}<span>${t[2]}</span>${t[0]==="chats"?'<span class="badge cbadge" style="display:none">0</span>':""}</button>`).join("");
 $("#side-jumps").innerHTML=JUMPS.map(j=>`<div class="jl" data-act="jump" data-arg="${j[0]}">${ic(j[2],15)}${j[1]}</div>`).join("")+`<div class="jl" data-act="resetAll" style="color:var(--coral-d)">${ic("rotate-ccw",15)}Reset prototype</div>`;
 layout(); init();
}
document.addEventListener("DOMContentLoaded",boot);
