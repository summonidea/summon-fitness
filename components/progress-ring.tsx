export const ProgressRing = ({
  value,
  label,
  size = 120
}: {
  value: number;
  label: string;
  size?: number;
}) => {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (Math.min(100, value) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="rgba(148,163,184,0.18)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={stroke}
          className="text-accent transition-all"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-ink text-[22px] font-semibold"
        >
          {value}%
        </text>
      </svg>
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
};
