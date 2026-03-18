export default function GlassContainer({ width, height, children, style, className }: { children: React.ReactNode, width: any, height: any, style?: React.CSSProperties, className?: string }) {
  return (
    <>
      <style>{`
        body {
          font-family: sans-serif;
          font-weight: 300;
          background: transparent;
          margin: 0;
          padding: 0;
        }

        .glassContainer {
          position: relative;
          height: 100%;
          width: 100%;
          border-radius: 10px;

        }

        .glassContainer::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          border-radius: 10px;

background: linear-gradient(
  to bottom,
  rgba(118, 154, 252,0.6),
  rgba(118, 154, 252, 0.2),
    rgba(118, 154, 252, 0.2),

      rgba(118, 154, 252, 0.2),

  rgba(67, 107, 254, 0.2),
  rgba(118, 154, 252,0.6)
);

          box-shadow: inset 2px 2px 0px -2px rgba(255, 255, 255, 0.7),
                      inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
        }

        .glassContainer::after {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: 10px;
          backdrop-filter: blur(0px);
          // filter: url(#container-glass);
          overflow: hidden;
          isolation: isolate;
        }

        .glassContainer .borderHighlight {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  pointer-events: none;
}

/* BORDER EFFECT */
.glassContainer .borderHighlight::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 10px;

  padding: 1px; /* thickness */

  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.6),
    rgba(180,200,255,0.6),
    rgba(120,150,255,0.4),
    rgba(30, 76, 245, 0.2)
  );

  -webkit-mask: 
    linear-gradient(#000 0 0) content-box, 
    linear-gradient(#000 0 0);

  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

        .glassContent {
          position: relative;
          z-index: 1;
          height: 100%;
          width: 100%;
        }
      `}</style>

      <div className="glassContainer" style={{ width, height, ...style }}>
        <div className="borderHighlight"></div>
        <div className="glassContent">
          {children}
        </div>
      </div>

      <svg style={{ display: "none" }}>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blur"
            scale="100"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
}