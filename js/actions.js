/* Actions */
function ensureOnboarded(){ if(!S.me.band||isTeen()){ if(isTeen())toast("Demo switched you to the 18–21 band"); S.me.band="18–21"; } S.verify.id=true; S.onboarded=true; }
function joinPlan(p){ if(!p.att.includes("me"))p.att.push("me"); S.join[p.id]="joined"; seedPlanChat(p); }
function unjoin(pid){const p=plan(pid);p.att=p.att.filter(a=>a!=="me");delete S.join[pid];delete S.chats["plan:"+pid];delete S.done[pid];delete S.safety[pid];delete S.fb[pid];}
function befriend(id,delay){
 S.friends[id]="requested";save();
 setTimeout(()=>{ if(S.friends[id]!=="requested")return; S.friends[id]="friends";
  if(!chatMsgs("dm:"+id).length)S.chats["dm:"+id]=[{sys:"You and "+per(id).name+" added each other · chat unlocked",k:"ok"},{from:id,text:"Hey "+S.me.name+"! Thanks for adding me 😊"}];
  notify(per(id).name+" added you back!","You're now friends — 1-to-1 chat unlocked.",()=>go("chat",{id:"dm:"+id}));
  const c=cur(); if(c&&c.name!=="chat")refresh(); save();
 },delay||2200);
}
function markShared(pid){const s=safety(pid);if(!s.shared)s.shared=nowTime();}
async function copyText(t){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t);return true;}}catch(e){}return false;}
const cardURL=()=>location.origin+location.pathname+"#card";
function pushHostRequest(pid){
 setTimeout(()=>{const p=plan(pid);if(!p)return;const cand=peopleList().filter(id=>!p.att.includes(id)&&!(p.req||[]).includes(id));const who=cand.find(id=>per(id).upFor.includes(p.act))||cand[0];if(!who)return;
  p.req=(p.req||[]).concat(who);save();
  notify(per(who).name+" wants to join","“"+esc(p.title)+"” · tap to review",()=>go("planDetail",{id:pid}));
  if(onScreen("planDetail",x=>x.id===pid)||onScreen("plans"))refresh();
 },6000);
}
const sheetOpt=(act,arg,icon,label,extra)=>`<div class="opt" data-act="${act}"${arg!=null?` data-arg="${arg}"`:""}${extra||""}><div class="oi">${ic(icon,17)}</div>${label}</div>`;
const ACT={
 back:()=>goBack(),
 closeSheet:()=>closeSheet(),
 tab:(t)=>go(t,{},"tab"),
 startOnboarding:()=>go("verify"),
 demoLogin:()=>{ensureOnboarded();go("discover",{},"reset");toast("Logged in as "+esc(S.me.name)+" (demo)");},
 startId:()=>openSheet(`<div class="center"><div style="width:64px;height:64px;border-radius:20px;background:var(--coral-l);color:var(--coral);display:inline-flex;align-items:center;justify-content:center">${ic("scan-face",32)}</div>
  <div class="h2" style="margin-top:10px">Photo ID + selfie</div><p class="muted small" style="margin:6px 10px 0">We check your photo ID matches a quick selfie and confirm your age band. The ID scan is deleted straight after.</p>
  <div id="idsteps" class="col gap8" style="margin:16px 0;text-align:left"></div>
  <button class="btn primary" data-act="runId" id="idbtn">Start check (demo)</button><div class="tiny muted" style="margin-top:8px">Prototype — no camera or real ID is used.</div></div>`),
 runId:(a,el)=>{
  el.classList.add("disabled");el.dataset.act="";const box=$("#idsteps");
  const steps=["Scanning photo ID…","Matching your selfie…","Checking age band…"];let i=0;
  const tick=()=>{ if(i>0)box.lastElementChild.innerHTML=ic("circle-check",18,2,"color:var(--mint)")+"<span>"+steps[i-1].replace("…","")+" ✓</span>";
   if(i<steps.length){box.insertAdjacentHTML("beforeend",`<div class="row gap8 small b"><span class="spin">${svgIcon("loader-circle",18)}</span><span>${steps[i]}</span></div>`);i++;setTimeout(tick,650);}
   else{el.innerHTML=ic("check",20,3)+"Verified — ID scan deleted";el.classList.remove("disabled");el.classList.replace("primary","mint");S.verify.id=true;save();setTimeout(()=>{closeSheet();refresh();toast("You're verified ✓");},800);} };
  tick();
 },
 pickBand:(b)=>{S.me.band=b;S.filters.bands=null;render();if(b==="16–17")toast("16–17s only see and are seen by other 16–17s");},
 verifyNext:()=>{ if(!S.verify.id)return toast("Please verify your ID first — tap “Photo ID + quick selfie”"); if(!S.me.band)return toast("Pick your age band"); go("profileSetup",{}); },
 cycleAvatar:()=>{const i=ME_AVATARS.indexOf(S.me.avatar);S.me.avatar=ME_AVATARS[(i+1)%ME_AVATARS.length];render();},
 toggleUp:(a)=>{const u=S.me.upFor;u.includes(a)?u.splice(u.indexOf(a),1):u.push(a);render();},
 toggleInt:(a)=>{const u=S.me.interests;u.includes(a)?u.splice(u.indexOf(a),1):u.push(a);render();},
 setArea:(a)=>{S.me.area=a;S.mapSel=null;closeSheet();render();},
 setRadius:(r)=>{S.filters.radius=+r;S.me.radius=+r;render();},
 finishProfile:()=>{ if(!S.me.name.trim())return toast("Add your first name"); if(!S.me.upFor.length)return toast("Pick at least one thing you're up for");
  const edit=cur().params.edit; S.onboarded=true; if(edit){goBack();toast("Profile saved");} else {go("discover",{},"reset");setTimeout(()=>toast("Welcome, "+esc(S.me.name)+"! Here's who's nearby 👋"),300);} },
 goMe:()=>go("person",{id:"me"}),
 editProfile:()=>go("profileSetup",{edit:true}),
 setView:(v)=>{S.view=v;S.mapSel=null;render();},
 toggleAct:(a)=>{const f=S.filters.acts;f.includes(a)?f.splice(f.indexOf(a),1):f.push(a);render();},
 clearFilters:()=>{S.filters={acts:[],bands:null,radius:5};render();},
 openArea:()=>openSheet(`<div class="h2">My area</div><p class="muted small" style="margin:4px 0 12px">Others only ever see “around ${S.me.area}”.</p><div class="chips">${Object.keys(AREAS).map(a=>`<span class="chip${S.me.area===a?" on":""}" data-act="setArea" data-arg="${a}">${ic("map-pin",13)}${a}</span>`).join("")}</div><div class="lbl">Radius</div><div class="seg">${[1,3,5,10].map(r=>`<div class="${S.filters.radius===r?"on":""}" data-act="sheetRadius" data-arg="${r}">${r} mi</div>`).join("")}</div><button class="btn primary md" style="margin-top:16px" data-act="closeSheet">Done</button>`),
 sheetRadius:(r)=>{S.filters.radius=+r;render();ACT.openArea();},
 openFilters:()=>{
  const f=S.filters,vb=visibleBands();
  openSheet(`<div class="row between"><div class="h2">Filters</div><span class="small b" style="color:var(--coral)" data-act="resetFilters">Reset</span></div>
  <div class="lbl">Activity</div><div class="chips">${Object.keys(ACTS).map(a=>`<span class="chip sm${f.acts.includes(a)?" on":""}" data-act="fAct" data-arg="${a}">${ic(ACTS[a].icon,12)}${ACTS[a].label}</span>`).join("")}</div>
  <div class="lbl">Age band</div><div class="chips">${BANDS.map(b=>{const locked=isTeen()?b!=="16–17":b==="16–17";return `<span class="chip sm${vb.includes(b)?" on":""}${locked?" locked":""}" data-act="${locked?"bandLocked":"fBand"}" data-arg="${b}">${locked?ic("lock",11):""}${b}</span>`;}).join("")}</div>
  <div class="tiny muted" style="margin-top:7px">${isTeen()?"You're in the 16–17 band, so you only see other 16–17s.":"16–17s are in their own protected band and never shown to adults."}</div>
  <div class="lbl">Distance from ${S.me.area}</div><div class="seg">${[1,3,5,10].map(r=>`<div class="${f.radius===r?"on":""}" data-act="fRadius" data-arg="${r}">${r} mi</div>`).join("")}</div>
  <button class="btn primary md" style="margin-top:18px" data-act="closeSheet" id="fApply">Show ${plansList().length} plans · ${peopleList().length} people</button>`);
 },
 fAct:(a)=>{ACT.toggleAct(a);ACT.openFilters();},
 fBand:(b)=>{let c=visibleBands().slice();c.includes(b)?c.splice(c.indexOf(b),1):c.push(b);if(!c.length)c=[b];S.filters.bands=c;render();ACT.openFilters();},
 bandLocked:()=>toast(isTeen()?"16–17s only see their own band":"16–17s are protected — adults can't see them"),
 fRadius:(r)=>{S.filters.radius=+r;render();ACT.openFilters();},
 resetFilters:()=>{S.filters={acts:[],bands:null,radius:5};render();ACT.openFilters();},
 mapPlan:(id)=>{S.mapSel={type:"plan",id};render();},
 mapArea:(n)=>{S.mapSel={type:"area",name:n};render();},
 mapClear:(a,el,e)=>{ if(el.dataset.self&&e.target.closest("[data-act]")!==el)return; if(S.mapSel){S.mapSel=null;render();} },
 openPlan:(id)=>go("planDetail",{id}),
 openPerson:(id)=>go("person",{id}),
 requestJoin:(id)=>{
  const p=plan(id);
  if(!p.approval){joinPlan(p);render();toast("You're in! 🎉");setTimeout(()=>go("chat",{id:"plan:"+id}),600);return;}
  S.join[id]="requested";render();toast("Request sent to "+per(p.host).name);
  setTimeout(()=>{ if(S.join[id]!=="requested")return; joinPlan(p); save();
   const onIt=onScreen("planDetail",x=>x.id===id);
   notify(per(p.host).name+" approved you 🎉","You're in: "+esc(p.title)+". Group chat is open.",()=>go("chat",{id:"plan:"+id}));
   if(cur().name!=="chat")refresh();
   if(onIt)setTimeout(()=>{ if(onScreen("planDetail",x=>x.id===id))go("chat",{id:"plan:"+id}); },1200);
  },2600);
 },
 approveReq:(a)=>{const [pid,who]=a.split("|"),p=plan(pid);p.req=(p.req||[]).filter(x=>x!==who);if(!p.att.includes(who))p.att.push(who);
  chatMsgs("plan:"+pid).push({sys:per(who).name+" joined the plan",k:"ok"},{from:who,text:"Thanks for having me! 😊"});render();toast(per(who).name+" is in — added to the group chat");},
 declineReq:(a)=>{const [pid,who]=a.split("|"),p=plan(pid);p.req=(p.req||[]).filter(x=>x!==who);render();toast("Request declined — they won't be told why");},
 sharePlan:async(id)=>{const p=plan(id),text="ADDFRND plan: "+p.title+" · "+p.day+" "+p.time,url=location.origin+location.pathname;
  if(navigator.share){try{await navigator.share({title:"ADDFRND",text,url});return;}catch(e){if(e&&e.name==="AbortError")return;}}
  toast((await copyText(text+" "+url))?"Plan link copied ✓":"Sharing isn't available here (demo)");},
 planMenu:(id)=>{const p=plan(id);openSheet(`<div class="h2" style="margin-bottom:6px">This plan</div>
  ${sheetOpt("reportThing","plan","flag","Report this plan")}
  ${p.host!=="me"?sheetOpt("blockPerson",p.host,"ban","Block "+per(p.host).name+" (host)"):""}
  ${joined(id)&&p.host!=="me"?sheetOpt("leavePlan",id,"log-out","Leave plan"):""}
  ${sheetOpt("closeSheet",null,"x","Cancel")}`);},
 leavePlan:(id)=>{unjoin(id);closeSheet();render();toast("You've left the plan");},
 addFriend:(id)=>{befriend(id);refresh();toast("Request sent to "+per(id).name+" · chat unlocks when they add you back");},
 lockedMsg:(id)=>openSheet(`<div class="center"><div style="width:60px;height:60px;border-radius:20px;background:#F2F5FB;display:inline-flex;align-items:center;justify-content:center">${ic("lock",28)}</div>
  <div class="h2" style="margin-top:10px">Messaging is locked</div><p class="muted" style="margin:6px 8px 16px">On ADDFRND nobody can message you out of the blue. You can chat 1-to-1 with ${per(id).name} once you've <b>both</b> tapped “Add friend” — or meet first in a group plan.</p>
  ${S.friends[id]==="requested"?`<button class="btn ghost md" data-act="closeSheet">Request sent — waiting for ${per(id).name}</button>`:`<button class="btn primary md" data-act="addFromSheet" data-arg="${id}">${ic("user-plus",18)}Add ${per(id).name}</button>`}</div>`),
 addFromSheet:(id)=>{closeSheet();ACT.addFriend(id);},
 personMenu:(id)=>openSheet(`<div class="h2" style="margin-bottom:6px">${per(id).name}</div>
  ${sheetOpt("reportPerson",id,"flag","Report "+per(id).name)}${sheetOpt("blockPerson",id,"ban","Block "+per(id).name)}
  ${S.friends[id]?sheetOpt("unfriend",id,"user-x","Remove friend"):""}${sheetOpt("closeSheet",null,"x","Cancel")}`),
 unfriend:(id)=>{delete S.friends[id];closeSheet();render();toast("Removed. They won't be notified.");},
};
