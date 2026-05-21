'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Github } from 'lucide-react';

// ── Fonts ─────────────────────────────────────────────────────────────────────
const serif  = { fontFamily: 'var(--font-cormorant)' };
const sans   = { fontFamily: 'var(--font-dm-sans)' };
const mono   = { fontFamily: 'var(--font-dm-mono)' };

// ── Orbital animation ─────────────────────────────────────────────────────────
function OrbitalAnimation() {
  return (
    <svg viewBox="0 0 500 460" width="100%" height="100%">
      <defs>
        <filter id="orbit-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="250" cy="230" r="6" fill="#E85D26" opacity="0.9" filter="url(#orbit-glow)" />
      <circle cx="250" cy="230" r="16" fill="none" stroke="#E85D26" strokeWidth="0.6" opacity="0.35" />
      <g transform="rotate(-20, 250, 230)">
        <ellipse cx="250" cy="230" rx="75" ry="28" fill="none" stroke="#E85D26" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.5" />
        <circle r="5.5" fill="#E85D26" filter="url(#orbit-glow)" opacity="0.95">
          <animateMotion dur="5s" repeatCount="indefinite" path="M 175,230 a 75,28 0 1,1 150,0 a 75,28 0 1,1 -150,0" rotate="none" />
        </circle>
      </g>
      <g transform="rotate(12, 250, 230)">
        <ellipse cx="250" cy="230" rx="145" ry="52" fill="none" stroke="#fb923c" strokeWidth="0.55" strokeDasharray="5 7" opacity="0.32" />
        <circle r="4" fill="#fb923c" filter="url(#orbit-glow)" opacity="0.85">
          <animateMotion dur="9s" repeatCount="indefinite" begin="-3.5s" path="M 105,230 a 145,52 0 1,1 290,0 a 145,52 0 1,1 -290,0" rotate="none" />
        </circle>
      </g>
      <g transform="rotate(-30, 250, 230)">
        <ellipse cx="250" cy="230" rx="215" ry="75" fill="none" stroke="#64748b" strokeWidth="0.45" strokeDasharray="3 9" opacity="0.18" />
        <circle r="3.5" fill="#94a3b8" filter="url(#orbit-glow)" opacity="0.65">
          <animateMotion dur="16s" repeatCount="indefinite" begin="-6s" path="M 35,230 a 215,75 0 1,1 430,0 a 215,75 0 1,1 -430,0" rotate="none" />
        </circle>
      </g>
    </svg>
  );
}

