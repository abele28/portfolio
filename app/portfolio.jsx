'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Github } from 'lucide-react';

function OrbitalAnimation() {
  return (
    <svg viewBox="0 0 500 460" width="100%" height="100%">
      <defs>
        <filter id="orbit-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central body */}
      <circle cx="250" cy="230" r="6" fill="#f97316" opacity="0.9" filter="url(#orbit-glow)" />
      <circle cx="250" cy="230" r="16" fill="none" stroke="#f97316" strokeWidth="0.6" opacity="0.4" />

      {/* Orbit 1 — inner, tilted -20° */}
      <g transform="rotate(-20, 250, 230)">
        <ellipse cx="250" cy="230" rx="75" ry="28" fill="none" stroke="#f97316" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.55" />
        <circle r="5.5" fill="#f97316" filter="url(#orbit-glow)" opacity="0.95">
          <animateMotion dur="5s" repeatCount="indefinite"
            path="M 175,230 a 75,28 0 1,1 150,0 a 75,28 0 1,1 -150,0"
            rotate="none" />
        </circle>
      </g>

      {/* Orbit 2 — mid, tilted +12° */}
      <g transform="rotate(12, 250, 230)">
        <ellipse cx="250" cy="230" rx="145" ry="52" fill="none" stroke="#fb923c" strokeWidth="0.55" strokeDasharray="5 7" opacity="0.35" />
        <circle r="4" fill="#fb923c" filter="url(#orbit-glow)" opacity="0.85">
          <animateMotion dur="9s" repeatCount="indefinite" begin="-3.5s"
            path="M 105,230 a 145,52 0 1,1 290,0 a 145,52 0 1,1 -290,0"
            rotate="none" />
        </circle>
      </g>

      {/* Orbit 3 — outer, tilted -30° */}
      <g transform="rotate(-30, 250, 230)">
        <ellipse cx="250" cy="230" rx="215" ry="75" fill="none" stroke="#64748b" strokeWidth="0.45" strokeDasharray="3 9" opacity="0.2" />
        <circle r="3.5" fill="#94a3b8" filter="url(#orbit-glow)" opacity="0.7">
          <animateMotion dur="16s" repeatCount="indefinite" begin="-6s"
            path="M 35,230 a 215,75 0 1,1 430,0 a 215,75 0 1,1 -430,0"
            rotate="none" />
        </circle>
      </g>
    </svg>
  );
}

