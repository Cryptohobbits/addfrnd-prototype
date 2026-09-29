/* ADDFRND prototype — all people and data are fictional. Venues are real local places used as examples. */
const AV={
 ellie:{skin:"#F6D2B8",hair:"#B5522E",style:"long",bg:"#FDE3DE",shirt:"#F2644E"},
 me2:{skin:"#8D5A3B",hair:"#1A1110",style:"curly",bg:"#DDF4EA",shirt:"#2FAE7E"},
 me3:{skin:"#EBC09E",hair:"#3B2A20",style:"short",bg:"#DCEBFA",shirt:"#5B7BD6"},
 me4:{skin:"#C98E62",hair:"#2B1D16",style:"bun",bg:"#FFF1CC",shirt:"#E8912D"},
 priya:{skin:"#C98E62",hair:"#2B1D16",style:"long",bg:"#FFF1CC",shirt:"#5B7BD6"},
 jess:{skin:"#F1C6A5",hair:"#E0B04F",style:"bun",bg:"#DDF4EA",shirt:"#2FAE7E"},
 tomos:{skin:"#EBC09E",hair:"#6B4226",style:"short",bg:"#DCEBFA",shirt:"#1E2A4A"},
 ffion:{skin:"#F3CDB0",hair:"#9A4A22",style:"curly",bg:"#ECE3FA",shirt:"#8E6BD8"},
 noor:{skin:"#B97F57",hair:"#6E57B8",style:"hijab",bg:"#FFE9D6",shirt:"#E8912D"},
 sam:{skin:"#7A4B2E",hair:"#1A1110",style:"curly",bg:"#FFF1CC",shirt:"#F2644E"},
 aled:{skin:"#F0C8A8",hair:"#2A2522",style:"short",bg:"#E3F1E6",shirt:"#3A8F6A"},
 gwen:{skin:"#F2CDB3",hair:"#C9A56B",style:"bob",bg:"#FDE3DE",shirt:"#5B7BD6"},
 dev:{skin:"#A8714D",hair:"#1E1714",style:"short",bg:"#E6E9F2",shirt:"#E8912D"},
 rhian:{skin:"#F4D3BD",hair:"#B9B2AA",style:"bob",bg:"#DDF4EA",shirt:"#8E6BD8"},
 cai:{skin:"#EFC7A6",hair:"#5A3A22",style:"short",bg:"#FFF1CC",shirt:"#2FAE7E"},
 mali:{skin:"#F1CBAE",hair:"#2B1D16",style:"long",bg:"#ECE3FA",shirt:"#F2644E"},
 osian:{skin:"#E9BE9B",hair:"#C98B3A",style:"curly",bg:"#DCEBFA",shirt:"#1E2A4A"},
 mum:{skin:"#F2CDB3",hair:"#7A4A2A",style:"bob",bg:"#E6E9F2",shirt:"#1E2A4A"}
};
const ME_AVATARS=["ellie","me2","me3","me4"];

const ACTS={
 lunch:{label:"Lunch",icon:"utensils",bg:"#FDE3DE",fg:"#F2644E"},
 coffee:{label:"Coffee",icon:"coffee",bg:"#FFF1CC",fg:"#B07A00"},
 walk:{label:"Walk",icon:"footprints",bg:"#DDF4EA",fg:"#2FAE7E"},
 gaming:{label:"Gaming",icon:"gamepad-2",bg:"#ECE3FA",fg:"#7C5CC4"},
 gym:{label:"Gym",icon:"dumbbell",bg:"#DCEBFA",fg:"#3B6FB6"},
 church:{label:"Church",icon:"church",bg:"#E6E9F2",fg:"#1E2A4A"},
 dogwalk:{label:"Dog walk",icon:"dog",bg:"#FFE9D6",fg:"#C66A12"}
};
const INTERESTS=["Baking","Indie music","Sketching","Board games","Netball","Football","Welsh rugby","Reading","Photography","Climbing","Anime","Cooking","Running","Crafts","Film","Paddleboarding"];
const BANDS=["16–17","18–21","22–30","31–45","46–60","60+"];

