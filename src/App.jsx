import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-pale: #F5E6C0;
    --gold-dim: #8A6E30;
    --navy-deep: #05070D;
    --navy: #09111E;
    --navy-mid: #111A2E;
    --navy-light: #1A2640;
    --navy-bright: #243050;
    --crimson: #8B1A2E;
    --crimson-light: #C4304A;
    --teal: #0D6E7A;
    --teal-light: #17A3B8;
    --cream: #FAF5EC;
    --text-light: #BDB09A;
    --text-mid: #7A6E5E;
    --ruby: #7A1522;
    --amber: #B87333;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Jost', sans-serif; background: var(--navy-deep); color: var(--cream); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--navy-deep); }
  ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, var(--gold), var(--crimson-light)); border-radius: 2px; }

  /* NAVBAR */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0 52px; height: 88px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .navbar.scrolled {
    background: rgba(5,7,13,0.97); backdrop-filter: blur(32px);
    height: 68px; border-bottom: 1px solid rgba(201,168,76,0.18);
    box-shadow: 0 4px 80px rgba(0,0,0,0.8);
  }
  .nav-logo { cursor: pointer; }
  .nav-logo-title { font-family:'Cinzel',serif; font-size:16.5px; font-weight:700; color:var(--gold); letter-spacing:3.5px; }
  .nav-logo-sub { font-size:8.5px; font-weight:300; color:var(--text-mid); letter-spacing:6px; text-transform:uppercase; margin-top:3px; }
  .nav-links { display:flex; align-items:center; gap:30px; list-style:none; }
  .nav-links a {
    font-family:'Cinzel',serif; font-size:10px; color:var(--text-light);
    text-decoration:none; letter-spacing:2.5px; text-transform:uppercase;
    transition:color 0.3s; position:relative; padding-bottom:5px;
  }
  .nav-links a::after {
    content:''; position:absolute; bottom:0; left:0; width:0; height:1px;
    background:linear-gradient(90deg,var(--gold),var(--crimson-light));
    transition:width 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-links a:hover { color:var(--gold); }
  .nav-links a:hover::after { width:100%; }
  .nav-cta {
    background:linear-gradient(135deg,var(--gold),var(--gold-light)) !important;
    color:var(--navy-deep) !important; padding:10px 24px !important;
    font-weight:700 !important; border-radius:2px; letter-spacing:2px !important;
    box-shadow:0 0 30px rgba(201,168,76,0.25);
    transition:all 0.35s cubic-bezier(0.4,0,0.2,1) !important;
  }
  .nav-cta::after { display:none !important; }
  .nav-cta:hover { transform:translateY(-2px) !important; box-shadow:0 8px 36px rgba(201,168,76,0.55) !important; }

  .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; z-index:1100; background:none; border:none; padding:4px; }
  .hamburger span { display:block; width:26px; height:1.5px; background:var(--gold); transition:all 0.35s cubic-bezier(0.4,0,0.2,1); transform-origin:center; }
  .hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
  .hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }
  .mobile-menu {
    display:none; position:fixed; inset:0; z-index:1050;
    background:rgba(5,7,13,0.99); backdrop-filter:blur(32px);
    flex-direction:column; align-items:center; justify-content:center; gap:44px;
    opacity:0; pointer-events:none; transition:opacity 0.45s;
  }
  .mobile-menu.open { opacity:1; pointer-events:all; }
  .mobile-menu a { font-family:'Cinzel',serif; font-size:22px; color:var(--cream); text-decoration:none; letter-spacing:5px; transition:color 0.3s; }
  .mobile-menu a:hover { color:var(--gold); }

  /* HERO */
  .hero { height:100vh; min-height:700px; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
  .hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse 140% 100% at 60% 20%, #150a20 0%, #0b0d1e 30%, #050712 70%, #05070d 100%); }
  .hero-pattern {
    position:absolute; inset:0; opacity:0.025;
    background-image:repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.5) 39px, rgba(201,168,76,0.5) 40px),
    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.5) 39px, rgba(201,168,76,0.5) 40px);
  }
  .hero-rings { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; overflow:hidden; }
  .hero-ring { position:absolute; border-radius:50%; border:1px solid rgba(201,168,76,0.06); }
  .hero-ring:nth-child(1) { width:480px; height:480px; animation:ringPulse 7s ease-in-out infinite; }
  .hero-ring:nth-child(2) { width:780px; height:780px; animation:ringPulse 7s ease-in-out infinite 1.75s; border-color:rgba(139,26,46,0.06); }
  .hero-ring:nth-child(3) { width:1080px; height:1080px; animation:ringPulse 7s ease-in-out infinite 3.5s; }
  .hero-ring:nth-child(4) { width:1400px; height:1400px; animation:ringPulse 7s ease-in-out infinite 5.25s; border-color:rgba(139,26,46,0.04); }
  @keyframes ringPulse { 0%,100%{transform:scale(1);opacity:0.35;} 50%{transform:scale(1.04);opacity:0.85;} }

  .hero-orb { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
  .hero-orb-1 { width:700px; height:700px; background:radial-gradient(circle,rgba(80,30,130,0.22) 0%,transparent 60%); top:-250px; right:-200px; animation:orbDrift 13s ease-in-out infinite; }
  .hero-orb-2 { width:500px; height:500px; background:radial-gradient(circle,rgba(139,26,46,0.12) 0%,transparent 60%); bottom:-150px; left:5%; animation:orbDrift 10s ease-in-out infinite reverse 2s; }
  .hero-orb-3 { width:350px; height:350px; background:radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 60%); top:35%; left:-100px; animation:orbDrift 16s ease-in-out infinite 4s; }
  .hero-orb-4 { width:280px; height:280px; background:radial-gradient(circle,rgba(13,110,122,0.1) 0%,transparent 60%); bottom:20%; right:10%; animation:orbDrift 11s ease-in-out infinite 1s; }
  @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-40px) scale(1.08);} 66%{transform:translate(-20px,22px) scale(0.95);} }

  .hero-particles { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
  .particle { position:absolute; border-radius:50%; background:var(--gold); animation:particleFloat linear infinite; }
  .particle.crimson { background:var(--crimson-light); }
  @keyframes particleFloat { 0%{transform:translateY(100vh) scale(0);opacity:0;} 10%{opacity:0.7;transform:translateY(80vh) scale(1);} 90%{opacity:0.2;} 100%{transform:translateY(-10vh) scale(0.4);opacity:0;} }

  .hero-content { position:relative; z-index:2; text-align:center; padding:0 28px; max-width:1000px; }
  .hero-badge {
    display:inline-flex; align-items:center; gap:12px;
    font-size:9.5px; font-weight:300; letter-spacing:9px; text-transform:uppercase;
    color:var(--gold); border:1px solid rgba(201,168,76,0.3);
    padding:10px 32px; margin-bottom:44px;
    animation:heroFadeDown 1.2s cubic-bezier(0.4,0,0.2,1) both;
    position:relative; overflow:hidden; background:rgba(201,168,76,0.04);
  }
  .hero-badge::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(201,168,76,0.12),transparent);
    transform:translateX(-100%); animation:shimmer 4s ease-in-out infinite 2s;
  }
  @keyframes shimmer { to { transform:translateX(200%); } }
  .hero-badge-dot { width:5px; height:5px; border-radius:50%; background:var(--gold); display:inline-block; box-shadow:0 0 8px rgba(201,168,76,0.6); }

  .hero-title {
    font-family:'Cormorant Garamond',serif; font-size:clamp(52px,9.5vw,120px);
    font-weight:300; line-height:0.88; color:var(--cream); margin-bottom:14px;
    animation:heroFadeUp 1.2s cubic-bezier(0.4,0,0.2,1) 0.25s both;
  }
  .hero-title em { font-style:italic; 
    background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--crimson-light));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-subtitle-block {
    font-family:'Cinzel',serif; font-size:clamp(18px,2.8vw,40px);
    font-weight:600; letter-spacing:7px; color:var(--gold);
    text-transform:uppercase; display:block; margin-bottom:32px;
    animation:heroFadeUp 1.2s cubic-bezier(0.4,0,0.2,1) 0.42s both;
  }
  .hero-tagline {
    font-size:14px; font-weight:300; color:var(--text-light);
    letter-spacing:3px; margin-bottom:60px;
    animation:heroFadeUp 1.2s cubic-bezier(0.4,0,0.2,1) 0.58s both;
  }
  .hero-actions {
    display:flex; align-items:center; justify-content:center; gap:22px; flex-wrap:wrap;
    animation:heroFadeUp 1.2s cubic-bezier(0.4,0,0.2,1) 0.74s both;
  }
  @keyframes heroFadeDown { from{opacity:0;transform:translateY(-32px);} to{opacity:1;transform:translateY(0);} }
  @keyframes heroFadeUp   { from{opacity:0;transform:translateY(32px);}  to{opacity:1;transform:translateY(0);} }

  /* BUTTONS */
  .btn-primary {
    background:linear-gradient(135deg,var(--gold),var(--gold-light),var(--gold));
    background-size:200% 200%; background-position:0% 50%;
    color:var(--navy-deep); font-family:'Cinzel',serif; font-size:11px;
    font-weight:700; letter-spacing:3.5px; text-transform:uppercase;
    padding:18px 48px; border:none; cursor:pointer; border-radius:2px;
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
    text-decoration:none; display:inline-block; position:relative; overflow:hidden;
    box-shadow:0 4px 28px rgba(201,168,76,0.25);
  }
  .btn-primary:hover { background-position:100% 50%; transform:translateY(-5px) scale(1.02); box-shadow:0 22px 56px rgba(201,168,76,0.55); }
  .btn-primary span { position:relative; z-index:1; }

  .btn-outline {
    background:transparent; color:var(--gold); font-family:'Cinzel',serif; font-size:11px;
    font-weight:600; letter-spacing:3.5px; text-transform:uppercase; padding:17px 48px;
    border:1px solid rgba(201,168,76,0.5); cursor:pointer; border-radius:2px;
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1); position:relative; overflow:hidden;
    text-decoration:none; display:inline-block;
  }
  .btn-outline::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,var(--gold),var(--gold-light)); clip-path:inset(0 100% 0 0); transition:clip-path 0.4s cubic-bezier(0.4,0,0.2,1); }
  .btn-outline:hover::before { clip-path:inset(0 0% 0 0); }
  .btn-outline:hover { color:var(--navy-deep); transform:translateY(-5px); box-shadow:0 18px 44px rgba(201,168,76,0.35); }
  .btn-outline span { position:relative; z-index:1; }

  /* SCROLL INDICATOR - fixed: centered, no overlap with buttons */
  .hero-scroll {
    position:absolute; bottom:36px; left:50%; transform:translateX(-50%);
    display:flex; flex-direction:column; align-items:center; gap:10px; cursor:pointer; z-index:5;
    animation:heroFadeUp 1s ease 1.4s both; width:auto; white-space:nowrap;
  }
  .hero-scroll-label { font-size:8.5px; letter-spacing:5px; color:var(--gold); opacity:0.7; text-transform:uppercase; }
  .hero-scroll-line { width:1px; height:56px; background:rgba(201,168,76,0.12); position:relative; overflow:hidden; }
  .hero-scroll-fill { position:absolute; top:-100%; width:100%; height:100%; background:linear-gradient(to bottom,transparent,var(--gold-light),var(--gold)); animation:scrollDrop 2.4s cubic-bezier(0.4,0,0.2,1) infinite; }
  @keyframes scrollDrop { 0%{top:-100%;opacity:0;} 15%{opacity:1;} 80%{opacity:0.8;} 100%{top:100%;opacity:0;} }

  .sec-scroll { display:flex; flex-direction:column; align-items:center; gap:9px; margin-top:72px; cursor:pointer; opacity:0.6; transition:opacity 0.3s; }
  .sec-scroll:hover { opacity:1; }
  .sec-scroll-label { font-size:8px; letter-spacing:4px; color:var(--gold); text-transform:uppercase; }
  .sec-scroll-track { width:1px; height:48px; background:rgba(201,168,76,0.1); position:relative; overflow:hidden; }
  .sec-scroll-fill { position:absolute; top:-100%; width:100%; height:100%; background:linear-gradient(to bottom,transparent,var(--gold)); animation:scrollDrop 2.8s ease-in-out infinite; }

  /* BACK TO TOP - hidden on mobile */
  .back-to-top {
    position:fixed; bottom:36px; left:36px; z-index:990;
    width:48px; height:48px; border-radius:50%;
    background:rgba(5,7,13,0.92); border:1px solid rgba(201,168,76,0.35);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
    opacity:0; transform:translateY(24px) scale(0.9);
    backdrop-filter:blur(12px); color:var(--gold);
  }
  .back-to-top.visible { opacity:1; transform:translateY(0) scale(1); }
  .back-to-top:hover { background:linear-gradient(135deg,var(--gold),var(--gold-light)); border-color:var(--gold); color:var(--navy-deep); transform:translateY(-5px) scale(1.1); box-shadow:0 12px 36px rgba(201,168,76,0.5); }

  /* SECTION COMMONS */
  section { padding:120px 0; }
  .container { max-width:1340px; margin:0 auto; padding:0 52px; }
  .section-label { font-size:9.5px; font-weight:300; letter-spacing:8px; text-transform:uppercase; color:var(--gold); margin-bottom:16px; display:block; }
  .section-title { font-family:'Cormorant Garamond',serif; font-size:clamp(38px,5.5vw,70px); font-weight:300; color:var(--cream); line-height:1.0; margin-bottom:24px; }
  .section-title em { 
    background:linear-gradient(135deg,var(--gold-light),var(--gold),var(--crimson-light));
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    font-style:italic;
  }
  .section-divider { width:0; height:1px; background:linear-gradient(90deg,var(--gold),var(--crimson-light),transparent); margin-bottom:36px; transition:width 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s; }
  .section-divider.visible { width:80px; }
  .section-text { font-size:15.5px; font-weight:300; color:var(--text-light); line-height:2.0; max-width:560px; }

  /* REVEAL ANIMATIONS */
  .reveal { opacity:0; transform:translateY(48px); transition:opacity 0.9s cubic-bezier(0.4,0,0.2,1),transform 0.9s cubic-bezier(0.4,0,0.2,1); }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-left { opacity:0; transform:translateX(-52px); transition:opacity 0.9s cubic-bezier(0.4,0,0.2,1),transform 0.9s cubic-bezier(0.4,0,0.2,1); }
  .reveal-left.visible { opacity:1; transform:translateX(0); }
  .reveal-right { opacity:0; transform:translateX(52px); transition:opacity 0.9s cubic-bezier(0.4,0,0.2,1),transform 0.9s cubic-bezier(0.4,0,0.2,1); }
  .reveal-right.visible { opacity:1; transform:translateX(0); }
  .reveal-scale { opacity:0; transform:scale(0.9) translateY(20px); transition:opacity 0.9s cubic-bezier(0.4,0,0.2,1),transform 0.9s cubic-bezier(0.4,0,0.2,1); }
  .reveal-scale.visible { opacity:1; transform:scale(1) translateY(0); }

  /* ====== ABOUT SECTION ====== */
  .about-section { 
    background:var(--navy); position:relative; overflow:hidden;
  }
  .about-section::before {
    content:''; position:absolute; top:0; left:0; right:0; bottom:0;
    background:radial-gradient(ellipse 80% 60% at 80% 50%, rgba(139,26,46,0.06) 0%, transparent 60%),
               radial-gradient(ellipse 60% 80% at 10% 30%, rgba(13,110,122,0.05) 0%, transparent 50%);
    pointer-events:none;
  }
  .about-section::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.25),rgba(139,26,46,0.2),transparent); }
  .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .about-card {
    background:linear-gradient(145deg,rgba(17,26,46,0.9),rgba(5,7,13,0.95));
    border:1px solid rgba(201,168,76,0.15); padding:56px; position:relative; overflow:hidden;
    transition:border-color 0.5s,box-shadow 0.5s;
  }
  .about-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--gold),var(--crimson-light),var(--gold),transparent); transform:scaleX(0); transition:transform 0.8s cubic-bezier(0.4,0,0.2,1); transform-origin:left; }
  .about-card:hover { border-color:rgba(201,168,76,0.35); box-shadow:0 30px 80px rgba(0,0,0,0.5),inset 0 0 80px rgba(201,168,76,0.02); }
  .about-card:hover::before { transform:scaleX(1); }
  .about-card::after { content:''; position:absolute; bottom:-80px; right:-80px; width:240px; height:240px; border-radius:50%; border:1px solid rgba(201,168,76,0.05); }
  .about-ring { position:absolute; bottom:-40px; right:-40px; width:120px; height:120px; border-radius:50%; border:1px solid rgba(201,168,76,0.08); }
  .about-ring2 { position:absolute; top:-60px; left:-60px; width:180px; height:180px; border-radius:50%; border:1px solid rgba(139,26,46,0.08); }
  .about-quote { font-family:'Cormorant Garamond',serif; font-size:26px; color:var(--gold-light); font-style:italic; margin-bottom:20px; line-height:1.55; }
  .about-stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:40px; }
  .stat-item {
    text-align:center; padding:26px 14px; border:1px solid rgba(201,168,76,0.1);
    background:rgba(201,168,76,0.02); transition:all 0.4s cubic-bezier(0.4,0,0.2,1); cursor:default; position:relative; overflow:hidden;
  }
  .stat-item::before { content:''; position:absolute; inset:0; background:linear-gradient(145deg,rgba(201,168,76,0.08),transparent); opacity:0; transition:opacity 0.4s; }
  .stat-item::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:0; height:2px; background:linear-gradient(90deg,var(--gold),var(--crimson-light)); transition:width 0.4s; }
  .stat-item:hover { border-color:rgba(201,168,76,0.45); transform:translateY(-5px); box-shadow:0 20px 44px rgba(0,0,0,0.4); }
  .stat-item:hover::before { opacity:1; }
  .stat-item:hover::after { width:80%; }
  .stat-num { font-family:'Cormorant Garamond',serif; font-size:48px; font-weight:300; color:var(--gold); display:block; line-height:1; position:relative; z-index:1; }
  .stat-label { font-size:9.5px; letter-spacing:3.5px; color:var(--text-mid); text-transform:uppercase; margin-top:8px; display:block; position:relative; z-index:1; }
  .feature-list { list-style:none; margin-top:32px; }
  .feature-list li {
    display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid rgba(201,168,76,0.07);
    font-size:14.5px; color:var(--text-light); cursor:default; transition:all 0.35s cubic-bezier(0.4,0,0.2,1); position:relative;
  }
  .feature-list li::after { content:''; position:absolute; left:0; right:0; bottom:-1px; height:1px; background:linear-gradient(90deg,var(--gold),var(--crimson-light),transparent); transform:scaleX(0); transition:transform 0.4s; transform-origin:left; }
  .feature-list li:hover { color:var(--cream); padding-left:10px; }
  .feature-list li:hover::after { transform:scaleX(1); }
  .feature-dot { width:5px; height:5px; border-radius:50%; background:linear-gradient(135deg,var(--gold),var(--crimson-light)); flex-shrink:0; box-shadow:0 0 6px rgba(201,168,76,0.4); }

  /* ====== ROOMS AUTO SLIDER ====== */
  .rooms-section { background:var(--navy-deep); overflow:hidden; }
  .rooms-slider-outer { position:relative; overflow:hidden; }
  .rooms-track { display:flex; gap:0; transition:transform 0.9s cubic-bezier(0.4,0,0.2,1); will-change:transform; }
  .room-card {
    min-width:calc(33.333%); position:relative; overflow:hidden;
    height:560px; flex-shrink:0; cursor:pointer; background:var(--navy-mid);
  }
  .room-img-holder { position:absolute; inset:0; overflow:hidden; }
  .room-img-holder img { width:100%; height:100%; object-fit:cover; transform:scale(1.08); filter:brightness(0.6) saturate(0.9); transition:transform 1s cubic-bezier(0.4,0,0.2,1),filter 0.8s; }
  .room-card:hover .room-img-holder img { transform:scale(1.16); filter:brightness(0.42) saturate(1.1); }
  .room-img-fallback { width:100%; height:100%; transform:scale(1.08); transition:transform 1s cubic-bezier(0.4,0,0.2,1); }
  .room-card:hover .room-img-fallback { transform:scale(1.15); }
  .room-gradient {
    position:absolute; inset:0;
    background:linear-gradient(to top,rgba(5,7,13,1) 0%,rgba(5,7,13,0.75) 45%,rgba(5,7,13,0.2) 75%,transparent 100%);
    transition:all 0.6s ease;
  }
  .room-card:hover .room-gradient { background:linear-gradient(to top,rgba(5,7,13,1) 0%,rgba(5,7,13,0.9) 55%,rgba(5,7,13,0.45) 80%,rgba(5,7,13,0.1) 100%); }
  .room-card::before { content:''; position:absolute; top:0; left:0; bottom:0; width:3px; z-index:5; background:linear-gradient(to bottom,var(--gold-light),var(--gold),var(--crimson-light),transparent); transform:scaleY(0); transform-origin:top; transition:transform 0.5s cubic-bezier(0.4,0,0.2,1); }
  .room-card:hover::before { transform:scaleY(1); }
  .room-content { position:absolute; bottom:0; left:0; right:0; padding:40px; z-index:3; }
  .room-price { font-family:'Cormorant Garamond',serif; font-size:13px; color:var(--gold); letter-spacing:2.5px; margin-bottom:8px; }
  .room-name { font-family:'Cinzel',serif; font-size:21px; font-weight:600; color:var(--cream); margin-bottom:10px; }
  .room-meta { display:flex; gap:20px; font-size:11.5px; color:var(--text-mid); letter-spacing:1.5px; margin-bottom:16px; }
  .room-desc { font-size:13.5px; color:var(--text-light); line-height:1.7; opacity:0; transform:translateY(14px); max-height:0; overflow:hidden; transition:all 0.5s cubic-bezier(0.4,0,0.2,1); margin-bottom:0; }
  .room-card:hover .room-desc { opacity:1; transform:translateY(0); max-height:80px; margin-bottom:20px; }
  .room-btn {
    background:transparent; color:var(--gold); font-family:'Cinzel',serif; font-size:9.5px;
    font-weight:600; letter-spacing:3px; padding:10px 26px; border:1px solid rgba(201,168,76,0.45);
    cursor:pointer; opacity:0; transform:translateY(12px);
    transition:all 0.45s cubic-bezier(0.4,0,0.2,1) 0.08s; position:relative; overflow:hidden;
  }
  .room-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,var(--gold),var(--gold-light)); clip-path:inset(0 100% 0 0); transition:clip-path 0.35s cubic-bezier(0.4,0,0.2,1); }
  .room-btn:hover::before { clip-path:inset(0 0% 0 0); }
  .room-btn:hover { color:var(--navy-deep); border-color:var(--gold); }
  .room-btn span { position:relative; z-index:1; }
  .room-card:hover .room-btn { opacity:1; transform:translateY(0); }

  .slider-progress-wrap { height:2px; background:rgba(201,168,76,0.08); width:100%; position:relative; overflow:hidden; }
  .slider-progress-bar { height:100%; background:linear-gradient(90deg,var(--gold),var(--crimson-light),var(--gold-light)); transition:width 0.1s linear; }
  .slider-footer { display:flex; align-items:center; justify-content:space-between; padding:28px 52px 0; }
  .slider-counter { font-family:'Cormorant Garamond',serif; font-size:22px; color:var(--text-mid); letter-spacing:2px; }
  .slider-counter span { color:var(--gold); }
  .slider-dots { display:flex; gap:10px; align-items:center; }
  .slider-dot { width:6px; height:6px; border-radius:50%; background:rgba(201,168,76,0.2); cursor:pointer; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); border:none; }
  .slider-dot.active { background:var(--gold); width:28px; border-radius:3px; }
  .slider-pause-btn { width:44px; height:44px; border-radius:50%; border:1px solid rgba(201,168,76,0.3); background:transparent; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.35s cubic-bezier(0.4,0,0.2,1); color:var(--gold); }
  .slider-pause-btn:hover { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy-deep); border-color:var(--gold); transform:scale(1.12); }

  /* ====== AMENITIES - equal box grid ====== */
  .amenities-section { 
    background:var(--navy); position:relative; overflow:hidden;
  }
  .amenities-section::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 70% 50% at 30% 50%, rgba(201,168,76,0.03) 0%, transparent 60%);
    pointer-events:none;
  }
  .amenities-grid { 
    display:grid; 
    grid-template-columns:repeat(4,1fr); 
    gap:1px; 
    background:rgba(201,168,76,0.06);
  }
  .amenity-card {
    background:var(--navy-mid); padding:48px 24px; text-align:center;
    position:relative; overflow:hidden; transition:all 0.45s cubic-bezier(0.4,0,0.2,1); cursor:default;
    min-height:220px; display:flex; flex-direction:column; align-items:center; justify-content:center;
  }
  .amenity-card::before { 
    content:''; position:absolute; inset:0; 
    background:linear-gradient(145deg,rgba(201,168,76,0.06),rgba(139,26,46,0.04)); 
    opacity:0; transition:opacity 0.45s; 
  }
  .amenity-card::after { 
    content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); 
    width:0; height:2px; 
    background:linear-gradient(90deg,transparent,var(--gold),var(--crimson-light),transparent); 
    transition:width 0.5s cubic-bezier(0.4,0,0.2,1); 
  }
  .amenity-card:hover { 
    background:var(--navy-light); transform:translateY(-8px); 
    box-shadow:0 28px 64px rgba(0,0,0,0.6),0 0 0 1px rgba(201,168,76,0.2); 
    z-index:1;
  }
  .amenity-card:hover::before { opacity:1; }
  .amenity-card:hover::after { width:70%; }
  .amenity-icon { 
    margin-bottom:20px; display:flex; align-items:center; justify-content:center; 
    transition:transform 0.45s cubic-bezier(0.4,0,0.2,1);
    width:64px; height:64px; border:1px solid rgba(201,168,76,0.15); border-radius:50%;
    background:rgba(201,168,76,0.04);
  }
  .amenity-card:hover .amenity-icon { 
    transform:scale(1.15) translateY(-4px); 
    border-color:rgba(201,168,76,0.4);
    background:rgba(201,168,76,0.08);
    box-shadow:0 0 24px rgba(201,168,76,0.15);
  }
  .amenity-name { font-family:'Cinzel',serif; font-size:10.5px; font-weight:600; letter-spacing:2.5px; color:var(--gold); text-transform:uppercase; margin-bottom:10px; }
  .amenity-desc { font-size:12.5px; color:var(--text-mid); line-height:1.75; }

  /* ====== BANQUET ====== */
  .banquet-section { 
    background:var(--navy-deep); position:relative; overflow:hidden;
  }
  .banquet-section::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2),rgba(139,26,46,0.15),transparent); }
  .banquet-bg-orb { position:absolute; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(139,26,46,0.06) 0%,transparent 60%); right:-200px; top:50%; transform:translateY(-50%); pointer-events:none; filter:blur(60px); }
  .banquet-grid { display:grid; grid-template-columns:1fr 1fr; gap:96px; align-items:center; }
  .banquet-features { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:40px; }
  .banquet-feature {
    background:rgba(201,168,76,0.02); border:1px solid rgba(201,168,76,0.1);
    padding:26px; position:relative; overflow:hidden; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); cursor:default;
  }
  .banquet-feature::before { content:''; position:absolute; top:0; left:0; bottom:0; width:2px; background:linear-gradient(to bottom,var(--gold),var(--crimson-light)); transform:scaleY(0); transition:transform 0.4s; transform-origin:bottom; }
  .banquet-feature:hover::before { transform:scaleY(1); }
  .banquet-feature:hover { background:rgba(201,168,76,0.07); border-color:rgba(201,168,76,0.3); transform:translateY(-3px) translateX(4px); box-shadow:0 12px 32px rgba(0,0,0,0.3); }
  .banquet-feature-title { font-family:'Cinzel',serif; font-size:10px; color:var(--gold); letter-spacing:2.5px; }
  .banquet-visual { position:relative; height:540px; }
  .bv-main { position:absolute; top:0; left:0; right:64px; bottom:64px; background:linear-gradient(145deg,var(--navy-light),var(--navy-deep)); border:1px solid rgba(201,168,76,0.12); display:flex; align-items:center; justify-content:center; overflow:hidden; transition:border-color 0.4s; }
  .bv-main:hover { border-color:rgba(201,168,76,0.3); }
  .bv-main-inner { position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(139,26,46,0.08) 0%, transparent 70%); animation:pulseGlow 4s ease-in-out infinite; }
  .bv-accent { position:absolute; bottom:0; right:0; width:210px; height:210px; background:linear-gradient(135deg,var(--gold),var(--gold-light)); display:flex; align-items:center; justify-content:center; opacity:0.9; }
  .bv-badge {
    position:absolute; top:36px; right:76px; z-index:2;
    background:linear-gradient(135deg,var(--gold),var(--gold-light));
    color:var(--navy-deep); width:100px; height:100px; border-radius:50%;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    font-family:'Cinzel',serif; font-size:9px; font-weight:700; letter-spacing:1px;
    text-align:center; line-height:1.5; text-transform:uppercase;
    box-shadow:0 8px 40px rgba(201,168,76,0.5);
    animation:badgeSpin 8s linear infinite;
  }
  .bv-badge strong { font-size:24px; letter-spacing:0; display:block; }
  @keyframes badgeSpin { 0%,100%{transform:rotate(-3deg) scale(1);} 50%{transform:rotate(3deg) scale(1.05);} }
  @keyframes pulseGlow { 0%,100%{opacity:0.5;} 50%{opacity:1;} }

  /* ====== RESTAURANT ====== */
  .restaurant-section { background:var(--navy); }
  .restaurant-grid { display:grid; grid-template-columns:1fr 1fr; gap:96px; align-items:center; }
  .restaurant-visual {
    background:linear-gradient(145deg,var(--navy-mid),var(--navy-deep));
    border:1px solid rgba(201,168,76,0.12); padding:56px;
    min-height:420px; display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden; transition:border-color 0.4s;
  }
  .restaurant-visual::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 50% 50%,rgba(139,26,46,0.06),transparent 70%); animation:pulseGlow 4s ease-in-out infinite; }
  .restaurant-visual:hover { border-color:rgba(201,168,76,0.3); }
  .menu-tabs { display:flex; gap:2px; margin-bottom:36px; }
  .menu-tab { padding:12px 22px; font-family:'Cinzel',serif; font-size:9.5px; letter-spacing:2.5px; cursor:pointer; border:1px solid rgba(201,168,76,0.15); background:transparent; color:var(--text-mid); transition:all 0.35s cubic-bezier(0.4,0,0.2,1); }
  .menu-tab.active { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy-deep); border-color:var(--gold); }
  .menu-tab:hover:not(.active) { border-color:var(--gold); color:var(--gold); }
  .menu-items { display:flex; flex-direction:column; }
  .menu-item {
    display:flex; justify-content:space-between; align-items:flex-start;
    padding:20px 0; border-bottom:1px solid rgba(201,168,76,0.07);
    transition:all 0.35s; cursor:default; position:relative;
  }
  .menu-item::after { content:''; position:absolute; left:-8px; top:50%; transform:translateY(-50%); width:3px; height:0; background:linear-gradient(to bottom,var(--gold),var(--crimson-light)); transition:height 0.35s cubic-bezier(0.4,0,0.2,1); }
  .menu-item:hover { padding-left:12px; }
  .menu-item:hover::after { height:60%; }
  .menu-item-name { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--cream); }
  .menu-item-desc { font-size:12.5px; color:var(--text-mid); margin-top:4px; }
  .menu-item-price { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--gold); white-space:nowrap; }

  /* ====== GALLERY ====== */
  .gallery-section { background:var(--navy); padding:120px 0; }
  .gallery-grid { display:grid; grid-template-columns:repeat(4,1fr); grid-template-rows:repeat(2,240px); gap:4px; }
  .gallery-item { overflow:hidden; cursor:pointer; position:relative; background:var(--navy-mid); display:flex; align-items:center; justify-content:center; }
  .gallery-item:nth-child(1) { grid-column:span 2; grid-row:span 2; }
  .gallery-bg { position:absolute; inset:0; transition:transform 0.8s cubic-bezier(0.4,0,0.2,1); }
  .gallery-item:hover .gallery-bg { transform:scale(1.08); }
  .gallery-overlay { position:absolute; inset:0; background:rgba(5,7,13,0.55); opacity:0; transition:opacity 0.5s; display:flex; align-items:center; justify-content:center; }
  .gallery-item:hover .gallery-overlay { opacity:1; }
  .gallery-label { font-family:'Cinzel',serif; font-size:11px; color:var(--gold); letter-spacing:3px; margin-top:10px; text-transform:uppercase; transform:translateY(10px); transition:transform 0.4s 0.1s; }
  .gallery-item:hover .gallery-label { transform:translateY(0); }

  /* ====== ATTRACTIONS - infinite loop ====== */
  .attractions-section { background:var(--navy-deep); overflow:hidden; }
  .attractions-header { text-align:center; margin-bottom:68px; }
  .attractions-infinite-outer { position:relative; overflow:hidden; }
  .attractions-infinite-outer::before,
  .attractions-infinite-outer::after {
    content:''; position:absolute; top:0; bottom:0; width:180px; z-index:5; pointer-events:none;
  }
  .attractions-infinite-outer::before { left:0; background:linear-gradient(to right,var(--navy-deep),transparent); }
  .attractions-infinite-outer::after { right:0; background:linear-gradient(to left,var(--navy-deep),transparent); }
  .attractions-track-wrap { 
    display:flex; gap:20px; 
    animation:attractionsLoop 28s linear infinite;
    width:max-content;
  }
  .attractions-track-wrap:hover { animation-play-state:paused; }
  @keyframes attractionsLoop { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }

  .attraction-card {
    border:1px solid rgba(201,168,76,0.1); padding:40px; background:var(--navy-mid);
    position:relative; overflow:hidden; transition:all 0.45s cubic-bezier(0.4,0,0.2,1); cursor:default;
    width:320px; flex-shrink:0;
  }
  .attraction-card::before { content:''; position:absolute; inset:0; background:linear-gradient(145deg,rgba(201,168,76,0.04),rgba(139,26,46,0.03)); opacity:0; transition:opacity 0.45s; }
  .attraction-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--gold),var(--gold-light),var(--crimson-light),transparent); transform:scaleX(0); transform-origin:left; transition:transform 0.5s cubic-bezier(0.4,0,0.2,1); }
  .attraction-card:hover { transform:translateY(-8px); border-color:rgba(201,168,76,0.3); box-shadow:0 30px 68px rgba(0,0,0,0.5); }
  .attraction-card:hover::before { opacity:1; }
  .attraction-card:hover::after { transform:scaleX(1); }
  .attraction-icon { 
    margin-bottom:20px; transition:transform 0.45s cubic-bezier(0.4,0,0.2,1);
    width:56px; height:56px; border:1px solid rgba(201,168,76,0.2); border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    background:rgba(201,168,76,0.04);
  }
  .attraction-card:hover .attraction-icon { 
    transform:scale(1.2) translateY(-4px); 
    border-color:var(--gold);
    box-shadow:0 0 24px rgba(201,168,76,0.2);
  }
  .attraction-name { font-family:'Cinzel',serif; font-size:12.5px; font-weight:600; color:var(--gold); letter-spacing:2.5px; margin-bottom:10px; text-transform:uppercase; }
  .attraction-dist { font-size:11px; color:var(--text-mid); letter-spacing:2px; margin-bottom:14px; }
  .attraction-desc { font-size:13.5px; color:var(--text-light); line-height:1.8; }

  /* ====== TESTIMONIALS - AUTO SLIDER ====== */
  .testimonials-section { background:var(--navy); position:relative; overflow:hidden; }
  .testimonials-section::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 60%);
    pointer-events:none;
  }
  .testimonials-slider-outer { position:relative; overflow:hidden; }
  .testimonials-slider-outer::before,
  .testimonials-slider-outer::after {
    content:''; position:absolute; top:0; bottom:0; width:120px; z-index:5; pointer-events:none;
  }
  .testimonials-slider-outer::before { left:0; background:linear-gradient(to right,var(--navy),transparent); }
  .testimonials-slider-outer::after { right:0; background:linear-gradient(to left,var(--navy),transparent); }
  .testimonials-track { display:flex; gap:20px; transition:transform 0.9s cubic-bezier(0.4,0,0.2,1); will-change:transform; }
  .testimonial-card { 
    min-width:420px; flex-shrink:0; background:var(--navy-mid); 
    border:1px solid rgba(201,168,76,0.1); padding:48px; position:relative; overflow:hidden; 
    transition:all 0.45s cubic-bezier(0.4,0,0.2,1);
  }
  .testimonial-card::before { content:''; position:absolute; top:0; right:0; width:80px; height:80px; border-left:1px solid rgba(201,168,76,0.12); border-bottom:1px solid rgba(201,168,76,0.12); transition:all 0.4s; }
  .testimonial-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--gold),var(--crimson-light),transparent); transform:scaleX(0); transition:transform 0.5s; }
  .testimonial-card:hover { border-color:rgba(201,168,76,0.28); box-shadow:0 20px 56px rgba(0,0,0,0.4); transform:translateY(-4px); }
  .testimonial-card:hover::before { width:120px; height:120px; border-color:rgba(201,168,76,0.3); }
  .testimonial-card:hover::after { transform:scaleX(1); }
  .testimonial-quote { font-family:'Cormorant Garamond',serif; font-size:76px; color:var(--gold); opacity:0.15; line-height:0.4; margin-bottom:24px; display:block; }
  .testimonial-text { font-family:'Cormorant Garamond',serif; font-size:18.5px; font-style:italic; color:var(--cream); line-height:1.75; margin-bottom:28px; }
  .testimonial-author { font-family:'Cinzel',serif; font-size:10.5px; color:var(--gold); letter-spacing:2.5px; }
  .testimonial-location { font-size:12px; color:var(--text-mid); margin-top:5px; }
  .stars { letter-spacing:3px; margin-bottom:20px; font-size:13px; }
  .star-filled { color:var(--gold); }
  .testimonials-footer { display:flex; align-items:center; justify-content:center; gap:16px; margin-top:40px; }
  .testimonials-dot { width:6px; height:6px; border-radius:50%; background:rgba(201,168,76,0.2); cursor:pointer; transition:all 0.4s; border:none; }
  .testimonials-dot.active { background:var(--gold); width:28px; border-radius:3px; }
  .testimonials-nav { width:44px; height:44px; border-radius:50%; border:1px solid rgba(201,168,76,0.3); background:transparent; display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--gold); transition:all 0.35s; }
  .testimonials-nav:hover { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy-deep); border-color:var(--gold); transform:scale(1.1); }

  /* ====== BOOKING ====== */
  .booking-section { background:var(--navy-deep); position:relative; overflow:hidden; }
  .booking-section::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 80% 60% at 20% 50%, rgba(13,110,122,0.04) 0%, transparent 50%),
               radial-gradient(ellipse 60% 60% at 80% 60%, rgba(139,26,46,0.05) 0%, transparent 50%);
    pointer-events:none;
  }
  .booking-grid { display:grid; grid-template-columns:1fr 1fr; gap:96px; align-items:start; }
  .booking-form { 
    background:linear-gradient(145deg,rgba(17,26,46,0.95),rgba(5,7,13,0.98));
    border:1px solid rgba(201,168,76,0.15); padding:56px; position:relative; overflow:hidden; 
    transition:border-color 0.4s,box-shadow 0.4s;
  }
  .booking-form:hover { border-color:rgba(201,168,76,0.28); box-shadow:0 28px 72px rgba(0,0,0,0.5); }
  .booking-form::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--gold),var(--crimson-light),var(--gold),transparent); }
  .booking-form::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(139,26,46,0.2),transparent); }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .form-group { margin-bottom:22px; }
  .form-label { display:block; font-family:'Cinzel',serif; font-size:9px; letter-spacing:3.5px; color:var(--gold); text-transform:uppercase; margin-bottom:10px; }
  .form-input,.form-select { width:100%; background:rgba(255,255,255,0.02); border:1px solid rgba(201,168,76,0.15); color:var(--cream); padding:14px 18px; font-family:'Jost',sans-serif; font-size:14px; outline:none; transition:all 0.35s; border-radius:2px; appearance:none; }
  .form-input:focus,.form-select:focus { border-color:var(--gold); background:rgba(201,168,76,0.04); box-shadow:0 0 0 3px rgba(201,168,76,0.07); }
  .form-input::placeholder { color:rgba(189,176,154,0.3); }
  .form-select option { background:var(--navy-deep); color:var(--cream); }
  .form-submit { width:100%; background:linear-gradient(135deg,var(--gold),var(--gold-light),var(--gold)); background-size:200% 200%; color:var(--navy-deep); font-family:'Cinzel',serif; font-size:12px; font-weight:700; letter-spacing:4px; padding:20px; border:none; cursor:pointer; text-transform:uppercase; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); border-radius:2px; margin-top:8px; }
  .form-submit:hover { background-position:100% 50%; transform:translateY(-4px); box-shadow:0 20px 52px rgba(201,168,76,0.5); }
  .contact-info { padding-top:28px; }
  .contact-item { display:flex; align-items:flex-start; gap:20px; margin-bottom:36px; cursor:default; }
  .contact-icon { width:52px; height:52px; border:1px solid rgba(201,168,76,0.25); border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--gold); transition:all 0.4s cubic-bezier(0.4,0,0.2,1); }
  .contact-item:hover .contact-icon { background:rgba(201,168,76,0.1); border-color:var(--gold); transform:scale(1.1) rotate(5deg); box-shadow:0 8px 24px rgba(201,168,76,0.25); }
  .contact-title { font-family:'Cinzel',serif; font-size:10.5px; color:var(--gold); letter-spacing:2.5px; }
  .contact-detail { font-size:14px; color:var(--text-light); margin-top:5px; line-height:1.75; }

  /* ====== FOOTER - premium ====== */
  .footer { 
    background:#020308; padding:96px 0 0; position:relative; overflow:hidden;
  }
  .footer::before {
    content:''; position:absolute; top:0; left:0; right:0; bottom:0;
    background:radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 50%);
    pointer-events:none;
  }
  .footer-top-border { height:1px; background:linear-gradient(90deg,transparent,var(--gold),var(--crimson-light),var(--gold),transparent); margin-bottom:0; }
  .footer-inner { padding-top:80px; }
  .footer-grid { display:grid; grid-template-columns:2.4fr 1fr 1fr 1.6fr; gap:56px; margin-bottom:72px; }
  .footer-brand-title { 
    font-family:'Cinzel',serif; font-size:22px; 
    background:linear-gradient(135deg,var(--gold),var(--gold-light));
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    letter-spacing:3px; margin-bottom:6px; 
  }
  .footer-brand-sub { font-size:9px; letter-spacing:6px; color:var(--text-mid); text-transform:uppercase; margin-bottom:22px; }
  .footer-brand-desc { font-size:13.5px; color:var(--text-mid); line-height:1.9; max-width:290px; }
  .footer-col-title { 
    font-family:'Cinzel',serif; font-size:10.5px; color:var(--gold); 
    letter-spacing:3.5px; text-transform:uppercase; margin-bottom:28px;
    padding-bottom:14px; border-bottom:1px solid rgba(201,168,76,0.15);
    position:relative;
  }
  .footer-col-title::after { content:''; position:absolute; bottom:-1px; left:0; width:28px; height:1px; background:var(--crimson-light); }
  .footer-links { list-style:none; }
  .footer-links li { margin-bottom:13px; }
  .footer-links a { font-size:13.5px; color:var(--text-mid); text-decoration:none; transition:all 0.35s; display:inline-flex; align-items:center; gap:8px; }
  .footer-links a::before { content:''; width:4px; height:4px; border-radius:50%; background:var(--gold); opacity:0; transform:translateX(-8px); transition:all 0.35s; flex-shrink:0; }
  .footer-links a:hover { color:var(--gold); padding-left:4px; }
  .footer-links a:hover::before { opacity:1; transform:translateX(0); }
  .footer-social { display:flex; gap:10px; margin-top:30px; }
  .social-btn { width:42px; height:42px; border:1px solid rgba(201,168,76,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--text-mid); cursor:pointer; text-decoration:none; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); }
  .social-btn:hover { border-color:var(--gold); color:var(--gold); transform:translateY(-5px) rotate(8deg); box-shadow:0 10px 28px rgba(201,168,76,0.3); background:rgba(201,168,76,0.06); }
  .footer-newsletter { margin-top:28px; }
  .footer-newsletter-title { font-family:'Cinzel',serif; font-size:10px; color:var(--gold); letter-spacing:3px; margin-bottom:14px; }
  .footer-newsletter-form { display:flex; gap:0; }
  .footer-newsletter-input { flex:1; background:rgba(255,255,255,0.03); border:1px solid rgba(201,168,76,0.15); border-right:none; color:var(--cream); padding:12px 16px; font-family:'Jost',sans-serif; font-size:13px; outline:none; transition:border-color 0.3s; }
  .footer-newsletter-input:focus { border-color:rgba(201,168,76,0.4); }
  .footer-newsletter-input::placeholder { color:rgba(122,110,94,0.6); }
  .footer-newsletter-btn { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy-deep); border:none; padding:12px 20px; cursor:pointer; font-family:'Cinzel',serif; font-size:9px; letter-spacing:2px; font-weight:700; transition:all 0.35s; flex-shrink:0; }
  .footer-newsletter-btn:hover { box-shadow:0 6px 24px rgba(201,168,76,0.4); }
  .footer-awards { margin-top:32px; display:flex; gap:16px; flex-wrap:wrap; }
  .footer-award-badge { display:flex; align-items:center; gap:8px; padding:10px 16px; border:1px solid rgba(201,168,76,0.12); background:rgba(201,168,76,0.02); }
  .footer-award-badge-icon { color:var(--gold); font-size:18px; }
  .footer-award-badge-text { font-family:'Cinzel',serif; font-size:8px; color:var(--text-mid); letter-spacing:2px; line-height:1.5; }
  .footer-stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(201,168,76,0.08); margin-bottom:60px; }
  .footer-stat { background:rgba(9,17,30,0.8); padding:32px 20px; text-align:center; position:relative; overflow:hidden; }
  .footer-stat::before { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--gold),transparent); transform:scaleX(0); transition:transform 0.5s; }
  .footer-stat:hover::before { transform:scaleX(1); }
  .footer-stat-num { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:var(--gold); display:block; line-height:1; }
  .footer-stat-label { font-size:9px; letter-spacing:3px; color:var(--text-mid); text-transform:uppercase; margin-top:8px; display:block; }
  .footer-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.15),rgba(139,26,46,0.1),transparent); margin-bottom:0; }
  .footer-bottom { padding:28px 0; display:flex; justify-content:space-between; align-items:center; }
  .footer-bottom-text { font-size:12.5px; color:var(--text-mid); }
  .footer-bottom-text span { color:var(--gold); }
  .footer-bottom-links { display:flex; gap:28px; }
  .footer-bottom-links a { font-size:12px; color:var(--text-mid); text-decoration:none; transition:color 0.3s; letter-spacing:1px; }
  .footer-bottom-links a:hover { color:var(--gold); }

  /* WHATSAPP - muted, aligned with page */
  .whatsapp-float { 
    position:fixed; bottom:40px; right:40px; z-index:991; 
    background:rgba(9,17,30,0.92);
    color:rgba(37,211,102,0.75); 
    width:52px; height:52px; border-radius:50%; border:1px solid rgba(37,211,102,0.25);
    display:flex; align-items:center; justify-content:center; cursor:pointer; 
    box-shadow:0 4px 20px rgba(0,0,0,0.5);
    text-decoration:none; 
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
    backdrop-filter:blur(12px);
  }
  .whatsapp-float:hover { 
    background:rgba(37,211,102,0.15); 
    color:rgba(37,211,102,0.95);
    border-color:rgba(37,211,102,0.5);
    transform:translateY(-4px); 
    box-shadow:0 12px 32px rgba(37,211,102,0.2); 
  }

  /* TOAST */
  .toast { position:fixed; bottom:40px; right:116px; z-index:9999; background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy-deep); font-family:'Cinzel',serif; font-size:10.5px; font-weight:700; letter-spacing:3px; padding:18px 32px; transform:translateY(120px); opacity:0; transition:all 0.5s cubic-bezier(0.4,0,0.2,1); box-shadow:0 12px 40px rgba(201,168,76,0.4); }
  .toast.show { transform:translateY(0); opacity:1; }

  /* RESPONSIVE */
  @media (max-width:1200px) {
    .amenities-grid { grid-template-columns:repeat(4,1fr); }
  }
  @media (max-width:1024px) {
    .about-grid,.banquet-grid,.restaurant-grid,.booking-grid { grid-template-columns:1fr; gap:56px; }
    .footer-grid { grid-template-columns:1fr 1fr; gap:44px; }
    .gallery-grid { grid-template-columns:repeat(2,1fr); grid-template-rows:repeat(3,200px); }
    .gallery-item:nth-child(1) { grid-column:span 2; }
    .room-card { min-width:50%; }
    .amenities-grid { grid-template-columns:repeat(4,1fr); }
    .footer-stats-row { grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:768px) {
    .navbar { padding:0 20px; }
    .nav-links { display:none; }
    .hamburger { display:flex; }
    .mobile-menu { display:flex; }
    .container { padding:0 20px; }
    section { padding:72px 0; }
    .room-card { min-width:88%; }
    .amenities-grid { grid-template-columns:repeat(2,1fr); }
    .footer-grid { grid-template-columns:1fr; }
    .gallery-grid { grid-template-columns:1fr 1fr; grid-template-rows:repeat(4,150px); }
    .gallery-item:nth-child(1) { grid-column:span 2; grid-row:span 1; }
    .form-row { grid-template-columns:1fr; }
    .banquet-features { grid-template-columns:1fr; }
    .about-stat-grid { grid-template-columns:1fr 1fr; }
    .hero-actions { flex-direction:column; align-items:center; }
    .footer-bottom { flex-direction:column; gap:14px; text-align:center; }
    .testimonial-card { min-width:88%; }
    .back-to-top { display:none !important; }
    .whatsapp-float { bottom:24px; right:20px; width:48px; height:48px; }
    .slider-footer { padding:18px 20px 0; }
    .footer-stats-row { grid-template-columns:repeat(2,1fr); }
    .hero-scroll { bottom:24px; }
    .hero-scroll-line { height:40px; }
  }
  @media (max-width:480px) {
    .amenities-grid { grid-template-columns:repeat(2,1fr); }
    .gallery-grid { grid-template-columns:1fr; grid-template-rows:auto; }
    .gallery-item { height:200px; }
    .gallery-item:nth-child(1) { grid-column:span 1; }
    .menu-tabs { flex-wrap:wrap; }
    .room-card { min-width:94%; }
    .testimonial-card { min-width:90%; }
    .footer-newsletter-form { flex-direction:column; gap:8px; }
    .footer-newsletter-input { border-right:1px solid rgba(201,168,76,0.15); }
    .footer-newsletter-btn { width:100%; }
    .footer-bottom-links { flex-direction:column; gap:12px; align-items:center; }
    .footer-stats-row { grid-template-columns:1fr 1fr; }
  }
`;

const Icon = {
  ChevronUp: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>),
  ChevronLeft: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>),
  ChevronRight: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>),
  MapPin: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  Phone: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.1-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>),
  Mail: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
  Clock: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  Pause: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>),
  Play: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>),
  Award: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>),
  Wave: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/><path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity="0.4"/></svg>),
  Dining: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>),
  Star: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Clock2: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  Car: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><line x1="9" y1="17" x2="15" y2="17"/></svg>),
  Wifi: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#C9A84C"/></svg>),
  Spa: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C6 22 2 17.5 2 12c0-1.7.4-3.3 1.1-4.8C5.4 11 8.4 13 12 13s6.6-2 8.9-5.8c.7 1.5 1.1 3.1 1.1 4.8 0 5.5-4 10-10 10z"/><path d="M12 13C12 8 15.3 3.7 20 2c0 5.5-3.6 10-8 11z"/><path d="M12 13C12 8 8.7 3.7 4 2c0 5.5 3.6 10 8 11z"/></svg>),
  Temple: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7h20L12 2z"/><path d="M2 7v2h20V7"/><rect x="4" y="9" width="4" height="13"/><rect x="10" y="9" width="4" height="13"/><rect x="16" y="9" width="4" height="13"/><line x1="2" y1="22" x2="22" y2="22"/></svg>),
  Tree: () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14l-5-9-5 9h4v8h2v-8z"/></svg>),
  WhatsApp: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>),
  FB: () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>),
  IG: () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>),
  YT: () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>),
};

const rooms = [
  { name:"Premium Suite",  price:"₹10,500 / Night", desc:"Panoramic views with artisan décor and handcrafted wooden furnishings.", bathrooms:2, occupancy:5, bg:"linear-gradient(165deg,#1a1f3a 0%,#0d0f20 50%,#07090f 100%)" },
  { name:"Luxury Suite",   price:"₹11,500 / Night", desc:"Signature stone bathtub — the finest choice for couples seeking romance.", bathrooms:2, occupancy:5, bg:"linear-gradient(165deg,#2a1530 0%,#1a0d20 50%,#07090f 100%)" },
  { name:"Nature Cottage", price:"₹8,500 / Night",  desc:"Bamboo-walled sanctuary merging with the forest — truly restorative.", bathrooms:1, occupancy:3, bg:"linear-gradient(165deg,#152318 0%,#0d1710 50%,#07090f 100%)" },
  { name:"Riverside Room", price:"₹9,200 / Night",  desc:"Direct balcony views of the sacred river. Perfect for pilgrims.", bathrooms:1, occupancy:2, bg:"linear-gradient(165deg,#0d2030 0%,#081520 50%,#07090f 100%)" },
  { name:"Heritage Villa", price:"₹14,000 / Night", desc:"Sprawling private villa with Awadhi architecture and butler service.", bathrooms:3, occupancy:8, bg:"linear-gradient(165deg,#301508 0%,#1e0d05 50%,#07090f 100%)" },
  { name:"Forest Chalet",  price:"₹7,800 / Night",  desc:"Secluded wooden chalet surrounded by tall trees for natural wellness.", bathrooms:1, occupancy:2, bg:"linear-gradient(165deg,#182510 0%,#101808 50%,#07090f 100%)" },
  { name:"Royal Chamber",  price:"₹13,500 / Night", desc:"Mughal-inspired grandeur: inlay marble floors, silk drapes, antiques.", bathrooms:2, occupancy:4, bg:"linear-gradient(165deg,#2a1500 0%,#1a0d00 50%,#07090f 100%)" },
  { name:"Garden Suite",   price:"₹9,800 / Night",  desc:"Private manicured garden — ideal for morning yoga and meditation.", bathrooms:2, occupancy:4, bg:"linear-gradient(165deg,#182018 0%,#101510 50%,#07090f 100%)" },
];

const amenities = [
  {Icon:Icon.Wave,  name:"River Views",     desc:"Overlooking sacred Triveni Sangam"},
  {Icon:Icon.Dining,name:"Fine Dining",     desc:"Multi-cuisine luxury restaurant"},
  {Icon:Icon.Star,  name:"Banquet Hall",    desc:"Grand events & celebrations"},
  {Icon:Icon.Clock2,name:"24×7 Service",    desc:"Round-the-clock room service"},
  {Icon:Icon.Car,   name:"Valet Parking",   desc:"Complimentary secure parking"},
  {Icon:Icon.Wifi,  name:"High-Speed WiFi", desc:"Seamless connectivity everywhere"},
  {Icon:Icon.Temple,name:"Spiritual Tours", desc:"Guided Sangam rituals & ghats"},
  {Icon:Icon.Spa,   name:"Wellness Spa",    desc:"Traditional Ayurvedic treatments"},
];

const menuItems = {
  veg:[
    {name:"Prayagraj Thali",   desc:"12-course traditional meal",      price:"₹850"},
    {name:"River Herb Risotto",desc:"Seasonal herbs, truffle oil",      price:"₹680"},
    {name:"Dal Baati Churma",  desc:"Rajasthani classic, ghee-rich",    price:"₹520"},
    {name:"Masala Dosa Royale",desc:"Crispy, spiced potato filling",    price:"₹420"},
  ],
  nonveg:[
    {name:"Lucknowi Biryani",  desc:"Dum-cooked, aromatic spices",      price:"₹980"},
    {name:"Tandoori Pomfret",  desc:"Fresh river catch, marinated",     price:"₹1,200"},
    {name:"Butter Chicken",    desc:"Creamy tomato sauce, naan",        price:"₹750"},
    {name:"Mutton Raan",       desc:"Slow-roasted leg, 12 hours",       price:"₹1,400"},
  ],
  beverages:[
    {name:"Sangam Sunrise",    desc:"Fresh mango, saffron, ginger",     price:"₹280"},
    {name:"Rose Lassi",        desc:"Thick yogurt, rose water",         price:"₹220"},
    {name:"Masala Chai",       desc:"House blend, cardamom",            price:"₹180"},
    {name:"Thandai Special",   desc:"Festival drink, nuts and spices",  price:"₹320"},
  ]
};

const attractions = [
  {name:"Triveni Sangam",      dist:"0.5 km", desc:"Sacred confluence of Ganga, Yamuna & Saraswati — holiest bathing ghat in India."},
  {name:"Saraswati Ghat",      dist:"1.2 km", desc:"Peaceful ghat for boat rides, sunrise views, and evening aarti ceremonies."},
  {name:"Nagvasuki Temple",    dist:"2.0 km", desc:"Ancient serpent deity temple, believed to be thousands of years old."},
  {name:"Bade Hanuman Mandir", dist:"1.8 km", desc:"Unique reclining Hanuman idol, believed to protect the region from floods."},
  {name:"Akshayavat",          dist:"3.0 km", desc:"The immortal banyan tree inside Allahabad Fort, revered across Hindu scriptures."},
  {name:"Allahabad Fort",      dist:"3.5 km", desc:"Mughal-era fort built by Emperor Akbar in 1583, commanding Sangam views."},
  {name:"Anand Bhavan",        dist:"4.2 km", desc:"Historic Nehru family mansion, now a museum chronicling India's independence movement."},
  {name:"Bharadwaj Ashram",    dist:"5.0 km", desc:"Ancient hermitage of sage Bharadwaj, one of the great saptarishi of Hindu mythology."},
];

const testimonials = [
  {text:"The most peaceful escape near the Sangam. The cottage was breathtaking, service impeccable. We will return for Kumbh without a second thought.",author:"Priya & Rohit Sharma",location:"Delhi, India",stars:5},
  {text:"For our anniversary, Alarkpuri was perfection. The luxury suite felt like a dream — truly magical. The fine dining surpassed every expectation.",author:"Meera Krishnamurthy",location:"Bengaluru, India",stars:5},
  {text:"We hosted our son's wedding reception here. Every detail was handled with such grace and precision. Extraordinary in every sense of the word.",author:"Suresh & Kamla Agarwal",location:"Lucknow, India",stars:5},
  {text:"Came for a spiritual retreat and left completely transformed. Proximity to Sangam made morning dips effortless. Staff are incredibly warm.",author:"Dr. Arjun Pillai",location:"Mumbai, India",stars:5},
  {text:"The Heritage Villa exceeded all our expectations. Our family of six had so much space and comfort. The Awadhi architecture is simply stunning.",author:"Rajesh Malhotra",location:"Kanpur, India",stars:5},
  {text:"As a solo pilgrim visiting Prayagraj, this resort was a true sanctuary. The spiritual tour package was thoughtfully arranged and deeply moving.",author:"Savitri Devi",location:"Varanasi, India",stars:5},
  {text:"Corporate retreat that became a team-building milestone. The banquet hall setup was world-class, the food excellent, views of Sangam unforgettable.",author:"Vikram Sinha",location:"Noida, India",stars:5},
  {text:"I've stayed at luxury hotels across India, but Alarkpuri's unique blend of spirituality and modern luxury is truly one of a kind. Returning soon.",author:"Ananya Chatterjee",location:"Kolkata, India",stars:5},
];

const particles = Array.from({length:20},(_,i)=>({
  id:i, left:`${4+(i*4.8)%92}%`,
  duration:`${7+(i*1.5)%11}s`, delay:`${(i*0.7)%9}s`,
  size: i%4===0?3:2, crimson: i%5===0,
}));

const SLIDE_INTERVAL = 4200;
const TEST_INTERVAL = 3800;

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }),
      {threshold:0.06}
    );
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.section-divider')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function SecScroll({targetId}) {
  return (
    <div className="sec-scroll" onClick={() => document.getElementById(targetId)?.scrollIntoView({behavior:'smooth'})}>
      <span className="sec-scroll-label">Continue</span>
      <div className="sec-scroll-track"><div className="sec-scroll-fill"/></div>
    </div>
  );
}

export default function AlarkpuriSangamResort() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeMenu, setActiveMenu] = useState('veg');
  const [toast,      setToast]      = useState(false);
  const [showTop,    setShowTop]    = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused,     setPaused]     = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [testIndex,  setTestIndex]  = useState(0);
  const [form, setForm] = useState({name:'',email:'',phone:'',checkin:'',checkout:'',guests:'2',roomType:'premium',message:''});

  const timerRef    = useRef(null);
  const rafRef      = useRef(null);
  const startRef    = useRef(null);
  const testTimerRef = useRef(null);
  useReveal();

  // Rooms slider
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w <= 768 ? 1 : w <= 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const maxIndex = rooms.length - visibleCount;
  const cardWidth = 100 / visibleCount;

  const startProgress = () => {
    setProgress(0);
    startRef.current = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - startRef.current) / SLIDE_INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const startTimer = () => {
    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);
    startProgress();
    timerRef.current = setTimeout(() => {
      setSlideIndex(i => i >= maxIndex ? 0 : i + 1);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, [paused, slideIndex, maxIndex]);

  // Testimonials auto-slider
  const testVisibleCount = typeof window !== 'undefined' ? (window.innerWidth <= 768 ? 1 : 2) : 2;
  const maxTestIndex = testimonials.length - testVisibleCount;
  
  useEffect(() => {
    testTimerRef.current = setInterval(() => {
      setTestIndex(i => i >= maxTestIndex ? 0 : i + 1);
    }, TEST_INTERVAL);
    return () => clearInterval(testTimerRef.current);
  }, [maxTestIndex]);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY>60); setShowTop(window.scrollY>400); };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false); };
  const handleSubmit = (e) => {
    e.preventDefault(); setToast(true); setTimeout(()=>setToast(false),4000);
    setForm({name:'',email:'',phone:'',checkin:'',checkout:'',guests:'2',roomType:'premium',message:''});
  };

  const navSections = ['home','about','rooms','banquet','restaurant','attractions','booking'];

  // Create doubled attractions array for infinite loop
  const attractionsDoubled = [...attractions, ...attractions];

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className={`navbar ${scrolled?'scrolled':''}`}>
        <div className="nav-logo" onClick={()=>scrollTo('home')}>
          <div className="nav-logo-title">ALARKPURI SANGAM</div>
          <div className="nav-logo-sub">Resort & Restaurant</div>
        </div>
        <ul className="nav-links">
          {navSections.map(s => (
            <li key={s}><a href={`#${s}`} onClick={e=>{e.preventDefault();scrollTo(s);}}>{s==='home'?'Home':s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
          ))}
          <li><a href="#booking" className="nav-cta" onClick={e=>{e.preventDefault();scrollTo('booking');}}>Book Stay</a></li>
        </ul>
        <button className={`hamburger ${menuOpen?'open':''}`} onClick={()=>setMenuOpen(m=>!m)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen?'open':''}`}>
        {navSections.map(s => (
          <a key={s} href={`#${s}`} onClick={e=>{e.preventDefault();scrollTo(s);}}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>
        ))}
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-bg"/>
        <div className="hero-pattern"/>
        <div className="hero-rings"><div className="hero-ring"/><div className="hero-ring"/><div className="hero-ring"/><div className="hero-ring"/></div>
        <div className="hero-orb hero-orb-1"/><div className="hero-orb hero-orb-2"/><div className="hero-orb hero-orb-3"/><div className="hero-orb hero-orb-4"/>
        <div className="hero-particles">
          {particles.map(p=>(
            <div key={p.id} className={`particle ${p.crimson?'crimson':''}`} style={{left:p.left,bottom:'-10px',animationDuration:p.duration,animationDelay:p.delay,width:p.size,height:p.size}}/>
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge"><span className="hero-badge-dot"/> Prayagraj, Uttar Pradesh <span className="hero-badge-dot"/></div>
          <h1 className="hero-title"><em>Discover</em> Nature's</h1>
          <span className="hero-subtitle-block">Bounty in Alarkpuri Sangam</span>
          <p className="hero-tagline">Where spirituality meets luxury — near the sacred Triveni Sangam</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={()=>scrollTo('booking')}><span>Book Your Stay</span></button>
            <button className="btn-outline" onClick={()=>scrollTo('rooms')}><span>Explore Rooms</span></button>
          </div>
        </div>
        {/* Scroll indicator: now positioned at bottom-center, below the hero-content */}
        <div className="hero-scroll" onClick={()=>scrollTo('about')}>
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-line"><div className="hero-scroll-fill"/></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="reveal-left">
              <div className="about-card">
                <div className="about-ring"/>
                <div className="about-ring2"/>
                <div className="about-quote">"Where every sunrise is sacred"</div>
                <p style={{color:'var(--text-light)',lineHeight:1.9,fontSize:14.5,position:'relative',zIndex:1}}>Nestled beside the confluence of three holy rivers, Alarkpuri Sangam Resort blends the reverence of Prayagraj with the indulgence of modern luxury.</p>
                <div className="about-stat-grid">
                  {[{num:"15+",label:"Luxury Rooms"},{num:"500+",label:"Events Hosted"},{num:"10K+",label:"Happy Guests"},{num:"0.5km",label:"From Sangam"}].map((s,i)=>(
                    <div key={s.label} className="stat-item reveal" style={{transitionDelay:`${0.1+i*0.12}s`}}>
                      <span className="stat-num">{s.num}</span><span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal-right" style={{transitionDelay:'0.15s'}}>
              <span className="section-label">Welcome to Alarkpuri Sangam Resort</span>
              <h2 className="section-title">Your Ultimate Luxury <em>Retreat</em> in Prayagraj</h2>
              <div className="section-divider"/>
              <p className="section-text">Alarkpuri Sangam Resort is one of the most serene and nature-inspired resorts near the sacred Triveni Sangam — a perfect blend of comfort, spirituality, and natural beauty.</p>
              <ul className="feature-list">
                {["Prime location near Triveni Sangam","Luxury cottages with artisan interiors","Grand banquet hall for all events","Multi-cuisine fine dining restaurant","24×7 personalised room service","Guided spiritual & heritage tours"].map(f=>(
                  <li key={f}><div className="feature-dot"/>{f}</li>
                ))}
              </ul>
              <button className="btn-primary" style={{marginTop:40}} onClick={()=>scrollTo('booking')}><span>Reserve Your Experience</span></button>
            </div>
          </div>
          <SecScroll targetId="rooms"/>
        </div>
      </section>

      {/* ROOMS AUTO SLIDER */}
      <section id="rooms" className="rooms-section">
        <div className="container" style={{marginBottom:52}}>
          <div style={{textAlign:'center'}}>
            <span className="section-label reveal">Discover Our Rooms</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Luxurious <em>Accommodations</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto 0'}}/>
          </div>
        </div>
        <div className="slider-progress-wrap">
          <div className="slider-progress-bar" style={{width:`${progress}%`}}/>
        </div>
        <div className="rooms-slider-outer">
          <div className="rooms-track" style={{transform:`translateX(-${slideIndex*cardWidth}%)`}}>
            {rooms.map(room=>(
              <div key={room.name} className="room-card"
                style={{minWidth:`calc(${cardWidth}%)`}}
                onMouseEnter={()=>{setPaused(true);clearTimeout(timerRef.current);cancelAnimationFrame(rafRef.current);}}
                onMouseLeave={()=>setPaused(false)}
              >
                <div className="room-img-holder">
                  <div className="room-img-fallback" style={{background:room.bg}}/>
                </div>
                <div className="room-gradient"/>
                <div className="room-content">
                  <div className="room-price">{room.price}</div>
                  <div className="room-name">{room.name}</div>
                  <div className="room-meta"><span>{room.bathrooms} Bath{room.bathrooms>1?'s':''}</span><span>Max {room.occupancy} Guests</span></div>
                  <div className="room-desc">{room.desc}</div>
                  <button className="room-btn" onClick={()=>scrollTo('booking')}><span>Book Now</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="slider-footer">
          <div className="slider-counter"><span>{String(slideIndex+1).padStart(2,'0')}</span> / {String(rooms.length).padStart(2,'0')}</div>
          <div className="slider-dots">
            {Array.from({length:maxIndex+1}).map((_,i)=>(
              <button key={i} className={`slider-dot ${slideIndex===i?'active':''}`} onClick={()=>{setSlideIndex(i);setPaused(false);}}/>
            ))}
          </div>
          <button className="slider-pause-btn" onClick={()=>setPaused(p=>!p)}>{paused?<Icon.Play/>:<Icon.Pause/>}</button>
        </div>
        <div className="container"><SecScroll targetId="banquet"/></div>
      </section>

      {/* AMENITIES - 4x2 equal grid */}
      <section className="amenities-section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:60}}>
            <span className="section-label reveal">What We Offer</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Resort <em>Amenities</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}}/>
          </div>
          <div className="amenities-grid">
            {amenities.map((a,i)=>(
              <div key={a.name} className="amenity-card reveal" style={{transitionDelay:`${i*0.08}s`}}>
                <div className="amenity-icon"><a.Icon/></div>
                <div className="amenity-name">{a.name}</div>
                <div className="amenity-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANQUET */}
      <section id="banquet" className="banquet-section">
        <div className="banquet-bg-orb"/>
        <div className="container">
          <div className="banquet-grid">
            <div className="reveal-left">
              <span className="section-label">Events & Celebrations</span>
              <h2 className="section-title">Best Banquet Hall in <em>Prayagraj</em></h2>
              <div className="section-divider"/>
              <p className="section-text">Modern facilities with a peaceful environment near the holy Triveni Sangam. Designed for weddings, receptions, birthday parties, corporate meetings, and family gatherings.</p>
              <div className="banquet-features">
                {["Weddings & Receptions","Corporate Events","Birthday Celebrations","Cultural Gatherings"].map(f=>(
                  <div key={f} className="banquet-feature"><div className="banquet-feature-title">{f}</div></div>
                ))}
              </div>
              <button className="btn-primary" style={{marginTop:40}} onClick={()=>scrollTo('booking')}><span>Enquire for Events</span></button>
            </div>
            <div className="reveal-right" style={{transitionDelay:'0.15s'}}>
              <div className="banquet-visual">
                <div className="bv-main">
                  <div className="bv-main-inner"/>
                  <svg width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="0.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div className="bv-accent">
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="rgba(7,9,15,0.4)" strokeWidth="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div className="bv-badge"><strong>500+</strong>Events<br/>Hosted</div>
              </div>
            </div>
          </div>
          <SecScroll targetId="restaurant"/>
        </div>
      </section>

      {/* RESTAURANT */}
      <section id="restaurant" className="restaurant-section">
        <div className="container">
          <div className="restaurant-grid">
            <div className="reveal-left">
              <div className="restaurant-visual">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.7" strokeLinecap="round" style={{position:'relative',zIndex:1}}>
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
                </svg>
              </div>
            </div>
            <div className="reveal-right" style={{transitionDelay:'0.15s'}}>
              <span className="section-label">Culinary Excellence</span>
              <h2 className="section-title">Restaurant in <em>Prayagraj</em></h2>
              <div className="section-divider"/>
              <p className="section-text" style={{marginBottom:36}}>Fine dining where taste, tradition, and elegance converge. Premium ambiance, delicious food, warm hospitality — in a peaceful nature-inspired setting.</p>
              <div className="menu-tabs">
                {['veg','nonveg','beverages'].map(tab=>(
                  <button key={tab} className={`menu-tab ${activeMenu===tab?'active':''}`} onClick={()=>setActiveMenu(tab)}>
                    {tab==='veg'?'Vegetarian':tab==='nonveg'?'Non-Veg':'Beverages'}
                  </button>
                ))}
              </div>
              <div className="menu-items">
                {menuItems[activeMenu].map((item,i)=>(
                  <div key={item.name} className="menu-item reveal" style={{transitionDelay:`${i*0.07}s`}}>
                    <div><div className="menu-item-name">{item.name}</div><div className="menu-item-desc">{item.desc}</div></div>
                    <div className="menu-item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SecScroll targetId="attractions"/>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <div className="container" style={{marginBottom:52}}>
          <div style={{textAlign:'center'}}>
            <span className="section-label reveal">Captured Moments</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Resort <em>Gallery</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}}/>
          </div>
        </div>
        <div className="container">
          <div className="gallery-grid reveal">
            {[
              {label:"The Resort",   bg:"linear-gradient(165deg,#181e3a,#07090f)"},
              {label:"Premium Suite",bg:"linear-gradient(165deg,#2a1530,#07090f)"},
              {label:"Sunrise View", bg:"linear-gradient(165deg,#3a1508,#07090f)"},
              {label:"Banquet Hall", bg:"linear-gradient(165deg,#1a2a08,#07090f)"},
              {label:"Restaurant",   bg:"linear-gradient(165deg,#0d2030,#07090f)"},
            ].map((g,i)=>(
              <div key={i} className="gallery-item">
                <div className="gallery-bg" style={{width:'100%',height:'100%',background:g.bg}}/>
                <div className="gallery-overlay">
                  <div style={{textAlign:'center'}}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <div className="gallery-label">{g.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATTRACTIONS - infinite loop auto-scroll, 4 visible at a time */}
      <section id="attractions" className="attractions-section">
        <div className="container attractions-header">
          <div style={{textAlign:'center'}}>
            <span className="section-label reveal">Explore Prayagraj</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Nearby <em>Attractions</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto 0'}}/>
          </div>
        </div>
        <div className="attractions-infinite-outer" style={{padding:'0 0 20px'}}>
          <div className="attractions-track-wrap">
            {attractionsDoubled.map((a,i)=>(
              <div key={`${a.name}-${i}`} className="attraction-card">
                <div className="attraction-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="attraction-name">{a.name}</div>
                <div className="attraction-dist">{a.dist} away</div>
                <div className="attraction-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="container"><SecScroll targetId="booking"/></div>
      </section>

      {/* TESTIMONIALS - auto slider */}
      <section className="testimonials-section">
        <div className="container" style={{marginBottom:52}}>
          <div style={{textAlign:'center'}}>
            <span className="section-label reveal">Guest Stories</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>What Our Guests <em>Say</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}}/>
          </div>
        </div>
        <div className="container">
          <div className="testimonials-slider-outer">
            <div className="testimonials-track" style={{transform:`translateX(-${testIndex * (100/(typeof window !== 'undefined' && window.innerWidth <= 768 ? 1 : 2))}%)`}}>
              {testimonials.map((t,i)=>(
                <div key={i} className="testimonial-card"
                  style={{minWidth: typeof window !== 'undefined' && window.innerWidth <= 768 ? '100%' : 'calc(50% - 10px)'}}>
                  <span className="testimonial-quote">"</span>
                  <div className="stars">
                    {Array.from({length:t.stars}).map((_,si)=>(
                      <span key={si} className="star-filled">★</span>
                    ))}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">{t.author}</div>
                  <div className="testimonial-location">{t.location}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonials-footer">
            <button className="testimonials-nav" onClick={()=>setTestIndex(i=>Math.max(0,i-1))}><Icon.ChevronLeft/></button>
            {Array.from({length:maxTestIndex+1}).map((_,i)=>(
              <button key={i} className={`testimonials-dot ${testIndex===i?'active':''}`} onClick={()=>setTestIndex(i)}/>
            ))}
            <button className="testimonials-nav" onClick={()=>setTestIndex(i=>Math.min(maxTestIndex,i+1))}><Icon.ChevronRight/></button>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="booking-section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:68}}>
            <span className="section-label reveal">Reserve Your Stay</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Book Your <em>Experience</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}}/>
          </div>
          <div className="booking-grid">
            <div className="reveal-left">
              <div className="booking-form">
                <h3 style={{fontFamily:"'Cinzel',serif",fontSize:16,color:'var(--gold)',marginBottom:40,letterSpacing:3.5}}>RESERVATION ENQUIRY</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
                    <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/></div>
                  </div>
                  <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Check-In</label><input className="form-input" type="date" value={form.checkin} onChange={e=>setForm({...form,checkin:e.target.value})} required/></div>
                    <div className="form-group"><label className="form-label">Check-Out</label><input className="form-input" type="date" value={form.checkout} onChange={e=>setForm({...form,checkout:e.target.value})} required/></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Room Type</label>
                      <select className="form-select" value={form.roomType} onChange={e=>setForm({...form,roomType:e.target.value})}>
                        <option value="premium">Premium Suite — ₹10,500</option>
                        <option value="luxury">Luxury Suite — ₹11,500</option>
                        <option value="cottage">Nature Cottage — ₹8,500</option>
                        <option value="riverside">Riverside Room — ₹9,200</option>
                        <option value="villa">Heritage Villa — ₹14,000</option>
                        <option value="chalet">Forest Chalet — ₹7,800</option>
                        <option value="royal">Royal Chamber — ₹13,500</option>
                        <option value="garden">Garden Suite — ₹9,800</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Guests</label>
                      <select className="form-select" value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}>
                        {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">Special Requests</label><textarea className="form-input" rows={3} placeholder="Any special requirements..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:'vertical',minHeight:80}}/></div>
                  <button type="submit" className="form-submit">Send Reservation Request</button>
                </form>
              </div>
            </div>
            <div className="reveal-right contact-info" style={{transitionDelay:'0.18s'}}>
              <span className="section-label">Get In Touch</span>
              <h3 className="section-title" style={{fontSize:42}}>Contact <em>Us</em></h3>
              <div className="section-divider"/>
              {[
                {I:Icon.MapPin,title:"Address",      detail:"Arazi No-84, Arail Kachhar, Naini\nPrayagraj - 211008, Uttar Pradesh"},
                {I:Icon.Phone, title:"Phone",        detail:"+91 8737906519"},
                {I:Icon.Mail,  title:"Email",        detail:"alarkpurisangam1@gmail.com"},
                {I:Icon.Clock, title:"Check-in / Check-out",detail:"Check-in: 2:00 PM\nCheck-out: 11:00 AM"},
              ].map(c=>(
                <div key={c.title} className="contact-item">
                  <div className="contact-icon"><c.I/></div>
                  <div><div className="contact-title">{c.title}</div><div className="contact-detail" style={{whiteSpace:'pre-line'}}>{c.detail}</div></div>
                </div>
              ))}
              <p style={{color:'var(--text-mid)',fontSize:12.5,marginBottom:16}}>Connect with us:</p>
              <div className="footer-social">
                <a href="#" className="social-btn"><Icon.FB/></a>
                <a href="https://www.instagram.com/alarkpurisangam/" className="social-btn" target="_blank" rel="noopener noreferrer"><Icon.IG/></a>
                <a href="#" className="social-btn"><Icon.YT/></a>
                <a href="https://wa.me/918737906519" className="social-btn" target="_blank" rel="noopener noreferrer"><Icon.WhatsApp/></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - premium */}
      <footer className="footer">
        <div className="footer-top-border"/>
        <div className="container footer-inner">
          {/* Stats Row */}
          <div className="footer-stats-row">
            {[{num:"15+",label:"Luxury Rooms"},{num:"500+",label:"Events Hosted"},{num:"10K+",label:"Happy Guests"},{num:"0.5km",label:"From Sangam"}].map(s=>(
              <div key={s.label} className="footer-stat">
                <span className="footer-stat-num">{s.num}</span>
                <span className="footer-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="footer-grid">
            <div>
              <div className="footer-brand-title">ALARKPURI SANGAM</div>
              <div className="footer-brand-sub">Resort & Restaurant · Est. Prayagraj</div>
              <p className="footer-brand-desc">A serene luxury retreat beside the sacred Triveni Sangam — an unforgettable blend of spirituality, nature, and modern indulgence in the heart of Prayagraj.</p>
              <div className="footer-social">
                <a href="#" className="social-btn"><Icon.FB/></a>
                <a href="https://www.instagram.com/alarkpurisangam/" className="social-btn" target="_blank" rel="noopener noreferrer"><Icon.IG/></a>
                <a href="#" className="social-btn"><Icon.YT/></a>
                <a href="https://wa.me/918737906519" className="social-btn" target="_blank" rel="noopener noreferrer"><Icon.WhatsApp/></a>
              </div>
              <div className="footer-awards">
                <div className="footer-award-badge">
                  <Icon.Award/>
                  <div className="footer-award-badge-text">BEST RESORT<br/>PRAYAGRAJ 2024</div>
                </div>
                <div className="footer-award-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <div className="footer-award-badge-text">TRAVELLERS<br/>CHOICE 2025</div>
                </div>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Navigation</div>
              <ul className="footer-links">
                {navSections.map(s=><li key={s}><a href={`#${s}`} onClick={e=>{e.preventDefault();scrollTo(s);}}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Facilities</div>
              <ul className="footer-links">
                {["Luxury Cottages","Banquet Hall","Fine Dining","24×7 Room Service","Valet Parking","Wellness Spa","Spiritual Tours","Event Planning"].map(f=><li key={f}><a href="#">{f}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact Us</div>
              <p style={{fontSize:13.5,color:'var(--text-mid)',lineHeight:2.0,marginBottom:20}}>
                Arazi No-84, Arail Kachhar<br/>
                Naini, Prayagraj - 211008<br/>
                Uttar Pradesh, India
              </p>
              <a href="tel:+918737906519" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none',marginBottom:10}}>
                <span style={{color:'var(--gold)',fontSize:14,fontFamily:"'Cinzel',serif",letterSpacing:1}}>+91 8737906519</span>
              </a>
              <a href="mailto:alarkpurisangam1@gmail.com" style={{display:'block',fontSize:13,color:'var(--text-mid)',textDecoration:'none',transition:'color 0.3s',marginBottom:32}}>
                alarkpurisangam1@gmail.com
              </a>
              <div className="footer-newsletter">
                <div className="footer-newsletter-title">Stay Updated</div>
                <div className="footer-newsletter-form">
                  <input className="footer-newsletter-input" type="email" placeholder="Your email address"/>
                  <button className="footer-newsletter-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-divider"/>
          <div className="footer-bottom">
            <div className="footer-bottom-text">&copy; 2026 <span>Alarkpuri Sangam Resort</span>. All rights reserved.</div>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Muted WhatsApp button */}
      <a href="https://wa.me/918737906519" className="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <Icon.WhatsApp/>
      </a>

      {/* Back to top - hidden on mobile via CSS */}
      <button className={`back-to-top ${showTop?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} title="Back to top">
        <Icon.ChevronUp/>
      </button>

      <div className={`toast ${toast?'show':''}`}>Reservation request sent successfully</div>
    </>
  );
}