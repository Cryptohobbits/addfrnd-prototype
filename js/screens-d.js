/* Screens: Safety Card, trusted-contact view, feedback */
const scPeople=p=>["me",...others(p)];
function demoControls(pid){
 return `<div class="demo" style="margin-top:16px"><div class="dt">${ic("play",12)}DEMO CONTROLS · simulate the day</div><div class="dbs">
 <div class="db" data-act="simHere" data-arg="${pid}">${ic("map-pin",14,2,"color:var(--mint)")}“I'm here”</div>
 <div class="db" data-act="simGood" data-arg="${pid}">${ic("house",14,2,"color:var(--mint)")}“All good”</div>
 <div class="db" data-act="simMissed" data-arg="${pid}">${ic("bell",14,2,"color:var(--amber)")}Missed check-in</div>
 <div class="db" data-act="simReset" data-arg="${pid}">${ic("rotate-ccw",14)}Reset card</div>
 <div class="db" style="grid-column:1/-1" data-act="goFeedback" data-arg="${pid}">${ic("thumbs-up",14,2,"color:var(--coral)")}After the meet-up → “Would you meet again?”</div></div></div>`;
}
SCREENS.safety={render(pr){
 const p=plan(pr.id),v=venue(p),s=safety(p.id);S.safetyPlan=p.id;
 const status=s.missed?`<span class="tag amber">${ic("triangle-alert",11)}Check-in missed</span>`:s.allgood?`<span class="tag mint">${ic("house",11)}All good ${s.allgood}</span>`:s.here?`<span class="tag mint">${ic("circle-check",11)}Checked in ${s.here}</span>`:s.shared?`<span class="tag navy">Shared ${s.shared}</span>`:`<span class="tag navy">Not shared yet</span>`;
 return `<div class="topbar">${backBtn()}<div class="h3">Safety Card</div><button class="iconbtn" data-act="safetyInfo" aria-label="How it works">${svgIcon("info",19)}</button></div>
 <div class="scr-body"><div class="pad">
 <div class="sc">
  <div class="top"><div class="sh">${ic("shield-check",20)}</div><div class="grow"><div class="tiny" style="opacity:.7;font-weight:700;letter-spacing:.6px">ADDFRND SAFETY CARD</div><div class="h3" style="font-size:16.5px">${esc(S.me.name)}'s ${ACTS[p.act].label.toLowerCase()} plan</div></div><span class="tag" style="background:rgba(47,174,126,.2);color:#7FE0B7"><span class="livedot"></span>LIVE</span></div>
  <div class="rowi"><div class="k">Who</div><div class="people">${scPeople(p).map(a=>`<div>${av(avk(a),38)}<br>${a==="me"?esc(S.me.name):per(a).name}</div>`).join("")}</div><div class="tiny muted" style="margin-left:auto;align-self:center;text-align:right;line-height:1.35"><span style="color:#1C7E59;font-weight:700">All ID-verified</span><br>${p.host==="me"?"You're hosting":nm(p.host)+" hosting"}</div></div>
  <div class="divider" style="margin:0 16px"></div>
  <div class="rowi"><div class="k">Where</div><div class="grow"><b>${esc(v.name)}</b><div class="tiny muted">${esc(v.sub)}</div><div class="mapbox">${miniMap(v)}</div></div></div>
  <div class="divider" style="margin:0 16px"></div>
  <div class="rowi"><div class="k">When</div><div class="grow"><b>${p.day} · ${p.time} – ${addMins(p.time,p.dur)}</b></div></div>
  <div class="rowi" style="padding-top:0"><div class="k">Home</div><div class="grow row between"><b>Expected home by ${homeBy(p)}</b><span class="small" style="color:var(--coral);font-weight:700" data-act="editHome" data-arg="${p.id}">Edit</span></div></div>
  <div style="background:#F7F8FB;padding:9px 16px;display:flex;gap:10px;font-size:11.5px;font-weight:600;color:var(--slate);flex-wrap:wrap;align-items:center"><span class="row gap4">${ic("map-pin",13,2,"color:var(--mint)")}“I'm here” by ${addMins(p.time,15)}</span><span class="row gap4">${ic("house",13,2,"color:var(--mint)")}“All good” by ${homeBy(p)}</span><span style="margin-left:auto">${status}</span></div>
 </div>
 <div class="card row between" style="margin-top:14px;padding:10px 12px;box-shadow:none;border:1.5px solid var(--line)"><div class="row gap10" data-act="pickContact">${av("mum",36)}<div><b style="font-size:14px">Trusted contact: ${esc(S.contact.name)} ${ic("chevron-down",13)}</b><div class="tiny muted">${S.contact.alert?"Alert them if I miss a check-in":"No alert if I miss a check-in"}</div></div></div>${toggle(S.contact.alert,"toggleAlert")}</div>
 <div class="lbl">Share in one tap</div>
 <div class="share">
  <div class="sbx" style="background:#25D366;color:#fff" data-act="share" data-arg="wa">${ic("message-circle",22)}WhatsApp</div>
  <div class="sbx" style="background:var(--navy);color:#fff" data-act="share" data-arg="text">${ic("message-square",22)}Text</div>
  <div class="sbx" style="background:#fff;border:1.5px solid var(--line)" data-act="share" data-arg="copy">${ic("link",22)}Copy link</div></div>
 <div class="tiny muted row gap6" style="justify-content:center;margin-top:10px">${ic("lock",12)}No app needed · first names only · expires 24h after</div>
 <button class="btn ghost md" style="margin-top:14px" data-act="openMum" data-arg="${p.id}">Preview what ${esc(S.contact.name)} sees ${ic("chevron-right",18)}</button>
 ${demoControls(p.id)}
 <div style="height:20px"></div></div></div>`;}};

