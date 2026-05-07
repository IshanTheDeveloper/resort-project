import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-pale: #F5E6C0;
    --teal-deep: #08201F;
    --teal: #0F3030;
    --teal-mid: #1A4444;
    --teal-light: #265858;
    --cream: #FAF5EC;
    --cream-dark: #EFE6D0;
    --white: #FFFFFF;
    --text-light: #C8BAA0;
    --shadow-gold: 0 0 40px rgba(201,168,76,0.25);
    --shadow-deep: 0 20px 60px rgba(0,0,0,0.5);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'Jost', sans-serif; background: var(--teal-deep); color: var(--cream); overflow-x: hidden; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--teal-deep); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0 48px;
    display: flex; align-items: center; justify-content: space-between;
    height: 82px; transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
  }
  .navbar.scrolled {
    background: rgba(8,32,31,0.96);
    backdrop-filter: blur(24px);
    height: 66px;
    box-shadow: 0 1px 0 rgba(201,168,76,0.18), 0 8px 40px rgba(0,0,0,0.5);
  }
  .nav-logo { cursor: pointer; }
  .nav-logo-title {
    font-family: 'Cinzel', serif; font-size: 17px; font-weight: 700;
    color: var(--gold); letter-spacing: 3px; line-height: 1;
  }
  .nav-logo-sub {
    font-size: 9px; font-weight: 300; color: var(--text-light);
    letter-spacing: 5px; text-transform: uppercase;
  }
  .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
  .nav-links a {
    font-family: 'Cinzel', serif; font-size: 10.5px; font-weight: 400;
    color: var(--text-light); text-decoration: none; letter-spacing: 2px;
    text-transform: uppercase; transition: color 0.3s;
    position: relative; padding-bottom: 4px;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 1px; background: var(--gold);
    transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-links a:hover::after { width: 100%; }
  .nav-cta {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%) !important;
    color: var(--teal-deep) !important; padding: 10px 22px !important;
    font-weight: 600 !important; border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1) !important;
    box-shadow: 0 4px 15px rgba(201,168,76,0.25);
  }
  .nav-cta::after { display: none !important; }
  .nav-cta:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 30px rgba(201,168,76,0.45) !important;
    filter: brightness(1.05);
  }

  .hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer; z-index: 1100;
    background: none; border: none; padding: 4px;
  }
  .hamburger span {
    display: block; width: 26px; height: 2px;
    background: var(--gold); transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    transform-origin: center;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    display: none; position: fixed; inset: 0; z-index: 1050;
    background: rgba(8,32,31,0.98); backdrop-filter: blur(24px);
    flex-direction: column; align-items: center; justify-content: center; gap: 40px;
    opacity: 0; pointer-events: none; transition: opacity 0.4s;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; }
  .mobile-menu a {
    font-family: 'Cinzel', serif; font-size: 20px; color: var(--cream);
    text-decoration: none; letter-spacing: 4px; transition: color 0.3s;
  }
  .mobile-menu a:hover { color: var(--gold); }

  /* ── HERO ── */
  .hero {
    height: 100vh; min-height: 700px; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(155deg, #071a19 0%, #0a2525 35%, #112e1e 100%);
  }
  .hero-pattern {
    position: absolute; inset: 0; opacity: 0.055;
    background-image:
      repeating-linear-gradient(45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%),
      repeating-linear-gradient(-45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%);
    background-size: 28px 28px;
  }
  .hero-orb1 {
    position: absolute; width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%);
    top: -250px; right: -150px;
    animation: orbFloat 9s ease-in-out infinite;
  }
  .hero-orb2 {
    position: absolute; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(20,90,90,0.25) 0%, transparent 65%);
    bottom: -150px; left: -120px;
    animation: orbFloat 12s ease-in-out infinite reverse;
  }
  .hero-orb3 {
    position: absolute; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%);
    top: 30%; left: 20%;
    animation: orbFloat 7s ease-in-out infinite 2s;
  }
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-28px) scale(1.06); }
  }

  .hero-lines {
    position: absolute; inset: 0; overflow: hidden; pointer-events: none;
  }
  .hero-lines::before, .hero-lines::after {
    content: ''; position: absolute;
    border: 1px solid rgba(201,168,76,0.07);
    border-radius: 50%;
  }
  .hero-lines::before { width: 900px; height: 900px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
  .hero-lines::after  { width: 600px; height: 600px; top: 50%; left: 50%; transform: translate(-50%,-50%); }

  .hero-content {
    position: relative; z-index: 2; text-align: center; padding: 0 24px;
    max-width: 920px;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 10px; font-weight: 300; letter-spacing: 8px;
    text-transform: uppercase; color: var(--gold);
    border: 1px solid rgba(201,168,76,0.35); padding: 9px 28px; margin-bottom: 36px;
    animation: heroFadeDown 1s ease both;
    position: relative; overflow: hidden;
  }
  .hero-badge::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.07), transparent);
    transform: translateX(-100%);
    animation: shimmer 3s ease-in-out infinite 1.5s;
  }
  @keyframes shimmer { to { transform: translateX(100%); } }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(54px, 9vw, 120px);
    font-weight: 300; line-height: 0.95; color: var(--cream);
    margin-bottom: 10px;
    animation: heroFadeUp 1s ease 0.2s both;
  }
  .hero-title em { font-style: italic; color: var(--gold); font-weight: 300; }
  .hero-title-bold {
    font-family: 'Cinzel', serif; font-size: clamp(22px, 3.5vw, 48px);
    font-weight: 600; letter-spacing: 6px; color: var(--gold-light);
    text-transform: uppercase; display: block; margin-bottom: 28px;
    animation: heroFadeUp 1s ease 0.38s both;
  }
  .hero-subtitle {
    font-size: 15px; font-weight: 300; color: var(--text-light);
    letter-spacing: 2.5px; margin-bottom: 52px;
    animation: heroFadeUp 1s ease 0.52s both;
  }
  .hero-actions {
    display: flex; align-items: center; justify-content: center; gap: 20px;
    flex-wrap: wrap;
    animation: heroFadeUp 1s ease 0.66s both;
  }
  @keyframes heroFadeDown { from { opacity: 0; transform: translateY(-28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes heroFadeUp   { from { opacity: 0; transform: translateY(28px);  } to { opacity: 1; transform: translateY(0); } }

  /* ── BUTTONS ── */
  .btn-primary {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color: var(--teal-deep); font-family: 'Cinzel', serif; font-size: 11.5px;
    font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
    padding: 17px 44px; border: none; cursor: pointer; border-radius: 2px;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    text-decoration: none; display: inline-block;
    position: relative; overflow: hidden;
    box-shadow: 0 4px 20px rgba(201,168,76,0.25);
  }
  .btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
    opacity: 0; transition: opacity 0.35s;
  }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 18px 45px rgba(201,168,76,0.45);
  }
  .btn-primary:active { transform: translateY(-1px) scale(0.99); }
  .btn-primary span { position: relative; z-index: 1; }

  .btn-outline {
    background: transparent; color: var(--gold);
    font-family: 'Cinzel', serif; font-size: 11.5px; font-weight: 600;
    letter-spacing: 3px; text-transform: uppercase; padding: 16px 44px;
    border: 1px solid var(--gold); cursor: pointer; border-radius: 2px;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    text-decoration: none; display: inline-block;
    position: relative; overflow: hidden;
  }
  .btn-outline::before {
    content: ''; position: absolute; inset: 0;
    background: var(--gold);
    transform: translateY(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .btn-outline:hover::before { transform: translateY(0); }
  .btn-outline:hover { color: var(--teal-deep); transform: translateY(-4px); box-shadow: 0 14px 35px rgba(201,168,76,0.3); }
  .btn-outline span { position: relative; z-index: 1; }

  /* ── SCROLL INDICATOR ── */
  .scroll-indicator {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    cursor: pointer; animation: heroFadeUp 1s ease 1.1s both;
    z-index: 5;
  }
  .scroll-indicator-label {
    font-size: 9px; letter-spacing: 5px; color: var(--gold); text-transform: uppercase;
  }
  .scroll-indicator-track {
    width: 1px; height: 60px; background: rgba(201,168,76,0.2);
    position: relative; overflow: hidden;
  }
  .scroll-indicator-fill {
    position: absolute; top: -100%; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom, var(--gold-light), var(--gold));
    animation: scrollFill 2.2s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  @keyframes scrollFill {
    0%   { top: -100%; }
    50%  { top: 100%; }
    50.01% { top: -100%; }
    100% { top: -100%; }
  }

  /* ── SECTION SCROLL INDICATOR (reused each section) ── */
  .section-scroll {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    margin-top: 64px; cursor: pointer;
  }
  .section-scroll-label { font-size: 9px; letter-spacing: 4px; color: var(--gold); opacity: 0.6; text-transform: uppercase; }
  .section-scroll-track {
    width: 1px; height: 48px; background: rgba(201,168,76,0.15); position: relative; overflow: hidden;
  }
  .section-scroll-fill {
    position: absolute; top: -100%; width: 100%; height: 100%;
    background: linear-gradient(to bottom, transparent, var(--gold));
    animation: scrollFill 2.5s ease-in-out infinite;
  }

  /* ── BACK TO TOP ── */
  .back-to-top {
    position: fixed; bottom: 32px; left: 32px; z-index: 990;
    width: 46px; height: 46px; border-radius: 50%;
    background: rgba(8,32,31,0.9); border: 1px solid rgba(201,168,76,0.4);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    opacity: 0; transform: translateY(20px);
    backdrop-filter: blur(10px);
  }
  .back-to-top.visible { opacity: 1; transform: translateY(0); }
  .back-to-top:hover {
    background: var(--gold); border-color: var(--gold);
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(201,168,76,0.4);
  }
  .back-to-top svg { transition: transform 0.3s; }
  .back-to-top:hover svg { transform: translateY(-2px); }

  /* ── SECTIONS COMMON ── */
  section { padding: 110px 0; }
  .container { max-width: 1300px; margin: 0 auto; padding: 0 48px; }
  .section-label {
    font-size: 10px; font-weight: 300; letter-spacing: 7px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 14px; display: block;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 5vw, 68px);
    font-weight: 300; color: var(--cream); line-height: 1.05; margin-bottom: 22px;
  }
  .section-title em { color: var(--gold); font-style: italic; }
  .section-divider {
    width: 56px; height: 1px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin-bottom: 32px;
  }
  .section-text {
    font-size: 15.5px; font-weight: 300; color: var(--text-light);
    line-height: 1.95; max-width: 560px;
  }

  /* ── REVEAL ANIMATIONS (enhanced) ── */
  .reveal {
    opacity: 0; transform: translateY(48px);
    transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left {
    opacity: 0; transform: translateX(-48px);
    transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right {
    opacity: 0; transform: translateX(48px);
    transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }
  .reveal-scale {
    opacity: 0; transform: scale(0.92);
    transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-scale.visible { opacity: 1; transform: scale(1); }

  /* ── ABOUT ── */
  .about-section { background: var(--teal); position: relative; overflow: hidden; }
  .about-section::before {
    content: ''; position: absolute; top: -200px; right: -200px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 88px; align-items: center; }
  .about-card {
    background: linear-gradient(145deg, var(--teal-mid), var(--teal-deep));
    border: 1px solid rgba(201,168,76,0.18); padding: 52px;
    position: relative; overflow: hidden;
  }
  .about-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
  }
  .about-card::after {
    content: ''; position: absolute; bottom: -60px; right: -60px;
    width: 150px; height: 150px; border: 1px solid rgba(201,168,76,0.08); border-radius: 50%;
  }
  .about-quote {
    font-family: 'Cormorant Garamond', serif; font-size: 26px;
    color: var(--gold); font-style: italic; margin-bottom: 18px; line-height: 1.5;
  }
  .about-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 36px; }
  .stat-item {
    text-align: center; padding: 22px 12px;
    border: 1px solid rgba(201,168,76,0.12);
    background: rgba(201,168,76,0.03);
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    cursor: default;
  }
  .stat-item:hover {
    border-color: rgba(201,168,76,0.4);
    background: rgba(201,168,76,0.07);
    transform: translateY(-3px);
  }
  .stat-num {
    font-family: 'Cormorant Garamond', serif; font-size: 44px;
    font-weight: 300; color: var(--gold); display: block; line-height: 1;
  }
  .stat-label {
    font-size: 10px; letter-spacing: 3px; color: var(--text-light);
    text-transform: uppercase; margin-top: 6px; display: block;
  }
  .feature-list { list-style: none; margin-top: 28px; }
  .feature-list li {
    display: flex; align-items: center; gap: 14px;
    padding: 11px 0; border-bottom: 1px solid rgba(201,168,76,0.08);
    font-size: 14.5px; color: var(--text-light);
    transition: color 0.3s, padding-left 0.3s;
    cursor: default;
  }
  .feature-list li:hover { color: var(--cream); padding-left: 6px; }
  .feature-dot {
    width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0;
  }

  /* ── ROOMS SLIDER ── */
  .rooms-section { background: var(--teal-deep); }
  .rooms-slider-wrap { position: relative; overflow: hidden; }
  .rooms-track {
    display: flex; gap: 0;
    transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
    will-change: transform;
  }
  .room-card {
    min-width: calc(33.333%);
    position: relative; overflow: hidden; cursor: pointer;
    height: 520px; flex-shrink: 0;
    background: var(--teal-mid);
  }
  .room-img-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    position: absolute; inset: 0; overflow: hidden;
  }
  .room-img-placeholder img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
    filter: brightness(0.75);
  }
  .room-card:hover .room-img-placeholder img { transform: scale(1.07); filter: brightness(0.55); }
  .room-img-fallback {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .room-card:hover .room-img-fallback { transform: scale(1.05); }
  .room-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(8,32,31,0.98) 0%, rgba(8,32,31,0.45) 55%, rgba(8,32,31,0.1) 100%);
    transition: background 0.5s ease;
  }
  .room-card:hover .room-overlay {
    background: linear-gradient(to top, rgba(8,32,31,0.97) 30%, rgba(8,32,31,0.7) 65%, rgba(8,32,31,0.3) 100%);
  }
  .room-content {
    position: absolute; bottom: 0; left: 0; right: 0; padding: 36px;
  }
  .room-price { font-family: 'Cormorant Garamond', serif; font-size: 13px; color: var(--gold); letter-spacing: 2px; margin-bottom: 8px; }
  .room-name { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 600; color: var(--cream); margin-bottom: 8px; }
  .room-meta { display: flex; gap: 18px; font-size: 12px; color: var(--text-light); letter-spacing: 1px; margin-bottom: 14px; }
  .room-desc {
    font-size: 13.5px; color: var(--text-light); line-height: 1.65;
    opacity: 0; transform: translateY(12px);
    transition: all 0.45s cubic-bezier(0.4,0,0.2,1) 0.05s;
    margin-bottom: 18px; max-height: 0; overflow: hidden;
  }
  .room-card:hover .room-desc { opacity: 1; transform: translateY(0); max-height: 80px; }
  .room-book-btn {
    background: transparent; color: var(--gold);
    font-family: 'Cinzel', serif; font-size: 10px; font-weight: 600;
    letter-spacing: 2.5px; padding: 10px 24px;
    border: 1px solid rgba(201,168,76,0.5); cursor: pointer;
    opacity: 0; transform: translateY(10px);
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1) 0.1s;
    position: relative; overflow: hidden;
  }
  .room-book-btn::before {
    content: ''; position: absolute; inset: 0; background: var(--gold);
    transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .room-book-btn:hover::before { transform: translateX(0); }
  .room-book-btn:hover { color: var(--teal-deep); border-color: var(--gold); }
  .room-book-btn span { position: relative; z-index: 1; }
  .room-card:hover .room-book-btn { opacity: 1; transform: translateY(0); }

  .slider-controls {
    display: flex; align-items: center; justify-content: center; gap: 20px;
    margin-top: 40px;
  }
  .slider-btn {
    width: 48px; height: 48px; border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.35); background: transparent;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    color: var(--gold);
  }
  .slider-btn:hover {
    background: var(--gold); color: var(--teal-deep);
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(201,168,76,0.35);
  }
  .slider-btn:disabled { opacity: 0.25; cursor: default; transform: none; }
  .slider-dots { display: flex; gap: 8px; align-items: center; }
  .slider-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(201,168,76,0.25); cursor: pointer;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    border: none;
  }
  .slider-dot.active { background: var(--gold); width: 22px; border-radius: 3px; }

  /* ── AMENITIES ── */
  .amenities-section { background: var(--teal); }
  .amenities-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2px; }
  .amenity-card {
    background: var(--teal-mid); padding: 40px 26px; text-align: center;
    border: 1px solid transparent;
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1); cursor: default;
    position: relative; overflow: hidden;
  }
  .amenity-card::after {
    content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  .amenity-card:hover { border-color: rgba(201,168,76,0.25); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
  .amenity-card:hover::after { width: 80%; }
  .amenity-icon { margin-bottom: 18px; display: flex; align-items: center; justify-content: center; }
  .amenity-name {
    font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600;
    letter-spacing: 2.5px; color: var(--gold); text-transform: uppercase;
    margin-bottom: 10px;
  }
  .amenity-desc { font-size: 13px; color: var(--text-light); line-height: 1.65; }

  /* ── BANQUET ── */
  .banquet-section { background: var(--teal-deep); }
  .banquet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 88px; align-items: center; }
  .banquet-features { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 36px; }
  .banquet-feature {
    background: rgba(201,168,76,0.04); border: 1px solid rgba(201,168,76,0.12);
    padding: 22px; border-radius: 2px;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1); cursor: default;
  }
  .banquet-feature:hover { background: rgba(201,168,76,0.09); border-color: rgba(201,168,76,0.35); transform: translateY(-3px); }
  .banquet-feature-icon { margin-bottom: 10px; }
  .banquet-feature-title { font-family: 'Cinzel', serif; font-size: 10.5px; color: var(--gold); letter-spacing: 2px; }
  .banquet-visual-stack { position: relative; height: 520px; }
  .banquet-img-main {
    position: absolute; top: 0; left: 0; right: 60px; bottom: 60px;
    background: linear-gradient(145deg, var(--teal-mid), var(--teal-deep));
    border: 1px solid rgba(201,168,76,0.15);
    display: flex; align-items: center; justify-content: center;
  }
  .banquet-img-accent {
    position: absolute; bottom: 0; right: 0; width: 200px; height: 200px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex; align-items: center; justify-content: center;
    opacity: 0.85;
  }
  .banquet-badge {
    position: absolute; top: 32px; right: 72px; z-index: 2;
    background: var(--gold); color: var(--teal-deep);
    width: 96px; height: 96px; border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: 'Cinzel', serif; font-size: 9px; font-weight: 700;
    letter-spacing: 1px; text-align: center; line-height: 1.5; text-transform: uppercase;
    box-shadow: 0 8px 30px rgba(201,168,76,0.35);
  }
  .banquet-badge strong { font-size: 22px; letter-spacing: 0; display: block; }

  /* ── RESTAURANT ── */
  .restaurant-section { background: var(--teal); }
  .restaurant-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 88px; align-items: center; }
  .menu-tabs { display: flex; gap: 2px; margin-bottom: 32px; }
  .menu-tab {
    padding: 12px 22px; font-family: 'Cinzel', serif; font-size: 10px;
    letter-spacing: 2px; cursor: pointer; border: 1px solid rgba(201,168,76,0.18);
    background: transparent; color: var(--text-light);
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .menu-tab.active { background: var(--gold); color: var(--teal-deep); border-color: var(--gold); }
  .menu-tab:hover:not(.active) { border-color: var(--gold); color: var(--gold); }
  .menu-items { display: flex; flex-direction: column; gap: 0; }
  .menu-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 18px 0; border-bottom: 1px solid rgba(201,168,76,0.08);
    transition: padding-left 0.3s; cursor: default;
  }
  .menu-item:hover { padding-left: 8px; }
  .menu-item-name { font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--cream); }
  .menu-item-desc { font-size: 12.5px; color: var(--text-light); margin-top: 4px; }
  .menu-item-price { font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--gold); white-space: nowrap; }

  /* ── GALLERY ── */
  .gallery-section { background: var(--teal); padding: 110px 0; }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 230px);
    gap: 4px;
  }
  .gallery-item {
    overflow: hidden; cursor: pointer; position: relative;
    background: var(--teal-mid);
    display: flex; align-items: center; justify-content: center;
  }
  .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
  .gallery-item-bg {
    position: absolute; inset: 0; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
    display: flex; align-items: center; justify-content: center;
  }
  .gallery-item:hover .gallery-item-bg { transform: scale(1.06); }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); filter: brightness(0.7); }
  .gallery-item:hover img { transform: scale(1.06); filter: brightness(0.5); }
  .gallery-overlay {
    position: absolute; inset: 0;
    background: rgba(8,32,31,0.45);
    opacity: 0; transition: opacity 0.45s; display: flex; align-items: center; justify-content: center;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }
  .gallery-expand-label { font-family: 'Cinzel', serif; font-size: 11px; color: var(--gold); letter-spacing: 2px; margin-top: 8px; text-transform: uppercase; }

  /* ── ATTRACTIONS ── */
  .attractions-section { background: var(--teal-deep); }
  .attractions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 20px; }
  .attraction-card {
    border: 1px solid rgba(201,168,76,0.12); padding: 36px;
    background: var(--teal-mid);
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1); cursor: default;
    position: relative; overflow: hidden;
  }
  .attraction-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.4s;
  }
  .attraction-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light), transparent);
    transform: scaleX(0); transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
    transform-origin: left;
  }
  .attraction-card:hover { transform: translateY(-7px); border-color: rgba(201,168,76,0.32); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
  .attraction-card:hover::before { opacity: 1; }
  .attraction-card:hover::after { transform: scaleX(1); }
  .attraction-icon { margin-bottom: 18px; }
  .attraction-name { font-family: 'Cinzel', serif; font-size: 13px; font-weight: 600; color: var(--gold); letter-spacing: 2px; margin-bottom: 10px; text-transform: uppercase; }
  .attraction-dist { font-size: 11.5px; color: var(--text-light); letter-spacing: 2px; margin-bottom: 12px; }
  .attraction-desc { font-size: 13.5px; color: var(--text-light); line-height: 1.75; }

  /* ── TESTIMONIALS ── */
  .testimonials-section { background: var(--teal-deep); }
  .testimonials-track {
    display: flex; gap: 20px; overflow-x: auto; padding-bottom: 16px;
    scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: var(--gold) transparent;
  }
  .testimonials-track::-webkit-scrollbar { height: 3px; }
  .testimonials-track::-webkit-scrollbar-thumb { background: var(--gold); }
  .testimonial-card {
    min-width: 390px; background: var(--teal-mid); border: 1px solid rgba(201,168,76,0.12);
    padding: 42px; scroll-snap-align: start; flex-shrink: 0;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .testimonial-card:hover { border-color: rgba(201,168,76,0.3); box-shadow: 0 16px 40px rgba(0,0,0,0.25); }
  .testimonial-quote {
    font-family: 'Cormorant Garamond', serif; font-size: 72px; color: var(--gold);
    opacity: 0.22; line-height: 0.5; margin-bottom: 22px; display: block;
  }
  .testimonial-text {
    font-family: 'Cormorant Garamond', serif; font-size: 18px; font-style: italic;
    color: var(--cream); line-height: 1.75; margin-bottom: 26px;
  }
  .testimonial-author { font-family: 'Cinzel', serif; font-size: 10.5px; color: var(--gold); letter-spacing: 2px; }
  .testimonial-location { font-size: 12px; color: var(--text-light); margin-top: 5px; }
  .stars { color: var(--gold); font-size: 13px; margin-bottom: 18px; letter-spacing: 2px; }

  /* ── BOOKING ── */
  .booking-section { background: var(--teal); }
  .booking-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 88px; align-items: start; }
  .booking-form {
    background: var(--teal-mid); border: 1px solid rgba(201,168,76,0.18);
    padding: 52px; position: relative; overflow: hidden;
  }
  .booking-form::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent);
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { margin-bottom: 20px; }
  .form-label {
    display: block; font-family: 'Cinzel', serif; font-size: 9.5px;
    letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 9px;
  }
  .form-input, .form-select {
    width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.18);
    color: var(--cream); padding: 13px 16px; font-family: 'Jost', sans-serif;
    font-size: 14px; outline: none;
    transition: border-color 0.3s, background 0.3s;
    border-radius: 2px; appearance: none;
  }
  .form-input:focus, .form-select:focus { border-color: var(--gold); background: rgba(201,168,76,0.04); }
  .form-input::placeholder { color: rgba(200,186,160,0.35); }
  .form-select option { background: var(--teal-deep); color: var(--cream); }
  .form-submit {
    width: 100%; background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--teal-deep); font-family: 'Cinzel', serif; font-size: 12px;
    font-weight: 700; letter-spacing: 3px; padding: 18px; border: none;
    cursor: pointer; text-transform: uppercase;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1); border-radius: 2px; margin-top: 8px;
    position: relative; overflow: hidden;
  }
  .form-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold-light), var(--gold));
    opacity: 0; transition: opacity 0.35s;
  }
  .form-submit:hover::before { opacity: 1; }
  .form-submit:hover { transform: translateY(-3px); box-shadow: 0 14px 38px rgba(201,168,76,0.4); }
  .form-submit span { position: relative; z-index: 1; }

  .contact-info { padding-top: 24px; }
  .contact-item { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 32px; }
  .contact-icon {
    width: 48px; height: 48px; border: 1px solid rgba(201,168,76,0.28); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.35s; cursor: default;
  }
  .contact-item:hover .contact-icon { background: rgba(201,168,76,0.1); border-color: var(--gold); }
  .contact-title { font-family: 'Cinzel', serif; font-size: 11px; color: var(--gold); letter-spacing: 2px; }
  .contact-detail { font-size: 14px; color: var(--text-light); margin-top: 5px; line-height: 1.7; }

  /* ── FOOTER ── */
  .footer { background: #051010; padding: 90px 0 0; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 52px; margin-bottom: 64px; }
  .footer-brand-title { font-family: 'Cinzel', serif; font-size: 21px; color: var(--gold); letter-spacing: 2.5px; margin-bottom: 6px; }
  .footer-brand-sub { font-size: 10px; letter-spacing: 5px; color: var(--text-light); text-transform: uppercase; margin-bottom: 20px; }
  .footer-brand-desc { font-size: 13.5px; color: var(--text-light); line-height: 1.85; max-width: 280px; }
  .footer-col-title { font-family: 'Cinzel', serif; font-size: 11px; color: var(--gold); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 24px; }
  .footer-links { list-style: none; }
  .footer-links li { margin-bottom: 12px; }
  .footer-links a {
    font-size: 13.5px; color: var(--text-light); text-decoration: none;
    transition: color 0.3s, padding-left 0.3s; letter-spacing: 0.5px; display: inline-block;
  }
  .footer-links a:hover { color: var(--gold); padding-left: 6px; }
  .footer-social { display: flex; gap: 10px; margin-top: 28px; }
  .social-btn {
    width: 40px; height: 40px; border: 1px solid rgba(201,168,76,0.28); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-light); cursor: pointer;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1); text-decoration: none;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-4px) rotate(5deg); box-shadow: 0 8px 22px rgba(201,168,76,0.25); }
  .footer-bottom {
    border-top: 1px solid rgba(201,168,76,0.08); padding: 26px 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-bottom-text { font-size: 12.5px; color: var(--text-light); }
  .footer-bottom-text span { color: var(--gold); }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 36px; right: 36px; z-index: 9999;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--teal-deep);
    font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700;
    letter-spacing: 2.5px; padding: 16px 30px; border-radius: 2px;
    transform: translateY(100px); opacity: 0;
    transition: all 0.45s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 10px 35px rgba(201,168,76,0.35);
  }
  .toast.show { transform: translateY(0); opacity: 1; }

  /* ── WHATSAPP ── */
  .whatsapp-float {
    position: fixed; bottom: 36px; right: 36px; z-index: 990;
    background: #25D366; color: white;
    width: 52px; height: 52px; border-radius: 50%; border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 6px 24px rgba(37,211,102,0.45);
    animation: waFloat 3.5s ease-in-out infinite;
    text-decoration: none; transition: transform 0.3s, box-shadow 0.3s;
  }
  .whatsapp-float:hover { transform: scale(1.12) !important; box-shadow: 0 10px 36px rgba(37,211,102,0.6) !important; animation: none !important; }
  @keyframes waFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-7px); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .about-grid, .banquet-grid, .restaurant-grid, .booking-grid { grid-template-columns: 1fr; gap: 52px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
    .gallery-grid { grid-template-columns: repeat(2,1fr); grid-template-rows: repeat(3,200px); }
    .gallery-item:nth-child(1) { grid-column: span 2; }
    .room-card { min-width: 50%; }
  }
  @media (max-width: 768px) {
    .navbar { padding: 0 22px; }
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .mobile-menu { display: flex; }
    .container { padding: 0 22px; }
    section { padding: 72px 0; }
    .room-card { min-width: 85%; }
    .amenities-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: repeat(4, 155px); }
    .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 1; }
    .form-row { grid-template-columns: 1fr; }
    .banquet-features { grid-template-columns: 1fr; }
    .about-stat-grid { grid-template-columns: 1fr 1fr; }
    .hero-actions { flex-direction: column; align-items: center; }
    .footer-bottom { flex-direction: column; gap: 14px; text-align: center; }
    .testimonial-card { min-width: 300px; }
    .attractions-grid { grid-template-columns: 1fr; }
    .back-to-top { bottom: 88px; }
  }
  @media (max-width: 480px) {
    .amenities-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
    .gallery-item { height: 200px; }
    .gallery-item:nth-child(1) { grid-column: span 1; }
    .menu-tabs { flex-wrap: wrap; }
    .room-card { min-width: 92%; }
  }
