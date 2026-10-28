type EyebrowIcon = "story" | "steps" | "menu" | "gallery" | "testimonials" | "lineup" | "order" | "about";

const paths: Record<EyebrowIcon, string> = {
  story: "M6 9.5h20v14H6zM9 9.5V7a3 3 0 0 1 6 0v2.5M17 9.5V7a3 3 0 0 1 6 0v2.5M10 14h12M10 18h7",
  steps: "M6 6h20v20H6zM10 11h12M10 16h8M10 21h5",
  menu: "M6 7h20M6 13h20M6 19h20M9 4v22M23 4v22",
  gallery: "M5 7h22v18H5zM8 20l5-5 4 4 3-3 5 5M11 11h.01",
  testimonials: "M7 8h18v12H12l-5 5v-5H5V8zM11 13h10M11 16h6",
  lineup: "M6 8h20v16H6zM10 5v6M22 5v6M6 13h20M10 17h.01M15 17h.01M20 17h.01",
  order: "M8 7h16l2 17H6L8 7zM11 10V7a5 5 0 0 1 10 0v3",
  about: "M16 5a11 11 0 1 0 11 11M16 5v7h7",
};

export default function SectionEyebrow({ icon, children, className = "", ...props }: { icon: EyebrowIcon; children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <span className={`eyebrow ${className}`.trim()} {...props}>
      <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[icon]} />
      </svg>
      {children}
    </span>
  );
}
