/* Screens: onboarding, discover, plan detail */
SCREENS.welcome={render(){
 return `<div class="scr-body" style="display:flex;flex-direction:column">
 <div class="row" style="justify-content:center;margin:10px 0 8px"><img src="assets/addfrnd-logo.svg?v=${VERSION}" height="38" alt="ADDFRND"></div>
 <div style="position:relative;flex:1;min-height:270px;max-height:370px;margin:0 16px;border-radius:32px;background:linear-gradient(160deg,#FDE3DE,#FFF1CC);overflow:hidden">
  <div style="position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);width:140px;height:140px;border-radius:50%;background:#fff;box-shadow:0 10px 30px rgba(242,100,78,.2);display:flex;align-items:center;justify-content:center;color:var(--coral)">${ic("coffee",30)}</div>
  <div style="position:absolute;left:10%;top:40%">${av("priya",62)}</div><div style="position:absolute;right:10%;top:40%">${av("jess",62)}</div>
  <div style="position:absolute;left:50%;bottom:6%;transform:translateX(-50%)">${av("ellie",62)}</div><div style="position:absolute;left:50%;top:6%;transform:translateX(-50%)">${av("noor",56)}</div>
  <div class="card row gap6 small b" style="position:absolute;left:14px;top:12%;padding:7px 11px;border-radius:14px">${ic("utensils",14,2,"color:var(--coral)")}Lunch Thu?</div>
  <div class="card row gap6 small b" style="position:absolute;right:12px;top:68%;padding:7px 11px;border-radius:14px">${ic("footprints",14,2,"color:var(--mint)")}Walk on the prom</div>
 </div>
 <div class="pad center" style="margin-top:22px"><div class="h1" style="font-size:31px">No one should<br>eat alone.</div>
 <p class="muted" style="font-size:15.5px;margin:10px 10px 0;line-height:1.45">Meet friendly people near you for lunch, coffee, walks and more. <b style="color:var(--navy)">Friends only — never dating.</b></p></div>
 <div style="flex:.3"></div></div>
 <div class="scr-foot"><button class="btn primary" data-act="startOnboarding">Get started</button>
 <div class="center small muted b" style="margin-top:12px">I already have an account · <span style="color:var(--coral)" data-act="demoLogin">Log in</span></div>
 <div class="row gap6 tiny muted" style="justify-content:center;margin-top:12px">${ic("shield-check",14,2,"color:var(--mint)")}Verified members · Public meet-ups · Safety Card for family</div></div>`;}};

