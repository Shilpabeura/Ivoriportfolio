/**
 * Stylised geographic map of Dubai, drawn on-brand.
 * Coastline, Palm Jumeirah, The World, major expressways (E11/E311/E611/E66),
 * DXB & Al Maktoum (DWC) airports, neighbour labels and a compass.
 * Pure SVG so it inherits the site's white/grey + gold design language.
 */
const DubaiMapSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 1000 650"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
        </pattern>
        <linearGradient id="sea-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(220 18% 95%)" />
          <stop offset="100%" stopColor="hsl(220 12% 92%)" />
        </linearGradient>
        <linearGradient id="land-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(40 30% 99%)" />
          <stop offset="100%" stopColor="hsl(36 22% 96%)" />
        </linearGradient>
      </defs>

      {/* Sea */}
      <rect width="1000" height="650" fill="url(#sea-grad)" />
      <rect width="1000" height="650" fill="url(#map-grid)" />

      {/* Landmass — Dubai (coast runs NE→SW) */}
      <path
        d="
          M 1000 90
          L 1000 650
          L 0 650
          L 0 220
          C 80 200, 150 180, 230 200
          C 290 215, 320 240, 360 250
          C 400 260, 440 250, 490 280
          C 560 320, 620 360, 690 410
          C 760 460, 830 500, 900 540
          C 940 560, 980 575, 1000 580
          Z
        "
        fill="url(#land-grad)"
        stroke="hsl(var(--gold) / 0.45)"
        strokeWidth="1.25"
      />

      {/* Palm Jumeirah — stylised */}
      <g stroke="hsl(var(--gold) / 0.55)" strokeWidth="1" fill="hsl(40 30% 99%)">
        <circle cx="305" cy="230" r="6" />
        <path d="M305 195 L305 265 M270 230 L340 230 M283 207 L327 253 M283 253 L327 207"
          strokeWidth="0.9" fill="none" />
        <circle cx="305" cy="195" r="2.5" fill="hsl(40 30% 99%)" />
        <circle cx="305" cy="265" r="2.5" />
        <circle cx="270" cy="230" r="2.5" />
        <circle cx="340" cy="230" r="2.5" />
        <path d="M260 215 a 50 50 0 0 1 90 0" fill="none" strokeDasharray="2 3" opacity="0.7" />
      </g>

      {/* The World islands hint */}
      <g fill="hsl(40 30% 99%)" stroke="hsl(var(--gold) / 0.35)" strokeWidth="0.6">
        {[
          [380, 175], [392, 168], [402, 178], [388, 184], [414, 172],
          [398, 190], [420, 185], [376, 188], [410, 195],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.2" />
        ))}
      </g>

      {/* Expressways */}
      <g fill="none" stroke="hsl(var(--foreground) / 0.35)">
        {/* E11 Sheikh Zayed Road — coast-parallel */}
        <path d="M 90 235 C 220 275, 380 320, 540 380 S 880 540, 990 600"
          strokeWidth="2.2" />
        {/* E311 Emirates Road */}
        <path d="M 180 195 C 320 240, 500 320, 680 410 S 920 530, 1000 565"
          strokeWidth="1.6" opacity="0.7" strokeDasharray="6 4" />
        {/* E611 Emirates Bypass */}
        <path d="M 300 175 C 460 230, 640 320, 820 420 S 970 500, 1000 515"
          strokeWidth="1.4" opacity="0.55" strokeDasharray="6 4" />
        {/* E66 Al Ain Road (inland diagonal) */}
        <path d="M 540 360 L 1000 250" strokeWidth="1.4" opacity="0.55" strokeDasharray="6 4" />
        {/* E44 Dubai–Hatta */}
        <path d="M 600 370 L 1000 320" strokeWidth="1.1" opacity="0.4" strokeDasharray="3 4" />
      </g>

      {/* Road shields */}
      <g fontFamily="ui-sans-serif, system-ui" fontSize="9" fill="hsl(var(--muted-foreground))">
        <g transform="translate(420 335)">
          <rect x="-12" y="-7" width="24" height="13" rx="2" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.4)" />
          <text textAnchor="middle" dy="3" fontWeight="600">E 11</text>
        </g>
        <g transform="translate(560 360)">
          <rect x="-13" y="-7" width="26" height="13" rx="2" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.3)" />
          <text textAnchor="middle" dy="3">E 311</text>
        </g>
        <g transform="translate(720 420)">
          <rect x="-13" y="-7" width="26" height="13" rx="2" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.3)" />
          <text textAnchor="middle" dy="3">E 611</text>
        </g>
        <g transform="translate(880 285)">
          <rect x="-12" y="-7" width="24" height="13" rx="2" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.3)" />
          <text textAnchor="middle" dy="3">E 66</text>
        </g>
      </g>

      {/* Airports */}
      <g>
        {/* DXB — Dubai International */}
        <g transform="translate(500 270)">
          <circle r="9" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.6)" strokeWidth="1.2" />
          <path d="M -5 0 L 5 0 M 0 -5 L 0 5 M -3.5 -3.5 L 3.5 3.5 M -3.5 3.5 L 3.5 -3.5"
            stroke="hsl(var(--foreground) / 0.7)" strokeWidth="1.1" />
          <text x="13" y="3" fontFamily="ui-sans-serif, system-ui" fontSize="10"
            fill="hsl(var(--foreground))" fontWeight="600">DXB</text>
          <text x="13" y="15" fontFamily="ui-sans-serif, system-ui" fontSize="8"
            fill="hsl(var(--muted-foreground))">Dubai Intl.</text>
        </g>
        {/* DWC — Al Maktoum International */}
        <g transform="translate(640 555)">
          <circle r="9" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.6)" strokeWidth="1.2" />
          <path d="M -5 0 L 5 0 M 0 -5 L 0 5 M -3.5 -3.5 L 3.5 3.5 M -3.5 3.5 L 3.5 -3.5"
            stroke="hsl(var(--foreground) / 0.7)" strokeWidth="1.1" />
          <text x="13" y="3" fontFamily="ui-sans-serif, system-ui" fontSize="10"
            fill="hsl(var(--foreground))" fontWeight="600">DWC</text>
          <text x="13" y="15" fontFamily="ui-sans-serif, system-ui" fontSize="8"
            fill="hsl(var(--muted-foreground))">Al Maktoum Intl.</text>
        </g>
      </g>

      {/* Place / neighbour labels */}
      <g fontFamily="ui-sans-serif, system-ui" fill="hsl(var(--muted-foreground))">
        <text x="120" y="120" fontSize="11" fontStyle="italic" letterSpacing="2"
          fill="hsl(var(--foreground) / 0.45)">ARABIAN GULF</text>
        <text x="930" y="60" fontSize="10" textAnchor="end" letterSpacing="1.5"
          fill="hsl(var(--foreground) / 0.55)">SHARJAH →</text>
        <text x="20" y="630" fontSize="10" letterSpacing="1.5"
          fill="hsl(var(--foreground) / 0.55)">← ABU DHABI</text>
        <text x="980" y="640" fontSize="9" textAnchor="end" letterSpacing="1.5"
          fill="hsl(var(--foreground) / 0.4)">HATTA →</text>
      </g>

      {/* Compass */}
      <g transform="translate(940 110)">
        <circle r="22" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.3)" />
        <path d="M0 -16 L4 0 L0 16 L-4 0 Z" fill="hsl(var(--gold))" opacity="0.85" />
        <path d="M0 -16 L4 0 L-4 0 Z" fill="hsl(var(--foreground))" opacity="0.85" />
        <text y="-26" textAnchor="middle" fontFamily="ui-sans-serif, system-ui"
          fontSize="9" fontWeight="600" fill="hsl(var(--foreground))">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(40 605)" fontFamily="ui-sans-serif, system-ui"
        fontSize="9" fill="hsl(var(--muted-foreground))">
        <line x1="0" y1="0" x2="80" y2="0" stroke="hsl(var(--foreground) / 0.6)" strokeWidth="1.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="hsl(var(--foreground) / 0.6)" />
        <line x1="40" y1="-3" x2="40" y2="3" stroke="hsl(var(--foreground) / 0.6)" />
        <line x1="80" y1="-3" x2="80" y2="3" stroke="hsl(var(--foreground) / 0.6)" />
        <text x="0" y="16">0</text>
        <text x="40" y="16" textAnchor="middle">5</text>
        <text x="80" y="16" textAnchor="middle">10 km</text>
      </g>
    </svg>
  );
};

export default DubaiMapSVG;
