import { useState, useEffect, useRef } from "react";

/* ── Local gallery photos (src/resort_gallery) ──
   Add or remove a line here for every photo you have, then add/remove the
   matching entry in `galleryPhotos` below. Rename the extension if yours
   aren't .jpg (e.g. pic1.png). */
import pic1 from "./resortPhotos/pic1.jpeg";
import pic2 from "./resortPhotos/pic2.jpeg";
import pic3 from "./resortPhotos/pic3.jpeg";
import pic4 from "./resortPhotos/pic4.jpeg";
import pic5 from "./resortPhotos/pic5.jpeg";

/* ── Working Unsplash Images ── */
const IMG = {
  premiumSuite:   "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
  luxurySuite:    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
  natureCottage:  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80",
  riversideRoom:  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=80",
  heritageVilla:  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
  forestChalet:   "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80",
  royalChamber:   "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80",
  gardenSuite:    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
  gangaRoom:      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=80",
  yamunaRoom:     "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
  saraswatiRoom:  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80",
  banquet1:       "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
  banquet2:       "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80",
  banquet3:       "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE8p-vdUFnXOx0nI5YEotDXaU2jkfQ4JADASpPfci3jYqDGxAWhKjIrG9zguN3DF364wc0FQCv5WxffjsEtmww1kW1LnZKGOXVb00ELOqnF5_hLQD57zsyxFGPl-_tJJ-z51fwR3tAxn12B=s1360-w1360-h1020-rw",
  banquet4:       "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG5ZgKWAjN8nFD-ndt3J62QWWj_9EQs9LXY1ZmL1VlCB14PO-IRIkSu21RLHdhFrTNawFb4q_EZBVdL8HCXgrvIpIyExaQUMpVleNQHFcro2QfR_VpzGqB_Wv7s2vM83FONlmevX0WAcDmc=s1360-w1360-h1020-rw",
  restInterior:   "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  foodBiryani:    "https://www.cookingcarnival.com/wp-content/uploads/2025/09/Vegetable-Dum-Biryani-2.webp",
  foodThali:      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
  foodDessert:    "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
};

/* Your local gallery photos — captions shown on hover. Add a row here for
   every extra import above (pic6, pic7, ...). */
const galleryPhotos = [
  { l: "The Resort",    i: pic1 },
  { l: "Event Walkway", i: pic2 },
  { l: "Wedding Mandap",  i: pic3 },
  { l: "Dining Area",  i: pic4 },
  { l: "Luxury Cottage Area",    i: pic5 },
];

