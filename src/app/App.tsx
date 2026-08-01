import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Mail, Linkedin, Phone, ChevronDown } from "lucide-react";
import heroImg from "../imports/image.png";
import groupImg from "../imports/image-1.png";
import aboutImg from "../imports/image-2.png";

const NAV_LINKS = ["Work", "About", "Skills", "Contact"];

const PROJECTS = [
  {
    number: "01",
    title: "Academic Project Documentation & Task Management",
    category: "Organization · Digital Operations",
    year: "2025",
    description:
      "Led structured documentation of group academic projects at Mount Kigali University — tracking deadlines, deliverables, and team responsibilities with consistent accuracy and professional reporting.",
    tags: ["Task Management", "Documentation", "Google Workspace", "Teamwork"],
    importedImage: groupImg,
  },
  {
    number: "02",
    title: "Business Information Systems Analysis",
    category: "Information Technology · Research",
    year: "2025",
    description:
      "Analyzed real-world business workflows and proposed systems improvements using digital tools. Applied IT concepts to map inefficiencies and recommend structured, data-informed solutions.",
    tags: ["Research Skills", "IT Systems", "Critical Thinking", "Microsoft Office"],
    image: "photo-1551288049-bebda4e38f71",
    imageW: 900,
    imageH: 600,
  },
  {
    number: "03",
    title: "Collaborative Group Research Project",
    category: "Teamwork · Communication",
    year: "2025",
    description:
      "Coordinated a multi-member research team to produce a comprehensive report on digital literacy in remote work environments. Managed communication, version control, and final presentation delivery.",
    tags: ["Collaboration", "Communication", "Problem Solving", "Presentation"],
    importedImage: groupImg,
  },
] as Array<{
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  importedImage?: string;
  image?: string;
  imageW?: number;
  imageH?: number;
}>;

