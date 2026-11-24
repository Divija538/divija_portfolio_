import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import {
  ArrowDown, ArrowRight, Award, Bug, Check,
  ChevronRight, Code2, Database, Download, ExternalLink, Github, GraduationCap,
  Layers3, Linkedin, Mail, MapPin, Menu, Moon, Network, Phone, Server, ShieldCheck,
  Sun, TestTube2, Trophy, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const DESCRIPTION = "Portfolio of Divija N, Computer Science Engineering student graduating in 2027, with skills in software testing, quality engineering, Java, Python, C/C++, SQL, Linux, networking, automation, and software development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divija N | Software Engineer | Software Testing & Quality Engineering" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Divija N | Software Engineer | Software Testing & Quality Engineering" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: "Divija N",
        jobTitle: "Software Engineer | Graduate Technology", email: "mailto:divijandivija21@gmail.com",
        address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "S J C Institute of Technology" },
        sameAs: ["https://linkedin.com/in/divija-n", "https://github.com/Divija538"],
      }),
    }],
  }),
  component: Portfolio,
});

const navItems = ["Home", "About", "Skills", "Projects", "Certifications", "Achievements", "Education", "Contact"];
const RESUME_URL: string | null = null;

const skills = [
  { title: "Software Testing & Quality", icon: TestTube2, items: ["Functional Testing", "Regression Testing", "Integration Testing", "System Testing", "Test Case Design", "Test Execution", "Test Validation", "Test Result Analysis", "Defect Identification", "Defect Tracking", "Defect Lifecycle", "Troubleshooting", "Quality Assurance", "Test Documentation"] },
  { title: "SDLC & Agile", icon: Layers3, items: ["Software Development Life Cycle (SDLC)", "Software Testing Life Cycle (STLC)", "Agile Methodology", "Software Development Best Practices", "Requirement Understanding", "Test Planning", "Defect Management"] },
  { title: "Programming", icon: Code2, items: ["Java", "Python", "C++", "C", "Data Structures", "Object-Oriented Programming", "Problem Solving"] },
  { title: "Automation & Tools", icon: Zap, items: ["Selenium", "TestNG", "Jira", "Git", "GitHub", "VS Code", "Debugging", "Logging", "Test Automation"] },
  { title: "Database & Data", icon: Database, items: ["SQL", "MySQL", "Database Testing", "Data Validation", "Basic Data Analytics"] },
  { title: "Systems & Networking", icon: Network, items: ["Linux", "Operating Systems", "Processes", "Threads", "Multithreading", "TCP/IP", "Ethernet", "Socket Programming", "Client-Server Communication"] },
  { title: "Additional", icon: ShieldCheck, items: ["Performance Testing", "Load Testing", "Stress Testing", "Scalability Testing", "Response-Time Analysis", "System Integration", "Technical Documentation", "Attention to Detail"] },
];

const projects = [
  { title: "Multi-Threaded File Transfer & Processing System", type: "SYSTEMS / CONCURRENCY", icon: Server, tech: ["C++", "Linux", "POSIX Threads", "TCP/IP", "Socket Programming", "IPC"], description: "Designed a Linux client-server application using multithreading for concurrent file transfer and processing.", points: ["Applied sockets, IPC, synchronization, logging, error handling, debugging, validation checks, and execution-result analysis.", "Analyzed concurrent behavior and system performance as a foundation for response-time, throughput, and performance validation."] },
  { title: "Network Monitoring & Diagnostics Tool", type: "NETWORKING / DIAGNOSTICS", icon: Network, tech: ["C", "C++", "Linux", "TCP/IP", "Ethernet", "Socket Programming"], description: "Developed a system-level utility to monitor network connectivity, connection status, and communication errors in Linux.", points: ["Implemented diagnostic logging and troubleshooting checks to support issue isolation, debugging, and root-cause analysis.", "Applied TCP/IP, Ethernet, and client-server communication concepts for system integration and reliable application communication."] },
  { title: "Web Application Testing & Defect Management System", type: "QUALITY / AUTOMATION", icon: Bug, tech: ["Java", "Selenium", "TestNG", "SQL", "Jira", "SDLC", "STLC"], description: "Designed and executed functional, regression, integration, and system test cases for a web-based application following SDLC/STLC processes.", points: ["Automated selected test scenarios using Java, Selenium, and TestNG.", "Performed test-result analysis to identify functional issues.", "Logged, tracked, prioritized, and documented defects using Jira.", "Maintained clear testing documentation and supported defect resolution."] },
];