const css = `


html,
body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

#root{
  width:100%;
  overflow-x:hidden;
}
@media (max-width:768px){

  .h-acts{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    gap:20px;
  }

  .btn-p,
  .btn-o{
    display:flex;
    align-items:center;
    justify-content:center;

    width:90%;
    max-width:320px;

    margin:0 auto;
    text-align:center;
  }

}
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#D9B36A;--gold-light:#F2D38C;--gold-pale:#3A2F1C;
  --g1:#0A0D1B;--g2:#0F1326;--g3:#141A33;--g4:#171D38;--g5:#1B2240;
  --g6:#1F2748;--g7:#242C52;--g8:#2A335E;
  --cream:#F5F1E6;--text-light:#C7C0AE;--text-mid:#9089A0;
  --accent:#3da873;--accent-light:#52c98c;
}
html{scroll-behavior:smooth}
body{font-family:'Jost',sans-serif;background:var(--g1);color:var(--cream);overflow-x:hidden}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--g1)}
::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,var(--gold),var(--accent));border-radius:2px}

/* NAVBAR */
.nb{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 48px;height:86px;display:flex;align-items:center;justify-content:space-between;transition:all .6s cubic-bezier(.4,0,.2,1)}
.nb.sc{background:rgba(10,13,27,.92);backdrop-filter:blur(32px);height:68px;border-bottom:1px solid rgba(217,179,106,.16);box-shadow:0 4px 40px rgba(0,0,0,.35)}
.nb-logo{cursor:pointer}
.nb-logo-t{font-family:'Cinzel',serif;font-size:16px;font-weight:700;color:var(--gold);letter-spacing:3px}
.nb-logo-s{font-size:8px;font-weight:300;color:var(--text-mid);letter-spacing:6px;text-transform:uppercase;margin-top:3px}
.nb-links{display:flex;align-items:center;gap:24px;list-style:none}
.nb-links a{font-family:'Cinzel',serif;font-size:9.5px;color:var(--text-light);text-decoration:none;letter-spacing:2px;text-transform:uppercase;transition:color .3s;position:relative;padding-bottom:5px}
.nb-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:linear-gradient(90deg,var(--gold),var(--accent-light));transition:width .4s}
.nb-links a:hover{color:var(--gold)}
.nb-links a:hover::after{width:100%}
.nb-cta{background:linear-gradient(135deg,var(--gold),var(--gold-light))!important;color:#1A1306!important;padding:10px 22px!important;font-weight:700!important;border-radius:2px;letter-spacing:2px!important;box-shadow:0 4px 20px rgba(217,179,106,.22);transition:all .35s!important}
.nb-cta::after{display:none!important}
.nb-cta:hover{transform:translateY(-2px)!important;box-shadow:0 8px 30px rgba(217,179,106,.4)!important}
.hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;z-index:1100;background:none;border:none;padding:4px}
.hbg span{display:block;width:26px;height:1.5px;background:var(--gold);transition:all .35s;transform-origin:center}
.hbg.op span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.hbg.op span:nth-child(2){opacity:0;transform:scaleX(0)}
.hbg.op span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
.mm{display:none;position:fixed;inset:0;z-index:1050;background:rgba(8,10,20,.98);flex-direction:column;align-items:center;justify-content:center;gap:44px;opacity:0;pointer-events:none;transition:opacity .45s}
.mm.op{display:flex;opacity:1;pointer-events:all}
.mm a{font-family:'Cinzel',serif;font-size:22px;color:var(--cream);text-decoration:none;letter-spacing:5px;transition:color .3s}
.mm a:hover{color:var(--gold)}

/* HERO */
.hero{height:100vh;min-height:700px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.h-bg{position:absolute;inset:0;background:radial-gradient(ellipse 140% 100% at 55% 20%,#1b2140 0%,#13182f 35%,#0c0f1f 70%,#070811 100%)}
.h-pat{position:absolute;inset:0;opacity:.07;background-image:repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(217,179,106,.5) 39px,rgba(217,179,106,.5) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(217,179,106,.5) 39px,rgba(217,179,106,.5) 40px)}
.h-topline{position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--gold),var(--accent-light),var(--gold),transparent);animation:tlineShim 4s ease-in-out infinite}
@keyframes tlineShim{0%,100%{opacity:.6}50%{opacity:1}}
.h-rings{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;overflow:hidden}
.h-ring{position:absolute;border-radius:50%}
.h-ring:nth-child(1){width:480px;height:480px;border:1px solid rgba(217,179,106,.16)}
.h-ring:nth-child(1){animation:rp 7s ease-in-out infinite}
.h-ring:nth-child(2){width:780px;height:780px;border:1px solid rgba(82,201,140,.12);animation:rp 7s ease-in-out infinite 1.75s}
.h-ring:nth-child(3){width:1100px;height:1100px;border:1px solid rgba(217,179,106,.10);animation:rp 7s ease-in-out infinite 3.5s}
.h-ring:nth-child(4){width:1420px;height:1420px;border:1px solid rgba(82,201,140,.08);animation:rp 7s ease-in-out infinite 5.25s}
@keyframes rp{0%,100%{transform:scale(1);opacity:.35}50%{transform:scale(1.04);opacity:.9}}
.h-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
.h-orb1{width:700px;height:700px;background:radial-gradient(circle,rgba(242,211,140,.22) 0%,transparent 60%);top:-250px;right:-200px;animation:od 13s ease-in-out infinite}
.h-orb2{width:500px;height:500px;background:radial-gradient(circle,rgba(217,179,106,.14) 0%,transparent 60%);bottom:-150px;left:5%;animation:od 10s ease-in-out infinite reverse 2s}
.h-orb3{width:350px;height:350px;background:radial-gradient(circle,rgba(82,201,140,.14) 0%,transparent 60%);top:35%;left:-100px;animation:od 16s ease-in-out infinite 4s}
@keyframes od{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-40px) scale(1.08)}66%{transform:translate(-20px,22px) scale(.95)}}
.h-parts{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.pt{position:absolute;border-radius:50%;animation:pf linear infinite}
@keyframes pf{0%{transform:translateY(100vh) scale(0);opacity:0}10%{opacity:.7;transform:translateY(80vh) scale(1)}90%{opacity:.2}100%{transform:translateY(-10vh) scale(.4);opacity:0}}
.h-cnt{position:relative;z-index:2;text-align:center;padding:0 28px;max-width:1000px}
.h-badge{display:inline-flex;align-items:center;gap:12px;font-size:9.5px;font-weight:300;letter-spacing:9px;text-transform:uppercase;color:var(--gold);border:1px solid rgba(217,179,106,.32);padding:10px 32px;margin-bottom:44px;animation:hfd 1.2s cubic-bezier(.4,0,.2,1) both;position:relative;overflow:hidden;background:rgba(255,255,255,.03)}
.h-badge::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(217,179,106,.18),transparent);transform:translateX(-100%);animation:shim 4s ease-in-out infinite 2s}
@keyframes shim{to{transform:translateX(200%)}}
.h-bdot{width:5px;height:5px;border-radius:50%;background:var(--gold);display:inline-block;box-shadow:0 0 8px rgba(217,179,106,.5)}
.h-title{font-family:'Cormorant Garamond',serif;font-size:clamp(52px,9.5vw,120px);font-weight:300;line-height:.88;color:var(--cream);margin-bottom:14px;animation:hfu 1.2s cubic-bezier(.4,0,.2,1) .25s both}
.h-title em{font-style:italic;background:linear-gradient(135deg,var(--gold-light),var(--gold),#e0788a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.h-sub{font-family:'Cinzel',serif;font-size:clamp(18px,2.8vw,40px);font-weight:600;letter-spacing:7px;color:var(--gold);text-transform:uppercase;display:block;margin-bottom:32px;animation:hfu 1.2s cubic-bezier(.4,0,.2,1) .42s both}
.h-tag{font-size:14px;font-weight:300;color:var(--text-light);letter-spacing:3px;margin-bottom:60px;animation:hfu 1.2s cubic-bezier(.4,0,.2,1) .58s both}
.h-acts{display:flex;align-items:center;justify-content:center;gap:22px;flex-wrap:wrap;animation:hfu 1.2s cubic-bezier(.4,0,.2,1) .74s both}
@keyframes hfd{from{opacity:0;transform:translateY(-32px)}to{opacity:1;transform:translateY(0)}}
@keyframes hfu{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@media (max-width:768px){

  .h-scr{
    position:absolute;
    left:50%;

    bottom:20px;

    transform:translateX(-50%);

    display:flex;

    align-items:center;

    justify-content:center;
    flex-direction:column;    

    width:auto;

    z-index:10;
  }

}

@media (max-width:768px){

  .h-cnt{
    width:100%;

    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;

    text-align:center;
  }

}
.h-scr-lbl{font-size:8.5px;letter-spacing:5px;color:var(--gold);opacity:.8;text-transform:uppercase}
.h-scr-line{width:1px;height:52px;background:rgba(217,179,106,.18);position:relative;overflow:hidden}
.h-scr-fill{position:absolute;top:-100%;width:100%;height:100%;background:linear-gradient(to bottom,transparent,var(--gold-light),var(--gold));animation:sd 2.4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes sd{0%{top:-100%;opacity:0}15%{opacity:1}80%{opacity:.8}100%{top:100%;opacity:0}}

/* BUTTONS */
.btn-p{background:linear-gradient(135deg,var(--gold),var(--gold-light));background-size:200% 200%;background-position:0% 50%;color:#1A1306;font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;padding:18px 48px;border:none;cursor:pointer;border-radius:2px;transition:all .4s cubic-bezier(.4,0,.2,1);text-decoration:none;display:inline-block;box-shadow:0 4px 24px rgba(217,179,106,.25)}
.btn-p:hover{background-position:100% 50%;transform:translateY(-5px) scale(1.02);box-shadow:0 18px 44px rgba(217,179,106,.4)}
.btn-p span{position:relative;z-index:1}
.btn-o{background:transparent;color:var(--gold);font-family:'Cinzel',serif;font-size:11px;font-weight:600;letter-spacing:3.5px;text-transform:uppercase;padding:17px 48px;border:1px solid rgba(217,179,106,.45);cursor:pointer;border-radius:2px;transition:all .4s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;text-decoration:none;display:inline-block}
.btn-o::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--gold),var(--gold-light));clip-path:inset(0 100% 0 0);transition:clip-path .4s cubic-bezier(.4,0,.2,1)}
.btn-o:hover::before{clip-path:inset(0 0% 0 0)}
.btn-o:hover{color:#1A1306;transform:translateY(-5px);box-shadow:0 14px 36px rgba(217,179,106,.3)}
.btn-o span{position:relative;z-index:1}

/* SECTION COMMONS */
section{padding:120px 0}
.ctr{max-width:1340px;margin:0 auto;padding:0 52px}
.s-lbl{font-size:9.5px;font-weight:300;letter-spacing:8px;text-transform:uppercase;color:var(--gold);margin-bottom:16px;display:block}
.s-title{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,5.5vw,70px);font-weight:300;color:var(--cream);line-height:1;margin-bottom:24px}
.s-title em{background:linear-gradient(135deg,var(--gold-light),var(--gold),var(--accent-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:italic}
.s-div{width:0;height:1px;background:linear-gradient(90deg,var(--gold),var(--accent),transparent);margin-bottom:36px;transition:width 1.2s cubic-bezier(.4,0,.2,1) .3s}
.s-div.visible{width:80px}
.s-txt{font-size:15.5px;font-weight:300;color:var(--text-light);line-height:2;max-width:560px}

/* REVEAL */
.rv{opacity:0;transform:translateY(48px);transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.4,0,.2,1)}
.rv.visible{opacity:1;transform:translateY(0)}
.rl{opacity:0;transform:translateX(-52px);transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.4,0,.2,1)}
.rl.visible{opacity:1;transform:translateX(0)}
.rr{opacity:0;transform:translateX(52px);transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.4,0,.2,1)}
.rr.visible{opacity:1;transform:translateX(0)}

/* ABOUT */
.abt-sec{background:var(--g2);position:relative;overflow:hidden}
.abt-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 80% 50%,rgba(82,201,140,.06) 0%,transparent 60%);pointer-events:none}
.abt-sec::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(217,179,106,.22),rgba(82,201,140,.16),transparent)}
.abt-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.abt-card{background:linear-gradient(145deg,var(--g4),var(--g2));border:1px solid rgba(217,179,106,.16);padding:56px;position:relative;overflow:hidden;transition:border-color .5s,box-shadow .5s}
.abt-card:hover{border-color:rgba(217,179,106,.35);box-shadow:0 24px 60px rgba(0,0,0,.4)}
.abt-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--accent-light),var(--gold),transparent);transform:scaleX(0);transition:transform .8s;transform-origin:left}
.abt-card:hover::before{transform:scaleX(1)}
.abt-card::after{content:'';position:absolute;bottom:-80px;right:-80px;width:220px;height:220px;border-radius:50%;border:1px solid rgba(217,179,106,.08)}
.abt-ring{position:absolute;bottom:-40px;right:-40px;width:110px;height:110px;border-radius:50%;border:1px solid rgba(217,179,106,.12)}
.abt-q{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--gold);font-style:italic;margin-bottom:20px;line-height:1.55}
.abt-sg{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:40px}
.si{text-align:center;padding:26px 14px;border:1px solid rgba(217,179,106,.14);background:rgba(217,179,106,.03);transition:all .4s cubic-bezier(.4,0,.2,1);cursor:default;position:relative;overflow:hidden}
.si::before{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(217,179,106,.08),rgba(82,201,140,.05));opacity:0;transition:opacity .4s}
.si::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--accent));transition:width .4s}
.si:hover{border-color:rgba(217,179,106,.4);transform:translateY(-5px);box-shadow:0 16px 36px rgba(0,0,0,.3)}
.si:hover::before{opacity:1}
.si:hover::after{width:80%}
.si-n{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:300;color:var(--gold);display:block;line-height:1;position:relative;z-index:1}
.si-l{font-size:9.5px;letter-spacing:3.5px;color:var(--text-mid);text-transform:uppercase;margin-top:8px;display:block;position:relative;z-index:1}
.fl{list-style:none;margin-top:32px}
.fl li{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(217,179,106,.1);font-size:14.5px;color:var(--text-light);cursor:default;transition:all .35s;position:relative}
.fl li::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:1px;background:linear-gradient(90deg,var(--gold),var(--accent),transparent);transform:scaleX(0);transition:transform .4s;transform-origin:left}
.fl li:hover{color:var(--cream);padding-left:10px}
.fl li:hover::after{transform:scaleX(1)}
.fdot{width:5px;height:5px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));flex-shrink:0;box-shadow:0 0 6px rgba(82,201,140,.4)}

/* ROOMS SLIDER */
.rm-sec{background:var(--g1);overflow:hidden}
.rm-outer{position:relative;overflow:hidden}
.rm-track{display:flex;transition:transform .9s cubic-bezier(.4,0,.2,1);will-change:transform}
.rm-card{position:relative;overflow:hidden;height:580px;flex-shrink:0;cursor:pointer;background:var(--g4)}
.rm-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.06);filter:brightness(.55) saturate(.9);transition:transform 1s cubic-bezier(.4,0,.2,1),filter .8s}
.rm-card:hover img{transform:scale(1.13);filter:brightness(.4) saturate(1.1)}
.rm-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,8,16,1) 0%,rgba(6,8,16,.75) 45%,rgba(6,8,16,.2) 75%,transparent 100%);transition:all .6s}
.rm-card:hover .rm-grad{background:linear-gradient(to top,rgba(6,8,16,1) 0%,rgba(6,8,16,.9) 55%,rgba(6,8,16,.45) 80%,rgba(6,8,16,.1) 100%)}
.rm-card::before{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;z-index:5;background:linear-gradient(to bottom,var(--gold-light),var(--gold),var(--accent),transparent);transform:scaleY(0);transform-origin:top;transition:transform .5s cubic-bezier(.4,0,.2,1)}
.rm-card:hover::before{transform:scaleY(1)}
.rm-cnt{position:absolute;bottom:0;left:0;right:0;padding:40px;z-index:3}
.rm-price{font-family:'Cormorant Garamond',serif;font-size:13px;color:var(--gold-light);letter-spacing:2.5px;margin-bottom:8px}
.rm-name{font-family:'Cinzel',serif;font-size:21px;font-weight:600;color:#FAF5EC;margin-bottom:10px}
.rm-meta{display:flex;gap:20px;font-size:11.5px;color:rgba(250,245,236,.6);letter-spacing:1.5px;margin-bottom:16px}
.rm-desc{font-size:13.5px;color:rgba(250,245,236,.78);line-height:1.7;opacity:0;transform:translateY(14px);max-height:0;overflow:hidden;transition:all .5s cubic-bezier(.4,0,.2,1)}
.rm-card:hover .rm-desc{opacity:1;transform:translateY(0);max-height:80px;margin-bottom:20px}
.rm-btn{background:transparent;color:var(--gold-light);font-family:'Cinzel',serif;font-size:9.5px;font-weight:600;letter-spacing:3px;padding:10px 26px;border:1px solid rgba(242,211,140,.5);cursor:pointer;opacity:0;transform:translateY(12px);transition:all .45s cubic-bezier(.4,0,.2,1) .08s;position:relative;overflow:hidden}
.rm-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--gold),var(--gold-light));clip-path:inset(0 100% 0 0);transition:clip-path .35s}
.rm-btn:hover::before{clip-path:inset(0 0% 0 0)}
.rm-btn:hover{color:#1A1306;border-color:var(--gold)}
.rm-btn span{position:relative;z-index:1}
.rm-card:hover .rm-btn{opacity:1;transform:translateY(0)}
.sl-pw{height:2px;background:rgba(217,179,106,.12);width:100%}
.sl-pb{height:100%;background:linear-gradient(90deg,var(--gold),var(--accent),var(--gold-light))}
.sl-ft{display:flex;align-items:center;justify-content:space-between;padding:28px 52px 0}
.sl-ctr{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--text-mid);letter-spacing:2px}
.sl-ctr span{color:var(--gold)}
.sl-dots{display:flex;gap:10px;align-items:center}
.sl-dot{width:6px;height:6px;border-radius:50%;background:rgba(217,179,106,.25);cursor:pointer;transition:all .4s;border:none}
.sl-dot.act{background:var(--gold);width:28px;border-radius:3px}
.sl-pbtn{width:44px;height:44px;border-radius:50%;border:1px solid rgba(217,179,106,.35);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--gold);transition:all .35s}
.sl-pbtn:hover{background:linear-gradient(135deg,var(--gold),var(--gold-light));color:#1A1306;border-color:var(--gold);transform:scale(1.1)}

/* AMENITIES */
.am-sec{background:var(--g2);position:relative;overflow:hidden}
.am-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(217,179,106,.1)}
.am-card{background:var(--g4);padding:48px 20px;text-align:center;position:relative;overflow:hidden;transition:all .45s cubic-bezier(.4,0,.2,1);cursor:default;min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.am-card::before{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(217,179,106,.07),rgba(82,201,140,.05));opacity:0;transition:opacity .45s}
.am-card::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--accent),transparent);transition:width .5s}
.am-card:hover{background:var(--g5);transform:translateY(-8px);box-shadow:0 20px 48px rgba(0,0,0,.35),0 0 0 1px rgba(217,179,106,.25);z-index:1}
.am-card:hover::before{opacity:1}
.am-card:hover::after{width:70%}
.am-ic{margin-bottom:20px;display:flex;align-items:center;justify-content:center;transition:transform .45s;width:64px;height:64px;border:1px solid rgba(217,179,106,.2);border-radius:50%;background:rgba(217,179,106,.05)}
.am-card:hover .am-ic{transform:scale(1.15) translateY(-4px);border-color:rgba(217,179,106,.45);box-shadow:0 0 20px rgba(217,179,106,.18)}
.am-nm{font-family:'Cinzel',serif;font-size:10.5px;font-weight:600;letter-spacing:2.5px;color:var(--gold);text-transform:uppercase;margin-bottom:10px}
.am-ds{font-size:12.5px;color:var(--text-mid);line-height:1.75}

/* BANQUET */
.bq-sec{background:var(--g1);position:relative;overflow:hidden}
.bq-sec::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(217,179,106,.22),rgba(82,201,140,.16),transparent)}
.bq-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.bq-im{position:relative;height:480px;overflow:hidden}
.bq-im img{width:100%;height:100%;object-fit:cover;filter:brightness(.7) saturate(.95);transition:transform .8s,filter .6s}
.bq-im:hover img{transform:scale(1.04);filter:brightness(.8) saturate(1.05)}
.bq-im::before{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(6,8,16,.6) 0%,transparent 60%);z-index:1}
.bq-im::after{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(to bottom,var(--gold),var(--accent));z-index:2}
.bq-ig{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
.bq-is{overflow:hidden;height:155px;position:relative;cursor:pointer}
.bq-is img{width:100%;height:100%;object-fit:cover;filter:brightness(.7);transition:transform .7s,filter .5s}
.bq-is:hover img{transform:scale(1.08);filter:brightness(.85)}
.bq-fts{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:40px}
.bq-ft{background:rgba(217,179,106,.03);border:1px solid rgba(217,179,106,.14);padding:26px;position:relative;overflow:hidden;transition:all .4s;cursor:default}
.bq-ft::before{content:'';position:absolute;top:0;left:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--gold),var(--accent));transform:scaleY(0);transition:transform .4s;transform-origin:bottom}
.bq-ft:hover::before{transform:scaleY(1)}
.bq-ft:hover{background:rgba(217,179,106,.08);border-color:rgba(217,179,106,.35);transform:translateY(-3px) translateX(4px)}
.bq-ft-t{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:2.5px}
.bq-cb{display:inline-flex;align-items:center;gap:12px;margin-top:32px;padding:16px 24px;border:1px solid rgba(217,179,106,.25);background:rgba(217,179,106,.05)}
.bq-cn{font-family:'Cormorant Garamond',serif;font-size:40px;color:var(--gold);font-weight:300;line-height:1}
.bq-cl{font-family:'Cinzel',serif;font-size:9px;color:var(--text-mid);letter-spacing:3px;text-transform:uppercase;line-height:1.6}

/* RESTAURANT */
.rs-sec{background:var(--g2)}
.rs-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
.rs-iw{position:relative}
.rs-im{height:400px;overflow:hidden;position:relative}
.rs-im img{width:100%;height:100%;object-fit:cover;filter:brightness(.7);transition:transform .8s,filter .6s}
.rs-im:hover img{transform:scale(1.04);filter:brightness(.85)}
.rs-im::after{content:'';position:absolute;bottom:0;left:0;right:0;height:80px;background:linear-gradient(to top,var(--g2),transparent)}
.rs-fg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px}
.rs-fi{height:100px;overflow:hidden}
.rs-fi img{width:100%;height:100%;object-fit:cover;filter:brightness(.7);transition:transform .6s,filter .4s}
.rs-fi:hover img{transform:scale(1.1);filter:brightness(.9)}
.m-tabs{display:flex;gap:2px;margin-bottom:36px}
.m-tab{padding:12px 20px;font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:2.5px;cursor:pointer;border:1px solid rgba(217,179,106,.2);background:transparent;color:var(--text-mid);transition:all .35s;white-space:nowrap}
.m-tab.act{background:linear-gradient(135deg,var(--gold),var(--gold-light));color:#1A1306;border-color:var(--gold)}
.m-tab:hover:not(.act){border-color:var(--gold);color:var(--gold)}
.m-items{display:flex;flex-direction:column;min-height:240px}
.m-item{display:flex;justify-content:space-between;align-items:flex-start;padding:18px 0;border-bottom:1px solid rgba(217,179,106,.1);transition:all .35s;cursor:default;position:relative}
.m-item::after{content:'';position:absolute;left:-8px;top:50%;transform:translateY(-50%);width:3px;height:0;background:linear-gradient(to bottom,var(--gold),var(--accent));transition:height .35s}
.m-item:hover{padding-left:12px}
.m-item:hover::after{height:60%}
.m-in{font-family:'Cormorant Garamond',serif;font-size:19px;color:var(--cream)}
.m-id{font-size:12px;color:var(--text-mid);margin-top:3px}
.m-ip{font-family:'Cormorant Garamond',serif;font-size:19px;color:var(--gold);white-space:nowrap;margin-left:16px}

/* GALLERY */
.gl-sec{background:var(--g2);padding:120px 0}
.gl-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,260px);grid-auto-rows:260px;gap:4px}
.gl-item{overflow:hidden;cursor:pointer;position:relative;background:var(--g4)}
.gl-item:nth-child(1){grid-column:span 2;grid-row:span 2}
.gl-item img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.7);transition:transform .8s cubic-bezier(.4,0,.2,1),filter .6s}
.gl-item:hover img{transform:scale(1.08);filter:brightness(.85)}
.gl-ov{position:absolute;inset:0;background:rgba(6,8,16,.55);opacity:0;transition:opacity .5s;display:flex;align-items:center;justify-content:center;z-index:2}
.gl-item:hover .gl-ov{opacity:1}
.gl-lbl{font-family:'Cinzel',serif;font-size:11px;color:var(--gold-light);letter-spacing:3px;margin-top:10px;text-transform:uppercase;transform:translateY(10px);transition:transform .4s .1s}
.gl-item:hover .gl-lbl{transform:translateY(0)}

/* ATTRACTIONS INFINITE */
.at-sec{background:var(--g1);overflow:hidden}
.at-inf{position:relative;overflow:hidden}
.at-inf::before,.at-inf::after{content:'';position:absolute;top:0;bottom:0;width:160px;z-index:5;pointer-events:none}
.at-inf::before{left:0;background:linear-gradient(to right,var(--g1),transparent)}
.at-inf::after{right:0;background:linear-gradient(to left,var(--g1),transparent)}
.at-tw{display:flex;gap:20px;animation:atl 30s linear infinite;width:max-content}
.at-tw:hover{animation-play-state:paused}
@keyframes atl{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.at-card{border:1px solid rgba(217,179,106,.14);padding:36px;background:var(--g4);position:relative;overflow:hidden;transition:all .45s cubic-bezier(.4,0,.2,1);cursor:default;width:310px;flex-shrink:0}
.at-card::before{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(217,179,106,.05),rgba(82,201,140,.04));opacity:0;transition:opacity .45s}
.at-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--accent-light),transparent);transform:scaleX(0);transform-origin:left;transition:transform .5s}
.at-card:hover{transform:translateY(-8px);border-color:rgba(217,179,106,.35);box-shadow:0 24px 56px rgba(0,0,0,.35)}
.at-card:hover::before{opacity:1}
.at-card:hover::after{transform:scaleX(1)}
.at-ic{margin-bottom:18px;width:52px;height:52px;border:1px solid rgba(217,179,106,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(217,179,106,.05);transition:all .45s}
.at-card:hover .at-ic{transform:scale(1.2) translateY(-4px);border-color:var(--gold);box-shadow:0 0 20px rgba(217,179,106,.2)}
.at-nm{font-family:'Cinzel',serif;font-size:12px;font-weight:600;color:var(--gold);letter-spacing:2.5px;margin-bottom:10px;text-transform:uppercase}
.at-dt{font-size:11px;color:var(--text-mid);letter-spacing:2px;margin-bottom:12px}
.at-ds{font-size:13px;color:var(--text-light);line-height:1.8}

/* TESTIMONIALS */
.ts-sec{background:var(--g2);position:relative;overflow:hidden}
.ts-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(217,179,106,.05) 0%,transparent 60%);pointer-events:none}
.ts-outer{position:relative;overflow:hidden}
.ts-track{display:flex;transition:transform .9s cubic-bezier(.4,0,.2,1);will-change:transform}
.ts-card{
 min-width:100%;
 width:100%;
 box-sizing:border-box;
 padding:56px 64px;
}
.ts-card::before{content:'';position:absolute;top:0;right:0;width:80px;height:80px;border-left:1px solid rgba(217,179,106,.16);border-bottom:1px solid rgba(217,179,106,.16)}
.ts-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--accent),transparent)}
.ts-q{font-family:'Cormorant Garamond',serif;font-size:90px;color:var(--gold);opacity:.22;line-height:.4;margin-bottom:24px;display:block}
.ts-txt{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:var(--cream);line-height:1.75;margin-bottom:32px;max-width:760px}
.ts-au{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:2.5px}
.ts-lo{font-size:13px;color:var(--text-mid);margin-top:6px}
.ts-stars{letter-spacing:3px;margin-bottom:24px;font-size:15px;color:var(--gold)}
.ts-foot{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:40px}
.ts-dot{width:6px;height:6px;border-radius:50%;background:rgba(217,179,106,.25);cursor:pointer;transition:all .4s;border:none}
.ts-dot.act{background:var(--gold);width:28px;border-radius:3px}
.ts-nav{width:48px;height:48px;border-radius:50%;border:1px solid rgba(217,179,106,.35);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--gold);transition:all .35s}
.ts-nav:hover{background:linear-gradient(135deg,var(--gold),var(--gold-light));color:#1A1306;border-color:var(--gold);transform:scale(1.1)}

/* BOOKING */
.bk-sec{background:var(--g1);position:relative;overflow:hidden}
.bk-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 20% 50%,rgba(82,201,140,.05) 0%,transparent 50%);pointer-events:none}
.bk-grid{display:grid;grid-template-columns:1fr 1fr;gap:96px;align-items:start}
.bk-form{background:linear-gradient(145deg,var(--g4),var(--g2));border:1px solid rgba(217,179,106,.16);padding:56px;position:relative;overflow:hidden;transition:border-color .4s,box-shadow .4s}
.bk-form:hover{border-color:rgba(217,179,106,.3);box-shadow:0 24px 64px rgba(0,0,0,.4)}
.bk-form::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--accent),var(--gold),transparent)}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.f-grp{margin-bottom:22px}
.f-lbl{display:block;font-family:'Cinzel',serif;font-size:9px;letter-spacing:3.5px;color:var(--gold);text-transform:uppercase;margin-bottom:10px}
.f-in,.f-sel{width:100%;background:rgba(217,179,106,.04);border:1px solid rgba(217,179,106,.2);color:var(--cream);padding:14px 18px;font-family:'Jost',sans-serif;font-size:14px;outline:none;transition:all .35s;border-radius:2px;appearance:none}
.f-in:focus,.f-sel:focus{border-color:var(--gold);background:rgba(217,179,106,.07);box-shadow:0 0 0 3px rgba(217,179,106,.12)}
.f-in::placeholder{color:rgba(245,241,230,.32)}
.f-sel option{background:var(--g2);color:var(--cream)}
.f-sub{width:100%;background:linear-gradient(135deg,var(--gold),var(--gold-light));background-size:200% 200%;color:#1A1306;font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:4px;padding:20px;border:none;cursor:pointer;text-transform:uppercase;transition:all .4s cubic-bezier(.4,0,.2,1);border-radius:2px;margin-top:8px}
.f-sub:hover{background-position:100% 50%;transform:translateY(-4px);box-shadow:0 16px 44px rgba(217,179,106,.4)}
.ci{padding-top:28px}
.ci-item{display:flex;align-items:flex-start;gap:20px;margin-bottom:36px;cursor:default}
.ci-ic{width:52px;height:52px;border:1px solid rgba(217,179,106,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--gold);transition:all .4s cubic-bezier(.4,0,.2,1)}
.ci-item:hover .ci-ic{background:rgba(217,179,106,.1);border-color:var(--gold);transform:scale(1.1) rotate(5deg);box-shadow:0 8px 20px rgba(217,179,106,.2)}
.ci-title{font-family:'Cinzel',serif;font-size:10.5px;color:var(--gold);letter-spacing:2.5px}
.ci-det{font-size:14px;color:var(--text-light);margin-top:5px;line-height:1.75}

/* FOOTER */
.ft{background:#05060D;padding:0;position:relative;overflow:hidden}
.ft::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 40% at 50% 0%,rgba(82,201,140,.07) 0%,transparent 50%);pointer-events:none}
.ft-tb{height:3px;background:linear-gradient(90deg,transparent,var(--gold-light),var(--accent-light),var(--gold-light),transparent)}
.ft-in{padding:80px 0 0}
.ft-sr{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(242,211,140,.1);margin-bottom:72px}
.ft-st{background:rgba(255,255,255,.025);padding:36px 20px;text-align:center;position:relative;overflow:hidden}
.ft-st::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:2px;background:linear-gradient(90deg,var(--gold-light),var(--accent-light));transition:width .5s}
.ft-st:hover::after{width:70%}
.ft-sn{font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:300;color:var(--gold-light);display:block;line-height:1}
.ft-sl{font-size:9px;letter-spacing:3px;color:#8E8AA6;text-transform:uppercase;margin-top:8px;display:block}
.ft-grid{display:grid;grid-template-columns:2.4fr 1fr 1fr 1.6fr;gap:56px;margin-bottom:72px}
.ft-bt{font-family:'Cinzel',serif;font-size:22px;background:linear-gradient(135deg,var(--gold-light),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:3px;margin-bottom:6px}
.ft-bs{font-size:9px;letter-spacing:6px;color:#7A7690;text-transform:uppercase;margin-bottom:22px}
.ft-bd{font-size:13.5px;color:#A6A1BC;line-height:1.9;max-width:290px}
.ft-ct{font-family:'Cinzel',serif;font-size:10.5px;color:var(--gold-light);letter-spacing:3.5px;text-transform:uppercase;margin-bottom:28px;padding-bottom:14px;border-bottom:1px solid rgba(242,211,140,.16);position:relative}
.ft-ct::after{content:'';position:absolute;bottom:-1px;left:0;width:28px;height:1px;background:var(--accent-light)}
.ft-lks{list-style:none}
.ft-lks li{margin-bottom:13px}
.ft-lks a{font-size:13.5px;color:#A6A1BC;text-decoration:none;transition:all .35s;display:inline-flex;align-items:center;gap:8px}
.ft-lks a::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--gold-light);opacity:0;transform:translateX(-8px);transition:all .35s;flex-shrink:0}
.ft-lks a:hover{color:var(--gold-light);padding-left:4px}
.ft-lks a:hover::before{opacity:1;transform:translateX(0)}
.ft-soc{display:flex;gap:10px;margin-top:30px}
.s-btn{width:42px;height:42px;border:1px solid rgba(242,211,140,.22);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#A6A1BC;cursor:pointer;text-decoration:none;transition:all .4s cubic-bezier(.4,0,.2,1)}
.s-btn:hover{border-color:var(--gold-light);color:var(--gold-light);transform:translateY(-5px) rotate(8deg);box-shadow:0 10px 24px rgba(242,211,140,.18);background:rgba(242,211,140,.07)}
.ft-nlt{font-family:'Cinzel',serif;font-size:10px;color:var(--gold-light);letter-spacing:3px;margin-bottom:14px}
.ft-nlf{display:flex;gap:0}
.ft-nli{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(242,211,140,.18);border-right:none;color:#FAF5EC;padding:12px 16px;font-family:'Jost',sans-serif;font-size:13px;outline:none;transition:border-color .3s}
.ft-nli:focus{border-color:rgba(242,211,140,.4)}
.ft-nli::placeholder{color:rgba(166,161,188,.5)}
.ft-nlb{background:linear-gradient(135deg,var(--gold),var(--gold-light));color:#1A1306;border:none;padding:12px 20px;cursor:pointer;font-family:'Cinzel',serif;font-size:9px;letter-spacing:2px;font-weight:700;transition:all .35s;flex-shrink:0}
.ft-nlb:hover{box-shadow:0 6px 24px rgba(242,211,140,.4)}
.ft-aw{margin-top:28px;display:flex;gap:12px;flex-wrap:wrap}
.ft-a{display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid rgba(242,211,140,.14);background:rgba(255,255,255,.02)}
.ft-at{font-family:'Cinzel',serif;font-size:8px;color:#7A7690;letter-spacing:1.5px;line-height:1.5}
.ft-div{height:1px;background:linear-gradient(90deg,transparent,rgba(242,211,140,.16),rgba(82,201,140,.12),transparent)}
.ft-bot{padding:28px 0;display:flex;justify-content:space-between;align-items:center}
.ft-bxt{font-size:12.5px;color:#7A7690}
.ft-bxt span{color:var(--gold-light)}
.ft-bls{display:flex;gap:28px}
.ft-bls a{font-size:12px;color:#7A7690;text-decoration:none;transition:color .3s;letter-spacing:1px}
.ft-bls a:hover{color:var(--gold-light)}

/* WHATSAPP & BACK TO TOP */
.wa-fl{position:fixed;bottom:40px;right:40px;z-index:991;background:rgba(23,29,56,.85);color:#52D17C;width:52px;height:52px;border-radius:50%;border:1px solid rgba(82,201,140,.35);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.4);text-decoration:none;transition:all .4s cubic-bezier(.4,0,.2,1);backdrop-filter:blur(12px)}
.wa-fl:hover{background:rgba(82,201,140,.14);color:#7CE8A4;border-color:rgba(82,201,140,.6);transform:translateY(-4px);box-shadow:0 12px 32px rgba(82,201,140,.22)}
.btt{position:fixed;bottom:36px;left:36px;z-index:990;width:48px;height:48px;border-radius:50%;background:rgba(23,29,56,.85);border:1px solid rgba(217,179,106,.35);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .4s cubic-bezier(.4,0,.2,1);opacity:0;transform:translateY(24px) scale(.9);backdrop-filter:blur(12px);color:var(--gold)}
.btt.vis{opacity:1;transform:translateY(0) scale(1)}
.btt:hover{background:linear-gradient(135deg,var(--gold),var(--gold-light));border-color:var(--gold);color:#1A1306;transform:translateY(-5px) scale(1.1);box-shadow:0 12px 30px rgba(217,179,106,.4)}

/* ALERT / TOAST */
.toast-wrap{position:fixed;top:96px;right:28px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none}
.toast{font-family:'Cinzel',serif;font-size:10.5px;font-weight:600;letter-spacing:2px;padding:16px 24px 16px 20px;border-radius:2px;display:flex;align-items:center;gap:12px;transform:translateX(120%);opacity:0;transition:all .45s cubic-bezier(.4,0,.2,1);pointer-events:none;max-width:340px;box-shadow:0 12px 32px rgba(0,0,0,.45)}
.toast.show{transform:translateX(0);opacity:1}
.toast.success{background:linear-gradient(135deg,#10241A,#0F2A1E);border:1px solid rgba(82,201,140,.35);color:#7CE8A4}
.toast.info{background:linear-gradient(135deg,#1B1A2E,#211F38);border:1px solid rgba(217,179,106,.35);color:#F2D38C}
.toast.warn{background:linear-gradient(135deg,#2A1E14,#33240F);border:1px solid rgba(217,150,60,.4);color:#F2C589}
.toast-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.toast.success .toast-dot{background:#52D17C;box-shadow:0 0 8px rgba(82,201,140,.5)}
.toast.info .toast-dot{background:var(--gold);box-shadow:0 0 8px rgba(217,179,106,.5)}
.toast.warn .toast-dot{background:#E0A24E;box-shadow:0 0 8px rgba(224,162,78,.5)}

/* SEC SCROLL */
.sec-sc{display:flex;flex-direction:column;align-items:center;gap:9px;margin-top:72px;cursor:pointer;opacity:.6;transition:opacity .3s}
.sec-sc:hover{opacity:1}
.sec-sc-l{font-size:8px;letter-spacing:4px;color:var(--gold);text-transform:uppercase}
.sec-sc-t{width:1px;height:48px;background:rgba(217,179,106,.15);position:relative;overflow:hidden}
.sec-sc-f{position:absolute;top:-100%;width:100%;height:100%;background:linear-gradient(to bottom,transparent,var(--gold));animation:sd 2.8s ease-in-out infinite}

/* RESPONSIVE */
@media(max-width:1280px){
  .nb-links{gap:14px}
  .nb-links a{font-size:8.5px;letter-spacing:1.5px}
  .nb-cta{padding:9px 16px!important}
}
@media(max-width:1024px){
  .abt-grid,.bq-grid,.rs-grid,.bk-grid{grid-template-columns:1fr;gap:56px}
  .ft-grid{grid-template-columns:1fr 1fr;gap:44px}
  .gl-grid{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(3,200px);grid-auto-rows:200px}
  .gl-item:nth-child(1){grid-column:span 2}
  .am-grid{grid-template-columns:repeat(4,1fr)}
  .ft-sr{grid-template-columns:repeat(2,1fr)}
  .ctr{padding:0 36px}
}
@media(max-width:880px){
  .nb-links{display:none}
  .hbg{display:flex}
}
@media(max-width:768px){

  .nb{
    padding:0 16px;
    height:72px;
  }

  .ctr{
    padding:0 16px;
  }

  section{
    padding:60px 0;
  }

  .h-title{
    font-size:clamp(38px,10vw,65px);
    line-height:1;
  }

  .h-sub{
    font-size:16px;
    letter-spacing:3px;
  }

  .h-tag{
    font-size:13px;
    letter-spacing:1px;
  }

  .h-acts{
    flex-direction:column;
    width:100%;
  }

  .btn-p,
  .btn-o{
    width:100%;
    max-width:320px;
    text-align:center;
  }

  .abt-grid,
  .bq-grid,
  .rs-grid,
  .bk-grid{
    grid-template-columns:1fr;
    gap:40px;
  }

  .abt-card,.bk-form{
    padding:36px 24px;
  }

  .abt-sg{
    grid-template-columns:1fr 1fr;
  }

  .am-grid{
    grid-template-columns:1fr 1fr;
  }

  .ft-grid{
    grid-template-columns:1fr;
  }

  .ft-sr{
    grid-template-columns:1fr 1fr;
  }

  .rm-card{
    height:420px;
  }

  .rm-cnt{
    padding:20px;
  }

  .sl-ft{
    padding:24px 16px 0;
  }

  .ts-card{
    padding:32px 24px;
  }

  .ts-txt{
    font-size:18px;
  }

  .gl-grid{
    grid-template-columns:1fr;
    gap:8px;
  }

  .gl-item{
    height:220px;
  }

  .gl-item:nth-child(1){
    grid-column:span 1;
    grid-row:span 1;
  }

  .f-row{
    grid-template-columns:1fr;
    gap:0;
  }

  .bq-fts{
    grid-template-columns:1fr;
  }

  .bq-im{
    height:300px;
  }

  .rs-im{
    height:280px;
  }

  .wa-fl{
    width:50px;
    height:50px;
    bottom:20px;
    right:20px;
  }

  .btt{
    display:none;
  }

  .ft-bot{
    flex-direction:column;
    gap:16px;
    text-align:center;
  }

  .ft-bls{
    gap:18px;
    flex-wrap:wrap;
    justify-content:center;
  }
}
@media(max-width:480px){

  .h-badge{
    letter-spacing:3px;
    padding:10px 16px;
  }

  .s-title{
    font-size:34px;
  }

  .abt-card,
  .bk-form,
  .ts-card{
    padding:20px;
  }

  .rm-name{
    font-size:18px;
  }

  .rm-meta{
    flex-wrap:wrap;
    gap:8px;
  }

  .abt-sg{
    grid-template-columns:1fr 1fr;
    gap:8px;
  }

  .si-n{
    font-size:36px;
  }

  .am-grid{
    grid-template-columns:1fr 1fr;
  }

  .m-tabs{
    flex-wrap:wrap;
  }

  .m-tab{
    flex:1 1 100%;
  }

  .ft-sr{
    grid-template-columns:1fr;
  }

  .ft-aw{
    flex-direction:column;
  }

  .nb-logo-t{
    font-size:13px;
  }

  .nb-logo-s{
    font-size:7px;
    letter-spacing:4px;
  }
}
/* ===== Custom Dining Note ===== */

.menu-note{

  width:fit-content;

  max-width:820px;

  margin:38px auto 0;

  padding:14px 24px;

  display:flex;

  align-items:center;

  justify-content:center;

  gap:12px;

  border-radius:999px;

  border:1px solid rgba(217,179,106,.18);

  background:rgba(217,179,106,.06);

  backdrop-filter:blur(8px);

  animation:menuFloat 5s ease-in-out infinite;
}

/* icon */

.menu-note-icon{

  color:var(--g1);

  font-size:16px;

  animation:menuPulse 2.5s ease-in-out infinite;
}

/* text */

.menu-note p{

  margin:0;

  color:rgba(255,255,255,.85);

  font-size:14px;

  font-weight:500;

  line-height:1.6;
}

/* subtle hover */

.menu-note:hover{

  transform:translateY(-3px);

  border-color:rgba(217,179,106,.4);

  transition:.3s ease;
}

/* animations */

@keyframes menuFloat{

  0%,100%{

    transform:translateY(0);
  }

  50%{

    transform:translateY(-4px);
  }

}

@keyframes menuPulse{

  0%,100%{

    opacity:.7;

    transform:scale(1);
  }

  50%{

    opacity:1;

    transform:scale(1.18);
  }

}

/* mobile */

@media(max-width:768px){

  .menu-note{

    width:92%;

    border-radius:20px;

    padding:14px 18px;

    text-align:center;
  }

  .menu-note p{

    font-size:13px;
  }

}

.view-more-wrap{
  display:flex;
  justify-content:center;
  margin-top:30px;
}

.menu-view-btn{
  background:linear-gradient(
    135deg,
    var(--gold),
    var(--gold-light)
  );

  color:#1A1306;
  border:none;
  padding:14px 32px;
  cursor:pointer;

  font-family:'Cinzel',serif;
  letter-spacing:2px;

  transition:.35s ease;
}

.menu-view-btn:hover{
  transform:translateY(-4px);
  box-shadow:0 12px 30px rgba(217,179,106,.35);
}

.chef-note{
  position:relative;
  overflow:hidden;

  display:flex;
  align-items:center;
  gap:20px;

  padding:24px;
  margin:30px 0;

  border:1px solid rgba(217,179,106,.2);

  background:linear-gradient(
    135deg,
    rgba(217,179,106,.08),
    rgba(82,201,140,.04)
  );

  backdrop-filter:blur(10px);

  animation:chefFloat 5s ease-in-out infinite;
}

.chef-note:hover{
  transform:translateY(-4px);
  box-shadow:0 20px 40px rgba(0,0,0,.3);
}

.chef-note-glow{
  position:absolute;
  width:250px;
  height:250px;

  top:-50%;
  left:-20%;

  background:radial-gradient(
    circle,
    rgba(217,179,106,.15),
    transparent 70%
  );

  animation:chefGlow 6s ease-in-out infinite;
}

.chef-note-icon{
  width:70px;
  height:70px;

  border-radius:50%;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:28px;

  background:rgba(217,179,106,.1);
  border:1px solid rgba(217,179,106,.25);

  flex-shrink:0;
}

.chef-note-label{
  display:block;

  margin-bottom:10px;

  font-size:10px;
  letter-spacing:3px;

  color:var(--gold);

  font-family:'Cinzel',serif;
}

.chef-note-content p{
  margin:0;
  line-height:1.8;
}

@keyframes chefFloat{
  0%,100%{
    transform:translateY(0);
  }

  50%{
    transform:translateY(-4px);
  }
}

@keyframes chefGlow{
  0%,100%{
    opacity:.5;
  }

  50%{
    opacity:1;
  }
}

@media(max-width:768px){
  .chef-note{
    flex-direction:column;
    text-align:center;
  }
}

.gallery-modal{
  position:fixed;
  inset:0;

  z-index:99999;

  display:flex;
  justify-content:center;
  align-items:center;

  background:rgba(0,0,0,.92);

  animation:fadeGallery .3s ease;
}

.gallery-modal-img{
  max-width:92%;
  max-height:92vh;

  object-fit:contain;

  border-radius:12px;

  box-shadow:0 25px 80px rgba(0,0,0,.6);

  animation:zoomGallery .3s ease;
}

.gallery-modal-close{
  position:absolute;

  top:24px;
  right:24px;

  width:52px;
  height:52px;

  border:none;
  border-radius:50%;

  cursor:pointer;

  font-size:24px;

  color:#fff;

  background:rgba(255,255,255,.12);

  backdrop-filter:blur(10px);

  transition:.3s ease;
}

.gallery-modal-close:hover{
  transform:rotate(90deg);
  background:rgba(255,255,255,.22);
}

.gl-item{
  cursor:pointer;
}

@keyframes fadeGallery{
  from{opacity:0;}
  to{opacity:1;}
}

@keyframes zoomGallery{
  from{
    opacity:0;
    transform:scale(.92);
  }
  to{
    opacity:1;
    transform:scale(1);
  }
}

`;

