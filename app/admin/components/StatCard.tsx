interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

export default function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-6 hover:border-zinc-700/60 transition-all duration-300">
      <p className="text-zinc-400 text-sm font-light mb-1">{label}</p>
      <p className="text-3xl font-light text-white tracking-tight">{value}</p>
      {subtitle && (
        <p className="text-zinc-500 text-xs mt-1">{subtitle}</p>
      )}
    </div>
  );
}
