interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  description,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`mb-12 md:mb-14 ${centered ? "mx-auto max-w-2xl text-center" : ""} ${className}`}
    >
      <span className="section-label">{label}</span>
      <h2 className="section-title mt-4">{title}</h2>
      <div className={`section-title-accent ${centered ? "mx-auto" : ""}`} />
      {description && (
        <p className={`section-desc ${centered ? "mx-auto" : ""}`}>{description}</p>
      )}
    </div>
  );
}
