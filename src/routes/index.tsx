import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Phone,
  Workflow,
  Sparkles,
  Database,
  Calendar,
  Mail,
  Zap,
  ChevronDown,
  CheckCircle2,
  Code2,
  Headphones,
  LineChart,
  Plug,
  Brain,
  Layers,
  Building2,
  Github,
  Linkedin,
  Twitter,
  Star,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/ParticleField";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import hero from "@/assets/hero-ai.jpg";
import brain from "@/assets/ai-brain.jpg";
import voice from "@/assets/voice-ai.jpg";
import workflowImg from "@/assets/workflow.jpg";
import avatar from "@/assets/avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Ahmad Tahir — AI Automation Engineer" },
      {
        name: "description",
        content:
          "I build AI employees that work 24/7. AI Agents, Voice AI, Workflow Automation & No-Code systems that scale businesses without hiring.",
      },
      { property: "og:title", content: "Muhammad Ahmad Tahir — AI Automation Engineer" },
      {
        property: "og:description",
        content: "AI Agents, Voice AI, and Workflow Automation built for 24/7 scale.",
      },
    ],
  }),
  component: Index,
});

/* ---------- helpers ---------- */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div {...fadeUp} className="mx-auto mb-14 max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent">
        <Sparkles size={12} /> {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl font-bold sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

function TypingRotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i];
    const speed = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del && text === word) {
        setTimeout(() => setDel(true), 1400);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setI((i + 1) % words.length);
        return;
      }
      setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className="neon-text">
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-1 animate-pulse bg-primary" />
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

/* ---------- data ---------- */
const navLinks = [
  ["About", "about"],
  ["Services", "services"],
  ["Projects", "projects"],
  ["Framework", "framework"],
  ["Pricing", "pricing"],
  ["Contact", "contact"],
];

const stack = [
  "n8n", "Make", "Zapier", "OpenAI", "Claude", "Vapi", "ElevenLabs", "Retell",
  "Supabase", "Airtable", "HubSpot", "Apollo", "GoHighLevel", "Twilio",
  "LangChain", "Pinecone", "Notion", "Slack", "Stripe", "Calendly",
];

const services = [
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Custom GPT agents that handle support, sales, research, and operations end-to-end.",
    tags: ["GPT-5", "LangChain", "RAG"],
  },
  {
    icon: Phone,
    title: "Voice AI",
    desc: "Inbound & outbound voice agents that book, qualify, and close — indistinguishable from humans.",
    tags: ["Vapi", "Retell", "ElevenLabs"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "n8n & Make pipelines that move data, trigger actions, and replace 40+ hrs of weekly ops.",
    tags: ["n8n", "Make", "Zapier"],
  },
  {
    icon: Database,
    title: "CRM & Lead Systems",
    desc: "Apollo → AI → CRM pipelines with auto-enrichment, scoring, and personalized outreach.",
    tags: ["Apollo", "HubSpot", "GHL"],
  },
  {
    icon: Brain,
    title: "RAG Knowledge Bots",
    desc: "Private chatbots trained on your docs, SOPs, and product data with vector search.",
    tags: ["Pinecone", "Supabase", "OpenAI"],
  },
  {
    icon: Plug,
    title: "API Integrations",
    desc: "Custom webhooks, no-code glue, and bespoke endpoints that connect anything to anything.",
    tags: ["REST", "Webhooks", "TypeScript"],
  },
];