const progress=n=>`<div class="row gap6" style="margin-bottom:16px">${[0,1,2,3].map(i=>`<i style="flex:1;height:5px;border-radius:3px;background:${i<n?"var(--coral)":"#E9DFD4"}"></i>`).join("")}</div>`;
SCREENS.verify={render(){
 const v=S.verify;
 return `<div class="topbar">${backBtn()}<div class="small muted b">Step 2 of 4</div><div style="width:40px"></div></div>
 <div class="scr-body"><div class="pad">${progress(2)}
 <div class="h1">Let's keep ADDFRND real</div>
 <p class="muted" style="margin-top:8px;font-size:14.5px">Everyone is verified, so you know the people you meet are who they say they are.</p>
 <div class="card" style="margin-top:18px">
  <div class="info" style="padding:14px"><div class="ib" style="background:var(--mint-l);color:var(--mint);width:42px;height:42px">${ic("mail",21)}</div><div class="grow"><b>Email verified</b><div class="small muted">ellie.m@example.com</div></div><span class="tag mint">${ic("check",12,3)}Done</span></div>
  <div class="divider" style="margin:0 14px"></div>
  ${v.id?`<div class="info" style="padding:14px"><div class="ib" style="background:var(--mint-l);color:var(--mint);width:42px;height:42px">${ic("id-card",21)}</div><div class="grow"><b>Photo ID + selfie verified</b><div class="small muted">Age confirmed · ID scan deleted</div></div><span class="tag mint">${ic("check",12,3)}Done</span></div>`
  :`<div class="info press" style="padding:14px" data-act="startId" id="idrow"><div class="ib" style="width:42px;height:42px">${ic("id-card",21)}</div><div class="grow"><b>Photo ID + quick selfie</b><div class="small muted">About 2 minutes. We check your age, then delete the ID scan.</div></div>${ic("chevron-right",20,2,"color:var(--mist)")}</div>`}
 </div>
 <div class="lbl" style="margin-top:22px">Your age band <span class="n">· ${v.id?"confirmed by your ID":"pick yours — your ID confirms it"}</span></div>
 <div class="bands">${BANDS.map(b=>`<div class="band${S.me.band===b?" on":""}" data-act="pickBand" data-arg="${b}" style="${b==="16–17"?"border-style:dashed":""}">${b}<small>${S.me.band===b?"you":b==="16–17"?"own band only":"&nbsp;"}</small></div>`).join("")}</div>
 <div class="note" style="margin-top:16px">${ic("shield-check",18)}<div><b>16–17s only ever see, and are seen by, other <span style="white-space:nowrap">16–17s</span>.</b> Adults can't find them, message them or join their plans. Your exact birthday is never shown — just your band.</div></div>
 <div style="height:16px"></div></div></div>
 <div class="scr-foot"><button class="btn primary${v.id&&S.me.band?"":" disabled"}" data-act="verifyNext">Continue ${ic("arrow-right",20,2.5)}</button></div>`;}};

SCREENS.profileSetup={render(p){
 const m=S.me;
 return `<div class="topbar">${backBtn()}<div class="small muted b">${p.edit?"Edit profile":"Step 3 of 4 · Your profile"}</div><div style="width:40px"></div></div>
 <div class="scr-body"><div class="pad">${p.edit?"":progress(3)}
 <div class="card row gap12" style="padding:12px 14px">
  <div style="position:relative" data-act="cycleAvatar" title="Change avatar">${av(m.avatar,58)}<span style="position:absolute;right:-3px;bottom:-3px;width:24px;height:24px;border-radius:50%;background:var(--coral);color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid #fff">${ic("pencil",12,2.6)}</span></div>
  <div class="grow"><input class="field" data-bind="me.name" value="${esc(m.name)}" maxlength="20" placeholder="First name" style="padding:8px 11px;font-weight:800;font-family:Nunito;font-size:18px">
  <div class="tiny muted row gap4" style="margin-top:5px">${ic("badge-check",13,2,"color:var(--mint)")}${myBand()} · first name only · tap avatar to change</div></div>
 </div>
 <div class="lbl">I'm up for <span class="n">· pick any</span></div>
 <div class="chips">${Object.keys(ACTS).map(a=>`<span class="chip${m.upFor.includes(a)?" on":""}" data-act="toggleUp" data-arg="${a}">${ic(ACTS[a].icon,14)}${ACTS[a].label}</span>`).join("")}</div>
 <div class="lbl">Hobbies & interests</div>
 <div class="chips">${INTERESTS.map(i=>`<span class="chip soft sm${m.interests.includes(i)?" on":""}" data-act="toggleInt" data-arg="${esc(i)}">${esc(i)}</span>`).join("")}</div>
 <div class="lbl">Ask me about…</div>
 <div style="position:relative">${ic("sparkles",16,2,"color:#E0A21E;position:absolute;left:13px;top:14px")}<input class="field" data-bind="me.ask" value="${esc(m.ask)}" maxlength="60" style="padding-left:38px;font-size:14px" placeholder="e.g. the best chips on the prom"></div>
 <div class="lbl">My area</div>
 <div class="chips">${Object.keys(AREAS).map(a=>`<span class="chip sm${m.area===a?" on":""}" data-act="setArea" data-arg="${a}">${ic("map-pin",12)}${a}</span>`).join("")}</div>
 <div class="row between" style="margin-top:12px"><span class="small b">Show me people within</span><div class="seg" style="width:190px">${[1,3,5,10].map(r=>`<div class="${S.filters.radius===r?"on":""}" data-act="setRadius" data-arg="${r}">${r} mi</div>`).join("")}</div></div>
 <div class="row gap6 tiny muted" style="margin-top:10px">${ic("eye-off",13)}Others see “around ${m.area}” — never your exact location.</div>
 <div class="row gap6 tiny muted" style="margin-top:6px">${ic("camera",13)}Photos are optional and only shown once you're friends.</div>
 <div style="height:18px"></div></div></div>
 <div class="scr-foot"><button class="btn primary" data-act="finishProfile">${p.edit?"Save changes":"Looks good — find my people"}</button></div>`;}};

