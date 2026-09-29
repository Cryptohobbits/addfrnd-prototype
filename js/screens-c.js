/* Screens: create plan, chat */
function newDraft(){return{act:"lunch",venue:"porth",day:"Thu 1 Oct",time:"12:30",dur:60,spots:4,approval:true,safety:true,title:"",titleEdited:false,desc:""};}
function vShort(v){return VENUES[v].name.replace(" café","").replace(" seafront","").replace("Rhos-on-Sea Promenade","Rhos prom");}
function autoTitle(d){const w={lunch:"Lunch",coffee:"Coffee",walk:"Walk",gaming:"Gaming",gym:"Gym session",church:"Church",dogwalk:"Dog walk"}[d.act];return w+" at "+vShort(d.venue);}
SCREENS.create={render(){
 const d=S.draft||(S.draft=newDraft()); if(!d.titleEdited)d.title=autoTitle(d);
 const vs=Object.keys(VENUES).sort((a,b)=>dist(VENUES[a])-dist(VENUES[b]));
 const times=[];for(let h=8;h<=20;h++){times.push(String(h).padStart(2,"0")+":00");times.push(String(h).padStart(2,"0")+":30");}
 return `<div class="topbar"><button class="iconbtn" data-act="back" aria-label="Close">${svgIcon("x",20)}</button><div class="h3">New plan</div><div style="width:40px"></div></div>
 <div class="scr-body"><div class="pad"><div class="lbl" style="margin-top:2px">What are you up for?</div></div>
 <div class="hscroll">${Object.keys(ACTS).map(a=>`<span class="chip sm${d.act===a?" on":""}" data-act="dAct" data-arg="${a}">${ic(ACTS[a].icon,13)}${ACTS[a].label}</span>`).join("")}</div>
 <div class="pad">
 <div class="lbl">Title</div><input class="field" id="dTitle" data-bind="draft.title" value="${esc(d.title)}" maxlength="40">
 <div class="lbl">Where · suggested public venues</div>
 <div class="card" style="overflow:hidden">${vs.map(k=>{const v=VENUES[k];return `<div class="venue${d.venue===k?" on":""}" data-act="dVenue" data-arg="${k}"><div class="radio${d.venue===k?" on":""}"></div><div class="vb" style="background:${v.bg};color:${v.fg}">${ic(v.icon,17)}</div><div class="grow"><b style="font-size:14px">${esc(v.name)}</b><div class="tiny muted">${esc(v.sub)}${v.friendly?' · <span style="color:#8A6200;font-weight:700">ADDFRND friendly</span>':" · "+esc(v.note)}</div></div><span class="tiny muted">${dist(v)} mi</span></div>`;}).join("")}</div>
 <div class="lbl">When</div></div>
 <div class="hscroll">${DAYS.map(x=>`<span class="chip sm${d.day===x?" on":""}" data-act="dDay" data-arg="${x}">${x}</span>`).join("")}</div>
 <div class="pad">
 <div class="row gap8" style="margin-top:10px"><div class="grow"><select class="field" data-bind="draft.time" aria-label="Start time" style="font-size:14px">${times.map(t=>`<option${t===d.time?" selected":""}>${t}</option>`).join("")}</select></div>
 <div class="grow"><select class="field" data-bind="draft.dur" data-num="1" aria-label="Duration" style="font-size:14px">${[30,45,60,90,120].map(m=>`<option value="${m}"${m===d.dur?" selected":""}>${durLabel(m)}</option>`).join("")}</select></div></div>
 <div class="row gap8" style="margin-top:4px;align-items:flex-end"><div class="grow"><div class="lbl">Spots (incl. you)</div><div class="stepper"><span class="sbn" data-act="dSpots" data-arg="-1">–</span><b class="nunito" style="font-size:18px" id="dSpotsN">${d.spots}</b><span class="sbn" data-act="dSpots" data-arg="1">+</span></div></div>
 <div class="grow"><div class="lbl">Who can join</div><div class="field row gap6" style="font-size:14px;padding:12px">${ic("lock",15,2,"color:var(--mist)")}${myBand()} nearby</div></div></div>
 <div class="card row between" style="margin-top:14px;padding:12px 14px;box-shadow:none;border:1.5px solid var(--line)"><div><b style="font-size:14px">I approve each request</b><div class="tiny muted">${d.approval?"Recommended — you choose who joins":"Anyone verified in your band can join instantly"}</div></div>${toggle(d.approval,"dApproval")}</div>
 <div class="row between" style="margin-top:8px;padding:12px 14px;background:#F2F5FB;border-radius:14px"><div class="row gap10">${ic("shield-check",20)}<div><b style="font-size:14px">Make a Safety Card</b><div class="tiny muted">Share with someone you trust after posting</div></div></div>${toggle(d.safety,"dSafety")}</div>
 <div class="lbl">A few words <span class="n">· optional</span></div><textarea class="field" data-bind="draft.desc" rows="2" maxlength="140" placeholder="e.g. Chat about anything — no pressure!" style="font-size:14px;resize:none">${esc(d.desc)}</textarea>
 <div style="height:14px"></div></div></div>
 <div class="scr-foot"><button class="btn primary" data-act="postPlan">Post plan</button></div>`;}};