/* ── DATA ── */
const rooms = [
  {
    name: "Ganga Couple Room",
    price: "₹2,000 / Night",
    desc: "Comfortable room designed for couples with modern facilities.",
    bathrooms: 1,
    occupancy: 2,
    img: IMG.gangaRoom,
  },
  {
    name: "Ganga Deluxe Couple Room",
    price: "₹2,500 / Night",
    desc: "Premium couple room with larger interiors and enhanced comfort.",
    bathrooms: 1,
    occupancy: 2,
    img: IMG.gangaRoom,
  },
  {
    name: "Yamuna Family Room",
    price: "₹3,000 / Night",
    desc: "Ideal for families with spacious seating and sleeping arrangements.",
    bathrooms: 1,
    occupancy: 3,
    img: IMG.yamunaRoom,
  },
  {
    name: "Yamuna Deluxe Family Room",
    price: "₹3,500 / Night",
    desc: "Extra spacious family accommodation with premium furnishings.",
    bathrooms: 1,
    occupancy: 3,
    img: IMG.yamunaRoom,
  },
  {
    name: "Saraswati Family Suite",
    price: "₹4,000 / Night",
    desc: "Large family suite suitable for group stays and vacations.",
    bathrooms: 1,
    occupancy: 4,
    img: IMG.saraswatiRoom,
  },
  {
    name: "Saraswati Premium Suite",
    price: "₹4,500 / Night",
    desc: "Elegant suite offering maximum comfort and spacious interiors.",
    bathrooms: 2,
    occupancy: 4,
    img: IMG.saraswatiRoom,
  },
];

