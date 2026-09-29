/* Screens: plan detail, person, tabs */
SCREENS.planDetail={cls:"notop",dark:true,render(pr){
 const p=plan(pr.id); if(!p)return `<div class="pad" style="padding-top:80px">${backBtn()}<p style="margin-top:20px">This plan no longer exists.</p></div>`;
 const v=venue(p),A=ACTS[p.act],left=spotsLeft(p),mine=p.host==="me",j=joined(p.id),rq=S.join[p.id]==="requested",hostP=per(p.host);
 let foot;
 if(mine||j) foot=`<button class="btn primary" data-act="openChat" data-arg="plan:${p.id}">${ic("message-circle",20)}Open group chat</button><div class="row gap8" style="margin-top:8px"><button class="btn ghost md" data-act="openSafety" data-arg="${p.id}">${ic("shield-check",18,2,"color:var(--navy)")}Safety Card</button>${mine?"":`<button class="btn ghost md" data-act="goFeedback" data-arg="${p.id}">${ic("thumbs-up",18)}After meet-up</button>`}</div>`;
 else if(rq) foot=`<div class="row gap6 tiny muted" style="justify-content:center;margin-bottom:9px">${ic("clock",13)}${hostP.name} will review your request</div><button class="btn ghost" style="cursor:default"><span class="spin">${svgIcon("loader-circle",20)}</span>Request sent · waiting for ${hostP.name}</button>`;
 else if(left<=0) foot=`<button class="btn ghost disabled">Plan is full</button>`;
 else foot=`<div class="row gap6 tiny muted" style="justify-content:center;margin-bottom:9px">${ic("shield-check",13,2,"color:var(--mint)")}${p.approval?"Host approves requests · group chat opens once you're in":"Instant join · group chat opens straight away"}</div><button class="btn primary" data-act="requestJoin" data-arg="${p.id}">${p.approval?"Request to join":"Join plan"}</button>`;
 const slots=[];for(let i=0;i<Math.max(0,left);i++)slots.push(`<div class="center"><div class="slot">${ic("plus",16)}</div><div class="tiny muted" style="margin-top:4px">Open</div></div>`);
 const reqs=(p.req||[]).filter(r=>!S.blocked.includes(r));
 const hb='style="background:rgba(255,255,255,.22);border:none;color:#fff"';
 return `<div class="scr-body">
 <div class="hero"><svg width="100%" height="100%" viewBox="0 0 390 230" preserveAspectRatio="xMidYMax slice" style="position:absolute;inset:0"><circle cx="302" cy="150" r="30" fill="#FFC94A" opacity=".95"/><path d="M0 170 C60 150 110 190 180 170 C250 150 300 185 390 160 V230 H0Z" fill="rgba(255,255,255,.14)"/><path d="M0 190 C70 175 120 205 200 188 C270 172 320 200 390 182 V230 H0Z" fill="rgba(255,255,255,.14)"/></svg>
  <div style="position:absolute;left:24px;bottom:58px;color:#fff">${ic(A.icon,40,2.2)}</div>
  <div style="position:absolute;top:calc(var(--st) + 4px);left:16px;right:16px;display:flex;justify-content:space-between">
   <button class="iconbtn" ${hb} data-act="back" aria-label="Back">${svgIcon("chevron-left",22)}</button>
   <div class="row gap8"><button class="iconbtn" ${hb} data-act="sharePlan" data-arg="${p.id}" aria-label="Share">${svgIcon("share-2",19)}</button><button class="iconbtn" ${hb} data-act="planMenu" data-arg="${p.id}" aria-label="Report">${svgIcon("flag",19)}</button></div></div></div>
 <div style="background:var(--cream);border-radius:26px 26px 0 0;margin-top:-34px;position:relative;padding:18px 20px 16px">
  <div class="row gap6 wrap"><span class="tag coral">${ic(A.icon,11)}${A.label}</span><span class="tag navy">${p.band} only</span>${v.friendly?`<span class="tag sun">${ic("store",11)}ADDFRND friendly</span>`:""}${mine?`<span class="tag coral">You're hosting</span>`:j?`<span class="tag mint">${ic("check",11,3)}You're going</span>`:""}</div>
  <div class="h1" style="margin-top:9px;font-size:26px">${esc(p.title)}</div>
  ${p.desc?`<p class="muted" style="margin-top:6px;font-size:13.5px">“${esc(p.desc)}”</p>`:""}
  <div class="card" style="margin-top:14px;overflow:hidden">
   <div class="info"><div class="ib">${ic("calendar",18)}</div><div class="grow"><b>${p.day} · ${p.time} – ${addMins(p.time,p.dur)}</b><div class="tiny muted">Reminder the day before · check in on the day</div></div></div>
   <div class="divider" style="margin:0 12px"></div>
   <div class="info"><div class="ib">${ic("map-pin",18)}</div><div class="grow"><b>${esc(v.name)}</b><div class="tiny muted">${esc(v.sub)} · public venue · ${dist(v)} mi</div></div></div>
   ${v.friendly?`<div class="info" style="background:var(--sun-l)"><div class="ib" style="background:#fff;color:#B07A00">${ic("store",18)}</div><div class="grow"><b style="font-size:13px">ADDFRND friendly offer</b><div class="tiny" style="color:#7A5A00">${esc(v.offer)}</div></div></div>`:""}
  </div>
  ${reqs.length&&mine?`<div class="sectitle">Requests to join <span class="badge">${reqs.length}</span></div>${reqs.map(r=>`<div class="card person">${av(r,44)}<div class="grow"><b>${per(r).name}</b> <span class="tag navy">${per(r).band}</span><div class="tiny muted">around ${per(r).area} · ${shared(r).length} shared interests</div></div><button class="btn sm mint" style="box-shadow:none" data-act="approveReq" data-arg="${p.id}|${r}">Approve</button><button class="iconbtn" style="width:36px;height:36px" data-act="declineReq" data-arg="${p.id}|${r}" aria-label="Decline">${ic("x",16)}</button></div>`).join('<div style="height:8px"></div>')}`:""}
  <div class="sectitle">Who's going <span class="a" style="color:var(--coral-d);font-weight:700">${left>0?left+" of "+p.spots+" spots left":"Full"}</span></div>
  <div class="row gap12 wrap" style="align-items:flex-start">
   ${p.att.filter(a=>!S.blocked.includes(a)).map(a=>`<div class="center"${a!=="me"?` data-act="openPerson" data-arg="${a}"`:""}>${av(avk(a),44)}<div class="tiny b" style="margin-top:3px">${a==="me"?"You":per(a).name}</div>${a===p.host?'<div style="color:var(--coral);font-weight:800;font-size:9.5px">HOST</div>':""}</div>`).join("")}${slots.join("")}
  </div>
  ${mine?"":`<div class="row gap6 tiny muted" style="margin-top:10px">${ic("badge-check",13,2,"color:var(--mint)")}All verified · ${hostP.name} has hosted ${hostP.hosted} meet-ups · ${hostP.again} “would meet again”</div>`}
  <div class="note" style="margin-top:14px">${ic("shield-check",18)}<div><b>Safety Card ${j||mine?"ready":"included"}</b><br><span class="muted">${j||mine?"Share this plan with a parent or friend in one tap.":"Once you're in, share the plan with a parent or friend in one tap."}</span></div></div>
 </div></div>
 <div class="scr-foot" style="background:#fff;border-top:1px solid var(--line)">${foot}</div>`;}};