function chatInfo(cid){
 const i=cid.indexOf(":"),type=cid.slice(0,i),id=cid.slice(i+1);
 if(type==="plan"){const p=plan(id);return{type,id,p,title:p.title,sub:[...others(p).map(nm),"you"].join(", ")+" · "+p.day.split(" ")[0]+" "+p.time,avs:others(p).slice(0,3).map(avk),closed:!!S.done[id]};}
 return{type,id,title:per(id).name,sub:"Friends · around "+per(id).area,avs:[id],closed:false};
}
function msgHTML(m,i,cid){
 if(m.sys)return `<div class="sys ${m.k||""}">${m.k==="ok"?ic("circle-check",13):m.k==="warn"?ic("triangle-alert",13):ic("info",13)}${esc(m.sys)}</div>`;
 if(m.from!=="me"&&S.blocked.includes(m.from))return `<div class="sys">${ic("ban",13)}Message hidden · you blocked this person</div>`;
 const me=m.from==="me",pl=cid.startsWith("plan:")?plan(cid.slice(5)):null;
 const body=m.photo?`<div class="photo${S.revealed[m.photo]?"":" blur"}" data-act="reveal" data-arg="${m.photo}"><div class="img">${PHOTO_SVG}</div><div class="ov">${ic("eye-off",22)}Photo · tap to view</div></div>`:`<div class="bb">${esc(m.text)}</div>`;
 const prev=chatMsgs(cid)[i-1],showName=!me&&pl&&(!prev||prev.from!==m.from);
 return `<div class="m${me?" me":""}">${me?"":av(avk(m.from),28)}<div>${showName?`<div class="n">${per(m.from).name}${pl.host===m.from?" · host":""}</div>`:""}${body}</div></div>`;
}
SCREENS.chat={cls:"white",render(pr){
 const cid=pr.id,c=chatInfo(cid),msgs=chatMsgs(cid),here=c.type==="plan"&&safety(c.id).here;
 const ell='white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
 const banner=(bg,fg,i,t)=>`<div style="background:${bg};padding:8px 14px;font-size:11.5px;color:${fg};display:flex;gap:7px;align-items:center;font-weight:600;flex:none">${ic(i,14)}${t}</div>`;
 return `<div class="topbar" style="border-bottom:1px solid var(--line);padding-bottom:9px">
  <button class="iconbtn" style="border:none" data-act="back" aria-label="Back">${svgIcon("chevron-left",24)}</button>
  ${avs(c.avs,34)}<div class="grow" data-act="${c.type==="dm"?"openPerson":"openPlan"}" data-arg="${c.id}"><div class="h3" style="font-size:15px;${ell}">${esc(c.title)}</div><div class="tiny muted" style="${ell}">${esc(c.sub)}</div></div>
  ${c.type==="plan"?`<button class="iconbtn" style="width:36px;height:36px;border-radius:12px" data-act="openSafety" data-arg="${c.id}" aria-label="Safety Card">${svgIcon("shield-check",18)}</button>`:""}
  <button class="iconbtn" style="width:36px;height:36px;border-radius:12px" data-act="chatMenu" data-arg="${cid}" aria-label="Report or block">${svgIcon("ellipsis-vertical",18)}</button></div>
 ${c.type==="plan"?(c.closed?banner("#F1EDE8","var(--slate)","lock","This chat has closed. Friends you added can still message you 1-to-1."):banner("var(--sun-l)","#7A5A00","clock-3","This chat closes 24h after the meet-up. Add each other to keep chatting.")):banner("var(--mint-l)","#1C7E59","user-check","You're friends — you both added each other.")}
 <div class="scr-body" style="background:var(--cream)"><div class="msgs" id="msgs">${msgs.map((m,i)=>msgHTML(m,i,cid)).join("")}</div>
 <div class="tiny row gap4" style="justify-content:center;color:var(--mist);padding:4px 14px 12px;text-align:center">${ic("shield-check",12)}Photos stay blurred until tapped · harmful messages are auto-flagged</div></div>
 ${c.closed?`<div class="inbar center small muted">Chat closed · <span style="color:var(--coral);font-weight:700" data-act="tab" data-arg="friends">See your friends</span></div>`:`<div class="inbar">
  ${c.type==="plan"?`<div class="quick"><button class="qb" style="background:${here?"var(--mint-l)":"var(--mint)"};color:${here?"#1C7E59":"#fff"}" data-act="checkin" data-arg="${c.id}">${ic(here?"circle-check":"map-pin",14,2.4)}${here?"Checked in "+here:"I'm here"}</button><button class="qb" style="background:#F2F5FB" data-act="quickMsg" data-arg="Running a few mins late, sorry!">${ic("clock",14)}Running late</button><button class="qb" style="background:#F2F5FB" data-act="openSafety" data-arg="${c.id}">${ic("shield-check",14)}Safety Card</button><button class="qb" style="background:#F2F5FB" data-act="chatMenu" data-arg="${cid}">${ic("flag",14)}Report</button></div>`:""}
  <div class="input"><button data-act="sendPhoto" data-arg="${cid}" aria-label="Send photo" style="color:var(--mist)">${svgIcon("image",22)}</button><input id="chatInput" placeholder="${c.type==="plan"?"Message the group…":"Message "+esc(c.title)+"…"}" autocomplete="off" enterkeyhint="send" aria-label="Message"><button class="send" data-act="send" data-arg="${cid}" aria-label="Send">${svgIcon("send",18)}</button></div></div>`}`;},
 mount(el){const b=$(".scr-body",el);b.scrollTop=b.scrollHeight;}};