const amenities = [
  {
    nm: "Restaurant",
    ds: "Delicious vegetarian and family dining experience",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <path d="M6 2v10M10 2v10M8 2v20M18 2v8a3 3 0 0 1-3 3h-1v9"/>
      </svg>
    ),
  },

  {
    nm: "Banquet Hall",
    ds: "Perfect venue for weddings and events",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
      </svg>
    ),
  },

  {
    nm: "Children Park",
    ds: "Fun recreational area for families",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },

  {
    nm: "Free WiFi",
    ds: "High-speed internet throughout the property",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <path d="M2 8a16 16 0 0 1 20 0" />
        <path d="M5 12a11 11 0 0 1 14 0" />
        <path d="M8 16a6 6 0 0 1 8 0" />
        <circle cx="12" cy="20" r="1" fill="#D9B36A"/>
      </svg>
    ),
  },

  {
    nm: "Parking",
    ds: "Safe and spacious parking facility",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <rect x="4" y="3" width="16" height="18" rx="2"/>
        <path d="M9 17V7h4a3 3 0 1 1 0 6H9"/>
      </svg>
    ),
  },

  {
    nm: "24×7 Service",
    ds: "Dedicated guest support anytime",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },

  {
    nm: "Power Backup",
    ds: "Uninterrupted electricity supply",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <path d="M13 2L4 14h6l-1 8 9-12h-6z"/>
      </svg>
    ),
  },

  {
    nm: "Garden Area",
    ds: "Open green spaces for relaxation",
    ic: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5">
        <path d="M12 22V12"/>
        <path d="M12 12c-5 0-8-3-8-8 5 0 8 3 8 8z"/>
        <path d="M12 12c5 0 8-3 8-8-5 0-8 3-8 8z"/>
      </svg>
    ),
  },
];

