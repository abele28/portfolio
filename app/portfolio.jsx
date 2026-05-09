'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: 'Mars Rover Thermal Engineering',
      subtitle: 'NASA L\'SPACE Program',
      description:
        'Led thermal analysis for a Mars cave exploration rover. Conducted thermal FEA modeling, designed radiator systems for extreme Martian conditions, and optimized thermal protection for long-duration missions.',
      impact: 'Selected for NASA internship program',
      tags: ['ANSYS', 'Thermal Analysis', 'Systems Design'],
      color: 'from-orange-500 to-red-500',
      icon: '🚀',
    },
    {
      title: 'Custom Wind Tunnel & DAQ System',
      subtitle: 'Self-Built Engineering Project',
      description:
        'Designed and built a functional wind tunnel from scratch with Arduino-based data acquisition system. Instrumented with pressure sensors and real-time data logging for aerodynamic testing.',
      impact: 'Fully functional testing platform',
      tags: ['Arduino', 'CAD', 'Data Systems'],
      color: 'from-blue-500 to-cyan-500',
      icon: '🌪️',
    },
    {
      title: 'Strain Gauge Posture Sensor',
      subtitle: 'Biomechanics & Instrumentation',
      description:
        'Developed a real-time posture monitoring system using strain gauges integrated with LabVIEW. Used for ergonomic analysis and athletic performance tracking.',
      impact: 'Real-time biometric monitoring',
      tags: ['LabVIEW', 'Sensors', 'Signal Processing'],
      color: 'from-green-500 to-emerald-500',
      icon: '📊',
    },
    {
      title: 'Automated Hockey Stick Taper',
      subtitle: 'Mechanical Design & Automation',
      description:
        'Engineered an automated tapering system for custom hockey sticks. Designed fixtures, integrated motors, and developed control logic for precision manufacturing.',
      impact: 'Production-ready automation',
      tags: ['CAD', 'Machining', 'Control Systems'],
      color: 'from-purple-500 to-pink-500',
      icon: '🏒',
    },
  ];

  const skills = {
    'Mechanical Engineering': [
      'CAD (CATIA, Solidworks)',
      'FEA & Thermal Analysis',
      'Systems Design',
      'Prototyping & Fabrication',
    ],
    'Software & Data': [
      'React & Full-Stack Web',
      'Python & MATLAB',
      'Arduino & Embedded Systems',
      'LabVIEW & Instrumentation',
    ],
    'Aerospace Focus': [
      'Aerodynamics & CFD',
      'Thermal Management',
      'Systems Integration',
      'NASA L\'SPACE Training',
    ],
    'Leadership': [
      'Team Mentoring',
      'Youth Coaching (Hockey)',
      'Project Management',
      'Communication',
    ],
  };

  const credentials = [
    { label: 'CSWA Certified', value: 'Solidworks' },
    { label: 'Vanderbilt ME', value: 'Class of 2028' },
    { label: 'Education Minor', value: 'Peabody School' },
    { label: 'DI Athlete', value: 'Union College Hockey' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              ELLIE
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#work" className="hover:text-orange-400 transition">Work</a>
            <a href="#skills" className="hover:text-orange-400 transition">Skills</a>
            <a href="#about" className="hover:text-orange-400 transition">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center">
        {/* Background elements */}
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
              ENGINEER → ATHLETE → BUILDER
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Mechanical Engineer
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
              with Aerospace Ambitions
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
            Vanderbilt sophomore designing thermal systems for Mars rovers, building custom engineering solutions, and bringing ideas from sketches to reality. Former Division I athlete. Perpetual learner.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#work"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              See My Work
            </a>
            <a
              href="#about"
              className="px-6 py-3 border border-slate-700 rounded-lg font-semibold hover:border-orange-400 hover:text-orange-400 transition-all"
            >
              Get to Know Me
            </a>
          </div>

          {/* Credentials grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
            {credentials.map((cred, i) => (
              <div key={i} className="pt-4">
                <p className="text-xs text-orange-400 font-mono tracking-wider mb-1">{cred.label}</p>
                <p className="text-slate-300 font-semibold">{cred.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-orange-400 text-sm font-mono tracking-wider">— Featured Work</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Engineering Projects</h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              A selection of projects that showcase systems thinking, technical depth, and the ability to ship.
            </p>
          </div>

          <div className="grid gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
                className="group relative cursor-pointer"
              >
                {/* Project card */}
                <div className="relative overflow-hidden rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300 bg-slate-900/50 backdrop-blur-sm">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r ${project.color}`}></div>

                  {/* Content */}
                  <div className="relative p-8 flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1 mb-6 md:mb-0">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl">{project.icon}</div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                          <p className="text-orange-400 text-sm font-semibold">{project.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-orange-300 font-semibold">{project.impact}</p>
                    </div>

                    {/* Chevron indicator */}
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-orange-500/20 transition-colors">
                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-xl border border-slate-800 bg-slate-900/50">
            <p className="text-slate-300 mb-4">
              <span className="text-orange-400 font-semibold">More on the way:</span> Currently building a React-based workout tracking app, exploring advanced thermal modeling in aerospace, and always tinkering with something new.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-orange-400 text-sm font-mono tracking-wider">— Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">What I Know</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={index} className="group">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">{category}</h3>
                <ul className="space-y-3">
                  {items.map((skill, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 group-hover:text-slate-100 transition">
                      <span className="text-orange-500 mt-1 flex-shrink-0">→</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span className="text-orange-400 text-sm font-mono tracking-wider">— Story</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Who I Am</h2>
          </div>

          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              I'm a mechanical engineering student at Vanderbilt with a minor in Education Studies and a burning passion for aerospace. My grandfather worked in the wind tunnel at NASA Langley—that was my first hint that rockets and precision engineering could be a life's work.
            </p>

            <p>
              Before engineering full-time, I was a Division I ice hockey player. That background taught me about systems (your body is a system), incremental progress (gains come from small daily choices), and what it means to be part of something larger than yourself. I still coach youth hockey and run, cycle, and build things obsessively.
            </p>

            <p>
              In the classroom, I've tackled thermodynamics, dynamics, linear algebra, and instrumentation. In the lab, I've designed thermal protection for Mars rovers, built a wind tunnel from scratch, and engineered automated manufacturing systems. In code, I've shipped full-stack applications and data visualization tools.
            </p>

            <p>
              What ties it all together: I believe in building things that matter. Whether that's a system that flies to Mars, a tool that helps someone work better, or teaching the next generation of engineers to think clearly and build boldly.
            </p>

            <p>
              <span className="text-orange-400 font-semibold">Current focus:</span> Summer body recomposition, advanced thermal modeling, and learning React deeply. Always happy to talk about aerospace, engineering workflows, education, or what you're building.
            </p>
          </div>

          {/* Contact section */}
          <div className="mt-16 pt-12 border-t border-slate-800">
            <p className="text-slate-400 mb-6">Let's talk. Reach out if you're working on something interesting.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:hello@example.com"
                className="px-6 py-3 rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500 transition-all font-semibold"
              >
                Email
              </a>
              <a
                href="https://linkedin.com"
                className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-orange-400 transition-all font-semibold"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-orange-400 hover:text-orange-400 transition-all font-semibold flex items-center gap-2"
              >
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-500 text-sm">
        <p>Designed & built by me. Deployed on Vercel.</p>
      </footer>
    </div>
  );
}