SCREENS.discover={tab:"discover",render(){
 const f=S.filters,nf=f.acts.length+(f.bands&&f.bands.length&&!(f.bands.length===1&&f.bands[0]===myBand())?1:0)+(f.radius!==5?1:0);
 return `<div class="pad row between" style="margin-top:4px;flex:none">
  <div><div class="h1">Discover</div><div class="row gap4 small b muted press" style="margin-top:3px" data-act="openArea">${ic("map-pin",14,2,"color:var(--coral)")}${S.me.area} · ${f.radius} mi ${ic("chevron-down",14)}</div></div>
  <div data-act="goMe" aria-label="My profile">${av(S.me.avatar,42)}</div></div>
 <div class="pad row between" style="margin-top:12px;flex:none">
  <div class="seg" style="width:160px"><div class="${S.view==="list"?"on":""}" data-act="setView" data-arg="list">${ic("list",14)}List</div><div class="${S.view==="map"?"on":""}" data-act="setView" data-arg="map">${ic("map",14)}Map</div></div>
  <button class="iconbtn" style="width:auto;padding:0 12px;gap:6px;font-weight:700;font-size:13px;height:36px" data-act="openFilters">${ic("sliders-horizontal",16)}Filters${nf?` · ${nf}`:""}</button></div>
 <div class="hscroll" style="margin-top:12px;flex:none;padding-bottom:10px">
  <span class="chip sm on" data-act="openFilters" style="background:var(--navy);border-color:var(--navy)">${ic(isTeen()?"lock":"users",12)}${visibleBands().join(", ")}</span>
  ${Object.keys(ACTS).map(a=>`<span class="chip sm${f.acts.includes(a)?" on":""}" data-act="toggleAct" data-arg="${a}">${ic(ACTS[a].icon,12)}${ACTS[a].label}</span>`).join("")}
 </div>
 ${S.view==="list"?discoverList():discoverMap()}`;},
 mount(el){ if(S.view==="map")positionMap(el); }};