SCREENS.mum={cls:"white",render(pr){
 const p=plan(pr.id),v=venue(p),s=safety(p.id),n=esc(S.me.name),cn=esc(S.contact.name);
 const url=`<div class="urlbar${pr.standalone?"":" grow"}" style="${pr.standalone?"":"margin:0"}">${ic("lock",13)}addfrnd.app/card/K7Q-4MX</div>`;
 const head=pr.standalone?url:`<div class="row gap8" style="padding:0 12px 6px;flex:none"><button class="iconbtn" style="width:36px;height:36px" data-act="back" aria-label="Back to app">${svgIcon("chevron-left",20)}</button>${url}</div>`;
 let body;
 if(s.missed){
  body=`<div class="card" style="padding:12px 14px"><div class="row gap8"><div style="width:28px;height:28px;border-radius:8px;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center">${ic("message-square",15)}</div><b class="small">Text message · ADDFRND</b><span class="tiny muted" style="margin-left:auto">${s.missed}</span></div><div class="small" style="margin-top:7px;line-height:1.45">${n} hasn't sent her <b>“All good”</b> check-in (due ${homeBy(p)}). Last update: <b>${s.here?"I'm here at "+esc(v.name)+", "+s.here:"plan shared"}</b>.</div></div>
  <div class="bigstatus" style="background:var(--amber);margin-top:12px"><div class="bi">${ic("bell",22,2.4)}</div><div><div class="h2" style="font-size:19px">Check-in missed</div><div class="small" style="opacity:.95">“All good” was due at ${homeBy(p)}</div></div></div>
  <div class="card" style="margin-top:10px">
   <div class="step"><div class="num">1</div><div class="grow small">We've nudged ${n} in the app</div><span class="tag mint">${ic("check",11,3)}Sent</span></div><div class="divider" style="margin:0 14px"></div>
   <div class="step"><div class="num">2</div><div class="grow small">Most missed check-ins are a flat battery or a lost phone — try calling ${n}</div></div><div class="divider" style="margin:0 14px"></div>
   <div class="step"><div class="num">3</div><div class="grow small">Worried about her immediate safety? <b>Call 999</b></div></div></div>
  <div class="row gap8" style="margin-top:12px"><button class="btn navy md grow" data-act="callDemo">${ic("phone",17)}Call ${n}</button><button class="btn ghost md grow" data-act="resolveMissed" data-arg="${p.id}">${ic("circle-check",17,2,"color:var(--mint)")}She's OK</button></div>`;
 }else{
  const st=s.allgood?{bg:"var(--mint)",i:"house",t:n+" is home — all good",s:"Checked in “All good” · "+s.allgood}:s.here?{bg:"var(--mint)",i:"check",t:n+" is there",s:"Checked in at "+esc(v.name)+" · "+s.here}:{bg:"var(--navy)",i:"clock",t:"Plan shared with you",s:"Waiting for “I'm here” (by "+addMins(p.time,15)+")"};
  const tl=[[true,"Plan shared",s.shared||"—"],[!!s.here,"“I'm here” · "+esc(v.name),s.here||"by "+addMins(p.time,15)],[!!s.allgood,"“All good” · home safe",s.allgood||"by "+homeBy(p)]];
  body=`<div class="bigstatus" style="background:${st.bg}"><div class="bi">${ic(st.i,26,3)}</div><div><div class="h2" style="font-size:19px">${st.t}</div><div class="small" style="opacity:.92">${st.s}</div></div></div>
  <div class="card" style="margin-top:10px;padding:14px 14px 2px">${tl.map(x=>`<div class="tli"><div class="d" style="${x[0]?"background:var(--mint);color:#fff":"background:#fff;border:2px dashed #B7C2BC"}">${x[0]?ic("check",13,3):""}</div><div class="grow row between"><span class="small"><b>${x[1]}</b></span><span class="tiny muted">${x[2]}</span></div></div>`).join("")}</div>
  <div class="sc" style="margin-top:10px;box-shadow:0 1px 2px rgba(30,42,74,.05),0 4px 14px rgba(30,42,74,.06)">
   <div class="rowi" style="padding-top:12px"><div class="k">Who</div><div class="people">${scPeople(p).map(a=>`<div>${av(avk(a),34)}<br>${a==="me"?n:per(a).name}</div>`).join("")}</div><div class="tiny" style="margin-left:auto;align-self:center;color:#1C7E59;font-weight:700">✓ Verified</div></div>
   <div class="divider" style="margin:0 16px"></div>
   <div class="rowi"><div class="k">Where</div><div class="grow"><b style="font-size:13.5px">${esc(v.name)}, ${esc(v.sub)}</b><div class="mapbox" style="height:64px">${miniMap(v)}</div></div></div>
   <div class="rowi" style="padding-top:2px;padding-bottom:12px"><div class="k">When</div><div class="grow small"><b>${p.day}, ${p.time} – ${addMins(p.time,p.dur)}</b><div class="muted tiny">Expected home by ${homeBy(p)}</div></div></div></div>
  <div class="row gap8" style="margin-top:12px"><button class="btn navy md grow" data-act="callDemo">${ic("phone",17)}Call ${n}</button><button class="btn ghost md grow" data-act="directions" data-arg="${p.venue}">${ic("navigation",17)}Directions</button></div>
  <div class="tiny muted center" style="margin-top:9px">If ${n} misses a check-in, we'll text you straight away.</div>
  <div class="note" style="margin-top:10px">${ic("eye-off",16)}<span class="tiny" style="line-height:1.4">You see the plan and check-ins only — never ${n}'s chats or live location. Link expires 24h after the plan.</span></div>`;
 }
 return `${head}<div class="scr-body" style="background:var(--cream)"><div style="padding:12px 16px 0">
  <div class="row between" style="margin-bottom:10px"><img src="assets/addfrnd-logo.svg?v=${VERSION}" height="24" alt="ADDFRND"><span class="tag navy">Shared with ${cn}</span></div>
  ${body}${demoControls(p.id)}
  ${pr.standalone?`<button class="btn ghost md" style="margin-top:12px" data-act="openApp">Open the ADDFRND prototype ${ic("arrow-right",17)}</button>`:""}
  <div style="height:22px"></div></div></div>`;}};

