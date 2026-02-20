const statusStyles: Record<string, string> = {
  available: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  sold: "bg-red-500/10 text-red-400 border-red-500/20",
  auction: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  call: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  draft: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.draft;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}
    >
      {status}
    </span>
  );
}
