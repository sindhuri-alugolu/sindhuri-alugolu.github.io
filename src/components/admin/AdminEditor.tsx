"use client";

import {
  Briefcase,
  Check,
  Eye,
  FileText,
  GraduationCap,
  Images,
  Star,
  User,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import type { PortfolioContent } from "@/lib/types";
import { uid } from "@/lib/content-client";
import { savePortfolioContent } from "@/lib/save-portfolio";

interface AdminEditorProps {
  initialData: PortfolioContent;
}

function normalizePhone(display: string): string {
  const cleaned = display.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (/^\d{10}$/.test(cleaned)) return "+91" + cleaned;
  return cleaned;
}

export default function AdminEditor({ initialData }: AdminEditorProps) {
  const [data, setData] = useState<PortfolioContent>(initialData);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const toSave = {
        ...data,
        profile: {
          ...data.profile,
          phone: normalizePhone(data.profile.phoneDisplay),
        },
      };
      await savePortfolioContent(toSave);
      setData(toSave);
      showToast("Saved! Your portfolio is updated. The site will refresh in about 2 minutes.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handlePreview() {
    setSaving(true);
    try {
      const toSave = {
        ...data,
        profile: {
          ...data.profile,
          phone: normalizePhone(data.profile.phoneDisplay),
        },
      };
      await savePortfolioContent(toSave);
      setData(toSave);
      window.open("/", "_blank");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Save failed — preview needs a saved copy first");
    } finally {
      setSaving(false);
    }
  }

  function updateProfile(field: keyof PortfolioContent["profile"], value: string) {
    setData((d) => ({ ...d, profile: { ...d.profile, [field]: value } }));
  }

  function updateList(
    field: "competencies" | "technicalSkills" | "achievements" | "languages",
    index: number,
    value: string,
  ) {
    setData((d) => {
      const list = [...d[field]];
      list[index] = value;
      return { ...d, [field]: list };
    });
  }

  function addListItem(field: "competencies" | "technicalSkills" | "achievements" | "languages") {
    setData((d) => ({ ...d, [field]: [...d[field], ""] }));
  }

  function removeListItem(
    field: "competencies" | "technicalSkills" | "achievements" | "languages",
    index: number,
  ) {
    setData((d) => ({ ...d, [field]: d[field].filter((_, i) => i !== index) }));
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-28 pt-8">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-2xl font-semibold text-accent-dark">Edit Your Portfolio</h1>
          <p className="mt-2 text-sm text-text-muted">
            Make changes below, then tap Save. Your live website updates immediately.
          </p>
        </header>

        <AdminSection icon={<User size={18} />} title="My Details">
          <Field label="Your name" value={data.profile.name} onChange={(v) => updateProfile("name", v)} />
          <Field
            label="Job title (e.g. Soft Skills Trainer | Communication Specialist)"
            value={data.profile.subtitle}
            onChange={(v) => updateProfile("subtitle", v)}
          />
          <Field
            label="Phone number"
            value={data.profile.phoneDisplay}
            onChange={(v) => updateProfile("phoneDisplay", v)}
          />
          <Field
            label="Email address"
            type="email"
            value={data.profile.email}
            onChange={(v) => updateProfile("email", v)}
          />
        </AdminSection>

        <AdminSection icon={<FileText size={18} />} title="About Me">
          <Field
            label="Professional summary"
            multiline
            value={data.summary}
            onChange={(v) => setData((d) => ({ ...d, summary: v }))}
          />
          <label className="mb-2 block text-sm font-medium">Skills & strengths</label>
          <SimpleList
            items={data.competencies}
            onChange={(i, v) => updateList("competencies", i, v)}
            onAdd={() => addListItem("competencies")}
            onRemove={(i) => removeListItem("competencies", i)}
            addLabel="+ Add a skill"
          />
        </AdminSection>

        <AdminSection icon={<Briefcase size={18} />} title="Work Experience">
          {data.experience.map((exp, i) => (
            <ItemCard
              key={exp.id}
              title={`Job ${i + 1}`}
              onRemove={() =>
                setData((d) => ({
                  ...d,
                  experience: d.experience.filter((e) => e.id !== exp.id),
                }))
              }
            >
              <Field
                label="Job title & company"
                value={exp.title}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.map((e) =>
                      e.id === exp.id ? { ...e, title: v } : e,
                    ),
                  }))
                }
              />
              <Field
                label="When (e.g. 2024 – Present)"
                value={exp.date}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.map((e) =>
                      e.id === exp.id ? { ...e, date: v } : e,
                    ),
                  }))
                }
              />
              <label className="mb-2 block text-sm font-medium">What you did</label>
              {exp.bullets.map((bullet, bi) => (
                <div key={`${exp.id}-b-${bi}`} className="mb-2 flex gap-2">
                  <textarea
                    value={bullet}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        experience: d.experience.map((ex) =>
                          ex.id === exp.id
                            ? {
                                ...ex,
                                bullets: ex.bullets.map((b, j) => (j === bi ? e.target.value : b)),
                              }
                            : ex,
                        ),
                      }))
                    }
                    rows={2}
                    className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        experience: d.experience.map((ex) =>
                          ex.id === exp.id
                            ? { ...ex, bullets: ex.bullets.filter((_, j) => j !== bi) }
                            : ex,
                        ),
                      }))
                    }
                    className="shrink-0 text-text-muted hover:text-red-500"
                    aria-label="Remove point"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    experience: d.experience.map((ex) =>
                      ex.id === exp.id ? { ...ex, bullets: [...ex.bullets, ""] } : ex,
                    ),
                  }))
                }
                className="text-sm font-medium text-accent hover:text-accent-dark"
              >
                + Add another point
              </button>
            </ItemCard>
          ))}
          <AddButton
            label="+ Add a job"
            onClick={() =>
              setData((d) => ({
                ...d,
                experience: [
                  { id: uid("exp"), title: "", date: "", bullets: [""] },
                  ...d.experience,
                ],
              }))
            }
          />
        </AdminSection>

        <AdminSection icon={<Images size={18} />} title="Workshops & Projects">
          <Field
            label="Intro line for workshops section"
            multiline
            value={data.projects.intro}
            onChange={(v) =>
              setData((d) => ({ ...d, projects: { ...d.projects, intro: v } }))
            }
          />
          {data.projects.items.map((proj, i) => (
            <ItemCard
              key={proj.id}
              title={`Workshop ${i + 1}`}
              onRemove={() =>
                setData((d) => ({
                  ...d,
                  projects: {
                    ...d.projects,
                    items: d.projects.items.filter((p) => p.id !== proj.id),
                  },
                }))
              }
            >
              <Field
                label="Workshop name"
                value={proj.title}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    projects: {
                      ...d.projects,
                      items: d.projects.items.map((p) =>
                        p.id === proj.id ? { ...p, title: v } : p,
                      ),
                    },
                  }))
                }
              />
              <Field
                label="Date"
                value={proj.date}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    projects: {
                      ...d.projects,
                      items: d.projects.items.map((p) =>
                        p.id === proj.id ? { ...p, date: v } : p,
                      ),
                    },
                  }))
                }
              />
              <Field
                label="Your role"
                value={proj.role}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    projects: {
                      ...d.projects,
                      items: d.projects.items.map((p) =>
                        p.id === proj.id ? { ...p, role: v } : p,
                      ),
                    },
                  }))
                }
              />
              <Field
                label="Organised by"
                value={proj.organisedBy}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    projects: {
                      ...d.projects,
                      items: d.projects.items.map((p) =>
                        p.id === proj.id ? { ...p, organisedBy: v } : p,
                      ),
                    },
                  }))
                }
              />
              <Field
                label="Conducted by"
                value={proj.conductedBy}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    projects: {
                      ...d.projects,
                      items: d.projects.items.map((p) =>
                        p.id === proj.id ? { ...p, conductedBy: v } : p,
                      ),
                    },
                  }))
                }
              />
            </ItemCard>
          ))}
          <AddButton
            label="+ Add a workshop"
            onClick={() =>
              setData((d) => ({
                ...d,
                projects: {
                  ...d.projects,
                  items: [
                    {
                      id: uid("proj"),
                      title: "",
                      date: "",
                      role: "",
                      organisedBy: "",
                      conductedBy: "",
                      image: "/images/workshop-personality-development.svg",
                      alt: "",
                    },
                    ...d.projects.items,
                  ],
                },
              }))
            }
          />
        </AdminSection>

        <AdminSection icon={<GraduationCap size={18} />} title="Education">
          {data.education.map((edu, i) => (
            <ItemCard
              key={`edu-${i}`}
              title={`Degree ${i + 1}`}
              onRemove={() =>
                setData((d) => ({
                  ...d,
                  education: d.education.filter((_, j) => j !== i),
                }))
              }
            >
              <Field
                label="Qualification"
                value={edu.degree}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((e, j) =>
                      j === i ? { ...e, degree: v } : e,
                    ),
                  }))
                }
              />
              <Field
                label="College / School"
                value={edu.school}
                onChange={(v) =>
                  setData((d) => ({
                    ...d,
                    education: d.education.map((e, j) =>
                      j === i ? { ...e, school: v } : e,
                    ),
                  }))
                }
              />
            </ItemCard>
          ))}
          <AddButton
            label="+ Add education"
            onClick={() =>
              setData((d) => ({
                ...d,
                education: [...d.education, { degree: "", school: "" }],
              }))
            }
          />
        </AdminSection>

        <AdminSection icon={<Star size={18} />} title="Skills & Achievements">
          <label className="mb-2 block text-sm font-medium">Technical skills</label>
          <SimpleList
            items={data.technicalSkills}
            onChange={(i, v) => updateList("technicalSkills", i, v)}
            onAdd={() => addListItem("technicalSkills")}
            onRemove={(i) => removeListItem("technicalSkills", i)}
            addLabel="+ Add a skill"
          />
          <label className="mb-2 mt-4 block text-sm font-medium">Achievements</label>
          <SimpleList
            items={data.achievements}
            onChange={(i, v) => updateList("achievements", i, v)}
            onAdd={() => addListItem("achievements")}
            onRemove={(i) => removeListItem("achievements", i)}
            addLabel="+ Add achievement"
          />
        </AdminSection>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-3.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary flex-1 py-3.5 disabled:opacity-50"
          >
            <Check size={18} />
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={handlePreview}
            disabled={saving}
            className="btn btn-secondary flex-1 py-3.5 disabled:opacity-50"
          >
            <Eye size={18} />
            Preview
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}

function AdminSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-slate-50 px-5 py-3.5 text-sm font-semibold text-accent-dark">
        {icon}
        {title}
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  const cls =
    "w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={cls} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

function SimpleList({
  items,
  onChange,
  onAdd,
  onRemove,
  addLabel,
}: {
  items: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(i, e.target.value)}
            className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="px-2 text-lg text-text-muted hover:text-red-500"
            aria-label="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={onAdd} className="text-sm font-medium text-accent hover:text-accent-dark">
        {addLabel}
      </button>
    </div>
  );
}

function ItemCard({
  title,
  children,
  onRemove,
}: {
  title: string;
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-text-muted">{title}</span>
        <button
          type="button"
          onClick={() => {
            if (confirm("Remove this item?")) onRemove();
          }}
          className="text-xs font-medium text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 w-full rounded-lg border-2 border-dashed border-border py-2.5 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/5"
    >
      {label}
    </button>
  );
}
