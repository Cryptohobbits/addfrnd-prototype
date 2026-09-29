/* ADDFRND clickable prototype — static, in-memory + localStorage. All data fictional. */
const VERSION=window.APP_VERSION||"dev";
const LS="addfrnd-proto-v2";
let S;
const clone=o=>JSON.parse(JSON.stringify(o));
function seed(){return{v:2,onboarded:false,
 me:{name:"Ellie",avatar:"ellie",band:null,upFor:["lunch","coffee"],interests:["Baking","Indie music","Board games"],ask:"My sourdough starter, Doug",area:"Rhos-on-Sea",radius:5},
 verify:{email:true,id:false},filters:{acts:[],bands:null,radius:5},view:"list",mapSel:null,
 plans:clone(SEED_PLANS),join:{},friends:{},chats:{},revealed:{},blocked:[],safety:{},safetyPlan:"p1",
 contact:{name:"Mum",alert:true},home:{},fb:{},done:{},draft:null,reported:[]};}
function load(){try{S=JSON.parse(localStorage.getItem(LS));}catch(e){S=null;} if(!S||S.v!==2)S=seed();}
function save(){try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){}}

/* ---------- model helpers ---------- */
const isTeen=()=>S.me.band==="16–17";
const myBand=()=>S.me.band||"18–21";
function visibleBands(){ if(isTeen())return["16–17"]; const b=S.filters.bands; return b&&b.length?b.filter(x=>x!=="16–17"):[myBand()]; }
function per(id){ if(id==="me")return{name:S.me.name,band:myBand(),area:S.me.area,upFor:S.me.upFor,interests:S.me.interests,ask:S.me.ask,hosted:S.plans.filter(p=>p.host==="me").length,again:"—",bio:"That's you!"}; return PEOPLE[id]; }
const nm=id=>id==="me"?"You":per(id).name;
const avk=id=>id==="me"?S.me.avatar:id;
const plan=id=>S.plans.find(p=>p.id===id);
const venue=p=>VENUES[p.venue];
function dist(pt){const a=AREAS[S.me.area];return Math.max(.2,Math.round(Math.hypot(pt.x-a.x,pt.y-a.y)/75*10)/10);}
const personDist=id=>dist(AREAS[per(id).area]);
const shared=id=>per(id).interests.filter(i=>S.me.interests.includes(i));
const joined=pid=>S.join[pid]==="joined";
const others=p=>p.att.filter(a=>a!=="me"&&!S.blocked.includes(a));
const spotsLeft=p=>p.spots-p.att.length;
const homeBy=p=>S.home[p.id]||addMins(p.time,p.dur+60);
const safety=pid=>(S.safety[pid]=S.safety[pid]||{shared:null,here:null,allgood:null,missed:false});
const isFriend=id=>S.friends[id]==="friends";
function peopleList(){
 const bands=visibleBands(),acts=S.filters.acts;
 return Object.keys(PEOPLE).filter(id=>{const p=PEOPLE[id];
  return !S.blocked.includes(id)&&bands.includes(p.band)&&personDist(id)<=S.filters.radius&&(!acts.length||p.upFor.some(a=>acts.includes(a)));
 }).sort((a,b)=>shared(b).length-shared(a).length||personDist(a)-personDist(b));
}
function plansList(){
 const bands=visibleBands(),acts=S.filters.acts;
 return S.plans.filter(p=>{
  if(p.host==="me")return true;
  if(S.blocked.includes(p.host))return false;
  if(isTeen()?p.band!=="16–17":(p.band==="16–17"||!bands.includes(p.band)))return false;
  return dist(venue(p))<=S.filters.radius&&(!acts.length||acts.includes(p.act));
 }).sort((a,b)=>(b.host==="me")-(a.host==="me")||DAYS.indexOf(a.day)-DAYS.indexOf(b.day)||a.time.localeCompare(b.time));
}
function canSeePlan(p){return p.host==="me"||(isTeen()?p.band==="16–17":p.band!=="16–17");}
function chatMsgs(cid){return (S.chats[cid]=S.chats[cid]||[]);}
function seedPlanChat(p){
 const cid="plan:"+p.id; if(S.chats[cid]&&S.chats[cid].length)return;
 const m=[];
 if(p.host==="me"){m.push({sys:"You created this plan · the chat opens as people join",k:""});}
 else{
  m.push({sys:nm(p.host)+" approved you · everyone here is verified",k:"ok"});
  if(p.id==="p1"){m.push({from:"priya",text:"Hiya! Welcome 😊 I'll grab a table by the window"});m.push({from:"jess",text:"Yay! Coming from college so might be 5 mins late"});m.push({from:"jess",photo:"ph-"+p.id});}
  else{m.push({from:p.host,text:"Hi "+S.me.name+"! Welcome to the plan 😊"});const o=others(p).find(x=>x!==p.host);if(o){m.push({from:o,text:"Hiya! Looking forward to it"});m.push({from:o,photo:"ph-"+p.id});}}
 }
 S.chats[cid]=m;
}