function discoverList(){
 const pl=plansList(),pp=peopleList();
 return `<div class="scr-body"><div class="pad">
 <div class="sectitle" style="margin-top:6px">Plans near you <span class="a">${pl.length} plan${pl.length==1?"":"s"}</span></div>
 ${pl.length?pl.map(planCard).join('<div style="height:10px"></div>'):`<div class="empty">No plans match your filters.<br><span style="color:var(--coral);font-weight:700" data-act="clearFilters">Clear filters</span> or <span style="color:var(--coral);font-weight:700" data-act="create">create one</span></div>`}
 <div class="sectitle">People near you <span class="a">${pp.length}</span></div>
 ${pp.length?pp.map(personCard).join('<div style="height:10px"></div>'):`<div class="empty">Nobody matches yet — try a wider radius.</div>`}
 <div class="note" style="margin:16px 0 20px">${ic("lock",16)}<div>You can only message someone once you've <b>both</b> tapped “Add friend”. No stranger DMs, ever.</div></div>
 </div></div>`;
}
function discoverMap(){
 const pl=plansList(),pp=peopleList(),a=AREAS[S.me.area];
 const byArea={};pp.forEach(id=>{(byArea[per(id).area]=byArea[per(id).area]||[]).push(id);});
 const sel=S.mapSel;let sheet="";
 if(sel&&sel.type==="plan"&&pl.some(x=>x.id===sel.id)){const p=plan(sel.id);
  sheet=`<div class="mapsheet row gap12">${actIcon(p.act,54)}<div class="grow"><div class="h3">${esc(p.title)}</div><div class="small muted">${p.day} · ${p.time} · ${spotsLeft(p)} of ${p.spots} spots left</div><div class="row gap6" style="margin-top:5px">${avs(p.att.map(avk),22)}${venue(p).friendly?'<span class="tag sun">'+ic("store",11)+'ADDFRND friendly</span>':''}</div></div><button class="btn primary sm" style="box-shadow:none" data-act="openPlan" data-arg="${p.id}">View</button></div>`;}
 else if(sel&&sel.type==="area"&&byArea[sel.name]){const ids=byArea[sel.name];
  sheet=`<div class="mapsheet"><div class="row between" style="margin-bottom:8px"><div class="h3">${ids.length} ${ids.length>1?"people":"person"} around ${sel.name}</div><span data-act="mapClear">${ic("x",18)}</span></div><div class="hscroll" style="padding:0">${ids.map(id=>`<div class="center press" style="width:66px;flex:none" data-act="openPerson" data-arg="${id}">${av(id,46)}<div class="tiny b" style="margin-top:3px">${per(id).name}</div><div class="tiny muted" style="font-size:10px">${shared(id).length} shared</div></div>`).join("")}</div><div class="tiny muted row gap4" style="margin-top:8px">${ic("eye-off",12)}Shown by area only — never exact locations</div></div>`;}
 return `<div class="mapwrap" data-act="mapClear" data-self="1"><div class="mapcanvas">${mapSVG()}
 <svg width="390" height="844" style="position:absolute;inset:0;pointer-events:none"><circle cx="${a.x}" cy="${a.y}" r="${S.filters.radius*75}" fill="none" stroke="#F2644E" stroke-width="1.5" stroke-dasharray="6 6" opacity=".5"/><circle cx="${a.x}" cy="${a.y}" r="7" fill="#fff" stroke="#F2644E" stroke-width="3"/></svg>
 ${Object.keys(AREAS).map(n=>`<div class="place" style="left:${AREAS[n].x}px;top:${AREAS[n].y+40}px">${n}</div>`).join("")}
 ${Object.keys(byArea).map(n=>{const ids=byArea[n],A=AREAS[n],sz=90+ids.length*16;return `<div class="area" style="left:${A.x}px;top:${A.y}px" data-act="mapArea" data-arg="${n}"><div class="blob" style="width:${sz}px;height:${sz}px"></div><div class="lab">${avs(ids.slice(0,2),22)}${ids.length} nearby</div></div>`;}).join("")}
 ${pl.map(p=>{const v=venue(p),A=ACTS[p.act];return `<div class="pin${sel&&sel.id===p.id?" sel":""}" style="left:${v.x}px;top:${v.y}px" data-act="mapPlan" data-arg="${p.id}"><div class="p" style="background:${p.host==="me"?"var(--navy)":A.fg}"><span>${svgIcon(A.icon,18,2.4)}</span></div></div>`;}).join("")}
 </div>
 <div class="maphint">${ic("eye-off",14)}People show as rough areas only. Plans show their public venue.</div>
 ${sheet}</div>`;
}
function positionMap(el){
 const w=$(".mapwrap",el);if(!w)return;const h=w.clientHeight,c=$(".mapcanvas",w);
 const a=AREAS[S.me.area];let top=h/2-(a.y+470)/2-10;top=Math.min(0,Math.max(h-844,top));c.style.top=top+"px";
}
