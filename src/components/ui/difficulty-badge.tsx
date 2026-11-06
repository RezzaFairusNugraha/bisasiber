import type { Difficulty } from "@/lib/mock-data";

const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bars: number }
> = {
  easy: { label: "Mudah", color: "#26890C", bars: 1 },
  intermediate: { label: "Menengah", color: "#FF8A00", bars: 2 },
  hard: { label: "Sulit", color: "#EB0037", bars: 3 },
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  const { label, color, bars } = difficultyConfig[level];

  return (
    <div
      className="inline-flex items-center gap-1.5 text-sm font-medium leading-[18px]"
      style={{ color }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={color}
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((i) => {
          const h = [2.8, 5.6, 8.4, 11.2][i] ?? 2.8;
          const active = i <= bars;
          return (
            <rect
              key={i}
              x={0.7 + i * 3.5}
              y={12.6 - h}
              width={2.1}
              height={h}
              rx={1}
              opacity={active ? 1 : 0.35}
            />
          );
        })}
      </svg>
      <span>{label}</span>
    </div>
  );
}