// ── Photo with fallback ───────────────────────────────────────────────────────
function Photo({ src, alt, className }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`border border-dashed border-[#2A2A2E] flex items-center justify-center text-[#3A3A3E] text-xs text-center p-4 ${className}`}>
        {alt}
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled]   = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function switchTab(tab) {
    setActiveTab(tab);
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  }

  const projects = [
    {
      title: 'NASA Academy Internship',
      subtitle: 'NASA Langley Research Center — Hampton, VA',
      date: 'Summer 2026',
      description: 'Incoming intern at NASA Academy at NASA Langley Research Center, starting summer 2026. Looking forward to contributing to aerospace research at one of NASA\'s flagship facilities.',
      tags: ['NASA', 'Aerospace Research', 'NASA Langley'],
      accent: '#3b7dd8',
      photo: null,
    },
    {
      title: 'Aerospace Supply Chain Engineering',
      subtitle: 'Incora — Global Aerospace Hardware Distributor',
      date: 'May – June 2026',
      description: 'Read engineering drawings for aerospace fasteners, clamps, and bearings to pull material specs, tolerances, and compliance data for supplier qualification. Analyzed O-ring specifications and compound data to identify compliant substitutes — estimated ~77% unit cost reduction. Screened 80+ South American vendors against AS9100 certification standards to support procurement decisions.',
      tags: ['AS9100', 'Engineering Drawings', 'Supplier Qualification', 'O-Ring Analysis', 'Procurement'],
      accent: '#E85D26',
      photo: null,
    },
    {
      title: 'Mars Rover Thermal Engineering',
      subtitle: "NASA L'SPACE Mission Concept Academy",
      date: 'Sept – Dec 2025',
      description: 'Designed a hybrid thermal management system for a Mars cave exploration rover — keeping hardware alive across surface temperature swings of -125°C to +20°C and 48-hour subsurface operations with zero solar input. Ran trade studies on MLI, PCM, loop heat pipes, radiators, and thermoelectric coolers. Modeled the full thermal network in MATLAB Simscape. Part of a 15-person multidisciplinary team working to NASA proposal standards.',
      tags: ['MATLAB Simscape', 'Thermal Analysis', 'Systems Design', 'MLI / PCM', 'Trade Studies'],
      accent: '#E85D26',
      photo: null,
    },
    {
      title: 'Posture Sensor',
      subtitle: 'Instrumentation & Controls — Nashville, TN',
      date: 'Jan 2026 – Present',
      description: 'Built a Wheatstone bridge circuit for strain gauge signal conditioning, then wrote a LabVIEW VI using state machine architecture to monitor and classify posture in real time. Integrated with NI DAQ hardware to trigger feedback via buzzer and on-screen alert. Full math derivations, uncertainty analysis, and circuit schematics.',
      tags: ['LabVIEW', 'NI DAQ', 'Wheatstone Bridge', 'Signal Processing', 'Circuit Design'],
      accent: '#2eb87a',
      photo: null,
    },
    {
      title: 'Wind Tunnel & DAQ System',
      subtitle: 'Self-Designed Engineering Project — Dallas, TX',
      date: 'Apr 2025 – Jan 2026',
      description: 'Designed a wind tunnel in AutoCAD, modeled airflow in MATLAB Simscape/Simulink, and built an Arduino-based data acquisition system to measure lift and drag under controlled airflow conditions. This wasn\'t a class assignment — I just wanted to build it.',
      tags: ['AutoCAD', 'MATLAB Simscape', 'Simulink', 'Arduino', 'Aerodynamics', 'DAQ'],
      accent: '#3b7dd8',
      photo: null,
    },
    {
      title: 'Automated Hockey Stick Taping Device',
      subtitle: 'Mechanical Design & Automation — Schenectady, NY',
      date: 'Sept – Dec 2023',
      description: 'Designed the full mechanical assembly in SolidWorks and produced laser-cut fabrication files in AutoCAD. Programmed a SparkFun RedBoard in Arduino to coordinate servo motor actuation with motion sensor input for consistent, repeatable tape application. Built and documented the complete electromechanical circuit.',
      tags: ['SolidWorks', 'AutoCAD', 'Arduino', 'Servo Control', 'Fabrication'],
      accent: '#b56af5',
      photo: '/IMG_8329.jpeg',
    },
  ];

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'about',    label: 'About Me' },
    { id: 'fun',      label: 'Fun Things' },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .a1 { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .a2 { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .a3 { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .a4 { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.38s both; }
        .a5 { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.50s both; }
        .a6 { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.64s both; }
        .orbital-wrap { animation: fadeIn 1.4s ease 0.3s both; }
        .card-hover { transition: border-color 0.25s ease, background 0.25s ease; }
        .card-hover:hover { background: #111114; }
        .tag-chip { transition: border-color 0.2s, color 0.2s; }
        .tag-chip:hover { border-color: #E85D26; color: #EDEDEA; }
        .nav-link { transition: color 0.2s; }
        .fun-rule { display: block; width: 32px; height: 1px; background: #E85D26; opacity: 0.5; margin-bottom: 14px; }
      `}</style>

      <div className="min-h-screen" style={{ background: '#09090B', color: '#EDEDEA' }}>

        {/* ── Navigation ── */}
        <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, transition: 'all 0.4s ease', background: scrolled ? 'rgba(9,9,11,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid #1A1A1E' : '1px solid transparent' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...serif, fontSize: '20px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', letterSpacing: '-0.01em' }}>
              Eleanor Abel
            </span>
            <div className="hidden md:flex" style={{ gap: '40px' }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => switchTab(tab.id)} className="nav-link"
                  style={{ ...mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: activeTab === tab.id ? '#E85D26' : '#5A5A5E' }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '128px 24px 80px', overflow: 'hidden' }}>

          {/* Background glow */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,93,38,0.06) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,125,216,0.04) 0%, transparent 70%)' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.022 }}>
              <defs>
                <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
                  <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Orbital — desktop right */}
          <div className="orbital-wrap hidden lg:block" style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', width: '560px', height: '560px', opacity: 0.22, pointerEvents: 'none' }}>
            <OrbitalAnimation />
          </div>

          <div style={{ position: 'relative', maxWidth: '1152px', margin: '0 auto', width: '100%' }}>

            {/* Eyebrow */}
            <div className="a1" style={{ marginBottom: '28px' }}>
              <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E85D26' }}>
                Vanderbilt University · NASA Langley · 2026
              </span>
            </div>

            {/* Name */}
            <h1 className="a2" style={{ ...serif, fontSize: 'clamp(60px, 9.5vw, 108px)', lineHeight: 0.95, fontWeight: 600, fontStyle: 'italic', letterSpacing: '-0.015em', color: '#EDEDEA', marginBottom: '20px' }}>
              Eleanor Abel
            </h1>

            {/* Rule */}
            <div className="a3" style={{ height: '1px', maxWidth: '320px', background: 'linear-gradient(to right, rgba(232,93,38,0.7), rgba(232,93,38,0.2), transparent)', marginBottom: '20px' }} />

            {/* Subtitle */}
            <p className="a3" style={{ ...sans, fontSize: '18px', color: '#6A6A6E', fontWeight: 300, letterSpacing: '0.01em', marginBottom: '20px' }}>
              Aerospace-focused Mechanical Engineer
            </p>

            {/* Description */}
            <p className="a4" style={{ ...sans, fontSize: '15px', color: '#4E4E52', fontWeight: 300, lineHeight: 1.75, maxWidth: '480px', marginBottom: '32px' }}>
              Vanderbilt ME sophomore. Designed thermal systems for a Mars cave rover through NASA L'SPACE. Former Division I athlete.
            </p>

            {/* Contact links */}
            <div className="a5" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>
              {[
                { label: 'eleanoroabel@gmail.com', href: 'mailto:eleanoroabel@gmail.com' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eleanor-abel-a6134b338', external: true },
                { label: 'GitHub', href: 'https://github.com/abele28', external: true },
              ].map((link, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ color: '#2A2A2E' }}>·</span>}
                  <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}
                    className="nav-link" style={{ ...mono, fontSize: '11px', color: '#4E4E52', letterSpacing: '0.04em' }}>
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="a5" style={{ display: 'flex', gap: '12px', marginBottom: '56px', flexWrap: 'wrap' }}>
              <button onClick={() => switchTab('projects')}
                style={{ ...sans, padding: '11px 28px', fontSize: '14px', fontWeight: 500, background: '#E85D26', color: '#09090B', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={e => e.target.style.background = '#D04E1A'}
                onMouseOut={e => e.target.style.background = '#E85D26'}>
                See My Work
              </button>
              <button onClick={() => switchTab('about')}
                style={{ ...sans, padding: '11px 28px', fontSize: '14px', fontWeight: 400, background: 'transparent', color: '#EDEDEA', border: '1px solid #2A2A2E', borderRadius: '6px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseOver={e => e.target.style.borderColor = '#E85D26'}
                onMouseOut={e => e.target.style.borderColor = '#2A2A2E'}>
                About Me
              </button>
            </div>

            {/* Current credentials */}
            <div className="a6" style={{ display: 'flex', gap: '48px', paddingTop: '28px', borderTop: '1px solid #1A1A1E', flexWrap: 'wrap' }}>
              {[
                { label: 'Currently at', value: 'Vanderbilt University' },
                { label: 'Incoming intern', value: 'NASA Langley Research Center' },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '5px' }}>{item.label}</p>
                  <p style={{ ...sans, fontSize: '14px', color: '#EDEDEA', fontWeight: 400 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', color: '#2A2A2E' }} className="animate-bounce">
            <ChevronDown size={20} />
          </div>
        </section>

        {/* ── Tabbed content ── */}
        <section id="content" style={{ padding: '80px 24px 120px' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

            {/* Tab bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid #1A1A1E', marginBottom: '56px' }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ ...mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '12px 24px', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? '#E85D26' : 'transparent'}`, marginBottom: '-1px', background: 'transparent', cursor: 'pointer', color: activeTab === tab.id ? '#E85D26' : '#4E4E52', transition: 'color 0.2s, border-color 0.2s' }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Projects ── */}
            {activeTab === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {projects.map((project, idx) => (
                  <div key={idx} className="card-hover" style={{ position: 'relative', border: '1px solid #1A1A1E', borderRadius: '8px', overflow: 'hidden', background: '#0D0D10' }}>
                    {/* Left accent bar */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: `linear-gradient(to bottom, ${project.accent}, transparent)`, opacity: 0.8 }} />
                    <div style={{ padding: '28px 32px 28px 36px', display: 'flex', flexDirection: 'row', gap: '32px' }}>
                      {project.photo && (
                        <div style={{ flexShrink: 0, width: '200px' }}>
                          <Photo src={project.photo} alt={`Photo of ${project.title}`} className="w-full h-36 object-cover rounded" />
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        {/* Header row */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '10px' }}>
                          <div>
                            <h3 style={{ ...serif, fontSize: '24px', fontWeight: 600, color: '#EDEDEA', lineHeight: 1.15, marginBottom: '4px' }}>{project.title}</h3>
                            <p style={{ ...sans, fontSize: '12px', color: '#E85D26', fontWeight: 400, letterSpacing: '0.01em' }}>{project.subtitle}</p>
                          </div>
                          {project.date && (
                            <span style={{ ...mono, fontSize: '11px', color: '#3A3A3E', whiteSpace: 'nowrap', marginTop: '3px', flexShrink: 0 }}>{project.date}</span>
                          )}
                        </div>
                        {/* Description */}
                        <p style={{ ...sans, fontSize: '14px', color: '#5A5A5E', lineHeight: 1.75, fontWeight: 300, marginBottom: '18px' }}>{project.description}</p>
                        {/* Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {project.tags.map((tag, i) => (
                            <span key={i} className="tag-chip" style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid #222226', color: '#3A3A3E', borderRadius: '4px' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Also in progress */}
                <div style={{ padding: '20px 24px', border: '1px solid #1A1A1E', borderRadius: '8px', background: '#0D0D10' }}>
                  <p style={{ ...sans, fontSize: '14px', color: '#3A3A3E', fontWeight: 300 }}>
                    <span style={{ color: '#E85D26', fontWeight: 500 }}>Also in progress:</span>{' '}
                    A React-based workout tracking app. And always something new on the bench.
                  </p>
                </div>
              </div>
            )}

            {/* ── About Me ── */}
            {activeTab === 'about' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

                {/* Bio + photos */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '56px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flexShrink: 0, width: '220px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <img src="/headshot.jpg" alt="Eleanor Abel" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'top', borderRadius: '8px' }} />
                    <Photo src="/IMG_1873.JPG" alt="Eleanor captaining the Ontario Hockey Academy" className="w-full h-40 object-cover object-top rounded" style={{ borderRadius: '8px' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      "I'm a mechanical engineering student at Vanderbilt, focused on aerospace, with a minor in Education Studies. My grandfather worked in the wind tunnel at NASA Langley — that was my first signal that this could be a real direction for me.",
                      "My path hasn't been a straight line. I started at Union College in Schenectady as a D1 hockey player, then transferred to Vanderbilt to go all-in on engineering. Carrying a full ME course load while competing at the D1 level taught me how to manage hard things at the same time — which turns out to be a useful skill.",
                      "Coursework: thermodynamics, dynamics, linear algebra, instrumentation. Lab work: thermal protection for Mars rovers, a wind tunnel I built myself, automated manufacturing systems. I also speak French at a professional level — I used it daily during my year captaining a Tier I hockey program in Cornwall, Ontario.",
                      "What drives all of it: I want to build things that matter. Thermal systems going to Mars, sensors that help people work better, teaching engineers to think clearly — same drive, different forms.",
                    ].map((p, i) => (
                      <p key={i} style={{ ...sans, fontSize: '16px', color: '#5A5A5E', lineHeight: 1.8, fontWeight: 300 }}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 style={{ ...serif, fontSize: '32px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '24px' }}>Education</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { school: 'Vanderbilt University', location: 'Nashville, TN', degree: 'B.E. Mechanical Engineering', gpa: '3.93 / 4.00', date: 'Aug 2025 – Present', activities: ['NROTC', 'Society of Women Engineers', 'Engineers Without Borders'] },
                      { school: 'Union College', location: 'Schenectady, NY', degree: 'B.E. Mechanical Engineering', gpa: '3.87 / 4.00', date: 'June 2023 – June 2024', activities: ["Dean's List", 'NCAA Division I Ice Hockey'] },
                    ].map((edu, i) => (
                      <div key={i} style={{ padding: '24px 28px', border: '1px solid #1A1A1E', borderRadius: '8px', background: '#0D0D10' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <div>
                            <h4 style={{ ...serif, fontSize: '20px', fontWeight: 600, color: '#EDEDEA', marginBottom: '2px' }}>{edu.school}</h4>
                            <p style={{ ...sans, fontSize: '12px', color: '#3A3A3E' }}>{edu.location}</p>
                          </div>
                          <span style={{ ...mono, fontSize: '11px', color: '#E85D26', flexShrink: 0 }}>{edu.date}</span>
                        </div>
                        <p style={{ ...sans, fontSize: '14px', color: '#5A5A5E', marginBottom: '4px' }}>{edu.degree}</p>
                        <p style={{ ...mono, fontSize: '11px', color: '#3A3A3E', marginBottom: '14px' }}>GPA {edu.gpa}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {edu.activities.map((a, j) => (
                            <span key={j} style={{ ...mono, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid #222226', color: '#3A3A3E', borderRadius: '4px' }}>{a}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 style={{ ...serif, fontSize: '32px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '28px' }}>Skills & Tools</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
                    {[
                      { category: 'Software & Programming', items: ['Python', 'Java', 'MATLAB / Simulink / Simscape', 'LabVIEW', 'Arduino', 'HTML / React'] },
                      { category: 'Engineering & Design', items: ['SolidWorks (CSWA Certified)', 'AutoCAD', 'FEA & Thermal Analysis', 'Prototyping & Fabrication', 'NI DAQ & Instrumentation'] },
                      { category: 'Aerospace Focus', items: ['Thermal Management Systems', 'MLI / PCM / Heat Pipes', 'Aerodynamics & CFD', 'Systems Integration', 'NASA Proposal Standards'] },
                      { category: 'Certifications & Languages', items: ['CSWA — SolidWorks', 'DFP Affaires B1', 'English (Native)', 'French (Professional)'] },
                    ].map(({ category, items }, i) => (
                      <div key={i}>
                        <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>{category}</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {items.map((item, j) => (
                            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <span style={{ color: '#E85D26', marginTop: '1px', flexShrink: 0, fontSize: '12px' }}>—</span>
                              <span style={{ ...sans, fontSize: '14px', color: '#5A5A5E', fontWeight: 300 }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div style={{ paddingTop: '32px', borderTop: '1px solid #1A1A1E' }}>
                  <p style={{ ...sans, fontSize: '14px', color: '#3A3A3E', marginBottom: '20px', fontWeight: 300 }}>Let's talk. Reach out if you're working on something interesting.</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="mailto:eleanoroabel@gmail.com" style={{ ...sans, fontSize: '13px', padding: '10px 24px', border: '1px solid rgba(232,93,38,0.3)', color: '#E85D26', borderRadius: '6px', textDecoration: 'none', transition: 'background 0.2s' }}>
                      Email
                    </a>
                    <a href="https://www.linkedin.com/in/eleanor-abel-a6134b338" target="_blank" rel="noopener noreferrer" style={{ ...sans, fontSize: '13px', padding: '10px 24px', border: '1px solid #2A2A2E', color: '#5A5A5E', borderRadius: '6px', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}>
                      LinkedIn
                    </a>
                    <a href="https://github.com/abele28" target="_blank" rel="noopener noreferrer" style={{ ...sans, fontSize: '13px', padding: '10px 24px', border: '1px solid #2A2A2E', color: '#5A5A5E', borderRadius: '6px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Github size={14} /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ── Fun Things ── */}
            {activeTab === 'fun' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

                {/* Hockey */}
                <div>
                  <span className="fun-rule" />
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '24px' }}>
                    <div style={{ flexShrink: 0, width: '200px' }}>
                      <img src="/IMG_1873.JPG" alt="Eleanor captaining the Ontario Hockey Academy" style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'top', borderRadius: '8px' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '4px' }}>Hockey</h3>
                      <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>Player → Captain → Coach</p>
                      <p style={{ ...sans, fontSize: '15px', color: '#5A5A5E', lineHeight: 1.75, fontWeight: 300, marginBottom: '16px' }}>
                        Hockey has been a constant since I was a kid. I played D1 at Union College, then spent a year as captain of the Ontario Hockey Academy's Tier I program in Cornwall, Ontario — running practices, managing game day, and being the bridge between athletes and staff. I still coach youth hockey. It's not something I plan to stop.
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {['Union College NCAA DI', 'Ontario Hockey Academy — Captain', 'Youth Coaching'].map((t, i) => (
                          <span key={i} style={{ ...mono, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid #222226', color: '#3A3A3E', borderRadius: '4px' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginLeft: '0' }}>
                    <img src="/DSC_6512.jpeg" alt="#28 — Union College Women's Hockey" style={{ width: '100%', maxWidth: '340px', height: '180px', objectFit: 'cover', objectPosition: 'top', borderRadius: '6px', border: '1px solid #1A1A1E' }} />
                    <p style={{ ...mono, fontSize: '10px', color: '#3A3A3E', marginTop: '8px', letterSpacing: '0.05em' }}>#28 — Union College Women's Hockey</p>
                  </div>
                </div>

                {/* Running */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flexShrink: 0, width: '200px' }}>
                    <img src="/IMG_2866.JPG" alt="Eleanor racing in a triathlon" style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'top', borderRadius: '8px' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <span className="fun-rule" />
                    <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '4px' }}>Running & Triathlon</h3>
                    <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>The off-season doesn't really exist</p>
                    <p style={{ ...sans, fontSize: '15px', color: '#5A5A5E', lineHeight: 1.75, fontWeight: 300 }}>
                      The athlete mindset doesn't switch off when the season ends. Running, cycling, and triathlon are how I reset between everything else — and honestly, it's where a lot of my best thinking happens.
                    </p>
                  </div>
                </div>

                {/* Rubik's Cubes */}
                <div>
                  <span className="fun-rule" />
                  <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '4px' }}>Rubik's Cubes</h3>
                  <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>Since age 9</p>
                  <p style={{ ...sans, fontSize: '15px', color: '#5A5A5E', lineHeight: 1.75, fontWeight: 300, maxWidth: '560px' }}>
                    I've been solving Rubik's cubes since I was 9. Started with the 3x3 and went from there. Something about it stuck — probably the same thing that makes me want to understand how systems work.
                  </p>
                </div>

                {/* Lego */}
                <div>
                  <span className="fun-rule" />
                  <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '4px' }}>Lego</h3>
                  <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>A lifelong thing</p>
                  <p style={{ ...sans, fontSize: '15px', color: '#5A5A5E', lineHeight: 1.75, fontWeight: 300, maxWidth: '560px' }}>
                    Lego has been a thing my whole life and I still build. It never really gets old — there's something satisfying about it that I don't think goes away.
                  </p>
                </div>

                {/* Building */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flexShrink: 0, width: '200px' }}>
                    <img src="/IMG_4073.jpeg" alt="In the shop" style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'top', borderRadius: '8px' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <span className="fun-rule" />
                    <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '4px' }}>Always Building Something</h3>
                    <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>Wind tunnels, apps, whatever's next</p>
                    <p style={{ ...sans, fontSize: '15px', color: '#5A5A5E', lineHeight: 1.75, fontWeight: 300 }}>
                      The wind tunnel wasn't assigned. The workout tracker wasn't either. There's something specific about making a thing that didn't exist before — I chase that feeling in whatever form it shows up.
                    </p>
                  </div>
                </div>

                {/* French */}
                <div>
                  <span className="fun-rule" />
                  <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '4px' }}>French</h3>
                  <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>Professional Proficiency — DFP Affaires B1</p>
                  <p style={{ ...sans, fontSize: '15px', color: '#5A5A5E', lineHeight: 1.75, fontWeight: 300, maxWidth: '560px' }}>
                    I speak French at a professional level — I used it daily during my year in Cornwall, Ontario. It's not a resume line for me; it's something I actively maintain and keep working on.
                  </p>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: '1px solid #1A1A1E', padding: '28px 24px', textAlign: 'center' }}>
          <p style={{ ...mono, fontSize: '11px', color: '#2A2A2E', letterSpacing: '0.08em' }}>Designed & built by Eleanor Abel · Deployed on Vercel</p>
        </footer>

      </div>
    </>
  );
}
