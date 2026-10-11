import { useId, useMemo } from 'react';

export function SquareWaveLoader({
  count = 5,
  size = 14,
  gap = 8,
  duration = 1400,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  className = '',
  squareClassName = '',
}) {
  const instanceId = useId().replace(/:/g, '');
  const squares = Array.from({ length: count });
  const totalWidth = count * size + (count - 1) * gap;
  const effectiveBounceHeight = totalWidth - size;
  const maxScale = 1 + effectiveBounceHeight / size;
  const halfBounceHeight = effectiveBounceHeight / 2;
  const halfScale = 1 + halfBounceHeight / size;

  const keyframeRules = useMemo(
    () => squares.map((_, index) => {
      const riseBase = 2 + Math.round(index * 2.5);
      const fallBase = riseBase + 44;
      const animationName = `swl-${instanceId}-${index}`;

      return `
        @keyframes ${animationName} {
          0%, ${Math.max(0, riseBase - 2)}% { transform: translateY(0) scaleY(1); animation-timing-function: ease-in-out; }
          ${riseBase}% { transform: translateY(0) scaleY(0.75); animation-timing-function: ${easing}; }
          ${riseBase + 5}% { transform: translateY(0) scaleY(${halfScale}); animation-timing-function: ${easing}; }
          ${riseBase + 10}% { transform: translateY(-${halfBounceHeight}px) scaleY(1); animation-timing-function: ease-in-out; }
          ${riseBase + 13}% { transform: translateY(-${halfBounceHeight}px) scaleY(1); animation-timing-function: ease-in-out; }
          ${riseBase + 16}% { transform: translateY(-${halfBounceHeight + size * 0.25}px) scaleY(0.75); animation-timing-function: ${easing}; }
          ${riseBase + 21}% { transform: translateY(-${halfBounceHeight}px) scaleY(${halfScale}); animation-timing-function: ${easing}; }
          ${riseBase + 26}% { transform: translateY(-${effectiveBounceHeight}px) scaleY(1); animation-timing-function: ease-in-out; }
          ${riseBase + 29}% { transform: translateY(-${effectiveBounceHeight + size * 0.25}px) scaleY(0.75); animation-timing-function: ease-in-out; }
          ${riseBase + 32}%, ${fallBase - 2}% { transform: translateY(-${effectiveBounceHeight}px) scaleY(1); animation-timing-function: ease-in-out; }
          ${fallBase}% { transform: translateY(-${effectiveBounceHeight + size * 0.25}px) scaleY(0.75); animation-timing-function: ${easing}; }
          ${fallBase + 8}% { transform: translateY(0) scaleY(${maxScale}); animation-timing-function: ${easing}; }
          ${fallBase + 15}% { transform: translateY(0) scaleY(1); animation-timing-function: ease-in-out; }
          ${fallBase + 18}% { transform: translateY(0) scaleY(0.75); animation-timing-function: ease-in-out; }
          ${fallBase + 21}%, 100% { transform: translateY(0) scaleY(1); }
        }

        .swl-square-${instanceId}-${index} {
          animation: ${animationName} ${duration}ms linear infinite;
        }
      `;
    }).join('\n'),
    [count, duration, easing, effectiveBounceHeight, halfBounceHeight, halfScale, instanceId, maxScale, size, squares],
  );

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`square-wave-loader ${className}`}
      style={{
        gap: `${gap}px`,
        width: `${totalWidth}px`,
        height: `${totalWidth}px`,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframeRules }} />
      {squares.map((_, index) => (
        <div
          key={index}
          className={`swl-square-${instanceId}-${index} ${squareClassName}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: 0,
            transformOrigin: 'bottom center',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
