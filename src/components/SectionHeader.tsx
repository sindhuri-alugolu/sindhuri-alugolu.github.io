interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-14 ${className}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title mt-3">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