SCREENS.feedback={render(pr){
 const p=plan(pr.id),fb=S.fb[p.id]=S.fb[p.id]||{v:{},add:{}},ppl=others(p);
 const opts=[["yes","thumbs-up","Yes!","var(--mint-l)","var(--mint)","#1C7E59"],["maybe","more-horizontal","Maybe","var(--sun-l)","#F0C24A","#8A6200"],["no","thumbs-down","Not for me","#F1EDE8","#C9BFB2","var(--slate)"]];
 return `<div class="topbar"><div style="width:40px"></div><div class="small muted b">${p.day} · ${esc(venue(p).name)}</div><button class="iconbtn" data-act="back" aria-label="Close">${svgIcon("x",20)}</button></div>
 <div class="scr-body"><div class="pad">
 <div class="center"><div style="width:54px;height:54px;border-radius:19px;background:var(--mint-l);color:var(--mint);display:inline-flex;align-items:center;justify-content:center">${ic("circle-check",30)}</div>
 <div class="h1" style="margin-top:10px;font-size:25px">You're home — all good!</div><p class="muted" style="margin-top:6px">${esc(S.contact.name)}'s been told. How was ${ACTS[p.act].label.toLowerCase()}?</p></div>
 <div class="lbl">Would you meet again?</div>
 ${ppl.length?ppl.map(id=>{const v=fb.v[id],fr=S.friends[id]==="friends";return `<div class="card" style="padding:14px;margin-bottom:10px"><div class="row gap10">${av(id,44)}<div class="grow"><b style="font-size:15px">${per(id).name}</b><div class="tiny muted">${id===p.host?"Host · ":""}${shared(id).length} shared interests</div></div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-top:11px">${opts.map(o=>`<div data-act="fbVote" data-arg="${p.id}|${id}|${o[0]}" style="border:1.5px solid ${v===o[0]?o[4]:"var(--line)"};background:${v===o[0]?o[3]:"#fff"};color:${v===o[0]?o[5]:"inherit"};border-radius:13px;padding:8px 0;text-align:center;font-weight:700;font-size:13px;display:flex;flex-direction:column;align-items:center;gap:3px">${ic(o[1],17)}${o[2]}</div>`).join("")}</div>
  ${fr?`<div class="row gap6 small b" style="margin-top:10px;color:#1C7E59">${ic("user-check",15)}Already friends</div>`:S.friends[id]==="requested"?`<div class="row gap6 small b" style="margin-top:10px;color:var(--slate)">${ic("clock",15)}Friend request sent</div>`:v==="no"?`<div class="row gap6 small b" style="margin-top:10px;color:var(--coral-d)" data-act="reportPerson" data-arg="${id}">${ic("flag",14)}Something not right? Report privately</div>`:`<div class="row between" style="margin-top:10px;padding:9px 11px;border-radius:12px;background:${fb.add[id]?"var(--coral-xl)":"#F6F3EF"}"><span class="small b" style="color:${fb.add[id]?"var(--coral-d)":"var(--slate)"}">Add ${per(id).name} as a friend</span>${toggle(fb.add[id],"fbAdd",p.id+"|"+id)}</div>`}</div>`;}).join(""):`<div class="empty">Nobody else joined this one.</div>`}
 <div class="row gap8 tiny muted" style="margin-top:4px;line-height:1.4">${ic("lock",14)}<span>Private — only ADDFRND sees this. You can message 1-to-1 once you've <b>both</b> added each other.</span></div>
 <div style="height:16px"></div></div></div>
 <div class="scr-foot"><button class="btn primary" data-act="fbDone" data-arg="${p.id}">Done</button></div>`;}};