`;

/* ── SVG ICONS ── */
const Icon = {
  ChevronLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.1-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Wave: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
      <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
      <path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity="0.5"/>
    </svg>
  ),
  Dining: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
      <path d="M7 2v20"/>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
    </svg>
  ),
  Star: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Clock2: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Car: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
      <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
      <line x1="9" y1="17" x2="15" y2="17"/>
    </svg>
  ),
  Wifi: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
      <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
      <circle cx="12" cy="20" r="1" fill="#C9A84C"/>
    </svg>
  ),
  Temple: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7h20L12 2z"/>
      <path d="M2 7v2h20V7"/>
      <rect x="4" y="9" width="4" height="13"/><rect x="10" y="9" width="4" height="13"/>
      <rect x="16" y="9" width="4" height="13"/>
      <line x1="2" y1="22" x2="22" y2="22"/>
    </svg>
  ),
  Tree: () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14l-5-9-5 9h4v8h2v-8z"/>
      <path d="M19 10l-3-5.5-3 5.5"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  ),
  FB: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  IG: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  YT: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
};

/* ── DATA ── */
const rooms = [
  { name: "Premium Suite", price: "₹10,500 / Night", desc: "Panoramic views of lush surroundings with artisan décor and handcrafted wooden furnishings.", bathrooms: 2, occupancy: 5, bg: "linear-gradient(145deg, #1a4040 0%, #0a2020 100%)" },
  { name: "Luxury Suite",   price: "₹11,500 / Night", desc: "Unparalleled privacy with a signature stone bathtub — the finest choice for couples seeking a romantic retreat.", bathrooms: 2, occupancy: 5, bg: "linear-gradient(145deg, #2a4030 0%, #0a2010 100%)" },
  { name: "Nature Cottage", price: "₹8,500 / Night",  desc: "Bamboo-walled sanctuary merging seamlessly with the forest, for a truly organic and restorative stay.", bathrooms: 1, occupancy: 3, bg: "linear-gradient(145deg, #384a28 0%, #1a2a0a 100%)" },
  { name: "Riverside Room",  price: "₹9,200 / Night",  desc: "Wake up to the gentle sound of flowing waters with direct balcony views of the sacred river. Ideal for pilgrims.", bathrooms: 1, occupancy: 2, bg: "linear-gradient(145deg, #1a3848 0%, #0a1828 100%)" },
  { name: "Heritage Villa",  price: "₹14,000 / Night", desc: "A sprawling private villa with traditional Awadhi architecture, private garden, and butler service for families.", bathrooms: 3, occupancy: 8, bg: "linear-gradient(145deg, #402820 0%, #201008 100%)" },
  { name: "Forest Chalet",   price: "₹7,800 / Night",  desc: "Secluded wooden chalet surrounded by tall trees, perfect for introspection and natural wellness retreats.", bathrooms: 1, occupancy: 2, bg: "linear-gradient(145deg, #283c20 0%, #101c08 100%)" },
  { name: "Royal Chamber",   price: "₹13,500 / Night", desc: "Imperial interiors inspired by Mughal grandeur with inlay marble floors, silk drapes, and antique furnishings.", bathrooms: 2, occupancy: 4, bg: "linear-gradient(145deg, #40301a 0%, #201508 100%)" },
  { name: "Garden Suite",    price: "₹9,800 / Night",  desc: "Open to a private manicured garden with an outdoor sitting area, ideal for morning yoga and evening contemplation.", bathrooms: 2, occupancy: 4, bg: "linear-gradient(145deg, #304020 0%, #182010 100%)" },
];

const amenities = [
  { Icon: Icon.Wave,   name: "River Views",    desc: "Proximity to sacred Triveni Sangam" },
  { Icon: Icon.Dining, name: "Fine Dining",    desc: "Multi-cuisine luxury restaurant" },
  { Icon: Icon.Star,   name: "Banquet Hall",   desc: "Grand events & celebrations" },
  { Icon: Icon.Clock2, name: "24×7 Service",   desc: "Round-the-clock room service" },
  { Icon: Icon.Car,    name: "Valet Parking",  desc: "Complimentary secure parking" },
  { Icon: Icon.Wifi,   name: "High-Speed WiFi",desc: "Seamless connectivity throughout" },
  { Icon: Icon.Temple, name: "Spiritual Tours",desc: "Guided Sangam rituals & ghats" },
  { Icon: Icon.Tree,   name: "Nature Walks",   desc: "Curated riverside walks & trails" },
];

const menuItems = {
  veg: [
    { name: "Prayagraj Thali",    desc: "12-course traditional meal",        price: "₹850" },
    { name: "River Herb Risotto", desc: "Seasonal herbs, truffle oil",        price: "₹680" },
    { name: "Dal Baati Churma",   desc: "Rajasthani classic, ghee-rich",      price: "₹520" },
    { name: "Masala Dosa Royale", desc: "Crispy, spiced potato filling",      price: "₹420" },
  ],
  nonveg: [
    { name: "Lucknowi Biryani",  desc: "Dum-cooked, aromatic spices",         price: "₹980" },
    { name: "Tandoori Pomfret",  desc: "Fresh river catch, marinated overnight",price: "₹1,200" },
    { name: "Butter Chicken",    desc: "Creamy tomato sauce, naan",           price: "₹750" },
    { name: "Mutton Raan",       desc: "Slow-roasted leg, 12 hours",          price: "₹1,400" },
  ],
  beverages: [
    { name: "Sangam Sunrise",  desc: "Fresh mango, saffron, ginger",          price: "₹280" },
    { name: "Rose Lassi",      desc: "Thick yogurt, rose water",              price: "₹220" },
    { name: "Masala Chai",     desc: "House blend, cardamom",                 price: "₹180" },
    { name: "Thandai Special", desc: "Festival drink, nuts and spices",       price: "₹320" },
  ]
};

const attractions = [
  { name: "Triveni Sangam",       dist: "0.5 km", desc: "Sacred confluence of Ganga, Yamuna & Saraswati — the holiest bathing ghat in India." },
  { name: "Saraswati Ghat",       dist: "1.2 km", desc: "Peaceful ghat for boat rides, sunrise views, and evening aarti ceremonies." },
  { name: "Nagvasuki Temple",     dist: "2.0 km", desc: "Ancient serpent deity temple, believed to be thousands of years old." },
  { name: "Bade Hanuman Mandir",  dist: "1.8 km", desc: "Unique reclining Hanuman idol, believed to protect the region from floods." },
  { name: "Akshayavat",           dist: "3.0 km", desc: "The immortal banyan tree inside Allahabad Fort, revered across all Hindu scriptures." },
  { name: "Allahabad Fort",       dist: "3.5 km", desc: "Mughal-era fort built by Emperor Akbar in 1583, commanding Sangam views." },
];

const testimonials = [
  { text: "The most peaceful escape near the Sangam. The cottage was breathtaking, service impeccable. We will return for Kumbh without a second thought.", author: "Priya & Rohit Sharma", location: "Delhi, India", stars: 5 },
  { text: "For our anniversary, Alarkpuri Sangam Resort was perfection. The luxury suite with the stone bathtub — truly magical. Fine dining beyond expectations.", author: "Meera Krishnamurthy", location: "Bengaluru, India", stars: 5 },
  { text: "We hosted our son's wedding reception in the banquet hall. Every detail was handled with grace. The floral arrangements were extraordinary.", author: "Suresh & Kamla Agarwal", location: "Lucknow, India", stars: 5 },
  { text: "Came for a spiritual retreat and left transformed. The proximity to Sangam meant morning dips were effortless. Staff are genuinely warm and attentive.", author: "Dr. Arjun Pillai", location: "Mumbai, India", stars: 5 },
];

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function ScrollDownIndicator({ targetId }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="section-scroll" onClick={() => scrollTo(targetId)}>
      <span className="section-scroll-label">Scroll</span>
      <div className="section-scroll-track"><div className="section-scroll-fill" /></div>
    </div>
  );
}

export default function AlarkpuriSangamResort() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeMenu, setActiveMenu] = useState('veg');
  const [toast, setToast]           = useState(false);
  const [showTop, setShowTop]       = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [form, setForm] = useState({ name:'', email:'', phone:'', checkin:'', checkout:'', guests:'2', roomType:'premium', message:'' });
  useReveal();

  const visibleCount = typeof window !== 'undefined' && window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  const maxIndex = rooms.length - visibleCount;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 4000);
    setForm({ name:'', email:'', phone:'', checkin:'', checkout:'', guests:'2', roomType:'premium', message:'' });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const prevSlide = () => setSlideIndex(i => Math.max(0, i - 1));
  const nextSlide = () => setSlideIndex(i => Math.min(maxIndex, i + 1));

  const cardWidth = (100 / visibleCount);

  const navSections = ['home','about','rooms','banquet','restaurant','attractions','booking'];

  return (
    <>
      <style>{style}</style>

      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <div className="nav-logo-title">ALARKPURI SANGAM</div>
          <div className="nav-logo-sub">Resort & Restaurant</div>
        </div>
        <ul className="nav-links">
          {navSections.map(s => (
            <li key={s}>
              <a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
                {s === 'home' ? 'Home' : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <a href="#booking" className="nav-cta" onClick={e => { e.preventDefault(); scrollTo('booking'); }}>
              Book Stay
            </a>
          </li>
        </ul>
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navSections.map(s => (
          <a key={s} href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-pattern" />
        <div className="hero-lines" />
        <div className="hero-orb1" /><div className="hero-orb2" /><div className="hero-orb3" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>&#10022;</span> Prayagraj, Uttar Pradesh <span>&#10022;</span>
          </div>
          <h1 className="hero-title"><em>Discover</em> Nature's</h1>
          <span className="hero-title-bold">Bounty in Alarkpuri Sangam</span>
          <p className="hero-subtitle">Where spirituality meets luxury — near the sacred Triveni Sangam</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('booking')}>
              <span>Book Your Stay</span>
            </button>
            <button className="btn-outline" onClick={() => scrollTo('rooms')}>
              <span>Explore Rooms</span>
            </button>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollTo('about')}>
          <span className="scroll-indicator-label">Scroll</span>
          <div className="scroll-indicator-track"><div className="scroll-indicator-fill" /></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="reveal-left">
              <div className="about-card">
                <div className="about-quote">"Where every sunrise is sacred"</div>
                <p style={{ color:'var(--text-light)', lineHeight:1.85, fontSize:14 }}>
                  Nestled beside the confluence of three holy rivers, Alarkpuri Sangam Resort blends the reverence of Prayagraj with the indulgence of modern luxury.
                </p>
                <div className="about-stat-grid">
                  {[{num:"15+",label:"Luxury Rooms"},{num:"500+",label:"Events Hosted"},{num:"10K+",label:"Happy Guests"},{num:"0.5km",label:"From Sangam"}].map(s => (
                    <div key={s.label} className="stat-item">
                      <span className="stat-num">{s.num}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <span className="section-label">Welcome to Alarkpuri Sangam Resort</span>
              <h2 className="section-title">Your Ultimate Luxury <em>Retreat</em> in Prayagraj</h2>
              <div className="section-divider" />
              <p className="section-text">
                Alarkpuri Sangam Resort is one of the most serene and nature-inspired resorts located near the sacred Triveni Sangam in Prayagraj, Uttar Pradesh. Designed for travelers, pilgrims, families, and corporate groups — offering a perfect blend of comfort, spirituality, and natural beauty.
              </p>
              <ul className="feature-list">
                {["Prime location near Triveni Sangam","Luxury cottages with artisan interiors","Grand banquet hall for all events","Multi-cuisine fine dining restaurant","24×7 personalised room service","Guided spiritual & heritage tours"].map(f => (
                  <li key={f}><div className="feature-dot" />{f}</li>
                ))}
              </ul>
              <button className="btn-primary" style={{marginTop:36}} onClick={() => scrollTo('booking')}>
                <span>Reserve Your Experience</span>
              </button>
            </div>
          </div>
          <ScrollDownIndicator targetId="rooms" />
        </div>
      </section>

      {/* ROOMS — HORIZONTAL SLIDER */}
<section id="rooms" className="rooms-section">
  <div className="container" style={{ marginBottom: 48 }}>
    
    <div style={{ textAlign: "center" }}>
      <span className="section-label reveal">
        Discover Our Rooms
      </span>

      <h2
        className="section-title reveal"
        style={{ textAlign: "center" }}
      >
        Luxurious <em>Accommodations</em>
      </h2>

      <div
        className="section-divider reveal"
        style={{ margin: "0 auto 0" }}
      />
    </div>

  </div>

  <div className="rooms-slider-wrap">
    
    <div
      className="rooms-track"
      style={{
        transform: `translateX(-${slideIndex * cardWidth}%)`,
      }}
    >
      
      {rooms.map((room, i) => (
        
        <div key={room.name} className="room-card">

          {/* ROOM IMAGE */}
          <div className="room-img-placeholder">
            
            <img
              src="https://www.the-earth.in/en/room_e/images/109a.jpg"
              alt={room.name}
              className="room-img"
            />

            <div className="room-overlay" />

          </div>

          {/* ROOM CONTENT */}
          <div className="room-content">

            <div className="room-price">
              {room.price}
            </div>

            <div className="room-name">
              {room.name}
            </div>

            <div className="room-meta">
              
              <span>
                {room.bathrooms} Bath
                {room.bathrooms > 1 ? "s" : ""}
              </span>

              <span>
                Max {room.occupancy} Guests
              </span>

            </div>

            <div className="room-desc">
              {room.desc}
            </div>

            <button
              className="room-book-btn"
              onClick={() => scrollTo("booking")}
            >
              <span>Book Now</span>
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

  <div className="container">

    <div className="slider-controls">

      {/* PREVIOUS BUTTON */}
      <button
        className="slider-btn"
        onClick={prevSlide}
        disabled={slideIndex === 0}
      >
        <Icon.ChevronLeft />
      </button>

      {/* DOTS */}
      <div className="slider-dots">
        
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          
          <button
            key={i}
            className={`slider-dot ${
              slideIndex === i ? "active" : ""
            }`}
            onClick={() => setSlideIndex(i)}
          />

        ))}

      </div>

      {/* NEXT BUTTON */}
      <button
        className="slider-btn"
        onClick={nextSlide}
        disabled={slideIndex >= maxIndex}
      >
        <Icon.ChevronRight />
      </button>

    </div>

    <ScrollDownIndicator targetId="banquet" />

  </div>
</section>
      {/* AMENITIES */}
      <section className="amenities-section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:56}}>
            <span className="section-label reveal">What We Offer</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Resort <em>Amenities</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}} />
          </div>
          <div className="amenities-grid">
            {amenities.map((a,i) => (
              <div key={a.name} className="amenity-card reveal" style={{transitionDelay:`${i*0.07}s`}}>
                <div className="amenity-icon"><a.Icon /></div>
                <div className="amenity-name">{a.name}</div>
                <div className="amenity-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANQUET */}
      <section id="banquet" className="banquet-section">
        <div className="container">
          <div className="banquet-grid">
            <div className="reveal-left">
              <span className="section-label">Events & Celebrations</span>
              <h2 className="section-title">Best Banquet Hall in <em>Prayagraj</em></h2>
              <div className="section-divider" />
              <p className="section-text">
                Combining modern facilities with a peaceful natural environment near the holy Triveni Sangam. Designed for weddings, receptions, birthday parties, corporate meetings, and family gatherings.
              </p>
              <div className="banquet-features">
                {[
                  {label:"Weddings & Receptions"},
                  {label:"Corporate Events"},
                  {label:"Birthday Celebrations"},
                  {label:"Cultural Gatherings"},
                ].map(f => (
                  <div key={f.label} className="banquet-feature">
                    <div className="banquet-feature-title">{f.label}</div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{marginTop:36}} onClick={() => scrollTo('booking')}>
                <span>Enquire for Events</span>
              </button>
            </div>
            <div className="reveal-right">
              <div className="banquet-visual-stack">
                <div className="banquet-img-main">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="banquet-img-accent">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(8,32,31,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="banquet-badge">
                  <strong>500+</strong>
                  Events<br/>Hosted
                </div>
              </div>
            </div>
          </div>
          <ScrollDownIndicator targetId="restaurant" />
        </div>
      </section>

      {/* RESTAURANT */}
      <section id="restaurant" className="restaurant-section">
        <div className="container">
          <div className="restaurant-grid">
            <div className="reveal-left">
              <div style={{
                background:'linear-gradient(145deg, var(--teal-mid), var(--teal-deep))',
                border:'1px solid rgba(201,168,76,0.18)', padding:48,
                minHeight:400, display:'flex', alignItems:'center', justifyContent:'center'
              }}>
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                  <path d="M7 2v20"/>
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
                </svg>
              </div>
            </div>
            <div className="reveal-right">
              <span className="section-label">Culinary Excellence</span>
              <h2 className="section-title">Restaurant in <em>Prayagraj</em></h2>
              <div className="section-divider" />
              <p className="section-text" style={{marginBottom:32}}>
                Fine dining where taste, tradition, and elegance converge. Premium ambiance, delicious food, and warm hospitality — in a peaceful nature-inspired setting.
              </p>
              <div className="menu-tabs">
                {['veg','nonveg','beverages'].map(tab => (
                  <button key={tab} className={`menu-tab ${activeMenu === tab ? 'active' : ''}`} onClick={() => setActiveMenu(tab)}>
                    {tab === 'veg' ? 'Vegetarian' : tab === 'nonveg' ? 'Non-Veg' : 'Beverages'}
                  </button>
                ))}
              </div>
              <div className="menu-items">
                {menuItems[activeMenu].map(item => (
                  <div key={item.name} className="menu-item">
                    <div>
                      <div className="menu-item-name">{item.name}</div>
                      <div className="menu-item-desc">{item.desc}</div>
                    </div>
                    <div className="menu-item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ScrollDownIndicator targetId="attractions" />
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <div className="container" style={{marginBottom:48}}>
          <div style={{textAlign:'center'}}>
            <span className="section-label reveal">Captured Moments</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Resort <em>Gallery</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}} />
          </div>
        </div>
        <div className="container">
          <div className="gallery-grid reveal">
            {[
              {label:"The Resort",    bg:"linear-gradient(145deg,#1a4040,#0a2020)"},
              {label:"Premium Suite", bg:"linear-gradient(145deg,#2a4030,#0a2010)"},
              {label:"Sunrise View",  bg:"linear-gradient(145deg,#402820,#201008)"},
              {label:"Banquet Hall",  bg:"linear-gradient(145deg,#40301a,#201508)"},
              {label:"Restaurant",    bg:"linear-gradient(145deg,#283c20,#101c08)"},
            ].map((g,i) => (
              <div key={i} className="gallery-item">
                <div className="gallery-item-bg" style={{width:'100%',height:'100%',background:g.bg}}>
                  {/* Replace with: <img src="your-photo.jpg" alt={g.label} /> */}
                </div>
                <div className="gallery-overlay">
                  <div style={{textAlign:'center'}}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                    <div className="gallery-expand-label" style={{marginTop:8}}>{g.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATTRACTIONS */}
      <section id="attractions" className="attractions-section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:64}}>
            <span className="section-label reveal">Explore Prayagraj</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Nearby <em>Attractions</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}} />
          </div>
          <div className="attractions-grid">
            {attractions.map((a,i) => (
              <div key={a.name} className="attraction-card reveal" style={{transitionDelay:`${i*0.1}s`}}>
                <div className="attraction-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="attraction-name">{a.name}</div>
                <div className="attraction-dist">{a.dist} away</div>
                <div className="attraction-desc">{a.desc}</div>
              </div>
            ))}
          </div>
          <ScrollDownIndicator targetId="booking" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container" style={{marginBottom:48}}>
          <div style={{textAlign:'center'}}>
            <span className="section-label reveal">Guest Stories</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>What Our Guests <em>Say</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}} />
          </div>
        </div>
        <div className="container">
          <div className="testimonials-track reveal">
            {testimonials.map((t,i) => (
              <div key={i} className="testimonial-card">
                <span className="testimonial-quote">"</span>
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">{t.author}</div>
                <div className="testimonial-location">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="booking-section">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:64}}>
            <span className="section-label reveal">Reserve Your Stay</span>
            <h2 className="section-title reveal" style={{textAlign:'center'}}>Book Your <em>Experience</em></h2>
            <div className="section-divider reveal" style={{margin:'0 auto'}} />
          </div>
          <div className="booking-grid">
            <div className="reveal-left">
              <div className="booking-form">
                <h3 style={{fontFamily:"'Cinzel',serif",fontSize:18,color:'var(--gold)',marginBottom:36,letterSpacing:3}}>
                  RESERVATION ENQUIRY
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Check-In</label>
                      <input className="form-input" type="date" value={form.checkin} onChange={e => setForm({...form,checkin:e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Check-Out</label>
                      <input className="form-input" type="date" value={form.checkout} onChange={e => setForm({...form,checkout:e.target.value})} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Room Type</label>
                      <select className="form-select" value={form.roomType} onChange={e => setForm({...form,roomType:e.target.value})}>
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
                      <select className="form-select" value={form.guests} onChange={e => setForm({...form,guests:e.target.value})}>
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <textarea className="form-input" rows={3} placeholder="Any special requirements..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} style={{resize:'vertical',minHeight:80}} />
                  </div>
                  <button type="submit" className="form-submit">
                    <span>Send Reservation Request</span>
                  </button>
                </form>
              </div>
            </div>
            <div className="reveal-right contact-info">
              <span className="section-label">Get In Touch</span>
              <h3 className="section-title" style={{fontSize:38}}>Contact <em>Us</em></h3>
              <div className="section-divider" />
              {[
                { Icon: Icon.MapPin, title:"Address",          detail:"Arazi No-84, Arail Kachhar, Naini\nPrayagraj - 211008, Uttar Pradesh" },
                { Icon: Icon.Phone,  title:"Phone",            detail:"+91 8737906519" },
                { Icon: Icon.Mail,   title:"Email",            detail:"alarkpurisangam1@gmail.com" },
                { Icon: Icon.Clock,  title:"Check-in / Check-out", detail:"Check-in: 2:00 PM\nCheck-out: 11:00 AM" },
              ].map(c => (
                <div key={c.title} className="contact-item">
                  <div className="contact-icon"><c.Icon /></div>
                  <div>
                    <div className="contact-title">{c.title}</div>
                    <div className="contact-detail" style={{whiteSpace:'pre-line'}}>{c.detail}</div>
                  </div>
                </div>
              ))}
              <p style={{color:'var(--text-light)',fontSize:13,marginBottom:14}}>Connect with us:</p>
              <div className="footer-social">
                <a href="#" className="social-btn"><Icon.FB /></a>
                <a href="https://www.instagram.com/alarkpurisangam/" className="social-btn"><Icon.IG /></a>
                <a href="#" className="social-btn"><Icon.YT /></a>
                <a href="https://wa.me/918737906519" className="social-btn" target="_blank" rel="noopener noreferrer"><Icon.WhatsApp /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-title">ALARKPURI SANGAM</div>
              <div className="footer-brand-sub">Resort & Restaurant</div>
              <p className="footer-brand-desc">
                A serene luxury retreat near the sacred Triveni Sangam in Prayagraj, offering an unforgettable blend of spirituality, nature, and modern comfort.
              </p>
              <div className="footer-social" style={{marginTop:24}}>
                <a href="#" className="social-btn"><Icon.FB /></a>
                <a href="#" className="social-btn"><Icon.IG /></a>
                <a href="#" className="social-btn"><Icon.YT /></a>
                <a href="https://wa.me/918737906519" className="social-btn" target="_blank" rel="noopener noreferrer"><Icon.WhatsApp /></a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Navigation</div>
              <ul className="footer-links">
                {navSections.map(s => (
                  <li key={s}><a href={`#${s}`} onClick={e => {e.preventDefault();scrollTo(s);}}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Facilities</div>
              <ul className="footer-links">
                {["Luxury Cottages","Banquet Hall","Fine Dining","24×7 Room Service","Valet Parking","Spiritual Tours","Nature Walks","Event Planning"].map(f => (
                  <li key={f}><a href="#">{f}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <p style={{fontSize:13.5,color:'var(--text-light)',lineHeight:1.85}}>
                Arazi No-84, Arail Kachhar<br />
                Naini, Prayagraj - 211008<br />
                Uttar Pradesh, India
              </p>
              <p style={{marginTop:18,fontSize:14,color:'var(--gold)'}}>+91 8737906519</p>
              <p style={{fontSize:13,color:'var(--text-light)',marginTop:5}}>alarkpurisangam1@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-text">
              &copy; 2026 <span>Alarkpuri Sangam Resort</span>. All rights reserved.
            </div>
            <div className="footer-bottom-text">
              <a href="#" style={{color:'var(--text-light)',textDecoration:'none',marginRight:20}}>Privacy Policy</a>
              <a href="#" style={{color:'var(--text-light)',textDecoration:'none'}}>Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a href="https://wa.me/918737906519" className="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <Icon.WhatsApp />
      </a>

      {/* BACK TO TOP */}
      <button className={`back-to-top ${showTop ? 'visible' : ''}`} onClick={() => window.scrollTo({top:0,behavior:'smooth'})} title="Back to top">
        <Icon.ChevronUp />
      </button>

      {/* TOAST */}
      <div className={`toast ${toast ? 'show' : ''}`}>
        Reservation request sent successfully
      </div>
    </>
  );
}