const menuItems = {

  veg: [

    {
      name:"Alkapuri Special Dosa",
      desc:"Our signature crispy dosa served with flavourful fillings, fresh chutneys and authentic sambhar.",
      price:"₹199"
    },

    {
      name:"Paneer Butter Masala",
      desc:"Soft cottage cheese cubes cooked in a rich buttery tomato gravy with aromatic spices.",
      price:"₹199"
    },

    {
      name:"Kadai Paneer",
      desc:"Fresh paneer tossed with bell peppers, onions and traditional Indian spices.",
      price:"₹199"
    },

    {
      name:"Shahi Paneer",
      desc:"Royal paneer delicacy cooked in a creamy cashew-based gravy.",
      price:"₹180"
    },

    {
      name:"Malai Kofta",
      desc:"Soft vegetable dumplings served in a smooth and luxurious cream gravy.",
      price:"₹180"
    },

    {
      name:"Mix Veg",
      desc:"Farm-fresh seasonal vegetables cooked with house special spices.",
      price:"₹180"
    },

    {
      name:"Veg Biryani",
      desc:"Fragrant basmati rice layered with vegetables and aromatic herbs.",
      price:"₹120"
    },

    {
      name:"Veg Pulao",
      desc:"Lightly spiced rice preparation with fresh vegetables and herbs.",
      price:"₹120"
    },

    {
      name:"Chole Bhature",
      desc:"Classic North Indian chickpea curry served with fluffy fried bread.",
      price:"₹70"
    },

    {
      name:"Masala Dosa",
      desc:"Golden crispy dosa stuffed with seasoned potato masala.",
      price:"₹80"
    },

    {
      name:"Paneer Pizza",
      desc:"Cheesy pizza topped with marinated paneer and fresh vegetables.",
      price:"₹120"
    },

    {
      name:"Veg Club Sandwich",
      desc:"Triple layered sandwich loaded with fresh vegetables and sauces.",
      price:"₹99"
    },

    {
      name:"Veg Fried Rice",
      desc:"Wok tossed rice with vegetables and oriental flavours.",
      price:"₹99"
    },

    {
      name:"Chilli Paneer",
      desc:"Popular Indo-Chinese paneer tossed in spicy garlic sauce.",
      price:"₹130"
    },

    {
      name:"Honey Chilli Potato",
      desc:"Crispy potatoes glazed with honey and spicy seasonings.",
      price:"₹99"
    }

  ],

  beverages: [

    {
      name:"Tea",
      desc:"Freshly brewed tea prepared with premium tea leaves and aromatic spices.",
      price:"₹20"
    },

    {
      name:"Coffee",
      desc:"Classic hot coffee made from freshly brewed beans.",
      price:"₹30"
    },

    {
      name:"Cold Coffee",
      desc:"Smooth chilled coffee blended to perfection.",
      price:"₹80"
    },

    {
      name:"Cold Coffee With Ice Cream",
      desc:"Rich cold coffee topped with creamy ice cream.",
      price:"₹99"
    },

    {
      name:"Lassi",
      desc:"Traditional refreshing yogurt-based drink served chilled.",
      price:"₹50"
    },

    {
      name:"Banana Shake",
      desc:"Fresh banana blended into a creamy refreshing shake.",
      price:"₹50"
    },

    {
      name:"Date Shake",
      desc:"Healthy and naturally sweet date milkshake.",
      price:"₹80"
    },

    {
      name:"Strawberry Shake",
      desc:"Creamy strawberry milkshake prepared with fresh flavours.",
      price:"₹70"
    },

    {
      name:"Black Currant Shake",
      desc:"Refreshing berry flavoured shake with rich taste.",
      price:"₹70"
    },

    {
      name:"Blood Orange Shake",
      desc:"Citrusy and refreshing orange flavoured milkshake.",
      price:"₹70"
    },

    {
      name:"Mango Shake",
      desc:"Seasonal mango shake prepared with fresh mango pulp.",
      price:"₹70"
    },

    {
      name:"Orange Shake",
      desc:"Cool and refreshing orange flavoured beverage.",
      price:"₹70"
    }

  ]

};

