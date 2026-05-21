'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github } from 'lucide-react';

const serif = { fontFamily: 'var(--font-cormorant)' };
const sans  = { fontFamily: 'var(--font-dm-sans)' };
const mono  = { fontFamily: 'var(--font-dm-mono)' };

// ── Wind tunnel flow visualization ────────────────────────────────────────────
// Potential flow around an invisible elliptical body. Particles curve around
// the obstacle naturally — you see the streamlines, not the body itself.
function WindTunnelCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.clientWidth  || window.innerWidth;
      canvas.height = canvas.clientHeight || 600;
    };
    resize();

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Invisible body — particles curve around it, body is never drawn
    const getBody = () => ({
      cx: W() * 0.71,
      cy: H() * 0.46,
      a:  W() * 0.115,
      b:  H() * 0.075,
    });

    const U = 1.4;

    function vel(x, y, body) {
      const { cx, cy, a, b } = body;
      const dx = x - cx;
      const dy = y - cy;
      const en = (dx / a) * (dx / a) + (dy / b) * (dy / b);
      if (en <= 1.02) return { vx: 0, vy: 0 };
      const R2 = a * b;
      const r2 = dx * dx + dy * dy;
      const r4 = r2 * r2;
      return {
        vx: U * (1 - R2 * (dx * dx - dy * dy) / r4),
        vy: -U * R2 * 2 * dx * dy / r4,
      };
    }

    const N = 220;
    const particles = Array.from({ length: N }, (_, i) => {
      const frac = i / N;
      const baseY = frac * (H() + 40) - 20 + (Math.random() - 0.5) * 4;
      return {
        x: Math.random() * W(),
        y: baseY,
        baseY,
        history: [],
        alpha: 0.62 + 0.26 * Math.sin(frac * Math.PI),
      };
    });

    let animId;

    const frame = () => {
      const body = getBody();
      ctx.clearRect(0, 0, W(), H());

      particles.forEach(p => {
        const { vx, vy } = vel(p.x, p.y, body);

        if (p.history.length > 2) {
          const tail = p.history[0];
          const head = p.history[p.history.length - 1];
          const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
          grad.addColorStop(0,    'rgba(160,165,172,0)');
          grad.addColorStop(0.45, `rgba(160,165,172,${p.alpha * 0.45})`);
          grad.addColorStop(1,    `rgba(160,165,172,${p.alpha})`);
          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          for (let i = 1; i < p.history.length; i++) ctx.lineTo(p.history[i].x, p.history[i].y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.3;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 120) p.history.shift();

        p.x += vx;
        p.y += vy;

        const en = ((p.x - body.cx) / body.a) ** 2 + ((p.y - body.cy) / body.b) ** 2;
        if (p.x > W() + 12 || p.x < -60 || p.y < -30 || p.y > H() + 30 || en < 0.88) {
          p.x = -8;
          p.y = p.baseY + (Math.random() - 0.5) * 5;
          p.history = [];
        }
      });

      // Body is invisible — nothing drawn here
      animId = requestAnimationFrame(frame);
    };

    frame();

    const onResize = () => {
      resize();
      const h = H();
      particles.forEach((p, i) => {
        p.baseY = (i / N) * (h + 40) - 20;
        p.y = p.baseY;
        p.x = Math.random() * W();
        p.history = [];
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

// ── Photo with fallback ───────────────────────────────────────────────────────
function Photo({ src, alt, style, className }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={className} style={{ ...style, border: '1px dashed #2A2A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ ...mono, fontSize: '10px', color: '#646466' }}>{alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} style={style} onError={() => setErr(true)} />;
}

// ── Expandable project row ────────────────────────────────────────────────────
function ProjectRow({ project, index, isOpen, onToggle }) {
  return (
    <div
      style={{ borderBottom: '1px solid #1A1A1E', cursor: 'pointer' }}
      onClick={onToggle}
    >
      {/* Collapsed header — always visible */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 0', transition: 'opacity 0.2s' }}>
        <span style={{ ...mono, fontSize: '10px', color: '#E85D26', width: '28px', flexShrink: 0, letterSpacing: '0.05em' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ ...serif, fontSize: '22px', fontWeight: 600, color: isOpen ? '#E85D26' : '#EDEDEA', lineHeight: 1.2, transition: 'color 0.2s', marginBottom: '2px' }}>
            {project.title}
          </h3>
          <p style={{ ...mono, fontSize: '10px', color: '#78787C', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {project.subtitle}
          </p>
        </div>
        <span style={{ ...mono, fontSize: '11px', color: '#646466', flexShrink: 0, display: 'none' }} className="sm-date">
          {project.date}
        </span>
        <span style={{ ...mono, fontSize: '18px', color: '#E85D26', flexShrink: 0, width: '20px', textAlign: 'center', lineHeight: 1, transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </div>

      {/* Expandable detail */}
      <div style={{
        maxHeight: isOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ paddingLeft: '44px', paddingRight: '24px', paddingBottom: '28px', display: 'flex', flexDirection: 'row', gap: '24px', flexWrap: 'wrap' }}>
          {project.photo && (
            <Photo
              src={project.photo}
              alt={`Photo of ${project.title}`}
              style={{ width: '180px', height: '120px', objectFit: 'cover', objectPosition: 'top', borderRadius: '6px', flexShrink: 0 }}
            />
          )}
          <div style={{ flex: 1, minWidth: '200px' }}>
            {project.date && (
              <p style={{ ...mono, fontSize: '10px', color: '#E85D26', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                {project.date}
              </p>
            )}
            <p style={{ ...sans, fontSize: '14px', color: '#C0BEBC', lineHeight: 1.8, fontWeight: 300, marginBottom: '16px' }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map((tag, i) => (
                <span key={i} style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid #222226', color: '#78787C', borderRadius: '4px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── World map (equirectangular projection, simplified continent polygons) ─────
// ── Main component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeTab, setActiveTab]   = useState('projects');
  const [openProjects, setOpenProjects] = useState(new Set());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function switchTab(tab) {
    setActiveTab(tab);
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleProject(idx) {
    setOpenProjects(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  const projects = [
    {
      title: 'NASA Academy Internship',
      subtitle: 'NASA Langley Research Center — Hampton, VA',
      date: 'Summer 2026',
      description: 'Incoming intern at NASA Academy at NASA Langley Research Center, starting summer 2026. Looking forward to contributing to aerospace research at one of NASA\'s flagship facilities.',
      tags: ['NASA', 'Aerospace Research', 'NASA Langley'],
      photo: null,
    },
    {
      title: 'Aerospace Supply Chain Engineering',
      subtitle: 'Incora — Global Aerospace Hardware Distributor',
      date: 'May – June 2026',
      description: 'Read engineering drawings for aerospace fasteners, clamps, and bearings to pull material specs, tolerances, and compliance data for supplier qualification. Analyzed O-ring specifications to identify compliant substitutes — estimated ~77% unit cost reduction. Screened 80+ South American vendors against AS9100 certification standards.',
      tags: ['AS9100', 'Engineering Drawings', 'Supplier Qualification', 'O-Ring Analysis', 'Procurement'],
      photo: null,
    },
    {
      title: 'Mars Rover Thermal Engineering',
      subtitle: "NASA L'SPACE Mission Concept Academy",
      date: 'Sept – Dec 2025',
      description: 'Designed a hybrid thermal management system for a Mars cave exploration rover — keeping hardware alive across -125°C to +20°C surface swings and 48-hour subsurface operations with zero solar input. Trade studies on MLI, PCM, loop heat pipes, radiators, and thermoelectric coolers. Modeled in MATLAB Simscape. 15-person multidisciplinary team, NASA proposal standards.',
      tags: ['MATLAB Simscape', 'Thermal Analysis', 'Systems Design', 'MLI / PCM', 'Trade Studies'],
      photo: null,
    },
    {
      title: 'Posture Sensor',
      subtitle: 'Instrumentation & Controls — Nashville, TN',
      date: 'Jan 2026 – Present',
      description: 'Built a Wheatstone bridge circuit for strain gauge signal conditioning, then wrote a LabVIEW VI using state machine architecture to monitor and classify posture in real time. Integrated with NI DAQ hardware. Full math derivations, uncertainty analysis, and circuit schematics.',
      tags: ['LabVIEW', 'NI DAQ', 'Wheatstone Bridge', 'Signal Processing', 'Circuit Design'],
      photo: null,
    },
    {
      title: 'Wind Tunnel & DAQ System',
      subtitle: 'Self-Designed Engineering Project — Dallas, TX',
      date: 'Apr 2025 – Jan 2026',
      description: 'Designed a wind tunnel in AutoCAD, modeled airflow in MATLAB Simscape/Simulink, and built an Arduino-based data acquisition system to measure lift and drag. Not a class assignment — I just wanted to build it.',
      tags: ['AutoCAD', 'MATLAB Simscape', 'Simulink', 'Arduino', 'Aerodynamics', 'DAQ'],
      photo: null,
    },
    {
      title: 'Automated Hockey Stick Taping Device',
      subtitle: 'Mechanical Design & Automation — Schenectady, NY',
      date: 'Sept – Dec 2023',
      description: 'Designed the full mechanical assembly in SolidWorks and produced laser-cut fabrication files in AutoCAD. Programmed a SparkFun RedBoard in Arduino to coordinate servo actuation with motion sensor input for repeatable tape application. Complete electromechanical circuit documentation.',
      tags: ['SolidWorks', 'AutoCAD', 'Arduino', 'Servo Control', 'Fabrication'],
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
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .a2 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
        .a3 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.30s both; }
        .a4 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.42s both; }
        .a5 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.54s both; }
        .a6 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.66s both; }
        .nav-lnk { transition: color 0.2s; }
        .nav-lnk:hover { color: #E85D26 !important; }
        .cta-primary:hover { background: #D04E1A !important; }
        .cta-secondary:hover { border-color: rgba(232,93,38,0.5) !important; }
        .proj-row:hover h3 { color: #E85D26 !important; }
        .contact-link:hover { border-color: rgba(232,93,38,0.5) !important; color: #E85D26 !important; }
        .skill-item:hover span:last-child { color: #C4C2BC !important; }
        @media (min-width: 640px) { .sm-date { display: block !important; } }
      `}</style>

      <div style={{ background: '#09090B', color: '#EDEDEA', minHeight: '100vh' }}>

        {/* ── Nav ── */}
        <nav style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 50,
          background: scrolled ? 'rgba(9,9,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid #1A1A1E' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...serif, fontSize: '20px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', letterSpacing: '-0.01em' }}>
              Eleanor Abel
            </span>
            <div className="hidden md:flex" style={{ gap: '36px' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => switchTab(t.id)} className="nav-lnk"
                  style={{ ...mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === t.id ? '#E85D26' : '#848280' }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 24px 80px', overflow: 'hidden' }}>

          {/* Wind tunnel canvas — full hero background */}
          <WindTunnelCanvas />

          {/* Subtle radial vignette to keep left text readable */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 100% at 0% 50%, rgba(9,9,11,0.88) 0%, rgba(9,9,11,0.5) 50%, rgba(9,9,11,0.1) 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: '1152px', margin: '0 auto', width: '100%' }}>

            <div className="a1" style={{ marginBottom: '28px' }}>
              <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E85D26' }}>
                Vanderbilt University · NASA Langley · 2026
              </span>
            </div>

            <h1 className="a2" style={{ ...serif, fontSize: 'clamp(58px, 9vw, 106px)', lineHeight: 0.94, fontWeight: 600, fontStyle: 'italic', letterSpacing: '-0.015em', color: '#EDEDEA', marginBottom: '22px' }}>
              Eleanor Abel
            </h1>

            <div className="a3" style={{ height: '1px', maxWidth: '280px', background: 'linear-gradient(to right, rgba(232,93,38,0.65), rgba(232,93,38,0.2), transparent)', marginBottom: '22px' }} />

            <p className="a3" style={{ ...sans, fontSize: '17px', color: '#A8A6A2', fontWeight: 300, letterSpacing: '0.01em', marginBottom: '18px' }}>
              Aerospace-focused Mechanical Engineer
            </p>

            <p className="a4" style={{ ...sans, fontSize: '15px', color: '#848280', fontWeight: 300, lineHeight: 1.78, maxWidth: '440px', marginBottom: '32px' }}>
              Vanderbilt ME rising junior. Designed thermal systems for a Mars cave rover through NASA L'SPACE. Former Division I athlete.
            </p>

            <div className="a5" style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {[
                { label: 'eleanoroabel@gmail.com', href: 'mailto:eleanoroabel@gmail.com' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eleanor-abel-a6134b338', ext: true },
                { label: 'GitHub', href: 'https://github.com/abele28', ext: true },
              ].map((lk, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ color: '#2A2A2A' }}>·</span>}
                  <a href={lk.href} target={lk.ext ? '_blank' : undefined} rel={lk.ext ? 'noopener noreferrer' : undefined}
                    className="nav-lnk" style={{ ...mono, fontSize: '11px', color: '#787672', letterSpacing: '0.04em', textDecoration: 'none' }}>
                    {lk.label}
                  </a>
                </React.Fragment>
              ))}
            </div>

            <div className="a5" style={{ display: 'flex', gap: '10px', marginBottom: '56px', flexWrap: 'wrap' }}>
              <button onClick={() => switchTab('projects')} className="cta-primary"
                style={{ ...sans, padding: '11px 26px', fontSize: '13px', fontWeight: 500, background: '#E85D26', color: '#09090B', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.02em' }}>
                See My Work
              </button>
              <button onClick={() => switchTab('about')} className="cta-secondary"
                style={{ ...sans, padding: '11px 26px', fontSize: '13px', fontWeight: 400, background: 'transparent', color: '#C4C2BC', border: '1px solid #2A2A2E', borderRadius: '5px', cursor: 'pointer', transition: 'border-color 0.2s', letterSpacing: '0.02em' }}>
                About Me
              </button>
            </div>

            <div className="a6" style={{ display: 'flex', gap: '44px', paddingTop: '26px', borderTop: '1px solid #1A1A1E', flexWrap: 'wrap' }}>
              {[
                { label: 'Currently at', value: 'Vanderbilt University' },
                { label: 'Incoming intern', value: 'NASA Langley Research Center' },
              ].map((cr, i) => (
                <div key={i}>
                  <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '5px' }}>{cr.label}</p>
                  <p style={{ ...sans, fontSize: '14px', color: '#C4C2BC', fontWeight: 400 }}>{cr.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', color: '#2A2A2A' }} className="animate-bounce">
            <ChevronDown size={18} />
          </div>
        </section>

        {/* ── Tabbed content ── */}
        <section id="content" style={{ padding: '72px 24px 120px' }}>
          <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

            {/* Tab bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid #1A1A1E', marginBottom: '52px' }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{ ...mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '11px 22px', border: 'none', borderBottom: `2px solid ${activeTab === t.id ? '#E85D26' : 'transparent'}`, marginBottom: '-1px', background: 'transparent', cursor: 'pointer', color: activeTab === t.id ? '#E85D26' : '#787672', transition: 'color 0.2s, border-color 0.2s' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* ── Projects accordion ── */}
            {activeTab === 'projects' && (
              <div>
                {/* Intro line */}
                <p style={{ ...sans, fontSize: '13px', color: '#787672', fontWeight: 300, marginBottom: '32px', letterSpacing: '0.01em' }}>
                  {projects.length} projects — click any to expand
                </p>

                <div style={{ borderTop: '1px solid #1A1A1E' }}>
                  {projects.map((project, idx) => (
                    <div key={idx} className="proj-row">
                      <ProjectRow
                        project={project}
                        index={idx}
                        isOpen={openProjects.has(idx)}
                        onToggle={() => toggleProject(idx)}
                      />
                    </div>
                  ))}
                </div>

                <p style={{ ...sans, fontSize: '13px', color: '#646462', fontWeight: 300, marginTop: '28px' }}>
                  <span style={{ color: '#E85D26' }}>Also in progress:</span>{' '}
                  A React-based workout tracking app. And always something new on the bench.
                </p>
              </div>
            )}

            {/* ── About ── */}
            {activeTab === 'about' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>

                {/* Bio + photos */}
                <div style={{ display: 'flex', gap: '52px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flexShrink: 0, width: '210px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <img src="/headshot.jpg" alt="Eleanor Abel"
                      style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'top', borderRadius: '7px' }} />
                    <Photo src="/IMG_1873.JPG" alt="Eleanor captaining the Ontario Hockey Academy"
                      style={{ width: '100%', height: '148px', objectFit: 'cover', objectPosition: 'top', borderRadius: '7px' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {[
                      "I'm a mechanical engineering student at Vanderbilt, focused on aerospace, with a minor in Education Studies. My grandfather worked in the wind tunnel at NASA Langley — that was my first signal that this could be a real direction for me.",
                      "My path hasn't been a straight line. I started at Union College in Schenectady as a D1 hockey player, then transferred to Vanderbilt to go all-in on engineering. Carrying a full ME course load while competing at the D1 level taught me how to manage hard things at the same time.",
                      "Coursework: thermodynamics, dynamics, linear algebra, instrumentation. Lab work: thermal protection for Mars rovers, a wind tunnel I built myself, automated manufacturing systems. French at a professional level — used daily during my year captaining a Tier I program in Cornwall, Ontario.",
                      "What drives all of it: I want to build things that matter. Same drive, different forms.",
                    ].map((p, i) => (
                      <p key={i} style={{ ...sans, fontSize: '15px', color: '#C0BEBC', lineHeight: 1.82, fontWeight: 300 }}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '22px' }}>Education</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { school: 'Vanderbilt University', location: 'Nashville, TN', degree: 'B.E. Mechanical Engineering', gpa: '3.93 / 4.00', date: 'Aug 2025 – Present', activities: ['NROTC', 'Society of Women Engineers', 'Engineers Without Borders'] },
                      { school: 'Union College', location: 'Schenectady, NY', degree: 'B.E. Mechanical Engineering', gpa: '3.87 / 4.00', date: 'June 2023 – June 2024', activities: ["Dean's List", 'NCAA Division I Ice Hockey'] },
                    ].map((edu, i) => (
                      <div key={i} style={{ padding: '22px 26px', border: '1px solid #1A1A1E', borderRadius: '7px', background: '#0D0D10' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <div>
                            <h4 style={{ ...serif, fontSize: '20px', fontWeight: 600, color: '#EDEDEA', marginBottom: '2px' }}>{edu.school}</h4>
                            <p style={{ ...sans, fontSize: '12px', color: '#787672' }}>{edu.location}</p>
                          </div>
                          <span style={{ ...mono, fontSize: '10px', color: '#E85D26', flexShrink: 0, letterSpacing: '0.05em' }}>{edu.date}</span>
                        </div>
                        <p style={{ ...sans, fontSize: '13px', color: '#9E9C98', marginBottom: '4px' }}>{edu.degree}</p>
                        <p style={{ ...mono, fontSize: '10px', color: '#646462', marginBottom: '14px', letterSpacing: '0.05em' }}>GPA {edu.gpa}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {edu.activities.map((a, j) => (
                            <span key={j} style={{ ...mono, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 9px', border: '1px solid #222226', color: '#646462', borderRadius: '4px' }}>{a}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 style={{ ...serif, fontSize: '30px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '26px' }}>Skills & Tools</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '36px' }}>
                    {[
                      { category: 'Software & Programming', items: ['Python', 'Java', 'MATLAB / Simulink / Simscape', 'LabVIEW', 'Arduino', 'HTML / React'] },
                      { category: 'Engineering & Design', items: ['SolidWorks (CSWA Certified)', 'AutoCAD', 'FEA & Thermal Analysis', 'Prototyping & Fabrication', 'NI DAQ & Instrumentation'] },
                      { category: 'Aerospace Focus', items: ['Thermal Management Systems', 'MLI / PCM / Heat Pipes', 'Aerodynamics & CFD', 'Systems Integration', 'NASA Proposal Standards'] },
                      { category: 'Certifications & Languages', items: ['CSWA — SolidWorks', 'DFP Affaires B1', 'English (Native)', 'French (Professional)'] },
                    ].map(({ category, items }, i) => (
                      <div key={i}>
                        <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '14px' }}>{category}</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                          {items.map((item, j) => (
                            <li key={j} className="skill-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <span style={{ color: '#E85D26', marginTop: '2px', flexShrink: 0, fontSize: '11px' }}>—</span>
                              <span style={{ ...sans, fontSize: '13px', color: '#9E9C98', fontWeight: 300, transition: 'color 0.2s' }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div style={{ paddingTop: '28px', borderTop: '1px solid #1A1A1E' }}>
                  <p style={{ ...sans, fontSize: '14px', color: '#787672', marginBottom: '18px', fontWeight: 300 }}>
                    Let's talk. Reach out if you're working on something interesting.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Email', href: 'mailto:eleanoroabel@gmail.com' },
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eleanor-abel-a6134b338', ext: true },
                    ].map((lk, i) => (
                      <a key={i} href={lk.href} target={lk.ext ? '_blank' : undefined} rel={lk.ext ? 'noopener noreferrer' : undefined}
                        className="contact-link"
                        style={{ ...sans, fontSize: '13px', padding: '9px 22px', border: `1px solid ${i === 0 ? 'rgba(232,93,38,0.3)' : '#2A2A2E'}`, color: i === 0 ? '#E85D26' : '#9E9C98', borderRadius: '5px', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}>
                        {lk.label}
                      </a>
                    ))}
                    <a href="https://github.com/abele28" target="_blank" rel="noopener noreferrer"
                      className="contact-link"
                      style={{ ...sans, fontSize: '13px', padding: '9px 22px', border: '1px solid #2A2A2E', color: '#9E9C98', borderRadius: '5px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px', transition: 'border-color 0.2s, color 0.2s' }}>
                      <Github size={13} /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ── Fun Things ── */}
            {activeTab === 'fun' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>

                {[
                  {
                    title: 'Hockey',
                    subtitle: 'Player → Captain → Coach',
                    body: 'Hockey has been a constant since I was a kid. I played D1 at Union College, then spent a year as captain of the Ontario Hockey Academy\'s Tier I program in Cornwall, Ontario — running practices, managing game day, being the bridge between athletes and staff. I still coach youth hockey.',
                    tags: ['Union College NCAA DI', 'Ontario Hockey Academy — Captain', 'Youth Coaching'],
                    photo: '/DSC_6512.jpeg',
                  },
                  {
                    title: 'Running & Triathlon',
                    subtitle: 'The off-season doesn\'t really exist',
                    body: 'The athlete mindset doesn\'t switch off when the season ends. Running, cycling, and triathlon are how I reset — and honestly where a lot of my best thinking happens.',
                    photo: '/IMG_2866.JPG',
                  },
                  {
                    title: 'Rubik\'s Cubes',
                    subtitle: 'Since age 9',
                    body: 'I\'ve been solving Rubik\'s cubes since I was 9. Started with the 3x3 and went from there. Something about it stuck — probably the same thing that makes me want to understand how systems work.',
                  },
                  {
                    title: 'Travel',
                    subtitle: '10 countries · 4 continents',
                    body: 'Lived in South Africa and spent six months in Cornwall, Ontario playing hockey. Biked from Prague to Vienna the summer of 2024. France, Switzerland, Italy, Mexico, Argentina, Brazil — every trip has been different. Some for sport, some for adventure, usually both.',
                  },
                  {
                    title: 'Always Building Something',
                    subtitle: 'Wind tunnels, apps, whatever\'s next',
                    body: 'The wind tunnel wasn\'t assigned. The workout tracker wasn\'t either. There\'s something specific about making a thing that didn\'t exist before — I chase that feeling in whatever form it shows up.',
                    photo: '/IMG_4073.jpeg',
                  },
                  {
                    title: 'French',
                    subtitle: 'Professional Proficiency — DFP Affaires B1',
                    body: 'I speak French at a professional level — I used it daily during my year in Cornwall, Ontario. Not a resume line; something I actively maintain.',
                  },
                ].map((item, i) => (
                  <div key={i}>
                    {/* Orange rule */}
                    <div style={{ width: '28px', height: '1px', background: '#E85D26', opacity: 0.55, marginBottom: '16px' }} />

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '36px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {item.photo && (
                        <div style={{ flexShrink: 0, width: '188px' }}>
                          <img src={item.photo} alt={item.title}
                            style={{ width: '100%', height: '188px', objectFit: 'cover', objectPosition: 'top', borderRadius: '7px' }} />
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <h3 style={{ ...serif, fontSize: '28px', fontWeight: 600, fontStyle: 'italic', color: '#EDEDEA', marginBottom: '4px', lineHeight: 1.15 }}>
                          {item.title}
                        </h3>
                        <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '14px' }}>
                          {item.subtitle}
                        </p>
                        <p style={{ ...sans, fontSize: '14px', color: '#C0BEBC', lineHeight: 1.8, fontWeight: 300, maxWidth: '520px', marginBottom: item.tags ? '14px' : 0 }}>
                          {item.body}
                        </p>
                        {item.tags && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {item.tags.map((t, j) => (
                              <span key={j} style={{ ...mono, fontSize: '10px', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 9px', border: '1px solid #222226', color: '#646462', borderRadius: '4px' }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {item.photo2 && (
                      <div style={{ marginTop: '16px', paddingLeft: item.photo ? '224px' : '0' }}>
                        <img src={item.photo2.src} alt={item.photo2.caption}
                          style={{ width: '100%', maxWidth: '300px', height: '160px', objectFit: 'cover', objectPosition: 'top', borderRadius: '6px', border: '1px solid #1A1A1E' }} />
                        <p style={{ ...mono, fontSize: '10px', color: '#646462', marginTop: '6px', letterSpacing: '0.04em' }}>{item.photo2.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: '1px solid #1A1A1E', padding: '24px', textAlign: 'center' }}>
          <p style={{ ...mono, fontSize: '10px', color: '#2A2A2A', letterSpacing: '0.1em' }}>
            Designed & built by Eleanor Abel · Deployed on Vercel
          </p>
        </footer>

      </div>
    </>
  );
}