const certifications = [
  { title: "NPTEL – Programming in Java (Elite)", issuer: "IIT Kharagpur | SWAYAM", detail: "2026" },
  { title: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", detail: "" },
  { title: "Artificial Intelligence & Machine Learning", issuer: "Microsoft Learn & FICE", detail: "20 Hours" },
  { title: "Business Communication & Professional Email Writing", issuer: "Certified", detail: "" },
];

const achievements = [
  "Secured 99% (Top 5%) in NPTEL Programming in Java certification conducted by IIT Kharagpur.",
  "Secured 2nd place in a hackathon; participated in technical events, group discussions and presentations.",
  "Selected for Cisco SHE Boost 6.0, a career development program conducted by Cisco.",
];

const education = [
  { course: "B.E. Computer Science & Engineering", school: "S J C Institute of Technology", period: "2023 – 2027", score: "CGPA: 9.46", primary: true },
  { course: "PUC", school: "BGS PU College", period: "2021 – 2023", score: "94%" },
  { course: "SSLC", school: "Adarsha Vidyalaya", period: "2020 – 2021", score: "98%" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name must be under 100 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  message: z.string().trim().min(10, "Please enter at least 10 characters.").max(1000, "Message must be under 1,000 characters."),
});

function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const stored = window.localStorage.getItem("divija-theme");
    const nextDark = stored ? stored === "dark" : true;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.25, 0.5] });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("divija-theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header dark={dark} onTheme={toggleTheme} active={active} open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ProfessionalLearning />
        <Certifications />
        <Achievements />
        <Education />
        <CareerInterests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header({ dark, onTheme, active, open, setOpen }: { dark: boolean; onTheme: () => void; active: string; open: boolean; setOpen: (value: boolean) => void }) {
  return <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
    <div className="section-shell flex h-16 items-center justify-between gap-4">
      <a href="#home" className="font-display text-lg font-bold text-foreground" aria-label="Divija N, home">DN<span className="text-primary">.</span></a>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
        {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={`rounded-md px-2.5 py-2 text-xs font-semibold transition-colors ${active === item.toLowerCase() ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item}</a>)}
      </nav>
      <div className="flex items-center gap-1.5">
        <IconLink href="https://github.com/Divija538" label="GitHub"><Github /></IconLink>
        <IconLink href="https://linkedin.com/in/divija-n" label="LinkedIn"><Linkedin /></IconLink>
        <ResumeButton compact />
        <Button variant="ghost" size="icon" onClick={onTheme} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>{dark ? <Sun /> : <Moon />}</Button>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</Button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border bg-background p-3 lg:hidden">
      <div className="section-shell grid grid-cols-2 gap-1">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className={`rounded-md px-3 py-2.5 text-sm font-medium ${active === item.toLowerCase() ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>{item}</a>)}</div>
    </nav>}
  </header>;
}

function Hero() {
  return <section id="home" className="relative flex min-h-[94svh] items-center overflow-hidden border-b border-border pt-24">
    <div className="grid-fade pointer-events-none absolute inset-0" />
    <div className="section-shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
      <div>
        <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-primary"><span className="h-px w-8 bg-primary" />BENGALURU, INDIA · GRADUATING 2027</p>
        <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">Hi, I&apos;m <span className="text-primary">Divija N</span></h1>
        <h2 className="mt-5 font-display text-xl font-semibold text-foreground sm:text-2xl">Software Engineer <span className="text-muted-foreground">| Graduate Technology</span></h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">Computer Science Engineering student with a strong foundation in software testing, quality engineering, software development, systems, networking, and programming. Interested in building reliable software, validating application quality, troubleshooting technical issues, and solving real-world engineering problems.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild><a href="#projects">View My Projects <ArrowRight /></a></Button>
          <ResumeButton />
          <Button size="lg" variant="outline" asChild><a href="#contact">Contact Me</a></Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <a className="inline-flex items-center gap-2 hover:text-primary" href="https://github.com/Divija538" target="_blank" rel="noreferrer"><Github className="size-4" />GitHub</a>
          <a className="inline-flex items-center gap-2 hover:text-primary" href="https://linkedin.com/in/divija-n" target="_blank" rel="noreferrer"><Linkedin className="size-4" />LinkedIn</a>
          <a className="inline-flex items-center gap-2 hover:text-primary" href="mailto:divijandivija21@gmail.com"><Mail className="size-4" />Email</a>
        </div>
      </div>
      <EngineeringVisual />
    </div>
    <a href="#about" aria-label="Scroll to About" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"><ArrowDown className="size-5" /></a>
  </section>;
}

function EngineeringVisual() {
  return <div className="float-panel relative mx-auto hidden w-full max-w-lg lg:block" aria-label="Abstract software testing workflow illustration">
    <div className="absolute -inset-8 bg-primary/5 blur-3xl" />
    <div className="relative overflow-hidden rounded-lg border border-border bg-code shadow-panel">
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-3"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-destructive" /><span className="size-2 rounded-full bg-chart-4" /><span className="size-2 rounded-full bg-chart-2" /></div><span className="font-mono text-[10px] text-muted-foreground">quality.pipeline</span></div>
      <div className="grid gap-4 p-5">
        <div className="font-mono text-xs leading-6 text-code-foreground"><span className="text-muted-foreground">01</span> &nbsp;<span className="text-chart-4">suite</span>(<span className="text-chart-2">&quot;reliability&quot;</span>) &#123;<br/><span className="text-muted-foreground">02</span> &nbsp;&nbsp;validate(requirements);<br/><span className="text-muted-foreground">03</span> &nbsp;&nbsp;execute(testCases);<br/><span className="text-muted-foreground">04</span> &nbsp;&nbsp;analyze(results);<br/><span className="text-muted-foreground">05</span> &#125;</div>
        <div className="grid grid-cols-3 gap-2">
          {[{ label: "PLAN", icon: Layers3 }, { label: "TEST", icon: TestTube2 }, { label: "VALIDATE", icon: Check }].map(({ label, icon: Icon }, index) => <div key={label} className="relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border border-border bg-surface/40 text-code-foreground"><Icon className="size-5 text-primary"/><span className="font-mono text-[10px]">{label}</span>{index < 2 && <ChevronRight className="absolute -right-3 z-10 size-4 text-primary" />}</div>)}
        </div>
        <div className="flex items-center justify-between rounded-md border border-primary/30 bg-primary/10 px-4 py-3"><span className="flex items-center gap-2 font-mono text-xs text-code-foreground"><span className="size-2 rounded-full bg-chart-2" />System checks complete</span><span className="font-mono text-xs text-primary">PASS</span></div>
      </div>
    </div>
  </div>;
}

function About() {
  const highlights = ["Software Testing", "Quality Engineering", "Programming", "Systems & Networking", "Database & SQL", "Performance Testing"];
  return <Section id="about" eyebrow="01 / PROFILE" title="About Me">
    <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <div className="space-y-5 text-base leading-8 text-muted-foreground"><p>I am a Computer Science Engineering student at S J C Institute of Technology, graduating in 2027. I have developed a strong foundation in software testing, quality assurance, programming, systems, networking, databases, and software development.</p><p>I am particularly interested in functional and system testing, test automation, defect management, debugging, performance validation, and building reliable software systems. I also enjoy working with Java, Python, C/C++, SQL, Linux, and networking concepts.</p></div>
      <div className="grid grid-cols-2 gap-3">{highlights.map((item, i) => <div key={item} className="flex min-h-24 flex-col justify-between rounded-md border border-border bg-card p-4 shadow-sm"><span className="font-mono text-xs text-primary">0{i + 1}</span><span className="text-sm font-semibold">{item}</span></div>)}</div>
    </div>
  </Section>;
}

function Skills() {
  return <Section id="skills" eyebrow="02 / CAPABILITIES" title="Technical Skills" className="bg-surface">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{skills.map(({ title, icon: Icon, items }, index) => <article key={title} className={`rounded-md border border-border bg-card p-5 shadow-sm ${index === 0 ? "lg:col-span-2" : ""}`}><div className="mb-5 flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md bg-accent text-primary"><Icon className="size-4" /></span><h3 className="font-display font-semibold">{title}</h3></div><div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded border border-border bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground">{item}</span>)}</div></article>)}</div>
  </Section>;
}

function Projects() {
  return <Section id="projects" eyebrow="03 / SELECTED WORK" title="Engineering Projects" intro="Systems, networking, and quality-engineering work grounded in practical implementation and validation.">
    <div className="grid gap-6">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
  </Section>;
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const Icon = project.icon;
  return <article className="group grid overflow-hidden rounded-lg border border-border bg-card shadow-panel lg:grid-cols-[.72fr_1.28fr]">
    <div className="relative flex min-h-64 flex-col justify-between overflow-hidden border-b border-border bg-code p-6 lg:border-b-0 lg:border-r">
      <div className="grid-fade absolute inset-0 opacity-50" /><span className="relative font-mono text-xs text-primary">PROJECT / 0{index + 1}</span><Icon className="relative size-16 text-code-foreground transition-transform duration-500 group-hover:-translate-y-1"/><div className="relative space-y-2">{["INITIALIZE", "EXECUTE", "VALIDATE"].map((step, i) => <div key={step} className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground"><span className={`size-1.5 rounded-full ${i < 2 || index === 2 ? "bg-primary" : "bg-border"}`} />{step}</div>)}</div>
    </div>
    <div className="p-6 sm:p-8"><p className="font-mono text-xs font-semibold text-primary">{project.type}</p><h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">{tech}</span>)}</div><div className="mt-7 flex flex-wrap gap-3"><ProjectDialog project={project} /><Button variant="outline" disabled title="Repository URL not provided"><Github />Repository not provided</Button></div></div>
  </article>;
}

function ProjectDialog({ project }: { project: typeof projects[number] }) {
  return <Dialog><DialogTrigger asChild><Button>Project Details <ArrowRight /></Button></DialogTrigger><DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl"><DialogHeader><p className="font-mono text-xs font-semibold text-primary">{project.type}</p><DialogTitle className="font-display text-2xl leading-tight">{project.title}</DialogTitle><DialogDescription className="pt-2 text-base leading-7">{project.description}</DialogDescription></DialogHeader><div className="mt-2"><h4 className="text-sm font-semibold">Key contributions</h4><ul className="mt-3 space-y-3">{project.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary"/>{point}</li>)}</ul><h4 className="mt-6 text-sm font-semibold">Technologies</h4><div className="mt-3 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded border border-border bg-muted px-2 py-1 text-xs text-muted-foreground">{tech}</span>)}</div></div></DialogContent></Dialog>;
}

function ProfessionalLearning() {
  return <Section id="learning" eyebrow="04 / CONTINUOUS LEARNING" title="Professional Learning" className="bg-surface">
    <div className="grid gap-6 border-l-2 border-primary pl-6 md:grid-cols-[.5fr_1.5fr] md:pl-8"><div><p className="font-display text-xl font-bold">Infosys Springboard</p><p className="mt-2 text-sm font-semibold text-primary">Trainee / Learner – Python Technology Stack</p></div><p className="leading-8 text-muted-foreground">Strengthened programming and problem-solving skills through Python, data structures, object-oriented programming, application-oriented exercises, debugging, validation, and structured testing/analysis.</p></div>
  </Section>;
}

function Certifications() {
  return <Section id="certifications" eyebrow="05 / CREDENTIALS" title="Certifications">
    <div className="grid gap-4 md:grid-cols-2">{certifications.map((item, index) => <article key={item.title} className="flex min-h-48 flex-col justify-between rounded-md border border-border bg-card p-6 shadow-sm"><div className="flex items-start justify-between"><span className="grid size-10 place-items-center rounded-md bg-accent text-primary"><Award className="size-5" /></span><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span></div><div className="mt-8"><h3 className="font-display text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.issuer}</p>{item.detail && <p className="mt-1 text-xs font-semibold text-primary">{item.detail}</p>}</div></article>)}</div>
  </Section>;
}

function Achievements() {
  return <Section id="achievements" eyebrow="06 / MILESTONES" title="Achievements" className="bg-surface">
    <div className="grid gap-4 lg:grid-cols-3">{achievements.map((item, index) => <article key={item} className="rounded-md border border-border bg-card p-6"><div className="mb-8 flex items-center justify-between"><Trophy className="size-6 text-primary"/><span className="font-display text-3xl font-bold text-border">0{index + 1}</span></div><p className="leading-7 text-muted-foreground">{item}</p></article>)}</div>
  </Section>;
}

function Education() {
  return <Section id="education" eyebrow="07 / ACADEMICS" title="Education">
    <div className="grid gap-5">{education.map((item) => <article key={item.course} className={`grid gap-5 rounded-md border p-6 md:grid-cols-[1fr_auto] md:items-center ${item.primary ? "border-primary/50 bg-accent/50 shadow-panel" : "border-border bg-card"}`}><div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><GraduationCap className="size-5" /></span><div><h3 className="font-display text-xl font-semibold">{item.course}</h3><p className="mt-1 text-sm text-muted-foreground">{item.school}</p><p className="mt-3 font-mono text-xs text-primary">{item.period}</p></div></div><div className="font-display text-xl font-bold md:text-right">{item.score}</div></article>)}</div>
  </Section>;
}

function CareerInterests() {
  const interests = ["Software Testing", "Quality Engineering", "Test Automation", "Software Development", "System Testing", "Performance Testing", "Systems & Networking"];
  return <Section id="interests" eyebrow="08 / DIRECTION" title="Career Interests" className="bg-surface"><p className="mb-8 max-w-2xl text-muted-foreground">Areas I am interested in exploring through graduate and entry-level technology opportunities.</p><div className="flex flex-wrap gap-3">{interests.map((item) => <div key={item} className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold"><span className="size-1.5 rounded-full bg-primary" />{item}</div>)}</div></Section>;
}

function Contact() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = contactSchema.safeParse({ name: form.get("name"), email: form.get("email"), message: form.get("message") });
    if (!result.success) {
      const next: { name?: string; email?: string; message?: string } = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if ((key === "name" || key === "email" || key === "message") && !next[key]) next[key] = issue.message;
      });
      setErrors(next); setStatus("error"); return;
    }
    setErrors({}); setStatus("success");
    const subject = encodeURIComponent(`Portfolio enquiry from ${result.data.name}`);
    const body = encodeURIComponent(`${result.data.message}\n\nFrom: ${result.data.name} (${result.data.email})`);
    window.location.href = `mailto:divijandivija21@gmail.com?subject=${subject}&body=${body}`;
  };
  return <Section id="contact" eyebrow="09 / CONTACT" title="Let's Connect">
    <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr]">
      <div><p className="max-w-lg text-lg leading-8 text-muted-foreground">Interested in discussing software engineering opportunities, projects, or collaboration? Feel free to reach out.</p><div className="mt-8 space-y-4"><ContactLink icon={Mail} label="Email" href="mailto:divijandivija21@gmail.com">divijandivija21@gmail.com</ContactLink><ContactLink icon={Phone} label="Phone" href="tel:+919900279972">+91 9900279972</ContactLink><ContactLink icon={MapPin} label="Location">Bengaluru, India</ContactLink><ContactLink icon={Linkedin} label="LinkedIn" href="https://linkedin.com/in/divija-n">linkedin.com/in/divija-n</ContactLink><ContactLink icon={Github} label="GitHub" href="https://github.com/Divija538">github.com/Divija538</ContactLink></div><div className="mt-8"><ResumeButton /></div></div>
      <form onSubmit={submit} noValidate className="rounded-lg border border-border bg-card p-6 shadow-panel" aria-label="Contact form"><div className="grid gap-5 sm:grid-cols-2"><Field label="Name" name="name" error={errors.name}><Input id="name" name="name" autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} /></Field><Field label="Email" name="email" error={errors.email}><Input id="email" name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} /></Field></div><div className="mt-5"><Field label="Message" name="message" error={errors.message}><Textarea id="message" name="message" rows={6} maxLength={1000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} /></Field></div><Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">Send Message <ArrowRight /></Button><div aria-live="polite" className="mt-4 text-sm">{status === "error" && <p className="text-destructive">Please review the highlighted fields.</p>}{status === "success" && <p className="flex items-center gap-2 text-primary"><Check className="size-4" />Your email application is opening with the message prepared.</p>}</div></form>
    </div>
  </Section>;
}