const projects = [
  {
    title: "Real-Estate Voice Receptionist",
    industry: "Real Estate",
    problem: "20% of after-hours leads were lost to voicemail.",
    solution: "Vapi voice agent that qualifies, schedules tours, and pushes to CRM in real time.",
    stack: ["Vapi", "n8n", "GHL", "Twilio"],
    impact: ["+38% booked tours", "0 missed calls", "$42k/mo recovered"],
    icon: Phone,
  },
  {
    title: "Restaurant Ordering Agent",
    industry: "Restaurants",
    problem: "Staff overwhelmed by phone orders during peak hours.",
    solution: "Voice + WhatsApp agent that takes the order, confirms, and pushes to POS.",
    stack: ["Vapi", "OpenAI", "Square", "WhatsApp"],
    impact: ["3.2x order capacity", "−65% order errors", "+22% AOV"],
    icon: Bot,
  },
  {
    title: "B2B Outbound Engine",
    industry: "SaaS",
    problem: "SDR team couldn't personalize at scale.",
    solution: "Apollo scraping → AI research → personalized email sequencer with reply routing.",
    stack: ["Apollo", "OpenAI", "n8n", "HubSpot"],
    impact: ["12x sent volume", "3.4x reply rate", "47 meetings/mo"],
    icon: Workflow,
  },
  {
    title: "Healthcare Intake Automation",
    industry: "Healthcare",
    problem: "Manual patient intake costing 30+ hours weekly.",
    solution: "Form → AI summarizer → EHR write-back with HIPAA-aware redaction.",
    stack: ["Make", "OpenAI", "Supabase", "Twilio"],
    impact: ["−92% intake time", "100% compliance", "$8k/mo saved"],
    icon: Brain,
  },
  {
    title: "Invoice OCR → ERP",
    industry: "E-commerce",
    problem: "Accounts team manually keying 500+ invoices/mo.",
    solution: "OCR → AI categorizer → ERP push with anomaly detection.",
    stack: ["n8n", "GPT-5", "QuickBooks"],
    impact: ["96% accuracy", "−85% processing time", "ROI in 23 days"],
    icon: Database,
  },
  {
    title: "Recruitment AI Pipeline",
    industry: "Agencies",
    problem: "Recruiters drowning in low-quality CVs.",
    solution: "CV parser + AI matcher + auto-scheduler with candidate scoring.",
    stack: ["LangChain", "Pinecone", "Calendly", "n8n"],
    impact: ["10x faster screening", "+58% quality of hire", "4hr → 12min"],
    icon: Layers,
  },
];

const alpha = [
  { letter: "A", word: "Audit", desc: "Map every manual task, bottleneck, and tool in your stack." },
  { letter: "L", word: "Layer", desc: "Design the AI + automation architecture for your workflows." },
  { letter: "P", word: "Prototype", desc: "Build a working agent or pipeline in 7 days, not 7 weeks." },
  { letter: "H", word: "Harden", desc: "Add guardrails, monitoring, fallbacks, and human-in-the-loop." },
  { letter: "A", word: "Amplify", desc: "Scale the system, document SOPs, and train your team to own it." },
];

const arsenal = [
  { cat: "AI / LLM", items: ["GPT-5", "Claude 4.5", "Gemini 2.5", "Llama 3", "Mistral"] },
  { cat: "Voice AI", items: ["Vapi", "Retell", "ElevenLabs", "Deepgram", "Twilio"] },
  { cat: "Automation", items: ["n8n", "Make", "Zapier", "Pipedream", "Activepieces"] },
  { cat: "Data", items: ["Supabase", "Postgres", "Pinecone", "Qdrant", "Airtable"] },
  { cat: "CRM / Sales", items: ["HubSpot", "GoHighLevel", "Apollo", "Instantly", "Smartlead"] },
  { cat: "Dev", items: ["TypeScript", "Next.js", "Python", "LangChain", "FastAPI"] },
];

const experience = [
  { year: "2024 — Now", role: "AI Automation Engineer", org: "Independent / Clients across 4 continents" },
  { year: "2023", role: "Workflow Automation Specialist", org: "B2B SaaS & agencies" },
  { year: "2022", role: "Full-Stack Developer", org: "Startups & e-commerce" },
];

const pricing = [
  {
    name: "Sprint",
    price: "$1.5k",
    desc: "One automation, end-to-end, in 7 days.",
    features: ["Single workflow", "1 integration suite", "Loom handover", "14-day support"],
  },
  {
    name: "Build",
    price: "$5k+",
    desc: "Multi-step AI system tailored to your ops.",
    features: ["Up to 5 workflows", "AI agent + RAG", "Custom dashboard", "30-day support"],
    featured: true,
  },
  {
    name: "Retainer",
    price: "$3k/mo",
    desc: "Ongoing automation as a service.",
    features: ["Unlimited iterations", "Voice + agents", "Priority Slack", "Monthly strategy"],
  },
];

const testimonials = [
  { name: "Sarah K.", role: "Founder, RealtyHub", quote: "Ahmad's voice agent recovered $40k of missed leads in the first month. Surreal." },
  { name: "Marco D.", role: "CEO, ScaleSDR", quote: "Replaced 3 SDRs with one AI workflow. Reply rates 3x what we had before." },
  { name: "Priya R.", role: "COO, ClinicWell", quote: "Intake automation freed two FTEs. The system is rock-solid." },
  { name: "James L.", role: "Owner, Brick Pizza", quote: "Phone orders went from chaos to autopilot. Our staff finally cook again." },
];

