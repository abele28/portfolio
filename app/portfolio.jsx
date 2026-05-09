'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Github } from 'lucide-react';

function Photo({ src, alt, className }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`bg-slate-800/50 border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-600 text-xs text-center p-4 gap-2 ${className}`}>
        <span className="text-2xl">📷</span>
        <span>{alt}</span>
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
      title: 'Mars Rover Thermal Engineering',
      subtitle: "NASA L'SPACE Mission Concept Academy",
      date: 'Sept – Dec 2025',
      description:
        "Designed a hybrid thermal management system for a Mars cave exploration rover, keeping components alive across surface temperature swings of -125°C to +20°C and 48-hour subsurface operations with zero solar input. Ran trade studies across passive retention, active heat generation, and heat rejection — evaluating MLI, PCM, loop heat pipes, radiators, and thermoelectric coolers. Modeled the full thermal network in MATLAB Simscape to verify performance across both operational modes. Part of a 15-person multidisciplinary team producing deliverables aligned with NASA proposal standards.",
      tags: ['MATLAB Simscape', 'Thermal Analysis', 'Systems Design', 'MLI / PCM', 'Trade Studies'],
      color: 'from-orange-500 to-red-500',
      icon: '🚀',
      photo: null,
    },
    {
      title: 'Posture Sensor',
      subtitle: 'Instrumentation & Controls — Nashville, TN',
      date: 'Jan 2026 – Present',
      description:
        'Built a custom Wheatstone bridge circuit for strain gauge signal conditioning, then programmed a LabVIEW VI using state machine architecture to monitor and classify posture in real time. Integrated with NI DAQ hardware to process sensor data and trigger feedback via buzzer and on-screen alert. Produced full VI math derivations, uncertainty analysis, and circuit schematics.',
      tags: ['LabVIEW', 'NI DAQ', 'Wheatstone Bridge', 'Signal Processing', 'Circuit Design'],
      color: 'from-green-500 to-emerald-500',
      icon: '📊',
      photo: null,
    },
    {
      title: 'Wind Tunnel & DAQ System',
      subtitle: 'Self-Designed Engineering Project — Dallas, TX',
      date: 'Apr 2025 – Jan 2026',
      description:
        'Designed and modeled a wind tunnel in AutoCAD, simulated airflow in MATLAB Simscape/Simulink, and built an Arduino-based data acquisition system to measure lift and drag under controlled airflow conditions. Not a class assignment — just something I wanted to build.',
      tags: ['AutoCAD', 'MATLAB Simscape', 'Simulink', 'Arduino', 'Aerodynamics', 'DAQ'],
      color: 'from-blue-500 to-cyan-500',
      icon: '🌪️',
      photo: null,
    },
    {
      title: 'Automated Hockey Stick Taping Device',
      subtitle: 'Mechanical Design & Automation — Schenectady, NY',
      date: 'Sept – Dec 2023',
      description:
        'Designed the full mechanical assembly in SolidWorks and produced laser-cut fabrication files in AutoCAD. Programmed a SparkFun RedBoard in Arduino to coordinate servo motor actuation with motion sensor input for consistent, repeatable tape application. Built and documented the complete electromechanical circuit including a full wiring diagram.',
      tags: ['SolidWorks', 'AutoCAD', 'Arduino', 'Servo Control', 'Fabrication'],
      color: 'from-purple-500 to-pink-500',
      icon: '🏒',
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
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center">
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

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full border border-orange-500/30 text-orange-400 text-xs font-mono tracking-wider">
              VANDERBILT ME · NASA L'SPACE · AEROSPACE
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Mechanical engineering student.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
              Aerospace is the plan.
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
            I've already designed thermal systems for a Mars cave rover through NASA L'SPACE — managing
            everything from MLI to thermoelectric coolers at -125°C. That's the work I want to keep doing.
            Vanderbilt sophomore. Former Division I athlete. Always building something.
          </p>

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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-800">
            {[
              { label: 'Vanderbilt ME', value: 'Sophomore' },
              { label: 'DI Athlete', value: 'Union College Hockey' },
              { label: "NASA L'SPACE", value: 'Student Thermal Engineer' },
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
                        <div className="flex items-start gap-4 mb-3">
                          <span className="text-3xl">{project.icon}</span>
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                            <p className="text-orange-400 text-sm font-semibold">{project.subtitle}</p>
                            <p className="text-slate-500 text-xs mt-1 font-mono">{project.date}</p>
                          </div>
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
              {/* Bio + headshot */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-64 flex-shrink-0">
                  <img
                    src="/headshot.jpg"
                    alt="Eleanor Abel"
                    className="w-full aspect-square object-cover object-top rounded-xl"
                  />
                </div>
                <div className="flex-1 space-y-5 text-slate-300 text-lg leading-relaxed">
                  <p>
                    I'm a mechanical engineering student at Vanderbilt with a minor in Education Studies
                    and a serious focus on aerospace. My grandfather worked in the wind tunnel at NASA
                    Langley — that was my first hint that this could be a life's work.
                  </p>
                  <p>
                    My path hasn't been straight. I started at Union College in Schenectady as a Division I
                    ice hockey player, then transferred to Vanderbilt to double down on engineering. That year
                    carrying a full ME course load while playing at the D1 level taught me a lot about
                    managing hard things at the same time.
                  </p>
                  <p>
                    In the classroom: thermodynamics, dynamics, linear algebra, instrumentation. In the lab:
                    thermal protection for Mars rovers, a wind tunnel I built from scratch, automated
                    manufacturing systems. I also speak French at a professional level — something I actively
                    used during my year captaining a Tier I hockey program in Cornwall, Ontario.
                  </p>
                  <p>
                    What ties it together: I want to build things that matter. Whether that's a thermal system
                    flying to Mars, a sensor that helps someone work better, or teaching the next generation
                    of engineers to think clearly and build confidently.
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
                      Ice hockey has been a constant. I played Division I at Union College, then spent a year
                      as captain of the Ontario Hockey Academy's Tier I program in Cornwall, Ontario — leading
                      practices, managing game-day operations, and acting as the bridge between athletes and
                      coaches. I still coach youth hockey and can't really imagine a life without ice time.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Union College NCAA DI", "Ontario Hockey Academy — Captain", "Youth Coaching"].map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Second hockey photo */}
                <div className="ml-0 md:ml-64 md:pl-8">
                  <img
                    src="/DSC_6512.jpeg"
                    alt="Eleanor (#28) playing for Union College"
                    className="w-full max-w-sm h-48 object-cover object-top rounded-lg border border-slate-800"
                  />
                  <p className="text-slate-500 text-xs mt-2 font-mono">#28 — Union College Women's Hockey</p>
                </div>
              </div>

              {/* Athletics */}
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
                  <p className="text-orange-400 text-sm font-semibold mb-3">Off-season doesn't really exist</p>
                  <p className="text-slate-300 leading-relaxed">
                    The athlete mindset doesn't switch off when the season ends. Running, cycling, and
                    triathlon are how I reset — and honestly where a lot of my best thinking happens.
                  </p>
                </div>
              </div>

              {/* Building */}
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
                    The wind tunnel wasn't assigned. The workout tracker app wasn't either. There's a specific
                    kind of satisfaction in making something real that didn't exist before — and I chase that
                    feeling in whatever form it takes.
                  </p>
                </div>
              </div>

              {/* French */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-56 flex-shrink-0 flex items-center justify-center h-32 rounded-xl bg-slate-900/50 border border-slate-800 text-5xl">
                  🇫🇷
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">French</h3>
                  <p className="text-orange-400 text-sm font-semibold mb-3">Professional Proficiency — DFP Affaires B1</p>
                  <p className="text-slate-300 leading-relaxed">
                    I speak French at a professional level — something I actively used during my year in
                    Cornwall, Ontario. It's not just a line on a resume; it's genuinely come in handy and
                    is something I keep working on.
                  </p>
                </div>
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
