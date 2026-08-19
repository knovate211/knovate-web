export default function StatRow({ stats }: { stats: { n: string; l: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.l} className="text-center">
          <div className="font-serif text-3xl font-bold text-gold-dark md:text-4xl">{s.n}</div>
          <div className="mt-1 text-sm text-muted">{s.l}</div>
        </div>
      ))}
    </div>
  );
}