/* ---------- router ---------- */
const stack=[];
const SCREENS={};
function buildEl(name,params){
 const d=SCREENS[name];const el=document.createElement("div");
 el.className="screen"+(d.tab?" hastabs":"")+(d.cls?" "+(typeof d.cls==="function"?d.cls(params):d.cls):"");
 el.innerHTML=d.render(params||{}); return el;
}
function mount(e){const d=SCREENS[e.name]; if(d.mount)d.mount(e.el,e.params||{}); chrome(e);}
function chrome(e){
 const d=SCREENS[e.name];const tb=$("#tabbar");
 tb.classList.toggle("hide",!d.tab);
 $$("#tabbar .t").forEach(t=>t.classList.toggle("on",t.dataset.tab===d.tab));
 const cc=Object.keys(S.join).filter(k=>S.join[k]==="joined"&&!S.done[k]).length+Object.keys(S.friends).filter(k=>S.friends[k]==="friends").length;
 const b=$("#tabbar .cbadge"); if(b){b.textContent=cc;b.style.display=cc?"":"none";}
 $(".fakestatus").classList.toggle("dark",!!d.dark);
}
function go(name,params,mode){
 mode=mode||"push"; params=params||{};
 closeSheet(true);
 const vp=$("#viewport"),el=buildEl(name,params),top=stack[stack.length-1],entry={name,params,el,modal:mode==="modal"};
 vp.appendChild(el);
 if(mode==="reset"||mode==="tab"){
  el.classList.add("enter-fade");const olds=stack.splice(0);
  setTimeout(()=>olds.forEach(o=>o.el.remove()),230);
  stack.push(entry); try{history.replaceState({addf:0},"");}catch(e){}
 }else if(mode==="replaceTop"){
  const old=stack.pop(); el.classList.add("enter-push"); old.el.classList.add("leave-pop");
  setTimeout(()=>{old.el.remove();el.classList.remove("enter-push");},360);
  stack.push(entry);
 }else{
  el.classList.add(mode==="modal"?"enter-modal":"enter-push");
  if(top&&mode==="push")top.el.classList.add("leave-push");
  stack.push(entry);
  setTimeout(()=>{if(top&&stack.includes(top)&&stack[stack.length-1]!==top){top.el.classList.remove("leave-push");top.el.style.visibility="hidden";}el.classList.remove("enter-push","enter-modal");},360);
  try{history.pushState({addf:stack.length-1},"");}catch(e){}
 }
 mount(entry); save();
}
function back(){
 closeSheet(true);
 if(stack.length<2){ if(!SCREENS[stack[0].name].tab&&S.onboarded)go("discover",{},"reset"); return; }
 const top=stack.pop(),prev=stack[stack.length-1];
 prev.el.style.visibility=""; prev.el.classList.remove("leave-push");
 refresh(prev);
 if(!top.modal)prev.el.classList.add("enter-pop");
 top.el.classList.add(top.modal?"leave-modal":"leave-pop");
 setTimeout(()=>{top.el.remove();prev.el.classList.remove("enter-pop");},360);
 chrome(prev); save();
}
function goBack(){ if(stack.length>1&&history.state&&history.state.addf>0){history.back();} else back(); }
window.addEventListener("popstate",()=>{ if(stack.length>1)back(); });
function refresh(e){
 e=e||stack[stack.length-1]; if(!e)return;
 const b=$(".scr-body",e.el),st=b?b.scrollTop:0;
 e.el.innerHTML=SCREENS[e.name].render(e.params||{});
 const nb=$(".scr-body",e.el); if(nb)nb.scrollTop=st;
 if(SCREENS[e.name].mount)SCREENS[e.name].mount(e.el,e.params||{},true);
 chrome(e);
}
function render(){save();refresh();}
const cur=()=>stack[stack.length-1];
const onScreen=(name,test)=>{const c=cur();return !!(c&&c.name===name&&(!test||test(c.params)));};