function scrollChat(){const c=cur();if(c&&c.name==="chat"){const b=$(".scr-body",c.el);b.scrollTo({top:b.scrollHeight,behavior:"smooth"});}}
function appendMsg(cid,m){
 const msgs=chatMsgs(cid);msgs.push(m);save();
 const c=cur();
 if(c&&c.name==="chat"&&c.params.id===cid){const box=$("#msgs",c.el);const t=$(".typing-row",box);if(t)t.remove();box.insertAdjacentHTML("beforeend",msgHTML(m,msgs.length-1,cid));scrollChat();}
}
function showTyping(cid,who){const c=cur();if(c&&c.name==="chat"&&c.params.id===cid){const box=$("#msgs",c.el);if(!$(".typing-row",box)){box.insertAdjacentHTML("beforeend",`<div class="m typing-row">${av(avk(who),28)}<div class="bb" style="padding:0"><div class="typing"><i></i><i></i><i></i></div></div></div>`);scrollChat();}}}
const REPLIES={hi:["Hiya! 👋","Hey! 😊"],late:["No worries, we'll save you a seat!","All good, take your time 🙂"],here:["Just walking in now!","Ooh I'll come find you 👋"],q:["Good question! Let's chat about it there 😄","Hmm, not sure — happy either way!"],photo:["Ooh nice view!","Love that 😍"],def:["Sounds good!","Can't wait 😊","Ha, love that 😂","See you there!","Same here!","Ooh yes 🙌"]};
let _rc=0;
function scheduleReply(cid,text){
 const c=chatInfo(cid);const pool=c.type==="plan"?others(c.p):(S.blocked.includes(c.id)?[]:[c.id]);if(!pool.length||c.closed)return;
 const who=pool[Math.floor(Math.random()*pool.length)];
 const t=(text||"").toLowerCase();const k=t==="photo"?"photo":/\b(hi|hello|hiya|hey)\b/.test(t)?"hi":/late/.test(t)?"late":/here|arriv/.test(t)?"here":/\?/.test(t)?"q":"def";
 const r=REPLIES[k][(_rc++)%REPLIES[k].length];
 setTimeout(()=>showTyping(cid,who),600);
 setTimeout(()=>appendMsg(cid,{from:who,text:r}),1900+Math.random()*600);
}
const PII=/(\+?\d[\d\s-]{8,}\d)|(\S+@\S+\.\S+)|\b(address|snapchat|snap me|insta|where do you live)\b/i;