SCREENS.person={render(pr){
 const id=pr.id,p=per(id),f=S.friends[id],sh=shared(id),me=id==="me";
 const plansIn=S.plans.filter(x=>x.att.includes(id)&&canSeePlan(x));
 let actions;
 if(me) actions=`<button class="btn primary md" data-act="editProfile">${ic("pencil",17)}Edit profile</button>`;
 else if(f==="friends") actions=`<button class="btn ghost md" style="cursor:default;color:#1C7E59">${ic("user-check",18)}Friends</button><button class="btn primary md" data-act="openChat" data-arg="dm:${id}">${ic("message-circle",18)}Message</button>`;
 else if(f==="requested") actions=`<button class="btn ghost md" style="cursor:default"><span class="spin">${svgIcon("loader-circle",18)}</span>Waiting for ${p.name}</button><button class="btn ghost md" data-act="lockedMsg" data-arg="${id}" style="color:var(--mist)">${ic("lock",17)}Message</button>`;
 else actions=`<button class="btn primary md" data-act="addFriend" data-arg="${id}">${ic("user-plus",18)}Add friend</button><button class="btn ghost md" data-act="lockedMsg" data-arg="${id}" style="color:var(--mist)">${ic("lock",17)}Message</button>`;
 return `<div class="topbar">${backBtn()}<div class="h3">${me?"My profile":""}</div>${me?'<div style="width:40px"></div>':`<button class="iconbtn" data-act="personMenu" data-arg="${id}" aria-label="More">${svgIcon("ellipsis-vertical",19)}</button>`}</div>
 <div class="scr-body"><div class="pad">
  <div class="center">${av(avk(id),96)}
  <div class="h1" style="margin-top:10px">${esc(p.name)} <span class="tag navy" style="vertical-align:5px">${p.band}</span></div>
  <div class="row gap4 small muted b" style="justify-content:center;margin-top:4px;flex-wrap:wrap">${ic("map-pin",13)}around ${p.area}${me?"":` · ~${personDist(id)} mi`} <span class="row gap4" style="color:#1C7E59;margin-left:4px">${ic("badge-check",14)}Verified</span></div>
  <p class="muted" style="margin-top:8px;font-size:14px">${esc(p.bio)}</p></div>
  <div class="row gap8" style="margin-top:16px">${actions}</div>
  ${!me&&f!=="friends"?`<div class="row gap6 tiny muted" style="justify-content:center;margin-top:9px">${ic("lock",12)}Messaging unlocks when you've both added each other</div>`:""}
  <div class="lbl">Up for</div><div class="chips">${p.upFor.map(a=>`<span class="chip sm${S.me.upFor.includes(a)&&!me?" on":""}">${ic(ACTS[a].icon,12)}${ACTS[a].label}</span>`).join("")}</div>
  <div class="lbl">Interests ${!me&&sh.length?`<span class="n">· ${sh.length} in common</span>`:""}</div><div class="chips">${p.interests.map(i=>`<span class="chip soft sm${sh.includes(i)&&!me?" on":""}">${esc(i)}</span>`).join("")}</div>
  <div class="lbl">Ask me about…</div><div class="card row gap8" style="padding:11px 13px">${ic("sparkles",16,2,"color:#E0A21E")}<span>${esc(p.ask)}</span></div>
  ${me?"":`<div class="lbl">Photos</div>${f==="friends"?`<div class="row gap8">${[0,1].map(i=>`<div class="photo${S.revealed["pp-"+id+i]?"":" blur"}" style="width:120px;height:90px;border-radius:14px" data-act="reveal" data-arg="pp-${id}${i}"><div class="img">${PHOTO_SVG}</div><div class="ov">${ic("eye-off",18)}Tap to view</div></div>`).join("")}</div>`:`<div class="empty" style="padding:14px">${ic("lock",16)} Photos are shown once you're friends</div>`}`}
  <div class="row gap10" style="margin-top:16px">
   <div class="card grow center" style="padding:12px"><div class="h2">${p.hosted}</div><div class="tiny muted">meet-ups hosted</div></div>
   <div class="card grow center" style="padding:12px"><div class="h2">${p.again}</div><div class="tiny muted">would meet again</div></div></div>
  ${plansIn.length?`<div class="sectitle">${me?"Your":"Their"} plans</div>${plansIn.map(planCard).join('<div style="height:10px"></div>')}`:""}
  ${me?`<div class="sectitle">Safety settings</div><div class="card row between" style="padding:12px 14px" data-act="pickContact"><div class="row gap10">${av("mum",36)}<div><b>Trusted contact: ${esc(S.contact.name)}</b><div class="tiny muted">Gets your Safety Cards and alerts</div></div></div>${ic("chevron-right",18)}</div>`:""}
  <div style="height:24px"></div></div></div>`;}};

SCREENS.plans={tab:"plans",render(){
 const all=S.plans.filter(canSeePlan);
 const hosting=all.filter(p=>p.host==="me"),going=all.filter(p=>joined(p.id)&&p.host!=="me"),req=all.filter(p=>S.join[p.id]==="requested"),sugg=plansList().filter(p=>!S.join[p.id]&&p.host!=="me").slice(0,4);
 const sec=(t,l,e)=>`<div class="sectitle">${t} <span class="a">${l.length||""}</span></div>${l.length?l.map(planCard).join('<div style="height:10px"></div>'):`<div class="empty">${e}</div>`}`;
 return `<div class="pad row between" style="margin-top:4px;flex:none"><div class="h1">Plans</div><button class="btn primary sm" data-act="create">${ic("plus",16,2.6)}New plan</button></div>
 <div class="scr-body"><div class="pad">
 ${sec("Hosting",hosting,'No plans yet. <span style="color:var(--coral);font-weight:700" data-act="create">Create one</span> — lunch, coffee, a walk…')}
 ${sec("Going",going,"Plans you've been approved for show here.")}
 ${req.length?sec("Waiting for approval",req,""):""}
 ${sec("Suggested for you",sugg,"Nothing new nearby — try widening your filters.")}
 <div style="height:20px"></div></div></div>`;}};

SCREENS.chats={tab:"chats",render(){
 const pc=S.plans.filter(p=>(joined(p.id)||p.host==="me")&&canSeePlan(p));
 const dms=Object.keys(S.friends).filter(k=>S.friends[k]==="friends"&&!S.blocked.includes(k));
 const last=cid=>{const m=chatMsgs(cid).filter(x=>!x.from||!S.blocked.includes(x.from)).slice(-1)[0];if(!m)return"No messages yet";return m.sys?m.sys:(m.from==="me"?"You: ":(per(m.from).name+": "))+(m.photo?"📷 Photo":m.text);};
 const ell='style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"';
 return `<div class="pad" style="margin-top:4px;flex:none"><div class="h1">Chats</div></div>
 <div class="scr-body"><div class="pad">
 <div class="sectitle">Meet-up group chats</div>
 ${pc.length?pc.map(p=>`<div class="card person press" data-act="openChat" data-arg="plan:${p.id}">${actIcon(p.act,48)}<div class="grow"><div class="row between gap6"><b ${ell}>${esc(p.title)}</b><span class="tiny muted">${p.day.split(" ")[0]}</span></div><div class="tiny muted" ${ell}>${esc(last("plan:"+p.id))}</div><div class="tiny" style="margin-top:3px;color:${S.done[p.id]?"var(--mist)":"#8A6200"};font-weight:700">${S.done[p.id]?"Closed":"Closes 24h after the meet-up"}</div></div></div>`).join('<div style="height:10px"></div>'):`<div class="empty">Join or host a plan and its group chat appears here.</div>`}
 <div class="sectitle">Friends</div>
 ${dms.map(id=>`<div class="card person press" data-act="openChat" data-arg="dm:${id}">${av(id,48)}<div class="grow"><b>${per(id).name}</b><div class="tiny muted" ${ell}>${esc(last("dm:"+id))}</div></div>${ic("chevron-right",18,2,"color:var(--mist)")}</div>`).join('<div style="height:10px"></div>')}
 <div class="note" style="margin-top:${dms.length?12:0}px">${ic("lock",16)}<div><b>1-to-1 chats unlock when you both add each other.</b> <span class="muted">Add people from Discover or after a meet-up.</span></div></div>
 <div style="height:20px"></div></div></div>`;}};

SCREENS.friends={tab:"friends",render(){
 const fr=Object.keys(S.friends).filter(k=>S.friends[k]==="friends"&&!S.blocked.includes(k)),rq=Object.keys(S.friends).filter(k=>S.friends[k]==="requested");
 const sugg=peopleList().filter(id=>!S.friends[id]).slice(0,4);
 return `<div class="pad row between" style="margin-top:4px;flex:none"><div class="h1">Friends</div><div data-act="goMe" aria-label="My profile">${av(S.me.avatar,42)}</div></div>
 <div class="scr-body"><div class="pad">
 <div class="sectitle">Your friends <span class="a">${fr.length||""}</span></div>
 ${fr.length?fr.map(personCard).join('<div style="height:10px"></div>'):`<div class="empty">No friends yet — tap “Add” on someone you'd like to meet. When they add you back, you're friends.</div>`}
 ${rq.length?`<div class="sectitle">Requests sent</div>${rq.map(personCard).join('<div style="height:10px"></div>')}`:""}
 <div class="sectitle">People you might like</div>
 ${sugg.length?sugg.map(personCard).join('<div style="height:10px"></div>'):`<div class="empty">You've added everyone nearby!</div>`}
 <div style="height:20px"></div></div></div>`;}};