function Field({ label, name, error, children }: { label: string; name: string; error: string | undefined; children: ReactNode }) { return <div><label htmlFor={name} className="mb-2 block text-sm font-semibold">{label}</label>{children}{error && <p id={`${name}-error`} className="mt-1.5 text-xs text-destructive">{error}</p>}</div>; }

function ContactLink({ icon: Icon, label, href, children }: { icon: typeof Mail; label: string; href?: string; children: ReactNode }) {
  const body = <><span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent text-primary"><Icon className="size-4" /></span><span><span className="block text-xs text-muted-foreground">{label}</span><span className="text-sm font-medium break-all">{children}</span></span>{href?.startsWith("http") && <ExternalLink className="ml-auto size-3 text-muted-foreground" />}</>;
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-primary hover:text-primary">{body}</a> : <div className="flex items-center gap-3">{body}</div>;
}

function Section({ id, eyebrow, title, intro, className = "", children }: { id: string; eyebrow: string; title: string; intro?: string; className?: string; children: ReactNode }) {
  return <section id={id} className={`border-b border-border py-20 sm:py-28 ${className}`}><div className="section-shell"><div className="mb-10 sm:mb-14"><p className="font-mono text-xs font-semibold text-primary">{eyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h2>{intro && <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{intro}</p>}</div>{children}</div></section>;
}

function ResumeButton({ compact = false }: { compact?: boolean }) {
  if (!RESUME_URL) return <Button size={compact ? "sm" : "lg"} variant="secondary" disabled title="Resume file will be added here"><Download />{compact ? "Resume" : "Resume coming soon"}</Button>;
  return <Button size={compact ? "sm" : "lg"} variant="secondary" asChild><a href={RESUME_URL} download><Download />{compact ? "Resume" : "Download Resume"}</a></Button>;
}

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) { return <Button variant="ghost" size="icon" asChild><a href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a></Button>; }

function Footer() {
  return <footer className="bg-code py-10 text-code-foreground"><div className="section-shell flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"><div><p className="text-sm font-semibold">© 2026 Divija N. All rights reserved.</p><p className="mt-1 text-xs text-muted-foreground">Software Engineer | Computer Science Engineering</p></div><div className="flex gap-2"><IconLink href="https://linkedin.com/in/divija-n" label="LinkedIn"><Linkedin /></IconLink><IconLink href="https://github.com/Divija538" label="GitHub"><Github /></IconLink><Button variant="ghost" size="icon" asChild><a href="mailto:divijandivija21@gmail.com" aria-label="Email Divija"><Mail /></a></Button></div></div></footer>;
}
