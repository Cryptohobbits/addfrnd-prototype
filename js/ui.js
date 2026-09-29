/* UI helpers */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let _avc=0;
function avatarSVG(key,size){
 const p=AV[key]||AV.ellie; const id="avc"+(++_avc);
 let back="",front="";
 const cap='<path d="M19 28 C18 17 25 12.5 32 12.5 C40 12.5 46 17 45.5 27 C42 22 37 20.5 31 21 C25.5 21.5 22 24 19 28Z" fill="'+p.hair+'"/>';
 if(p.style=="short") front=cap;
 if(p.style=="long"){back='<path d="M17 28 C16.5 15 24 11.5 32 11.5 C40 11.5 47.5 15 47 28 L48.5 48 C43 51 21 51 15.5 48 Z" fill="'+p.hair+'"/>';front=cap;}
 if(p.style=="bob"){back='<path d="M17.5 28 C17 15 24 11.5 32 11.5 C40 11.5 47 15 46.5 28 L47 39 C42 41 22 41 17 39 Z" fill="'+p.hair+'"/>';front=cap;}
 if(p.style=="bun"){back='<circle cx="32" cy="10" r="6.5" fill="'+p.hair+'"/>';front=cap;}
 if(p.style=="curly"){front=[[20,24,6],[23.5,17.5,6],[29,13.8,6.2],[35.5,13.8,6.2],[41,17.5,6],[44,24,5.5]].map(c=>'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="'+p.hair+'"/>').join("");}
 if(p.style=="hijab"){back='<circle cx="32" cy="29" r="17" fill="'+p.hair+'"/><path d="M13 64 C13 46 20 40 32 40 C44 40 51 46 51 64Z" fill="'+p.hair+'"/>';}
 const shoulders=p.style=="hijab"?'':'<path d="M9 64 C9 49 19 43.5 32 43.5 C45 43.5 55 49 55 64 Z" fill="'+p.shirt+'"/><rect x="28.5" y="37" width="7" height="8" rx="3" fill="'+p.skin+'"/>';
 const face='<circle cx="32" cy="29" r="'+(p.style=="hijab"?12:13)+'" fill="'+p.skin+'"/>';
 const feat='<circle cx="27.3" cy="29.5" r="1.6" fill="#1E2A4A"/><circle cx="36.7" cy="29.5" r="1.6" fill="#1E2A4A"/><path d="M27.8 34.2 Q32 37.8 36.2 34.2" stroke="#1E2A4A" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="24.5" cy="33.5" r="2.2" fill="#F2644E" opacity=".22"/><circle cx="39.5" cy="33.5" r="2.2" fill="#F2644E" opacity=".22"/>';
 const band=p.style=="hijab"?'<path d="M20 24 C23 17 41 17 44 24" stroke="'+p.hair+'" stroke-width="3.5" fill="none"/>':'';
 return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 64 64" aria-hidden="true"><defs><clipPath id="'+id+'"><circle cx="32" cy="32" r="32"/></clipPath></defs><g clip-path="url(#'+id+')"><rect width="64" height="64" fill="'+p.bg+'"/>'+back+shoulders+face+band+feat+front+'</g></svg>';
}
function svgIcon(n,s,w){return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[n]||"")+'</svg>';}
function ic(n,s,w,style){return '<span class="ic"'+(style?' style="'+style+'"':'')+'>'+svgIcon(n,s||18,w)+'</span>';}
function av(key,s){s=s||40;return '<span class="av" style="width:'+s+'px;height:'+s+'px">'+avatarSVG(key,s)+'</span>';}
function avs(keys,s){return '<span class="avstack">'+keys.map(k=>av(k,s)).join("")+'</span>';}
function statusIcons(){
 const c="currentColor";
 return '<span>9:41</span><span class="row gap6"><svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="'+c+'"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="'+c+'"/><rect x="10" y="3" width="3" height="9" rx="1" fill="'+c+'"/><rect x="15" y="0" width="3" height="12" rx="1" fill="'+c+'"/></svg><svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.5c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .7 10.4 10.4 0 0 0 .8 3.6L2 4.9A8.6 8.6 0 0 1 8 2.5Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4.3a6.7 6.7 0 0 0-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3Zm0 3.5c.5 0 1 .2 1.3.5L8 11.5 6.7 10.1c.3-.3.8-.5 1.3-.5Z" fill="'+c+'"/></svg><svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="'+c+'" opacity=".4" fill="none"/><rect x="2" y="2" width="18" height="9" rx="2" fill="'+c+'"/><rect x="24.5" y="4.5" width="1.8" height="4" rx=".9" fill="'+c+'" opacity=".5"/></svg></span>';
}
let _toastT;
function toast(msg){const t=$("#toast");t.innerHTML=msg;t.classList.add("show");clearTimeout(_toastT);_toastT=setTimeout(()=>t.classList.remove("show"),2600);}
let _notifT,_notifAct=null;
function notify(title,text,act){
 const n=$("#notif");
 n.innerHTML='<img src="assets/addfrnd-app-icon.svg?v='+VERSION+'" alt=""><div class="grow"><div class="row between"><b style="font-size:13.5px">'+esc(title)+'</b><span class="tiny muted">now</span></div><div style="font-size:13px">'+text+'</div></div>';
 _notifAct=act||null; n.classList.add("show"); clearTimeout(_notifT); _notifT=setTimeout(()=>n.classList.remove("show"),3800);
}
function openSheet(html,opts){
 closeSheet(true);
 const o=$("#overlay");
 o.innerHTML='<div class="backdrop" data-act="closeSheet"></div><div class="sheet'+(opts&&opts.cls?' '+opts.cls:'')+'"><div class="grab"></div>'+html+'</div>';
 requestAnimationFrame(()=>requestAnimationFrame(()=>{$(".backdrop",o).classList.add("show");$(".sheet",o).classList.add("show");}));
}
function closeSheet(now){
 const o=$("#overlay"); if(!o.innerHTML) return;
 if(now){o.innerHTML="";return;}
 const b=$(".backdrop",o),s=$(".sheet",o); if(b)b.classList.remove("show"); if(s)s.classList.remove("show");
 setTimeout(()=>{ if(!$(".sheet.show",o)) o.innerHTML=""; },300);
}
function sheetOpen(){return !!$("#overlay .sheet");}
function nowTime(){const d=new Date();return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");}
function addMins(t,m){const [h,mm]=t.split(":").map(Number);const x=h*60+mm+m;return String(Math.floor(x/60)%24).padStart(2,"0")+":"+String(x%60).padStart(2,"0");}
function durLabel(m){return m<60?m+" min":(m%60?(m/60).toFixed(1).replace(".0","")+" hrs":(m/60)+(m==60?" hr":" hrs"));}

function mapSVG(){
 return '<svg viewBox="0 0 390 844" width="390" height="844" style="position:absolute;inset:0"><rect width="390" height="844" fill="#F4EEE4"/>'+
 '<path d="M0 0 H390 V452 C372 448 352 446 334 444 C312 441 294 438 276 428 C255 416 236 398 214 380 C200 368 190 352 181 336 C176 326 172 316 160 312 C146 308 132 318 118 330 C96 348 60 356 30 356 C18 356 8 355 0 354 Z" fill="#CFE6F5"/>'+
 '<path d="M0 354 C8 355 18 356 30 356 C60 356 96 348 118 330 C132 318 146 308 160 312 C172 316 176 326 181 336 C190 352 200 368 214 380 C236 398 255 416 276 428 C294 438 312 441 334 444 C352 446 372 448 390 452" fill="none" stroke="#E9DCC6" stroke-width="7"/>'+
 '<text x="40" y="262" font-family="Nunito" font-weight="800" font-size="13" fill="#8BB5D1" letter-spacing="3">IRISH SEA</text><text x="258" y="372" font-family="Nunito" font-weight="700" font-style="italic" font-size="11" fill="#8BB5D1" letter-spacing="1">Colwyn Bay</text>'+
 '<ellipse cx="322" cy="505" rx="34" ry="22" fill="#D8EBCF"/><ellipse cx="70" cy="455" rx="40" ry="20" fill="#E0EDD6"/><ellipse cx="170" cy="610" rx="50" ry="26" fill="#E0EDD6"/>'+
 '<g stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"><path d="M20 372 C70 378 120 360 170 345"/><path d="M170 345 C200 380 230 410 270 440"/><path d="M160 360 L150 470 L140 560"/><path d="M40 390 L60 520"/><path d="M230 420 L220 560 L240 680"/><path d="M290 452 L300 600"/><path d="M100 480 C150 490 200 500 240 520"/><path d="M150 470 C190 470 220 460 250 450"/><path d="M330 470 L360 640"/></g>'+
 '<path d="M0 610 C60 600 110 560 170 530 C220 505 260 470 300 462 C330 458 360 462 390 468" stroke="#FFD27A" stroke-width="9" fill="none" stroke-linecap="round"/>'+
 '<rect x="52" y="580" width="34" height="18" rx="5" fill="#2F8F5B"/><text x="69" y="593" text-anchor="middle" font-family="Inter" font-weight="800" font-size="10.5" fill="#fff">A55</text></svg>';
}
function miniMap(v){
 const x=v?v.x:302,y=v?v.y:442;
 // crop around the venue
 const vx=Math.max(0,Math.min(390-200,x-100)),vy=y-40;
 return '<svg width="100%" height="100%" viewBox="'+vx+' '+vy+' 200 70" preserveAspectRatio="xMidYMid slice">'+mapSVG().replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')+'<g transform="translate('+x+','+(y-2)+')"><circle r="12" fill="#F2644E" opacity=".18"/><path d="M0 4 C-7 -3 -8 -8 -8 -10 A8 8 0 0 1 8 -10 C8 -8 7 -3 0 4Z" transform="translate(0,-4)" fill="#F2644E" stroke="#fff" stroke-width="1.8"/><circle cy="-14" r="2.8" fill="#fff"/></g></svg>';
}