const attractions = [
  {nm:"Triveni Sangam",     dt:"0.5 km",ds:"Sacred confluence of Ganga, Yamuna & Saraswati — holiest bathing ghat in India."},
  {nm:"Saraswati Ghat",     dt:"1.2 km",ds:"Peaceful ghat for boat rides, sunrise views, and evening aarti ceremonies."},
  {nm:"Nagvasuki Temple",   dt:"2.0 km",ds:"Ancient serpent deity temple, believed to be thousands of years old."},
  {nm:"Bade Hanuman Mandir",dt:"1.8 km",ds:"Unique reclining Hanuman idol, believed to protect the region from floods."},
  {nm:"Akshayavat",         dt:"3.0 km",ds:"The immortal banyan tree inside Allahabad Fort, revered across Hindu scriptures."},
  {nm:"Allahabad Fort",     dt:"3.5 km",ds:"Mughal-era fort built by Emperor Akbar in 1583, commanding Sangam views."},
  {nm:"Anand Bhavan",       dt:"4.2 km",ds:"Historic Nehru family mansion, now a museum of India's independence movement."},
  {nm:"Bharadwaj Ashram",   dt:"5.0 km",ds:"Ancient hermitage of sage Bharadwaj, one of the great saptarishi of Hindu mythology."},
];

const testimonials = [
  {txt:"The most peaceful escape near the Sangam. The cottage was breathtaking, service impeccable. We will return for Kumbh without a second thought.",au:"Priya & Rohit Sharma",lo:"Delhi, India",st:5},
  {txt:"For our anniversary, Alarkpuri was sheer perfection. The luxury suite felt like a dream — truly magical. Fine dining surpassed every expectation.",au:"Meera Krishnamurthy",lo:"Bengaluru, India",st:5},
  {txt:"We hosted our son's wedding reception here. Every detail was handled with such grace and precision. Extraordinary in every single sense.",au:"Suresh & Kamla Agarwal",lo:"Lucknow, India",st:5},
  {txt:"Came for a spiritual retreat and left completely transformed. Proximity to Sangam made morning dips effortless. The staff are incredibly warm.",au:"Dr. Arjun Pillai",lo:"Mumbai, India",st:5},
  {txt:"The Heritage Villa exceeded all expectations. Our family of six had immense space and comfort. The Awadhi architecture is simply stunning.",au:"Rajesh Malhotra",lo:"Kanpur, India",st:5},
  {txt:"As a solo pilgrim in Prayagraj, this resort was a true sanctuary. The spiritual tour package was thoughtfully arranged and deeply moving.",au:"Savitri Devi",lo:"Varanasi, India",st:5},
  {txt:"Corporate retreat that became a team milestone. Banquet setup was world-class, food excellent, and the views of Sangam at dawn were unforgettable.",au:"Vikram Sinha",lo:"Noida, India",st:5},
  {txt:"I've stayed at luxury hotels across India, but Alarkpuri's unique blend of spirituality and modern luxury is truly one of a kind. Returning soon.",au:"Ananya Chatterjee",lo:"Kolkata, India",st:5},
];

const navSecs = ['home','about','rooms','banquet','restaurant','attractions','booking'];
const SLIDE_IV = 4200;
const TEST_IV  = 5000;
const pts = Array.from({length:20},(_,i)=>({id:i,l:`${4+(i*4.8)%92}%`,dur:`${7+(i*1.5)%11}s`,del:`${(i*.7)%9}s`,sz:i%4===0?3:2,g:i%5===0}));

/* ── SVG Icons ── */
const Ic = {
  Up:   ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>,
  L:    ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
  R:    ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Ps:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  Pl:   ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Pin:  ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Ph:   ()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.1-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>,
  Ml:   ()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Cl:   ()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  WA:   ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
  FB:   ()=><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  IG:   ()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  YT:   ()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
  Aw:   ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
};

function useReveal() {
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.06});
    document.querySelectorAll('.rv,.rl,.rr,.s-div').forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
}
function SecScroll({to}){
  return(
    <div className="sec-sc" onClick={()=>document.getElementById(to)?.scrollIntoView({behavior:'smooth'})}>
      <span className="sec-sc-l">Continue</span>
      <div className="sec-sc-t"><div className="sec-sc-f"/></div>
    </div>
  );
}

export default function AlarkpuriResort(){
  const [scrolled,setScrolled] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [activeMenu,setActiveMenu] = useState('veg');
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showTop,setShowTop] = useState(false);
  const [slideIdx,setSlideIdx] = useState(0);
  const [progress,setProgress] = useState(0);
  const [paused,setPaused] = useState(false);
  const [testIdx,setTestIdx] = useState(0);
  const [nlEmail,setNlEmail] = useState('');
  const [toasts,setToasts] = useState([]);
  const [form,setForm] = useState({name:'',email:'',phone:'',checkin:'',checkout:'',guests:'2',roomType:'premium',message:''});
