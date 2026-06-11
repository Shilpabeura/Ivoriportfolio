import { DUBAI_ZONES, TIER_META, type Zone, type Tier } from "@/lib/dubaiZones";

interface Props {
  selectedId: number | null;
  hoveredId: number | null;
  activeTier: Tier | "all";
  onSelect: (id: number) => void;
  onHover: (id: number | null) => void;
}

const DubaiMapSVG = ({ selectedId, hoveredId, activeTier, onSelect, onHover }: Props) => {
  return (
    <svg
      viewBox="0 0 1000 720"
      className="w-full h-auto"
      role="img"
      aria-label="Interactive map of Dubai investment zones"
    >
      <defs>
        <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 25% 96%)" />
          <stop offset="100%" stopColor="hsl(220 18% 92%)" />
        </linearGradient>
        <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(40 25% 97%)" />
          <stop offset="100%" stopColor="hsl(40 18% 93%)" />
        </linearGradient>
      </defs>

      {/* Sea */}
      <rect x="0" y="0" width="1000" height="720" fill="url(#seaGradient)" />

      {/* Land mass */}
      <path
        d="M 1000,0 L 1000,720 L 0,720 L 0,560 Q 200,520 360,420 Q 520,330 660,230 Q 800,140 1000,80 Z"
        fill="url(#landGradient)"
      />

      {/* Coastline accent */}
      <path
        d="M 0,560 Q 200,520 360,420 Q 520,330 660,230 Q 800,140 1000,80"
        fill="none"
        stroke="hsl(var(--gold) / 0.25)"
        strokeWidth="1.5"
      />

      {/* Sheikh Zayed Road */}
      <path
        d="M 230,400 Q 450,310 700,220"
        fill="none"
        stroke="hsl(var(--muted-foreground) / 0.25)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text x="500" y="295" fontSize="10" fill="hsl(var(--muted-foreground))" fontFamily="var(--font-body)" letterSpacing="1.5">
        SHEIKH ZAYED RD
      </text>

      {/* Compass */}
      <g transform="translate(60,60)" opacity="0.5">
        <circle r="18" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" />
        <path d="M 0,-14 L 4,0 L 0,14 L -4,0 Z" fill="hsl(var(--gold))" />
        <text x="0" y="-22" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="var(--font-body)">N</text>
      </g>

      {/* Minimal geographic labels */}
      <text x="120" y="200" fontSize="9" fill="hsl(var(--muted-foreground) / 0.7)" fontFamily="var(--font-body)" letterSpacing="1.5">
        ARABIAN GULF
      </text>

      {/* Zones */}
      {DUBAI_ZONES.map((zone) => {
        const isSelected = selectedId === zone.id;
        const isHovered = hoveredId === zone.id;
        const isActive = isSelected || isHovered;
        const dimmed = activeTier !== "all" && zone.tier !== activeTier;
        const tierColor = `hsl(var(--tier-${zone.tier}))`;

        return (
          <g
            key={zone.id}
            onMouseEnter={() => onHover(zone.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(zone.id)}
            onFocus={() => onHover(zone.id)}
            onBlur={() => onHover(null)}
            tabIndex={0}
            role="button"
            aria-label={`${zone.name}, Tier ${zone.tier}`}
            className="cursor-pointer outline-none transition-opacity duration-300 focus-visible:opacity-100"
            style={{ opacity: dimmed ? 0.25 : 1 }}
          >
            <ZonePolygon zone={zone} color={tierColor} active={isActive} selected={isSelected} />
          </g>
        );
      })}
    </svg>
  );
};

const ZonePolygon = ({
  zone,
  color,
  active,
  selected,
}: {
  zone: Zone;
  color: string;
  active: boolean;
  selected: boolean;
}) => {
  return (
    <g style={{ transition: "transform 0.3s ease", transformOrigin: `${zone.badge.x}px ${zone.badge.y}px`, transform: active ? "scale(1.04)" : "scale(1)" }}>
      <polygon
        points={zone.points}
        fill={color}
        fillOpacity={active ? 0.55 : 0.32}
        stroke={color}
        strokeWidth={active ? 2 : 1}
        strokeOpacity={active ? 1 : 0.6}
        style={{ transition: "all 0.3s ease" }}
      />
      {/* Badge */}
      <circle
        cx={zone.badge.x}
        cy={zone.badge.y}
        r={selected ? 18 : 15}
        fill="white"
        stroke={color}
        strokeWidth={selected ? 2.5 : 1.5}
        style={{ transition: "all 0.3s ease" }}
      />
      <text
        x={zone.badge.x}
        y={zone.badge.y + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill={color}
        fontFamily="var(--font-body)"
        style={{ pointerEvents: "none" }}
      >
        {zone.id}
      </text>
      {active && (
        <text
          x={zone.badge.x}
          y={zone.badge.y - 24}
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill="hsl(var(--foreground))"
          fontFamily="var(--font-body)"
          style={{ pointerEvents: "none" }}
        >
          {zone.name}
        </text>
      )}
    </g>
  );
};

export default DubaiMapSVG;
