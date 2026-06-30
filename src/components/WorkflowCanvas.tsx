import { motion } from "framer-motion";

type Node = { id: string; x: number; y: number; label: string; icon?: string };

const nodes: Node[] = [
  { id: "trigger", x: 60, y: 140, label: "Lead", icon: "⚡" },
  { id: "apollo", x: 230, y: 60, label: "Apollo", icon: "🎯" },
  { id: "ai", x: 230, y: 220, label: "AI Agent", icon: "🧠" },
  { id: "crm", x: 420, y: 60, label: "CRM", icon: "📇" },
  { id: "email", x: 420, y: 220, label: "Email", icon: "✉️" },
  { id: "out", x: 600, y: 140, label: "Booked", icon: "📅" },
];

const edges: Array<[string, string]> = [
  ["trigger", "apollo"],
  ["trigger", "ai"],
  ["apollo", "crm"],
  ["ai", "email"],
  ["crm", "out"],
  ["email", "out"],
];

export function WorkflowCanvas({ className = "" }: { className?: string }) {
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <svg
      viewBox="0 0 680 320"
      className={className}
      role="img"
      aria-label="AI workflow automation diagram"
    >
      <defs>
        <linearGradient id="edge" x1="0" x2="1">
          <stop offset="0%" stopColor="#0077B6" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map(([a, b], i) => {
        const A = map[a]!;
        const B = map[b]!;
        const d = `M ${A.x} ${A.y} C ${A.x + 80} ${A.y}, ${B.x - 80} ${B.y}, ${B.x} ${B.y}`;
        return (
          <g key={i}>
            <path d={d} stroke="url(#edge)" strokeWidth="1.5" fill="none" opacity="0.45" />
            <path
              d={d}
              stroke="#00D4FF"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 10"
              className="animate-flow"
              filter="url(#glow)"
            />
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: "spring" }}
        >
          <circle cx={n.x} cy={n.y} r="34" fill="#02031E" stroke="#00D4FF" strokeWidth="1.2" />
          <circle
            cx={n.x}
            cy={n.y}
            r="34"
            fill="none"
            stroke="#00D4FF"
            strokeOpacity="0.4"
            strokeWidth="6"
            className="animate-pulse-node"
          />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="18" fill="#CAF0F8">
            {n.icon}
          </text>
          <text
            x={n.x}
            y={n.y + 56}
            textAnchor="middle"
            fontSize="11"
            fill="#8aa3bd"
            fontFamily="Inter"
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