const [selectedImage, setSelectedImage] = useState(null);
  const timerRef=useRef(null), rafRef=useRef(null), startRef=useRef(null), testTimerRef=useRef(null);
  const toastIdRef = useRef(0);
  useReveal();

  const [visCount,setVisCount] = useState(3);
  useEffect(()=>{
    const upd=()=>setVisCount(window.innerWidth<=768?1:window.innerWidth<=1024?2:3);
    upd(); window.addEventListener('resize',upd); return()=>window.removeEventListener('resize',upd);
  },[]);
  const maxIdx = rooms.length - visCount;
  const cardW = 100/visCount;

  /* Auto-slide rooms */
  const startProg = ()=>{
    setProgress(0); startRef.current=performance.now();
    const tick=now=>{const p=Math.min(((now-startRef.current)/SLIDE_IV)*100,100);setProgress(p);if(p<100)rafRef.current=requestAnimationFrame(tick);};
    rafRef.current=requestAnimationFrame(tick);
  };
  const startTimer=()=>{clearTimeout(timerRef.current);cancelAnimationFrame(rafRef.current);startProg();timerRef.current=setTimeout(()=>setSlideIdx(i=>i>=maxIdx?0:i+1),SLIDE_IV);};
  useEffect(()=>{if(!paused)startTimer();return()=>{clearTimeout(timerRef.current);cancelAnimationFrame(rafRef.current);};},[paused,slideIdx,maxIdx]);

  /* Auto-slide testimonials */
  useEffect(()=>{
    testTimerRef.current=setInterval(()=>setTestIdx(i=>i>=testimonials.length-1?0:i+1),TEST_IV);
    return()=>clearInterval(testTimerRef.current);
  },[]);

  useEffect(()=>{
    const fn=()=>{setScrolled(window.scrollY>60);setShowTop(window.scrollY>400);};
    window.addEventListener('scroll',fn); return()=>window.removeEventListener('scroll',fn);
  },[]);

  const scrollTo = id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false);};

  /* Toast helper */
  const showToast = (msg, type='info') => {
    const id = ++toastIdRef.current;
    setToasts(t=>[...t,{id,msg,type,show:false}]);
    setTimeout(()=>setToasts(t=>t.map(x=>x.id===id?{...x,show:true}:x)),50);
    setTimeout(()=>setToasts(t=>t.map(x=>x.id===id?{...x,show:false}:x)),3800);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),4300);
  };

  const handleSubmit = e=>{
    e.preventDefault();
    showToast('Reservation request sent! We will contact you within 2 hours.','success');
    setForm({name:'',email:'',phone:'',checkin:'',checkout:'',guests:'2',roomType:'premium',message:''});
  };

  const handleNL = e=>{
    e.preventDefault();
    if(!nlEmail){showToast('Please enter your email address.','warn');return;}
    showToast('Subscribed successfully! Welcome to our newsletter.','success');
    setNlEmail('');
  };

  const handleSocial = (platform)=> showToast(`Opening ${platform}...`,'info');
  const handleWA = ()=> showToast('Opening WhatsApp chat with Alarkpuri Sangam...','success');
  const handleRoomBook = (roomName)=> { scrollTo('booking'); setTimeout(()=>showToast(`Room selected: ${roomName}. Please fill in your details below.`,'info'),600); };
  const handleEnquire = ()=>{ scrollTo('booking'); setTimeout(()=>showToast('Banquet enquiry — please fill in your details and we will reach out.','info'),600); };

  const testPrev = ()=>{ clearInterval(testTimerRef.current); setTestIdx(i=>Math.max(0,i-1)); };
  const testNext = ()=>{ clearInterval(testTimerRef.current); setTestIdx(i=>Math.min(testimonials.length-1,i+1)); };

  const attractDbl = [...attractions,...attractions];

  const handleMenuTab = (tab) => {
  setActiveMenu(tab);
  setShowAllMenu(false);
};

  return(
    <>
      <style>{css}</style>

      {/* ── TOASTS ── */}
      <div className="toast-wrap">
        {toasts.map(t=>(
          <div key={t.id} className={`toast ${t.type} ${t.show?'show':''}`}>
            <span className="toast-dot"/>
            {t.msg}
          </div>
        ))}
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nb ${scrolled?'sc':''}`}>
        <div className="nb-logo" onClick={()=>scrollTo('home')}>
          <div className="nb-logo-t">ALARKPURI SANGAM</div>
          <div className="nb-logo-s">Resort & Restaurant</div>
        </div>
        <ul className="nb-links">
          {navSecs.map(s=>(
            <li key={s}><a href={`#${s}`} onClick={e=>{e.preventDefault();scrollTo(s);}}>
              {s==='home'?'Home':s[0].toUpperCase()+s.slice(1)}
            </a></li>
          ))}
          <li><a href="#booking" className="nb-cta" onClick={e=>{e.preventDefault();scrollTo('booking');}}>Book Stay</a></li>
        </ul>
        <button className={`hbg ${menuOpen?'op':''}`} onClick={()=>setMenuOpen(m=>!m)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mm ${menuOpen?'op':''}`}>
        {navSecs.map(s=>(
          <a key={s} href={`#${s}`} onClick={e=>{e.preventDefault();scrollTo(s);}}>
            {s[0].toUpperCase()+s.slice(1)}
          </a>
        ))}
        <a href="#booking" onClick={e=>{e.preventDefault();scrollTo('booking');}} style={{color:'var(--gold)'}}>Book Stay</a>
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="h-bg"/><div className="h-pat"/>
        <div className="h-topline"/>
        <div className="h-rings"><div className="h-ring"/><div className="h-ring"/><div className="h-ring"/><div className="h-ring"/></div>
        <div className="h-orb h-orb1"/><div className="h-orb h-orb2"/><div className="h-orb h-orb3"/>
        <div className="h-parts">{pts.map(p=><div key={p.id} className={`pt ${p.g?'':'gold'}`} style={{left:p.l,bottom:'-10px',animationDuration:p.dur,animationDelay:p.del,width:p.sz,height:p.sz,background:p.g?'#52c98c':'#D9B36A'}}/>)}</div>
        <div className="h-cnt">
          <div className="h-badge"><span className="h-bdot"/> Prayagraj, Uttar Pradesh <span className="h-bdot"/></div>
          <h1 className="h-title"><em>Discover</em> Nature's</h1>
          <span className="h-sub">Bounty in Alarkpuri Sangam</span>
          <p className="h-tag">Where spirituality meets luxury — near the sacred Triveni Sangam</p>
          <div className="h-acts">
            <button className="btn-p" onClick={()=>scrollTo('booking')}><span>Book Your Stay</span></button>
            <button className="btn-o" onClick={()=>scrollTo('rooms')}><span>Explore Rooms</span></button>
          </div>
        </div>
        <div className="h-scr" onClick={()=>scrollTo('about')}>
          <span className="h-scr-lbl">Scroll</span>
          <div className="h-scr-line"><div className="h-scr-fill"/></div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="abt-sec">
        <div className="ctr">
          <div className="abt-grid">
            <div className="rl">
              <div className="abt-card">
                <div className="abt-ring"/>
                <div className="abt-q">"Where every sunrise is sacred"</div>
                <p style={{color:'var(--text-light)',lineHeight:1.9,fontSize:14.5,position:'relative',zIndex:1}}>
                  Nestled beside the confluence of three holy rivers, Alarkpuri Sangam Resort blends the reverence of Prayagraj with the indulgence of modern luxury.
                </p>
                <div className="abt-sg">
                  {[{n:"15+",l:"Luxury Rooms"},{n:"500+",l:"Events Hosted"},{n:"10K+",l:"Happy Guests"},{n:"0.5km",l:"From Sangam"}].map((s,i)=>(
                    <div key={s.l} className="si rv" style={{transitionDelay:`${.1+i*.12}s`}}>
                      <span className="si-n">{s.n}</span><span className="si-l">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rr" style={{transitionDelay:'.15s'}}>
              <span className="s-lbl">Welcome to Alarkpuri Sangam Resort</span>
              <h2 className="s-title">Your Ultimate Luxury <em>Retreat</em> in Prayagraj</h2>
              <div className="s-div"/>
              <p className="s-txt">Alarkpuri Sangam Resort is one of the most serene and nature-inspired resorts near the sacred Triveni Sangam — a perfect blend of comfort, spirituality, and natural beauty.</p>
              <ul className="fl">
                {["Prime location near Triveni Sangam","Luxury cottages with artisan interiors","Grand banquet hall for all events","Multi-cuisine fine dining restaurant","24×7 personalised room service","Guided spiritual & heritage tours"].map(f=>(
                  <li key={f}><div className="fdot"/>{f}</li>
                ))}
              </ul>
              <button className="btn-p" style={{marginTop:40}} onClick={()=>scrollTo('booking')}><span>Reserve Your Experience</span></button>
            </div>
          </div>
          <SecScroll to="rooms"/>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section id="rooms" className="rm-sec">
        <div className="ctr" style={{marginBottom:52}}>
          <div style={{textAlign:'center'}}>
            <span className="s-lbl rv">Discover Our Rooms</span>
            <h2 className="s-title rv" style={{textAlign:'center'}}>Luxurious <em>Accommodations</em></h2>
            <div className="s-div rv" style={{margin:'0 auto'}}/>
          </div>
        </div>
        <div className="sl-pw"><div className="sl-pb" style={{width:`${progress}%`}}/></div>
        <div className="rm-outer">
          <div className="rm-track" style={{transform:`translateX(-${slideIdx*cardW}%)`}}>
            {rooms.map(r=>(
              <div key={r.name} className="rm-card" style={{minWidth:`calc(${cardW}%)`}}
                onMouseEnter={()=>{setPaused(true);clearTimeout(timerRef.current);cancelAnimationFrame(rafRef.current);}}
                onMouseLeave={()=>setPaused(false)}
              >
                <img src={r.img} alt={r.name} loading="lazy" onError={e=>{e.target.style.display='none';}}/>
                <div className="rm-grad"/>
                <div className="rm-cnt">
                  <div className="rm-price">{r.price}</div>
                  <div className="rm-name">{r.name}</div>
                  <div className="rm-meta"><span>{r.bathrooms} Bath{r.bathrooms>1?'s':''}</span><span>Max {r.occupancy} Guests</span></div>
                  <div className="rm-desc">{r.desc}</div>
                  <button className="rm-btn" onClick={()=>handleRoomBook(r.name)}><span>Book Now</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sl-ft">
          <div className="sl-ctr"><span>{String(slideIdx+1).padStart(2,'0')}</span> / {String(rooms.length).padStart(2,'0')}</div>
          <div className="sl-dots">
            {Array.from({length:maxIdx+1}).map((_,i)=>(
              <button key={i} className={`sl-dot ${slideIdx===i?'act':''}`} onClick={()=>{setSlideIdx(i);setPaused(false);}}/>
            ))}
          </div>
          <button className="sl-pbtn" onClick={()=>setPaused(p=>!p)}>{paused?<Ic.Pl/>:<Ic.Ps/>}</button>
        </div>
        <div className="ctr"><SecScroll to="banquet"/></div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="am-sec">
        <div className="ctr">
          <div style={{textAlign:'center',marginBottom:60}}>
            <span className="s-lbl rv">What We Offer</span>
            <h2 className="s-title rv" style={{textAlign:'center'}}>Resort <em>Amenities</em></h2>
            <div className="s-div rv" style={{margin:'0 auto'}}/>
          </div>
          <div className="am-grid">
            {amenities.map((a,i)=>(
              <div key={a.nm} className="am-card rv" style={{transitionDelay:`${i*.08}s`}}>
                <div className="am-ic">{a.ic}</div>
                <div className="am-nm">{a.nm}</div>
                <div className="am-ds">{a.ds}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANQUET ── */}
      <section id="banquet" className="bq-sec">
        <div className="ctr">
          <div className="bq-grid">
            <div className="rl">
              <span className="s-lbl">Events & Celebrations</span>
              <h2 className="s-title">Best Banquet Hall in <em>Prayagraj</em></h2>
              <div className="s-div"/>
              <p className="s-txt">Modern facilities with a peaceful environment near the holy Triveni Sangam. Designed for weddings, receptions, birthday parties, corporate meetings, and family gatherings.</p>
              <div className="bq-fts">
                {["Weddings & Receptions","Corporate Events","Birthday Celebrations","Cultural Gatherings"].map(f=>(
                  <div key={f} className="bq-ft"><div className="bq-ft-t">{f}</div></div>
                ))}
              </div>
              <div className="bq-cb">
                <div><span className="bq-cn">500+</span></div>
                <div className="bq-cl">Events<br/>Hosted</div>
                <div style={{width:1,height:40,background:'rgba(217,179,106,.25)',margin:'0 6px'}}/>
                <div><span className="bq-cn">300</span></div>
                <div className="bq-cl">Guest<br/>Capacity</div>
              </div>
              <button className="btn-p" style={{marginTop:36}} onClick={handleEnquire}><span>Enquire for Events</span></button>
            </div>
            <div className="rr" style={{transitionDelay:'.15s'}}>
              <div className="bq-im"><img src={IMG.banquet1} alt="Banquet Hall" loading="lazy"/></div>
              <div className="bq-ig">
                <div className="bq-is"><img src={IMG.banquet2} alt="Wedding Setup" loading="lazy"/></div>
                <div className="bq-is"><img src={IMG.banquet3} alt="Event Decor" loading="lazy"/></div>
                <div className="bq-is"><img src={IMG.banquet4} alt="Corporate Event" loading="lazy"/></div>
                <div className="bq-is" style={{background:'var(--g5)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,cursor:'pointer'}} onClick={handleEnquire}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(217,179,106,.55)" strokeWidth="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span style={{fontFamily:"'Cinzel',serif",fontSize:8,color:'var(--text-mid)',letterSpacing:2,textAlign:'center',lineHeight:1.6}}>BOOK YOUR<br/>EVENT</span>
                </div>
              </div>
            </div>
          </div>
          <SecScroll to="restaurant"/>
        </div>
      </section>

      {/* ── RESTAURANT ── */}
      <section id="restaurant" className="rs-sec">
        <div className="ctr">
          <div style={{textAlign:'center',marginBottom:64}}>
            <span className="s-lbl rv">Culinary Excellence</span>
            <h2 className="s-title rv" style={{textAlign:'center'}}>Restaurant in <em>Prayagraj</em></h2>
            <div className="s-div rv" style={{margin:'0 auto'}}/>
            <p className="s-txt rv" style={{textAlign:'center',margin:'24px auto 0',maxWidth:600}}>Fine dining where taste, tradition, and elegance converge. Premium ambiance, delicious food, warm hospitality — in a peaceful nature-inspired setting.</p>
          </div>
          <div className="rs-grid">
            <div className="rl">
              <div className="rs-iw">
                <div className="rs-im"><img src={IMG.restInterior} alt="Restaurant Interior" loading="lazy"/></div>
                <div className="rs-fg">
                  <div className="rs-fi"><img src={IMG.foodBiryani} alt="Biryani" loading="lazy"/></div>
                  <div className="rs-fi"><img src={IMG.foodThali} alt="Thali" loading="lazy"/></div>
                  <div className="rs-fi"><img src={IMG.foodDessert} alt="Dessert" loading="lazy"/></div>
                </div>
              </div>
            </div>
            <div className="rr" style={{transitionDelay:'.15s'}}>
              <div className="m-tabs">
                {['veg','beverages'].map(tab=>(
                  <button key={tab} className={`m-tab ${activeMenu===tab?'act':''}`} onClick={()=>handleMenuTab(tab)}>
                    {tab==='veg'?'Vegetarian':tab==='nonveg'?'Non-Veg':'Beverages'}
                  </button>
                ))}
              </div>
             <div className="chef-note">
  <div className="chef-note-glow"></div>

  <div className="chef-note-icon">
    👨‍🍳
  </div>

  <div className="chef-note-content">
    <span className="chef-note-label">
      CHEF'S SPECIAL SERVICE
    </span>

    <p>
  Customized vegetarian dishes and beverages, crafted to suit your taste and dining preferences.
</p>
  </div>
</div>
             
             
              <div className="m-items">
  {(showAllMenu
    ? menuItems[activeMenu]
    : menuItems[activeMenu].slice(0, 10)
  ).map((item, i) => (
    <div key={item.name} className="m-item">
      <div>
        <div className="m-in">{item.name}</div>
        <div className="m-id">{item.desc}</div>
      </div>
      <div className="m-ip">{item.price}</div>
    </div>
  ))}
</div>

              {menuItems[activeMenu].length > 10 && (
  <div className="view-more-wrap">
    <button
      className="menu-view-btn"
      onClick={() => setShowAllMenu(!showAllMenu)}
    >
      {showAllMenu ? "Show Less" : "View More"}
    </button>
  </div>
)}
            </div>
          </div>
          <SecScroll to="attractions"/>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gl-sec">
        <div className="ctr" style={{marginBottom:52}}>
          <div style={{textAlign:'center'}}>
            <span className="s-lbl rv">Captured Moments</span>
            <h2 className="s-title rv" style={{textAlign:'center'}}>Resort <em>Gallery</em></h2>
            <div className="s-div rv" style={{margin:'0 auto'}}/>
          </div>
        </div>
        <div className="ctr">
          <div className="gl-grid rv">
            {galleryPhotos.map((g,i)=>(
  <div
    key={i}
    className="gl-item"
    onClick={() => setSelectedImage(g.i)}
  >
    <img src={g.i} alt={g.l} loading="lazy"/>

    <div className="gl-ov">
      <div style={{textAlign:'center'}}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>

        <div className="gl-lbl">{g.l}</div>
      </div>
    </div>
  </div>
))}
          </div>
        </div>
      </section>

      {selectedImage && (
  <div
    className="gallery-modal"
    onClick={() => setSelectedImage(null)}
  >
    <button
      className="gallery-modal-close"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedImage(null);
      }}
    >
      ✕
    </button>

    <img
      src={selectedImage}
      alt="Gallery"
      className="gallery-modal-img"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}

      {/* ── ATTRACTIONS INFINITE SCROLL ── */}
      <section id="attractions" className="at-sec">
        <div className="ctr" style={{marginBottom:64}}>
          <div style={{textAlign:'center'}}>
            <span className="s-lbl rv">Explore Prayagraj</span>
            <h2 className="s-title rv" style={{textAlign:'center'}}>Nearby <em>Attractions</em></h2>
            <div className="s-div rv" style={{margin:'0 auto'}}/>
          </div>
        </div>
        <div className="at-inf" style={{paddingBottom:20}}>
          <div className="at-tw">
            {attractDbl.map((a,i)=>(
              <div key={`${a.nm}-${i}`} className="at-card">
                <div className="at-ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="at-nm">{a.nm}</div>
                <div className="at-dt">{a.dt} away</div>
                <div className="at-ds">{a.ds}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ctr"><SecScroll to="booking"/></div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="ts-sec">
        <div className="ctr" style={{marginBottom:52}}>
          <div style={{textAlign:'center'}}>
            <span className="s-lbl rv">Guest Stories</span>
            <h2 className="s-title rv" style={{textAlign:'center'}}>What Our Guests <em>Say</em></h2>
            <div className="s-div rv" style={{margin:'0 auto'}}/>
          </div>
        </div>
        <div className="ctr">
          <div className="ts-outer">
            <div className="ts-track" style={{transform:`translateX(-${testIdx*100}%)`}}>
              {testimonials.map((t,i)=>(
                <div key={i} className="ts-card">
                  <span className="ts-q">"</span>
                  <div className="ts-stars">{"★".repeat(t.st)}</div>
                  <p className="ts-txt">{t.txt}</p>
                  <div className="ts-au">{t.au}</div>
                  <div className="ts-lo">{t.lo}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ts-foot">
            <button className="ts-nav" onClick={testPrev}><Ic.L/></button>
            {testimonials.map((_,i)=>(
              <button key={i} className={`ts-dot ${testIdx===i?'act':''}`} onClick={()=>{clearInterval(testTimerRef.current);setTestIdx(i);}}/>
            ))}
            <button className="ts-nav" onClick={testNext}><Ic.R/></button>
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="booking" className="bk-sec">
        <div className="ctr">
          <div style={{textAlign:'center',marginBottom:68}}>
            <span className="s-lbl rv">Reserve Your Stay</span>
            <h2 className="s-title rv" style={{textAlign:'center'}}>Book Your <em>Experience</em></h2>
            <div className="s-div rv" style={{margin:'0 auto'}}/>
          </div>
          <div className="bk-grid">
            <div className="rl">
              <div className="bk-form">
                <h3 style={{fontFamily:"'Cinzel',serif",fontSize:16,color:'var(--gold)',marginBottom:40,letterSpacing:3.5}}>RESERVATION ENQUIRY</h3>
                <form onSubmit={handleSubmit}>
                  <div className="f-row">
                    <div className="f-grp"><label className="f-lbl">Full Name</label><input className="f-in" type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
                    <div className="f-grp"><label className="f-lbl">Phone Number</label><input className="f-in" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/></div>
                  </div>
                  <div className="f-grp"><label className="f-lbl">Email Address</label><input className="f-in" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
                  <div className="f-row">
                    <div className="f-grp"><label className="f-lbl">Check-In</label><input className="f-in" type="date" value={form.checkin} onChange={e=>setForm({...form,checkin:e.target.value})} required/></div>
                    <div className="f-grp"><label className="f-lbl">Check-Out</label><input className="f-in" type="date" value={form.checkout} onChange={e=>setForm({...form,checkout:e.target.value})} required/></div>
                  </div>
                  <div className="f-row">
                    <div className="f-grp">
                      <label className="f-lbl">Room Type</label>
                      <select className="f-sel" value={form.roomType} onChange={e=>setForm({...form,roomType:e.target.value})}>
                         <option value="Ganga Couple Room">
    Ganga Couple Room - ₹2,000/Night
  </option>

  <option value="Ganga Deluxe Couple Room">
    Ganga Deluxe Couple Room - ₹2,500/Night
  </option>

  <option value="Yamuna Family Room">
    Yamuna Family Room - ₹3,000/Night
  </option>

  <option value="Yamuna Deluxe Family Room">
    Yamuna Deluxe Family Room - ₹3,500/Night
  </option>

  <option value="Saraswati Family Suite">
    Saraswati Family Suite - ₹4,000/Night
  </option>

  <option value="Saraswati Premium Suite">
    Saraswati Premium Suite - ₹4,500/Night
  </option>
                      </select>
                    </div>
                    <div className="f-grp">
                      <label className="f-lbl">Guests</label>
                      <select className="f-sel" value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}>
                        {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="f-grp"><label className="f-lbl">Special Requests</label><textarea className="f-in" rows={3} placeholder="Any special requirements..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:'vertical',minHeight:80}}/></div>
                  <button type="submit" className="f-sub">Send Reservation Request</button>
                </form>
              </div>
            </div>
            <div className="rr ci" style={{transitionDelay:'.18s'}}>
              <span className="s-lbl">Get In Touch</span>
              <h3 className="s-title" style={{fontSize:42}}>Contact <em>Us</em></h3>
              <div className="s-div"/>
              {[
                {I:Ic.Pin,title:"Address",    det:"Arazi No-84, Arail Kachhar, Naini\nPrayagraj - 211008, Uttar Pradesh"},
                {I:Ic.Ph, title:"Phone",      det:"+91 8737906519"},
                {I:Ic.Ml, title:"Email",      det:"alarkpurisangam1@gmail.com"},
                {I:Ic.Cl, title:"Check-in / Check-out",det:"Check-in: 2:00 PM\nCheck-out: 11:00 AM"},
              ].map(c=>(
                <div key={c.title} className="ci-item">
                  <div className="ci-ic"><c.I/></div>
                  <div>
                    <div className="ci-title">{c.title}</div>
                    <div className="ci-det" style={{whiteSpace:'pre-line'}}>{c.det}</div>
                  </div>
                </div>
              ))}
              <p style={{color:'var(--text-mid)',fontSize:12.5,marginBottom:16}}>Connect with us:</p>
              <div className="ft-soc">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={()=>handleSocial('Facebook')}><Ic.FB/></a>
                <a href="https://www.instagram.com/alarkpurisangam/" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={()=>showToast('Opening Instagram @alarkpurisangam','info')}><Ic.IG/></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={()=>handleSocial('YouTube')}><Ic.YT/></a>
                <a href="https://wa.me/918737906519" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={handleWA}><Ic.WA/></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ft">
        <div className="ft-tb"/>
        <div className="ctr ft-in">
          <div className="ft-sr">
            {[{n:"15+",l:"Luxury Rooms"},{n:"500+",l:"Events Hosted"},{n:"10K+",l:"Happy Guests"},{n:"0.5km",l:"From Sangam"}].map(s=>(
              <div key={s.l} className="ft-st">
                <span className="ft-sn">{s.n}</span>
                <span className="ft-sl">{s.l}</span>
              </div>
            ))}
          </div>
          <div className="ft-grid">
            <div>
              <div className="ft-bt">ALARKPURI SANGAM</div>
              <div className="ft-bs">Resort & Restaurant · Est. Prayagraj</div>
              <p className="ft-bd">A serene luxury retreat beside the sacred Triveni Sangam — an unforgettable blend of spirituality, nature, and modern indulgence in the heart of Prayagraj.</p>
              <div className="ft-soc">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={()=>handleSocial('Facebook')}><Ic.FB/></a>
                <a href="https://www.instagram.com/alarkpurisangam/" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={()=>showToast('Opening Instagram @alarkpurisangam','info')}><Ic.IG/></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={()=>handleSocial('YouTube')}><Ic.YT/></a>
                <a href="https://wa.me/918737906519" target="_blank" rel="noopener noreferrer" className="s-btn" onClick={handleWA}><Ic.WA/></a>
              </div>
              <div className="ft-aw">
                <div className="ft-a"><Ic.Aw/><div className="ft-at">BEST RESORT<br/>PRAYAGRAJ 2024</div></div>
                <div className="ft-a">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B36A" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <div className="ft-at">TRAVELLERS<br/>CHOICE 2025</div>
                </div>
              </div>
            </div>
            <div>
              <div className="ft-ct">Navigation</div>
              <ul className="ft-lks">
                {navSecs.map(s=>(
                  <li key={s}><a href={`#${s}`} onClick={e=>{e.preventDefault();scrollTo(s);}}>{s[0].toUpperCase()+s.slice(1)}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ft-ct">Facilities</div>
              <ul className="ft-lks">
                {["Luxury Cottages","Banquet Hall","Fine Dining","24×7 Room Service","Valet Parking","Wellness Spa","Spiritual Tours","Event Planning"].map(f=>(
                  <li key={f}><a href="#" onClick={e=>{e.preventDefault();scrollTo('booking');showToast(`Enquiring about: ${f}`,'info');}}>{f}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ft-ct">Contact Us</div>
              <p style={{fontSize:13.5,color:'#A6A1BC',lineHeight:2,marginBottom:20}}>
                Arazi No-84, Arail Kachhar<br/>Naini, Prayagraj - 211008<br/>Uttar Pradesh, India
              </p>
              <a href="tel:+918737906519" style={{display:'block',color:'var(--gold-light)',fontSize:14,fontFamily:"'Cinzel',serif",letterSpacing:1,textDecoration:'none',marginBottom:10}} onClick={()=>showToast('Calling +91 8737906519...','success')}>+91 8737906519</a>
              <a href="mailto:alarkpurisangam1@gmail.com" style={{display:'block',fontSize:13,color:'#A6A1BC',textDecoration:'none',marginBottom:32}} onClick={()=>showToast('Opening email client...','info')}>alarkpurisangam1@gmail.com</a>
              <div className="ft-nlt">Stay Updated</div>
              <form className="ft-nlf" onSubmit={handleNL}>
                <input className="ft-nli" type="email" placeholder="Your email address" value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/>
                <button type="submit" className="ft-nlb">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="ft-div"/>
          <div className="ft-bot">
            <div className="ft-bxt">&copy; 2026 <span>Alarkpuri Sangam Resort</span>. All rights reserved.</div>
            <div className="ft-bls">
              <a href="#" onClick={e=>{e.preventDefault();showToast('Privacy Policy — coming soon.','info');}}>Privacy Policy</a>
              <a href="#" onClick={e=>{e.preventDefault();showToast('Terms & Conditions — coming soon.','info');}}>Terms & Conditions</a>
              <a href="#" onClick={e=>{e.preventDefault();showToast('Sitemap — coming soon.','info');}}>Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP ── */}
      <a href="https://wa.me/918737906519" className="wa-fl" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" onClick={handleWA}>
        <Ic.WA/>
      </a>

      {/* ── BACK TO TOP ── */}
      <button className={`btt ${showTop?'vis':''}`} onClick={()=>{window.scrollTo({top:0,behavior:'smooth'});showToast('Back to top!','info');}} title="Back to top">
        <Ic.Up/>
      </button>
    </>
  );
}