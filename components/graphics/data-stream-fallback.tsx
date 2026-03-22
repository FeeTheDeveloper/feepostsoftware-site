const rackRows = Array.from({ length: 7 }, (_, index) => index);

export function DataStreamFallback() {
  return (
    <div className="data-stream-fallback absolute inset-0" aria-hidden="true">
      <div className="data-stream-fallback__mesh" />
      <div className="data-stream-fallback__aurora data-stream-fallback__aurora--cyan" />
      <div className="data-stream-fallback__aurora data-stream-fallback__aurora--magenta" />

      <div className="data-stream-fallback__rack-shell">
        <div className="data-stream-fallback__rack-frame" />
        <div className="data-stream-fallback__ribbon data-stream-fallback__ribbon--cyan" />
        <div className="data-stream-fallback__ribbon data-stream-fallback__ribbon--magenta" />

        <div className="data-stream-fallback__rack">
          {rackRows.map((row) => (
            <div key={row} className="data-stream-fallback__unit">
              <span className="data-stream-fallback__unit-line" />
              <span className="data-stream-fallback__indicator data-stream-fallback__indicator--cyan" />
              <span className="data-stream-fallback__indicator data-stream-fallback__indicator--magenta" />
            </div>
          ))}
        </div>

        <div className="data-stream-fallback__sparkles">
          {Array.from({ length: 14 }, (_, index) => (
            <span
              key={index}
              className="data-stream-fallback__spark"
              style={{
                left: `${10 + (index % 4) * 20}%`,
                top: `${8 + Math.floor(index / 4) * 18}%`,
                animationDelay: `${index * 0.28}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