const SKILLS = [
  {
    label: "Professional",
    items: [
      "Attention to Detail",
      "Organization Skills",
      "Accountability",
      "Time Management",
      "Professionalism",
      "Adaptability",
    ],
  },
  {
    label: "Technical",
    items: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Figma",
      "Microsoft Office",
      "Google Workspace",
      "Digital Literacy",
      "Information Technology",
    ],
  },
  {
    label: "Interpersonal",
    items: [
      "Communication Skills",
      "Teamwork & Collaboration",
      "Problem Solving",
      "Critical Thinking",
      "Accountability",
      "Conflict Resolution",
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Work");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = NAV_LINKS.map((n) => document.getElementById(n.toLowerCase())).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-background border-b border-border">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm tracking-[0.18em] uppercase font-medium"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Isimbi Emelyne
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm tracking-[0.12em] uppercase transition-colors duration-200"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: activeSection === link ? "var(--accent)" : "var(--foreground)",
              }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Contact")}
            className="ml-4 px-5 py-2 text-xs tracking-[0.15em] uppercase bg-foreground text-primary-foreground hover:bg-accent transition-colors duration-200"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-foreground transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-foreground flex flex-col py-8 px-8 gap-6 md:hidden">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-sm tracking-[0.15em] uppercase text-primary-foreground"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="pt-[72px] min-h-screen grid md:grid-cols-[42%_58%]">
        {/* Left — dark panel */}
        <div
          className="flex flex-col justify-between px-8 md:px-14 py-16 md:py-20 min-h-[60vh] md:min-h-screen"
          style={{ background: "#0d0d0d" }}
        >
          <div />
          <div>
            <p
              className="text-xs tracking-[0.22em] uppercase mb-8"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
            >
              Business &amp; Information Technology
            </p>
            <h1
              className="text-4xl md:text-5xl leading-[1.1] text-primary-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}
            >
              Niyokwizerwa<br />
              <em style={{ fontStyle: "italic" }}>Isimbi</em><br />
              Emelyne
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#8a8278" }}>
              Dedicated BIT student with a strong interest in organization, accountability, and systems improvement.
              Passionate about effective communication, teamwork, and contributing to efficient digital operations.
            </p>
          </div>
          <div className="flex items-center gap-6 mt-12">
            <a
              href="https://www.linkedin.com/in/isimbi-emelyne-9860a440b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200 hover:text-accent"
              style={{ fontFamily: "'DM Mono', monospace", color: "#6b6459" }}
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
              <span className="hidden md:inline">LinkedIn</span>
            </a>
            <a
              href="mailto:Isimbiemelyne04@gmail.com"
              className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200 hover:text-accent"
              style={{ fontFamily: "'DM Mono', monospace", color: "#6b6459" }}
              aria-label="Email"
            >
              <Mail size={16} />
              <span className="hidden md:inline">Email</span>
            </a>
            <a
              href="tel:+250788900554"
              className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200 hover:text-accent"
              style={{ fontFamily: "'DM Mono', monospace", color: "#6b6459" }}
              aria-label="Phone"
            >
              <Phone size={16} />
              <span className="hidden md:inline">Call</span>
            </a>
          </div>
        </div>

        {/* Right — cream panel */}
        <div className="relative flex flex-col bg-background">
          <div className="relative overflow-hidden" style={{ height: "340px", minHeight: "240px" }}>
            <img
              src={heroImg}
              alt="Niyokwizerwa Isimbi Emelyne"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 55%, var(--background) 100%)" }}
            />
          </div>
          <div className="px-10 md:px-16 py-10 flex items-center justify-between">
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
              >
                Based in
              </p>
              <p className="text-sm font-medium">Kigali, Rwanda</p>
            </div>
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
              >
                Experience
              </p>
              <p className="text-sm font-medium">1–2 years</p>
            </div>
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
              >
                Availability
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>Open</p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hidden md:flex items-center justify-center py-4" style={{ background: "#0d0d0d" }}>
          <button
            onClick={() => scrollTo("Work")}
            className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronDown size={18} style={{ color: "#f4efe5" }} />
          </button>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="px-8 md:px-16 py-24 md:py-36 border-t border-border">
        <FadeIn className="flex items-end justify-between mb-16">
          <div>
            <p
              className="text-xs tracking-[0.22em] uppercase mb-3"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
            >
              Academic &amp; Project-Based Experience
            </p>
            <h2
              className="text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              Work
            </h2>
          </div>
          <p
            className="hidden md:block text-xs tracking-[0.15em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
          >
            2025 – Present
          </p>
        </FadeIn>

        {/* University role highlight */}
        <FadeIn className="mb-10 px-8 py-8 border border-border bg-card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
            >
              Current Role
            </p>
            <p
              className="text-xl md:text-2xl leading-snug"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              Business &amp; Information Technology Student
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
              Mount Kigali University — 2025 – Present
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm max-w-sm" style={{ color: "var(--muted-foreground)" }}>
            <span>· Organized and delivered structured academic projects with accuracy</span>
            <span>· Collaborated with peers on communication and problem-solving tasks</span>
            <span>· Applied digital and analytical skills to academic work</span>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-0">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.number} delay={i * 80}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="grid md:grid-cols-2 border-t border-border">
        <div
          className="px-8 md:px-16 py-24 md:py-36 flex flex-col justify-center"
          style={{ background: "#0d0d0d" }}
        >
          <FadeIn>
            <p
              className="text-xs tracking-[0.22em] uppercase mb-6"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
            >
              About
            </p>
            <h2
              className="text-4xl md:text-5xl leading-tight text-primary-foreground mb-8"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              Detail-oriented.{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Adaptable.</em>{" "}
              Driven.
            </h2>
            <p className="text-sm leading-relaxed max-w-md mb-6" style={{ color: "#8a8278" }}>
              I'm Niyokwizerwa Isimbi Emelyne, a Business and Information Technology student at
              Mount Kigali University. I bring a strong interest in organization, accountability,
              and systems improvement to everything I do.
            </p>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#8a8278" }}>
              Highly detail-oriented and comfortable working within structured processes, I'm passionate
              about effective communication, teamwork, and contributing to efficient digital operations —
              especially in remote and collaborative environments.
            </p>

            {/* Education card */}
            <div
              className="mt-10 px-6 py-5 border"
              style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
            >
              <p
                className="text-xs tracking-[0.18em] uppercase mb-2"
                style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
              >
                Education
              </p>
              <p className="text-sm font-medium text-primary-foreground">
                Bachelor's Degree in Business &amp; Information Technology
              </p>
              <p className="text-xs mt-1" style={{ color: "#6b6459" }}>
                Mount Kigali University · 2025 – Present
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="relative overflow-hidden min-h-[400px] bg-muted">
          <img
            src={aboutImg}
            alt="Isimbi Emelyne"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="px-8 md:px-16 py-24 md:py-36 border-t border-border">
        <FadeIn className="mb-16">
          <p
            className="text-xs tracking-[0.22em] uppercase mb-3"
            style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
          >
            Capabilities
          </p>
          <h2
            className="text-4xl md:text-6xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            Skills
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-0 border border-border">
          {SKILLS.map(({ label, items }, i) => (
            <FadeIn key={label} delay={i * 80} className="border-b md:border-b-0 md:border-r border-border last:border-0">
              <div className="px-8 py-10">
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-8 pb-4 border-b border-border"
                  style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  {String(i + 1).padStart(2, "0")} — {label}
                </p>
                <ul className="flex flex-col gap-4">
                  {items.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-sm font-medium">
                      <span
                        className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="border-t border-border" style={{ background: "#0d0d0d" }}>
        <div className="px-8 md:px-16 py-24 md:py-36 grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p
              className="text-xs tracking-[0.22em] uppercase mb-6"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
            >
              Contact
            </p>
            <h2
              className="text-4xl md:text-6xl leading-tight text-primary-foreground mb-8"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              Let's work together.
            </h2>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:Isimbiemelyne04@gmail.com"
                className="inline-flex items-center gap-2 text-sm tracking-[0.12em] transition-colors duration-200 hover:text-accent"
                style={{ fontFamily: "'DM Mono', monospace", color: "#8a8278" }}
              >
                <Mail size={14} />
                Isimbiemelyne04@gmail.com
                <ArrowUpRight size={13} />
              </a>
              <a
                href="tel:+250788900554"
                className="inline-flex items-center gap-2 text-sm tracking-[0.12em] transition-colors duration-200 hover:text-accent"
                style={{ fontFamily: "'DM Mono', monospace", color: "#8a8278" }}
              >
                <Phone size={14} />
                +250 788 900 554
              </a>
              <a
                href="https://www.linkedin.com/in/isimbi-emelyne-9860a440b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-[0.12em] transition-colors duration-200 hover:text-accent"
                style={{ fontFamily: "'DM Mono', monospace", color: "#8a8278" }}
              >
                <Linkedin size={14} />
                linkedin.com/in/isimbi-emelyne
                <ArrowUpRight size={13} />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <ContactForm />
          </FadeIn>
        </div>

        {/* Footer */}
        <div
          className="px-8 md:px-16 py-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p
            className="text-xs tracking-[0.15em] uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: "#6b6459" }}
          >
            © 2025 Niyokwizerwa Isimbi Emelyne
          </p>
          <p className="text-xs" style={{ fontFamily: "'DM Mono', monospace", color: "#6b6459" }}>
            Kigali, Rwanda
          </p>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group border-b border-border cursor-pointer transition-colors duration-200"
      style={{ background: hovered ? "var(--secondary)" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid md:grid-cols-[56px_1fr_280px_40px] items-stretch">
        {/* Number */}
        <div
          className="hidden md:flex items-start pt-8 pb-8 pl-0 pr-4 border-r border-border"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "var(--muted-foreground)" }}
        >
          {project.number}
        </div>

        {/* Text content */}
        <div className="px-0 md:px-10 py-8 border-r border-border">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs tracking-[0.18em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
            >
              {project.category}
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
            >
              {project.year}
            </span>
          </div>
          <h3
            className="text-2xl md:text-3xl mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--muted-foreground)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs border border-border"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block overflow-hidden bg-muted" style={{ maxHeight: "220px" }}>
          <img
            src={
              project.importedImage
                ? project.importedImage
                : `https://images.unsplash.com/photo-${project.image}?w=${project.imageW}&h=${project.imageH}&fit=crop&auto=format`
            }
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <ArrowUpRight
            size={18}
            className="transition-all duration-200"
            style={{
              color: hovered ? "var(--accent)" : "var(--muted-foreground)",
              transform: hovered ? "translate(2px, -2px)" : "translate(0, 0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) return;
    setSent(true);
  };

  const inputStyle = {
    fontFamily: "'Jost', sans-serif",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f4efe5",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#6b6459",
    display: "block",
    marginBottom: "8px",
  };

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)" }}
        >
          Message sent
        </span>
        <p className="text-2xl leading-snug text-primary-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
          Thank you, {fields.name}. Isimbi will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label style={labelStyle}>Your name</label>
        <input
          type="text"
          placeholder="Jane Doe"
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(192,71,42,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          required
        />
      </div>
      <div>
        <label style={labelStyle}>Email address</label>
        <input
          type="email"
          placeholder="jane@company.com"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(192,71,42,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          required
        />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          rows={5}
          placeholder="Tell me about the opportunity..."
          value={fields.message}
          onChange={(e) => setFields({ ...fields, message: e.target.value })}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(192,71,42,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          required
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-between px-6 py-4 text-xs tracking-[0.15em] uppercase transition-colors duration-200 hover:opacity-90"
        style={{
          fontFamily: "'DM Mono', monospace",
          background: "var(--accent)",
          color: "#f4efe5",
        }}
      >
        Send Message
        <ArrowUpRight size={14} />
      </button>
    </form>
  );
}