/* map canvas coordinates (390 x 844 canvas); ~75px = 1 mile */
const AREAS={
 "Penrhyn Bay":{x:48,y:372},
 "Rhos-on-Sea":{x:150,y:392},
 "Colwyn Bay":{x:176,y:612},
 "Old Colwyn":{x:356,y:478},
 "Mochdre":{x:70,y:640}
};
const VENUES={
 porth:{name:"Porth Eirias café",sub:"Colwyn Bay Promenade",x:302,y:442,friendly:true,offer:"10% off food for groups of 3+ (example)",icon:"store",bg:"#FFF1CC",fg:"#B07A00",note:"Seafront café · busy at lunchtime"},
 rhosprom:{name:"Rhos-on-Sea Promenade",sub:"By St Trillo's Chapel",x:184,y:334,icon:"sun",bg:"#DDF4EA",fg:"#2FAE7E",note:"Open, public seafront path"},
 eirias:{name:"Eirias Park",sub:"By the boating lake",x:336,y:500,icon:"trees",bg:"#DDF4EA",fg:"#2FAE7E",note:"Busy park · best in daytime"},
 library:{name:"Colwyn Bay Library",sub:"Town centre",x:226,y:548,icon:"book-open",bg:"#E6E9F2",fg:"#1E2A4A",note:"Indoor, staffed"},
 college:{name:"Llandrillo College",sub:"Rhos-on-Sea · main entrance",x:138,y:452,icon:"graduation-cap",bg:"#ECE3FA",fg:"#7C5CC4",note:"Local place · meet at main entrance"},
 penrhyn:{name:"Penrhyn Bay seafront",sub:"Coastal path",x:66,y:356,icon:"footprints",bg:"#DDF4EA",fg:"#2FAE7E",note:"Popular with dog walkers"}
};
const DAYS=["Wed 30 Sep","Thu 1 Oct","Fri 2 Oct","Sat 3 Oct","Sun 4 Oct","Mon 5 Oct","Tue 6 Oct"];

const PEOPLE={
 priya:{name:"Priya",band:"18–21",area:"Colwyn Bay",upFor:["lunch","coffee","walk"],interests:["Baking","Board games","Film"],ask:"Why my cat is called Biscuit",hosted:5,again:"100%",bio:"Second year at college, always up for a proper lunch."},
 jess:{name:"Jess",band:"18–21",area:"Colwyn Bay",upFor:["lunch","gym"],interests:["Baking","Board games","Indie music","Netball"],ask:"The best chips on the prom",hosted:1,again:"100%",bio:"New to the area — moved from Wrexham in September."},
 tomos:{name:"Tomos",band:"18–21",area:"Penrhyn Bay",upFor:["gaming","walk"],interests:["Welsh rugby","Board games","Anime"],ask:"Welsh rugby (I will talk for hours)",hosted:3,again:"96%",bio:"Board games, rugby and too much tea."},
 noor:{name:"Noor",band:"18–21",area:"Rhos-on-Sea",upFor:["coffee","walk"],interests:["Reading","Photography","Crafts"],ask:"My book club picks",hosted:0,again:"100%",bio:"Quiet coffee and a good chat is my idea of perfect."},
 ffion:{name:"Ffion",band:"18–21",area:"Rhos-on-Sea",upFor:["walk","dogwalk","coffee"],interests:["Photography","Paddleboarding","Indie music"],ask:"Paddleboarding at Porth Eirias",hosted:4,again:"98%",bio:"Sunsets, sea air and my very fluffy dog."},
 sam:{name:"Sam",band:"22–30",area:"Colwyn Bay",upFor:["coffee","church"],interests:["Sketching","Film","Reading"],ask:"Sketching the pier",hosted:2,again:"100%",bio:"Works from home, fancies more human contact."},
 aled:{name:"Aled",band:"22–30",area:"Old Colwyn",upFor:["gym","gaming"],interests:["Football","Running","Climbing"],ask:"Couch to 5k tips",hosted:1,again:"95%",bio:"Training for my first 10k."},
 gwen:{name:"Gwen",band:"31–45",area:"Penrhyn Bay",upFor:["dogwalk","walk","coffee"],interests:["Cooking","Crafts","Reading"],ask:"Our rescue greyhound, Pip",hosted:6,again:"100%",bio:"New-ish to North Wales with a very lazy greyhound."},
 dev:{name:"Dev",band:"31–45",area:"Mochdre",upFor:["gym","coffee"],interests:["Running","Film","Cooking"],ask:"The perfect flat white",hosted:0,again:"—",bio:"Moved for work, looking for a gym buddy."},
 rhian:{name:"Rhian",band:"46–60",area:"Old Colwyn",upFor:["walk","church","coffee"],interests:["Crafts","Baking","Reading"],ask:"Welsh cakes (secret recipe)",hosted:2,again:"100%",bio:"Kids have flown the nest — time for new friends!"},
 cai:{name:"Cai",band:"16–17",area:"Rhos-on-Sea",upFor:["gaming","lunch"],interests:["Anime","Football","Board games"],ask:"Mario Kart shortcuts",hosted:1,again:"100%",bio:"Sixth form, big on games."},
 mali:{name:"Mali",band:"16–17",area:"Colwyn Bay",upFor:["lunch","coffee","walk"],interests:["Baking","Indie music","Sketching"],ask:"My sketchbook",hosted:2,again:"100%",bio:"Always drawing, always hungry."},
 osian:{name:"Osian",band:"16–17",area:"Penrhyn Bay",upFor:["gym","gaming"],interests:["Climbing","Football","Welsh rugby"],ask:"Bouldering grades",hosted:0,again:"—",bio:"Climbing and football."}
};