/* ---------- shared components ---------- */
const backBtn=(act)=>'<button class="iconbtn" data-act="'+(act||"back")+'" aria-label="Back">'+svgIcon("chevron-left",22)+'</button>';
function actIcon(a,s){const A=ACTS[a];return '<div class="pic" style="background:'+A.bg+';color:'+A.fg+(s?';width:'+s+'px;height:'+s+'px;border-radius:'+Math.round(s/4)+'px':'')+'">'+ic(A.icon,s?Math.round(s*.44):28)+'</div>';}
function planCard(p){
 const v=venue(p),left=spotsLeft(p);
 let st="";
 if(p.host==="me")st='<span class="tag coral">Your plan</span>';
 else if(joined(p.id))st='<span class="tag mint">'+ic("check",11,3)+'Going</span>';
 else if(S.join[p.id]==="requested")st='<span class="tag amber">Requested</span>';
 return '<div class="card plan press" data-act="openPlan" data-arg="'+p.id+'">'+actIcon(p.act)+
 '<div class="grow"><div class="row between gap6"><div class="h3" style="line-height:1.2">'+esc(p.title)+'</div>'+st+'</div>'+
 '<div class="small muted" style="margin-top:2px">'+p.day+' · '+p.time+' · '+esc(v.name)+'</div>'+
 '<div class="row gap6" style="margin-top:8px">'+avs(p.att.filter(a=>!S.blocked.includes(a)).slice(0,4).map(avk),24)+'<span class="tiny muted b">'+(p.host==="me"?"You're hosting":nm(p.host)+" hosting")+' · <span style="color:var(--coral-d)">'+(left>0?left+" spot"+(left>1?"s":"")+" left":"Full")+'</span></span></div>'+
 '<div class="row gap6" style="margin-top:7px">'+(v.friendly?'<span class="tag sun">'+ic("store",11)+'ADDFRND friendly</span>':'')+'<span class="tag navy">'+dist(v)+' mi</span></div></div></div>';
}
function friendBtn(id){
 const f=S.friends[id];
 if(f==="friends")return '<div class="addbtn friends">'+ic("user-check",15,2.4)+'Friends</div>';
 if(f==="requested")return '<div class="addbtn pending">'+ic("clock",14,2.4)+'Sent</div>';
 return '<button class="addbtn" data-act="addFriend" data-arg="'+id+'">'+ic("user-plus",15,2.4)+'Add</button>';
}
function personCard(id){
 const p=per(id),sh=shared(id);
 return '<div class="card person press" data-act="openPerson" data-arg="'+id+'">'+av(id,50)+
 '<div class="grow"><div class="row gap6"><b style="font-size:15px">'+p.name+'</b><span class="tag navy">'+p.band+'</span>'+ic("badge-check",15,2,"color:var(--mint)")+'</div>'+
 '<div class="tiny muted" style="margin-top:1px">around '+p.area+' · up for '+p.upFor.map(a=>ACTS[a].label.toLowerCase()).join(", ")+'</div>'+
 (sh.length?'<div class="tiny b" style="margin-top:4px;color:var(--coral-d)">'+sh.length+' shared: '+sh.join(", ").toLowerCase()+'</div>':'<div class="tiny b" style="margin-top:4px;color:var(--coral-d)">Ask me about: '+esc(p.ask)+'</div>')+
 '</div>'+friendBtn(id)+'</div>';
}
const toggle=(on,act,arg)=>'<div class="toggle'+(on?' on':'')+'" data-act="'+act+'"'+(arg?' data-arg="'+arg+'"':'')+' role="switch" aria-checked="'+!!on+'"></div>';