function Photo({ src, alt, className }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`bg-slate-800/50 border border-dashed border-slate-700 flex items-center justify-center text-slate-600 text-xs text-center p-4 ${className}`}>
        {alt}
      </div>
    );
  }
  return (
    <img src={src} alt={alt} className={className} onError={() => setError(true)} />
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      description:
        'Incoming intern at NASA Academy at NASA Langley Research Center, starting summer 2026. Looking forward to contributing to aerospace research at one of NASA\'s flagship facilities.',
      tags: ['NASA', 'Aerospace Research', 'NASA Langley'],
      color: 'from-blue-500 to-indigo-600',
      photo: null,
    },
    {
      title: 'Aerospace Supply Chain Engineering',
      subtitle: 'Incora — Global Aerospace Hardware Distributor',
      date: 'May – June 2026',
      description:
        'Read engineering drawings for aerospace fasteners, clamps, and bearings to pull material specs, tolerances, and compliance data for supplier qualification. Analyzed O-ring specifications and compound data to identify compliant substitutes — estimated ~77% unit cost reduction. Screened 80+ South American vendors against AS9100 certification standards to support procurement decisions.',
      tags: ['AS9100', 'Engineering Drawings', 'Supplier Qualification', 'O-Ring Analysis', 'Procurement'],
      color: 'from-yellow-500 to-amber-500',
      photo: null,
    },
    {
      title: 'Mars Rover Thermal Engineering',
      subtitle: "NASA L'SPACE Mission Concept Academy",
      date: 'Sept – Dec 2025',
      description:
        'Designed a hybrid thermal management system for a Mars cave exploration rover — keeping hardware alive across surface temperature swings of -125°C to +20°C and 48-hour subsurface operations with zero solar input. Ran trade studies on MLI, PCM, loop heat pipes, radiators, and thermoelectric coolers. Modeled the full thermal network in MATLAB Simscape and verified performance across both operational modes. Part of a 15-person multidisciplinary team working to NASA proposal standards.',
      tags: ['MATLAB Simscape', 'Thermal Analysis', 'Systems Design', 'MLI / PCM', 'Trade Studies'],
      color: 'from-orange-500 to-red-500',
      photo: null,
    },
    {
      title: 'Posture Sensor',
      subtitle: 'Instrumentation & Controls — Nashville, TN',
      date: 'Jan 2026 – Present',
      description:
        'Built a Wheatstone bridge circuit for strain gauge signal conditioning, then wrote a LabVIEW VI using state machine architecture to monitor and classify posture in real time. Integrated with NI DAQ hardware to trigger feedback via buzzer and on-screen alert. Full math derivations, uncertainty analysis, and circuit schematics.',
      tags: ['LabVIEW', 'NI DAQ', 'Wheatstone Bridge', 'Signal Processing', 'Circuit Design'],
      color: 'from-green-500 to-emerald-500',
      photo: null,
    },
    {
      title: 'Wind Tunnel & DAQ System',
      subtitle: 'Self-Designed Engineering Project — Dallas, TX',
      date: 'Apr 2025 – Jan 2026',
      description:
        'Designed a wind tunnel in AutoCAD, modeled airflow in MATLAB Simscape/Simulink, and built an Arduino-based data acquisition system to measure lift and drag under controlled airflow conditions. This wasn\'t a class assignment — I just wanted to build it.',
      tags: ['AutoCAD', 'MATLAB Simscape', 'Simulink', 'Arduino', 'Aerodynamics', 'DAQ'],
      color: 'from-blue-500 to-cyan-500',
      photo: null,
    },
    {
      title: 'Automated Hockey Stick Taping Device',
      subtitle: 'Mechanical Design & Automation — Schenectady, NY',
      date: 'Sept – Dec 2023',
      description:
        'Designed the full mechanical assembly in SolidWorks and produced laser-cut fabrication files in AutoCAD. Programmed a SparkFun RedBoard in Arduino to coordinate servo motor actuation with motion sensor input for consistent, repeatable tape application. Built and documented the complete electromechanical circuit.',
      tags: ['SolidWorks', 'AutoCAD', 'Arduino', 'Servo Control', 'Fabrication'],
      color: 'from-purple-500 to-pink-500',
      photo: '/IMG_8329.jpeg',
    },
  ];

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Me' },
    { id: 'fun', label: 'Fun Things' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              ELEANOR ABEL
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className="hover:text-orange-400 transition"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Orbital animation — right side, desktop only */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[540px] h-[540px] pointer-events-none hidden lg:block" style={{ opacity: 0.18 }}>
          <OrbitalAnimation />
        </div>

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full border border-orange-500/30 text-orange-400 text-xs font-mono tracking-wider">
              ATHLETE · ENGINEER · INNOVATOR
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Aerospace-focused
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
              Mechanical Engineer.
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-6 max-w-2xl leading-relaxed">
            Vanderbilt ME sophomore. Designed thermal systems for a Mars cave rover through NASA L'SPACE.
            Former Division I athlete. Aerospace is where I'm headed.
          </p>

          <div className="flex items-center gap-5 mb-10 text-sm">
            <a href="mailto:eleanoroabel@gmail.com" className="text-slate-400 hover:text-orange-400 transition-colors">
              eleanoroabel@gmail.com
            </a>
            <span className="text-slate-700">·</span>
            <a href="https://www.linkedin.com/in/eleanor-abel-a6134b338" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-400 transition-colors">
              LinkedIn
            </a>
            <span className="text-slate-700">·</span>
            <a href="https://github.com/abele28" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-400 transition-colors">
              GitHub
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => switchTab('projects')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all text-center"
            >
              See My Work
            </button>
            <button
              onClick={() => switchTab('about')}
              className="px-6 py-3 border border-slate-700 rounded-lg font-semibold hover:border-orange-400 hover:text-orange-400 transition-all text-center"
            >
              Get to Know Me
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-800" style={{ maxWidth: '360px' }}>
            {[
              { label: 'Vanderbilt ME', value: 'Sophomore' },
              { label: 'NASA Langley', value: 'Incoming Intern' },
            ].map((cred, i) => (
              <div key={i} className="pt-4">
                <p className="text-xs text-orange-400 font-mono tracking-wider mb-1">{cred.label}</p>
                <p className="text-slate-300 font-semibold">{cred.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Tabbed Content */}
      <section id="content" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Tab bar */}
          <div className="flex gap-2 mb-12 border-b border-slate-800">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Projects ── */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="group relative">
                  <div className="relative overflow-hidden rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 bg-slate-900/50">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r ${project.color}`}></div>
                    <div className="relative p-8 flex flex-col md:flex-row gap-8">
                      {project.photo && (
                        <div className="md:w-56 flex-shrink-0">
                          <Photo
                            src={project.photo}
                            alt={`Photo of ${project.title}`}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                          <p className="text-orange-400 text-sm font-semibold">{project.subtitle}</p>
                          {project.date && <p className="text-slate-500 text-xs mt-1 font-mono">{project.date}</p>}
                        </div>
                        <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                <p className="text-slate-300">
                  <span className="text-orange-400 font-semibold">Also in progress:</span>{' '}
                  A React-based workout tracking app. And always something new on the bench.
                </p>
              </div>
            </div>
          )}

          {/* ── About Me ── */}
          {activeTab === 'about' && (
            <div className="space-y-16">
              {/* Bio + photos */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-64 flex-shrink-0 flex flex-col gap-4">
                  <img
                    src="/headshot.jpg"
                    alt="Eleanor Abel"
                    className="w-full aspect-square object-cover object-top rounded-xl"
                  />
                  <Photo
                    src="/IMG_1873.JPG"
                    alt="Eleanor captaining the Ontario Hockey Academy"
                    className="w-full h-44 object-cover object-top rounded-xl"
                  />
                </div>
                <div className="flex-1 space-y-5 text-slate-300 text-lg leading-relaxed">
                  <p>
                    I'm a mechanical engineering student at Vanderbilt, focused on aerospace, with a minor
                    in Education Studies. My grandfather worked in the wind tunnel at NASA Langley — that
                    was my first signal that this could be a real direction for me.
                  </p>
                  <p>
                    My path hasn't been a straight line. I started at Union College in Schenectady as a
                    Division I hockey player, then transferred to Vanderbilt to go all-in on engineering.
                    Carrying a full ME course load while competing at the D1 level taught me how to manage
                    hard things at the same time — which turns out to be a useful skill.
                  </p>
                  <p>
                    Coursework: thermodynamics, dynamics, linear algebra, instrumentation. Lab work:
                    thermal protection for Mars rovers, a wind tunnel I built myself, automated
                    manufacturing systems. I also speak French at a professional level — I used it daily
                    during my year captaining a Tier I hockey program in Cornwall, Ontario.
                  </p>
                  <p>
                    What drives all of it: I want to build things that matter. Thermal systems going to
                    Mars, sensors that help people work better, teaching engineers to think clearly —
                    same drive, different forms.
                  </p>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-400">Education</h3>
                <div className="space-y-4">
                  {[
                    {
                      school: 'Vanderbilt University',
                      location: 'Nashville, TN',
                      degree: 'Bachelor of Engineering, Mechanical Engineering',
                      gpa: '3.93 / 4.00',
                      date: 'Aug 2025 – Present',
                      activities: ['NROTC', 'Society of Women Engineers', 'Engineers Without Borders'],
                    },
                    {
                      school: 'Union College',
                      location: 'Schenectady, NY',
                      degree: 'Bachelor of Engineering, Mechanical Engineering',
                      gpa: '3.87 / 4.00',
                      date: 'June 2023 – June 2024',
                      activities: ["Dean's List", 'NCAA Division I Ice Hockey'],
                    },
                  ].map((edu, i) => (
                    <div key={i} className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                        <div>
                          <h4 className="text-xl font-bold">{edu.school}</h4>
                          <p className="text-slate-400 text-sm">{edu.location}</p>
                        </div>
                        <span className="text-orange-400 text-sm font-mono mt-1 sm:mt-0 flex-shrink-0">{edu.date}</span>
                      </div>
                      <p className="text-slate-300 mb-2">{edu.degree}</p>
                      <p className="text-slate-400 text-sm mb-3">GPA: {edu.gpa}</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.activities.map((a, j) => (
                          <span key={j} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">{a}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-400">Skills & Tools</h3>
                <div className="grid md:grid-cols-2 gap-10">
                  {[
                    {
                      category: 'Software & Programming',
                      items: ['Python', 'Java', 'MATLAB / Simulink / Simscape', 'LabVIEW', 'Arduino', 'HTML / React'],
                    },
                    {
                      category: 'Engineering & Design',
                      items: ['SolidWorks (CSWA Certified)', 'AutoCAD', 'FEA & Thermal Analysis', 'Prototyping & Fabrication', 'NI DAQ & Instrumentation'],
                    },
                    {
                      category: 'Aerospace Focus',
                      items: ['Thermal Management Systems', 'MLI / PCM / Heat Pipes', 'Aerodynamics & CFD', 'Systems Integration', 'NASA Proposal Standards'],
                    },
                    {
                      category: 'Certifications & Languages',
                      items: ['Certified SolidWorks Associate (CSWA)', 'DFP Affaires B1', 'English (Native)', 'French (Professional Proficiency)'],
                    },
                  ].map(({ category, items }, i) => (
                    <div key={i}>
                      <h4 className="text-lg font-semibold mb-3 text-slate-200">{category}</h4>
                      <ul className="space-y-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-slate-300">
                            <span className="text-orange-500 mt-1 flex-shrink-0">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="pt-8 border-t border-slate-800">
                <p className="text-slate-400 mb-6">Let's talk. Reach out if you're working on something interesting.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:eleanoroabel@gmail.com"
                    className="px-6 py-3 rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500 transition-all font-semibold text-center"
                  >
                    Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/eleanor-abel-a6134b338"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-orange-400 transition-all font-semibold text-center"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/abele28"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-orange-400 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ── Fun Things ── */}
          {activeTab === 'fun' && (
            <div className="space-y-14">

              {/* Hockey */}
              <div>
                <div className="flex flex-col md:flex-row gap-8 items-start mb-6">
                  <div className="md:w-56 flex-shrink-0">
                    <img
                      src="/IMG_1873.JPG"
                      alt="Eleanor captaining the Ontario Hockey Academy"
                      className="w-full h-52 object-cover object-top rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Hockey</h3>
                    <p className="text-orange-400 text-sm font-semibold mb-3">Player → Captain → Coach</p>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Hockey has been a constant since I was a kid. I played D1 at Union College, then
                      spent a year as captain of the Ontario Hockey Academy's Tier I program in Cornwall,
                      Ontario — running practices, managing game day, and being the bridge between athletes
                      and staff. I still coach youth hockey. It's not something I plan to stop.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Union College NCAA DI', 'Ontario Hockey Academy — Captain', 'Youth Coaching'].map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ml-0 md:ml-64 md:pl-8">
                  <img
                    src="/DSC_6512.jpeg"
                    alt="Eleanor (#28) playing for Union College"
                    className="w-full max-w-sm h-48 object-cover object-top rounded-lg border border-slate-800"
                  />
                  <p className="text-slate-500 text-xs mt-2 font-mono">#28 — Union College Women's Hockey</p>
                </div>
              </div>

              {/* Running & Triathlon */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-56 flex-shrink-0">
                  <img
                    src="/IMG_2866.JPG"
                    alt="Eleanor racing in a triathlon"
                    className="w-full h-52 object-cover object-top rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Running & Triathlon</h3>
                  <p className="text-orange-400 text-sm font-semibold mb-3">The off-season doesn't really exist</p>
                  <p className="text-slate-300 leading-relaxed">
                    The athlete mindset doesn't switch off when the season ends. Running, cycling, and
                    triathlon are how I reset between everything else — and honestly, it's where a lot
                    of my best thinking happens.
                  </p>
                </div>
              </div>

              {/* Rubik's Cube */}
              <div>
                <h3 className="text-2xl font-bold mb-1">Rubik's Cubes</h3>
                <p className="text-orange-400 text-sm font-semibold mb-3">Since age 9</p>
                <p className="text-slate-300 leading-relaxed">
                  I've been solving Rubik's cubes since I was 9. Started with the 3x3 and went from
                  there. Something about it stuck — probably the same thing that makes me want to
                  understand how systems work.
                </p>
              </div>

              {/* Lego */}
              <div>
                <h3 className="text-2xl font-bold mb-1">Lego</h3>
                <p className="text-orange-400 text-sm font-semibold mb-3">A lifelong thing</p>
                <p className="text-slate-300 leading-relaxed">
                  Lego has been a thing my whole life and I still build. It never really gets old —
                  there's something satisfying about it that I don't think goes away.
                </p>
              </div>

              {/* Always Building Something */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-56 flex-shrink-0">
                  <img
                    src="/IMG_4073.jpeg"
                    alt="In the shop"
                    className="w-full h-52 object-cover object-top rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Always Building Something</h3>
                  <p className="text-orange-400 text-sm font-semibold mb-3">Wind tunnels, apps, whatever's next</p>
                  <p className="text-slate-300 leading-relaxed">
                    The wind tunnel wasn't assigned. The workout tracker wasn't either. There's something
                    specific about making a thing that didn't exist before — I chase that feeling in
                    whatever form it shows up.
                  </p>
                </div>
              </div>

              {/* French */}
              <div>
                <h3 className="text-2xl font-bold mb-1">French</h3>
                <p className="text-orange-400 text-sm font-semibold mb-3">Professional Proficiency — DFP Affaires B1</p>
                <p className="text-slate-300 leading-relaxed">
                  I speak French at a professional level — I used it daily during my year in Cornwall,
                  Ontario. It's not a resume line for me; it's something I actively maintain and
                  keep working on.
                </p>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-500 text-sm">
        <p>Designed & built by Eleanor Abel. Deployed on Vercel.</p>
      </footer>
    </div>
  );
}