const faqs = [
  { q: "How long does a typical build take?", a: "Sprint projects ship in 7 days. Larger systems 2-4 weeks. We move fast." },
  { q: "Do I need to know how AI works?", a: "Not at all. I translate business problems into AI systems — you stay focused on customers." },
  { q: "What if the AI makes mistakes?", a: "Every system ships with guardrails, monitoring, fallbacks, and a human-in-the-loop where it matters." },
  { q: "Do you work with my existing tools?", a: "Yes. I integrate with 500+ tools out of the box and build custom connectors for the rest." },
  { q: "Will I own the system?", a: "100%. Full source code, documented SOPs, recorded walkthroughs. No vendor lock-in." },
];

/* ---------- page ---------- */
function Index() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(0,212,255,0.08), transparent 40%)`,
        }}
      />

      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-strong border-b border-border" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#top" className="flex items-center gap-2 font-display text-base font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0077B6] text-[#02031E]">
              <Zap size={16} />
            </span>
            <span>
              Ahmad<span className="text-primary">.ai</span>
            </span>
          </a>
          <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navLinks.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`} className="transition hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.7)]"
          >
            Book Call <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative isolate pt-32 pb-24">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10">
          <div className="grid-bg absolute inset-0" />
          <ParticleField className="absolute inset-0 opacity-70" />
          <div className="absolute inset-x-0 top-0 mx-auto h-[600px] w-[800px] -translate-y-1/3 rounded-full bg-[#0077B6] opacity-25 blur-[160px]" />
        </motion.div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              Available for 2 new builds this month
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              I build <TypingRotator words={["AI Agents", "Voice Automation", "Workflow Engines", "Lead Systems", "AI Employees"]} />
              <br />
              that work <span className="neon-text">24/7</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I design AI Agents, Voice AI systems, and Workflow Automations that scale
              businesses <em className="not-italic text-foreground">without hiring</em>. Less ops.
              More revenue.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,212,255,0.7)] transition hover:scale-[1.02]"
              >
                Book Discovery Call
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-6 py-3 font-medium backdrop-blur-md transition hover:border-primary hover:bg-white/10"
              >
                View Projects
              </a>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {[
                { n: 60, s: "+", l: "Systems shipped" },
                { n: 24, s: "/7", l: "AI on duty" },
                { n: 12, s: "x", l: "Avg ROI" },
              ].map((s) => (
                <div key={s.l} className="glass p-4 text-center">
                  <div className="font-display text-3xl font-bold text-primary">
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-strong overflow-hidden glow">
              <img
                src={hero}
                alt="AI control room with workflow automation dashboards"
                width={1536}
                height={1024}
                className="h-auto w-full"
              />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="glass-strong absolute -left-6 -bottom-6 flex items-center gap-3 px-4 py-3"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/20 text-primary">
                <Bot size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Agent running</div>
                <div className="text-sm font-semibold">Lead qualifier · 92% accuracy</div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
              className="glass-strong absolute -right-4 top-6 flex items-center gap-2 px-3 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs">14 workflows live</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <motion.div {...fadeUp} className="relative">
            <div className="neon-border overflow-hidden rounded-3xl">
              <img src={brain} alt="AI brain neural network" width={1024} height={1024} loading="lazy" className="h-auto w-full" />
            </div>
            <div className="glass absolute -bottom-6 -right-6 max-w-[220px] p-4">
              <div className="text-xs text-muted-foreground">Currently building in</div>
              <div className="mt-1 font-semibold">Lahore, Pakistan 🇵🇰</div>
              <div className="mt-1 text-xs text-accent">Working with clients in US, UAE, UK, AU</div>
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <span className="text-xs uppercase tracking-[0.18em] text-accent">About</span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Hi, I'm Ahmad — I turn <span className="neon-text">manual ops</span> into AI employees.
            </h2>
            <p className="mt-5 text-muted-foreground">
              I'm an AI Automation Engineer who's spent the last two years obsessing over
              one question: <em className="not-italic text-foreground">what if your business never slept?</em>
              I build the AI agents, voice systems, and workflow pipelines that answer it —
              for startups, agencies, and enterprises across healthcare, real estate, e-commerce,
              and SaaS.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "Shipped 60+ production AI & automation systems",
                "ROI-obsessed — every build justifies itself in 30 days",
                "End-to-end: I architect, build, deploy, monitor",
                "No black boxes — you own the code, the SOPs, the data",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="relative border-y border-border bg-white/[0.02] py-10">
        <div className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Built with the best of modern AI & automation
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 px-6">
            {[...stack, ...stack].map((s, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2 text-lg font-medium text-muted-foreground"
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary/30 to-secondary/30 text-xs text-primary">
                  ◇
                </span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Why me"
            title={<>Most freelancers ship features. <span className="neon-text">I ship systems.</span></>}
            subtitle="Production-grade AI automation that survives Monday morning."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Zap, t: "Sprint speed", d: "First working system in 7 days. No long discovery decks." },
              { icon: Brain, t: "Strategic, not tactical", d: "I solve the business problem behind the request." },
              { icon: LineChart, t: "ROI from day 1", d: "Every build comes with measurable impact targets." },
              { icon: Code2, t: "Code you own", d: "Fully documented, exportable, vendor-lock-in-free." },
              { icon: Headphones, t: "White-glove handover", d: "Loom walkthroughs, SOPs, and live training included." },
              { icon: CheckCircle2, t: "Battle-tested guardrails", d: "Monitoring, fallbacks, and HITL on every system." },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass group p-6 transition hover:-translate-y-1 hover:border-primary/60"
              >
                <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Services"
            title={<>A complete <span className="neon-text">AI workforce</span> for your business.</>}
            subtitle="Pick a system. I'll build the digital employees that run it."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass relative overflow-hidden p-6 transition hover:shadow-[0_0_60px_-20px_rgba(0,212,255,0.5)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition group-hover:bg-primary/40" />
                <s.icon size={28} className="text-primary" />
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-white/5 px-2 py-0.5 text-[11px] text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Projects"
            title={<>Shipped, scaled, <span className="neon-text">cashflowing</span>.</>}
            subtitle="A handful of recent AI systems running in production."
          />

          <motion.div {...fadeUp} className="glass-strong mb-10 overflow-hidden p-6 sm:p-10">
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Live workflow preview
            </div>
            <WorkflowCanvas className="h-auto w-full" />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass group relative overflow-hidden p-6 transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-border bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-wider text-accent">
                    {p.industry}
                  </span>
                  <p.icon size={20} className="text-primary opacity-60 transition group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <span className="text-accent">Problem · </span>
                    <span className="text-muted-foreground">{p.problem}</span>
                  </div>
                  <div>
                    <span className="text-accent">Solution · </span>
                    <span className="text-muted-foreground">{p.solution}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
                  {p.impact.map((m) => (
                    <div key={m} className="text-center">
                      <div className="text-sm font-semibold text-primary">{m.split(" ")[0]}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {m.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES (highlight) */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Case study"
            title={<>From <span className="neon-text">$0 to $42k/mo</span> recovered in 30 days.</>}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div {...fadeUp} className="glass-strong overflow-hidden">
              <img src={voice} alt="Voice AI dashboard" width={1024} height={768} loading="lazy" className="h-auto w-full" />
            </motion.div>
            <motion.div {...fadeUp} className="flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold">RealtyHub · Voice receptionist</h3>
              <p className="mt-3 text-muted-foreground">
                A 12-agent real estate brokerage was losing nearly $50k/mo in after-hours leads.
                We deployed a Vapi voice agent integrated with their GHL CRM that qualifies callers,
                schedules tours, and routes hot leads to humans — in under 12 seconds per call.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-4">
                {[
                  ["100%", "Calls answered"],
                  ["38%", "Booking lift"],
                  ["12s", "Avg pickup"],
                ].map(([n, l]) => (
                  <div key={l} className="glass p-4 text-center">
                    <dt className="font-display text-2xl font-bold text-primary">{n}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ALPHA FRAMEWORK */}
      <section id="framework" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Methodology"
            title={<>The <span className="neon-text">A.L.P.H.A</span> framework</>}
            subtitle="A repeatable system for shipping AI that actually pays for itself."
          />
          <div className="grid gap-4 md:grid-cols-5">
            {alpha.map((s, i) => (
              <motion.div
                key={s.word}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass relative p-6 text-center"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-display text-2xl font-bold text-primary-foreground">
                  {s.letter}
                </div>
                <div className="mt-4 font-display text-lg font-semibold">{s.word}</div>
                <p className="mt-2 text-xs text-muted-foreground">{s.desc}</p>
                <div className="mt-4 text-[10px] text-muted-foreground">Step {i + 1} / 5</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL ARSENAL */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Arsenal"
            title={<>The full <span className="neon-text">technical stack</span></>}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {arsenal.map((a, i) => (
              <motion.div
                key={a.cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass p-6"
              >
                <div className="text-xs uppercase tracking-widest text-accent">{a.cat}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-lg border border-border bg-white/5 px-3 py-1.5 text-sm transition hover:border-primary hover:text-primary"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Timeline" title={<>Experience</>} />
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent md:left-1/2" />
            {experience.map((e, i) => (
              <motion.div
                key={e.year}
                initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative mb-10 grid grid-cols-[40px_1fr] gap-4 md:grid-cols-2 md:gap-8 ${
                  i % 2 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="md:[direction:ltr]">
                  <div className="absolute left-4 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-primary glow md:left-1/2" />
                </div>
                <div className="glass p-6 md:[direction:ltr]">
                  <div className="text-xs uppercase tracking-widest text-accent">{e.year}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{e.role}</div>
                  <div className="text-sm text-muted-foreground">{e.org}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Pricing"
            title={<>Simple. <span className="neon-text">ROI-positive.</span></>}
            subtitle="Pick the engagement that fits. All projects ship working systems, not slides."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {pricing.map((p) => (
              <motion.div
                {...fadeUp}
                key={p.name}
                className={`relative p-8 ${
                  p.featured ? "neon-border glow scale-[1.02]" : "glass"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Most popular
                  </div>
                )}
                <div className="font-display text-xl font-semibold">{p.name}</div>
                <div className="mt-3 font-display text-5xl font-extrabold">{p.price}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
                    p.featured
                      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-5px_rgba(0,212,255,0.7)]"
                      : "border border-border bg-white/5 hover:border-primary"
                  }`}
                >
                  Get started <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Testimonials" title={<>What clients say</>} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass p-6"
              >
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground/90">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="FAQ" title={<>Questions, answered.</>} />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="glass overflow-hidden border-0 px-5">
                <AccordionTrigger className="text-left font-display text-base hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass-strong relative overflow-hidden p-8 sm:p-14">
            <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/40 blur-[120px]" />
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-accent">Let's build</span>
                <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                  Ready to <span className="neon-text">hire your AI team</span>?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Book a free 30-minute discovery call. I'll audit your ops, sketch the system,
                  and tell you exactly what's automatable — no pitch, no pressure.
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <a href="mailto:ahmad@ahmad.ai" className="flex items-center gap-3 hover:text-primary">
                    <Mail size={16} /> ahmad@ahmad.ai
                  </a>
                  <a href="#" className="flex items-center gap-3 hover:text-primary">
                    <Calendar size={16} /> Calendly · cal.com/ahmad
                  </a>
                  <div className="flex items-center gap-3">
                    <Building2 size={16} /> Lahore · Working globally
                  </div>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="glass space-y-3 p-6"
              >
                <div className="flex items-center gap-3">
                  <img src={avatar} alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
                  <div>
                    <div className="text-sm font-semibold">Muhammad Ahmad Tahir</div>
                    <div className="text-xs text-accent">Replies within 2 hours</div>
                  </div>
                </div>
                <input
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <input
                  placeholder="Work email"
                  className="w-full rounded-lg border border-border bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <textarea
                  rows={4}
                  placeholder="What's the ops headache you want to automate?"
                  className="w-full rounded-lg border border-border bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send message <ArrowRight size={14} className="ml-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-secondary text-[#02031E]">
              <Zap size={13} />
            </span>
            <span className="font-display font-bold">
              Ahmad<span className="text-primary">.ai</span>
            </span>
            <span className="ml-3 text-muted-foreground">© {new Date().getFullYear()} — AI Automation Engineer</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin size={16} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter size={16} /></a>
            <a href="#top" className="ml-2 inline-flex items-center gap-1 text-xs hover:text-foreground">
              Back to top <ChevronDown size={12} className="rotate-180" />
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppWidget />
      {/* unused import guard */}
      <img src={workflowImg} alt="" className="hidden" aria-hidden />
    </div>
  );
}