const SEED_PLANS=[
 {id:"p1",act:"lunch",title:"Lunch at Porth Eirias",venue:"porth",day:"Thu 1 Oct",time:"12:30",dur:60,spots:4,host:"priya",att:["priya","jess"],band:"18–21",approval:true,safety:true,desc:"Fancy a proper lunch instead of a meal deal on your own? Chat about anything — no pressure!"},
 {id:"p2",act:"walk",title:"Sunset walk on Rhos prom",venue:"rhosprom",day:"Fri 2 Oct",time:"18:00",dur:60,spots:5,host:"ffion",att:["ffion","noor"],band:"18–21",approval:true,safety:true,desc:"Easy stroll along the prom to watch the sunset. Slow pace, chips optional."},
 {id:"p3",act:"gaming",title:"Board games at the library",venue:"library",day:"Sat 3 Oct",time:"14:00",dur:120,spots:6,host:"tomos",att:["tomos"],band:"18–21",approval:true,safety:true,desc:"Bringing Catan and Uno. Complete beginners very welcome!"},
 {id:"p4",act:"coffee",title:"Coffee & sketching",venue:"eirias",day:"Sun 4 Oct",time:"11:00",dur:90,spots:4,host:"sam",att:["sam","aled"],band:"22–30",approval:true,safety:true,desc:"Bring a sketchbook (or don't) — mostly coffee and chat."},
 {id:"p5",act:"dogwalk",title:"Dog walk on Penrhyn Bay",venue:"penrhyn",day:"Sat 3 Oct",time:"10:00",dur:60,spots:6,host:"gwen",att:["gwen","dev"],band:"31–45",approval:true,safety:true,desc:"Dogs of all sizes welcome. No dog? Come anyway!"},
 {id:"p6",act:"coffee",title:"Coffee morning in the park",venue:"eirias",day:"Fri 2 Oct",time:"10:30",dur:60,spots:5,host:"rhian",att:["rhian"],band:"46–60",approval:true,safety:true,desc:"Tea, coffee and Welsh cakes."},
 {id:"t1",act:"lunch",title:"Lunch near college",venue:"college",day:"Thu 1 Oct",time:"12:15",dur:45,spots:5,host:"mali",att:["mali","osian"],band:"16–17",approval:true,safety:true,desc:"Quick lunch together between classes."},
 {id:"t2",act:"gaming",title:"Gaming club at the library",venue:"library",day:"Fri 2 Oct",time:"16:00",dur:90,spots:4,host:"cai",att:["cai"],band:"16–17",approval:true,safety:true,desc:"Switch and board games after school."}
];

const PHOTO_SVG='<svg viewBox="0 0 200 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB38A"/><stop offset="1" stop-color="#FFE3B5"/></linearGradient></defs><rect width="200" height="140" fill="url(#sky)"/><circle cx="140" cy="62" r="20" fill="#FFC94A"/><rect y="78" width="200" height="30" fill="#7FB6DA"/><path d="M0 84 Q25 80 50 84 T100 84 T150 84 T200 84" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/><rect y="104" width="200" height="36" fill="#E9D4B0"/><rect x="18" y="94" width="40" height="26" rx="4" fill="#F2644E"/><rect x="24" y="100" width="10" height="8" fill="#fff" opacity=".8"/><rect x="40" y="100" width="10" height="8" fill="#fff" opacity=".8"/><path d="M150 108 h30 v4 h-30z M156 112 v10 M174 112 v10" stroke="#8A6A46" stroke-width="3"/></svg>';
