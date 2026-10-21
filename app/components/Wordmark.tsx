export default function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 265 62"
      width="265"
      height="62"
      role="img"
      aria-label="La Crave"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="61"
        fontFamily="var(--font-display), Arial, sans-serif"
        fontSize="80.71"
        fill="#2c2c2d"
      >
        LA CRAVE
      </text>
      <rect
        x="253.6"
        y="49.2"
        width="11.84"
        height="11.84"
        rx="2.88"
        fill="#ff6ba1"
      />
    </svg>
  );
}
