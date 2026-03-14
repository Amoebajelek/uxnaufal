"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Trash2, ChevronDown, ChevronUp, Save, ArrowLeft, GripVertical,
} from "lucide-react";
import type { Project, ProjectSection, SectionType } from "@/lib/projects";

/* ─── Helpers ─── */
function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const SECTION_TYPES: SectionType[] = [
  "nutshell", "context", "problem-discovery", "problem",
  "solution", "finaldesign", "reflection", "notion-only",
];

const SECTION_LABELS: Record<SectionType, string> = {
  nutshell: "In a Nutshell",
  context: "Context",
  "problem-discovery": "Problem Discovery",
  problem: "Problem",
  solution: "Solution",
  finaldesign: "Final Design",
  reflection: "Reflection",
  "notion-only": "Notion Only",
};

/* ─── Field helpers ─── */
function Field({
  label, children, hint,
}: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      {children}
      {hint && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{hint}</p>}
    </div>
  );
}

function Input({
  value, onChange, placeholder, type = "text",
}: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
      style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
    />
  );
}

function Textarea({
  value, onChange, placeholder, rows = 4,
}: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-y"
      style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
    />
  );
}

function Select({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
      style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

/* ─── Section editor ─── */
function SectionEditor({
  section, index, total,
  onChange, onDelete, onMove,
}: {
  section: ProjectSection;
  index: number;
  total: number;
  onChange: (s: ProjectSection) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [open, setOpen] = useState(true);

  function set<K extends keyof ProjectSection>(key: K, value: ProjectSection[K]) {
    onChange({ ...section, [key]: value });
  }

  // boldList helpers
  const boldList = section.boldList ?? [];
  const setBoldList = (list: typeof boldList) => set("boldList", list);

  // items helpers (finaldesign)
  const items = section.items ?? [];
  const setItems = (arr: typeof items) => set("items", arr);

  // learnings
  const learnings = section.learnings ?? [];

  // collaborators
  const collaborators = section.collaborators ?? [];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 cursor-pointer select-none"
        style={{ borderBottom: open ? "1px solid var(--border)" : "none" }}
        onClick={() => setOpen((v) => !v)}
      >
        <GripVertical size={14} style={{ color: "var(--text-muted)" }} className="shrink-0" />
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
        >
          {SECTION_LABELS[section.type]}
        </span>
        <span className="text-sm flex-1 truncate" style={{ color: "var(--text-primary)" }}>
          {section.label || section.heading || "Tanpa judul"}
        </span>
        <div className="flex items-center gap-1 ml-auto" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="p-1 rounded-lg disabled:opacity-30 hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            <ChevronUp size={13} />
          </button>
          <button
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="p-1 rounded-lg disabled:opacity-30 hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            <ChevronDown size={13} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded-lg hover:opacity-70"
            style={{ color: "#ef4444" }}
          >
            <Trash2 size={13} />
          </button>
        </div>
        <ChevronDown
          size={14}
          style={{
            color: "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </div>

      {/* Body */}
      {open && (
        <div className="p-5 flex flex-col gap-4">
          {/* Type */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tipe Section">
              <Select
                value={section.type}
                onChange={(v) => set("type", v as SectionType)}
                options={SECTION_TYPES.map((t) => ({ value: t, label: SECTION_LABELS[t] }))}
              />
            </Field>
            <Field label="Label (sidebar nav)">
              <Input
                value={section.label ?? ""}
                onChange={(v) => set("label", v || undefined)}
                placeholder="e.g. Problem #1"
              />
            </Field>
          </div>

          <Field label="Heading">
            <Input
              value={section.heading}
              onChange={(v) => set("heading", v)}
              placeholder="Heading section..."
            />
          </Field>

          <Field label="Konten / Body Text">
            <Textarea
              value={section.content ?? ""}
              onChange={(v) => set("content", v || undefined)}
              placeholder="Teks isi section..."
              rows={4}
            />
          </Field>

          {/* Image (for context, problem, etc.) */}
          {["context", "problem", "problem-discovery"].includes(section.type) && (
            <Field label="Gambar (path)" hint="Contoh: /Aitiserve_Context.jpg">
              <Input
                value={section.image ?? ""}
                onChange={(v) => set("image", v || undefined)}
                placeholder="/nama-file.jpg"
              />
            </Field>
          )}

          {/* boldList for context */}
          {section.type === "context" && (
            <Field label="Bold List (Context)">
              <div className="flex flex-col gap-2">
                {boldList.map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <input
                      value={item.term}
                      onChange={(e) => {
                        const next = [...boldList];
                        next[i] = { ...next[i], term: e.target.value };
                        setBoldList(next);
                      }}
                      placeholder="Term"
                      className="w-32 px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                    />
                    <input
                      value={item.desc}
                      onChange={(e) => {
                        const next = [...boldList];
                        next[i] = { ...next[i], desc: e.target.value };
                        setBoldList(next);
                      }}
                      placeholder="Deskripsi"
                      className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                    />
                    <button onClick={() => setBoldList(boldList.filter((_, j) => j !== i))} className="p-2" style={{ color: "#ef4444" }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setBoldList([...boldList, { term: "", desc: "" }])}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg self-start border"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
                >
                  <Plus size={11} /> Tambah Item
                </button>
              </div>
            </Field>
          )}

          {/* items for finaldesign */}
          {section.type === "finaldesign" && (
            <Field label="Design Items (label + gambar)">
              <div className="flex flex-col gap-2">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={item.label}
                      onChange={(e) => {
                        const next = [...items];
                        next[i] = { ...next[i], label: e.target.value };
                        setItems(next);
                      }}
                      placeholder="Label"
                      className="w-40 px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                    />
                    <input
                      value={item.image}
                      onChange={(e) => {
                        const next = [...items];
                        next[i] = { ...next[i], image: e.target.value };
                        setItems(next);
                      }}
                      placeholder="/nama-gambar.jpg"
                      className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                    />
                    <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="p-2" style={{ color: "#ef4444" }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setItems([...items, { label: "", image: "" }])}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg self-start border"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
                >
                  <Plus size={11} /> Tambah Gambar
                </button>
              </div>
            </Field>
          )}

          {/* learnings & collaborators for reflection */}
          {section.type === "reflection" && (
            <>
              <Field label="Learnings (satu per baris)">
                <Textarea
                  value={learnings.join("\n")}
                  onChange={(v) => set("learnings", v ? v.split("\n").filter(Boolean) : undefined)}
                  placeholder="Satu poin per baris..."
                  rows={3}
                />
              </Field>
              <Field label="Collaborators (satu per baris)">
                <Textarea
                  value={collaborators.join("\n")}
                  onChange={(v) => set("collaborators", v ? v.split("\n").filter(Boolean) : undefined)}
                  placeholder="Nama — Role"
                  rows={2}
                />
              </Field>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main form ─── */
export function ProjectForm({
  initial,
  mode,
}: {
  initial?: Project;
  mode: "new" | "edit";
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // Track whether user has manually edited the ID field (to stop auto-generating from title)
  const idTouched = useRef(mode === "edit");

  const empty: Project = {
    id: "", slug: "", title: "", type: "Redesign",
    year: new Date().getFullYear().toString(),
    duration: "", role: "", client: "", description: "",
    tags: [], skills: [], color: "#1a1a1a", accent: "#c8ff57",
    thumbnail: "", externalHref: "", liveUrl: "", sections: [],
  };

  const [form, setForm] = useState<Project>(initial ?? empty);

  function setField<K extends keyof Project>(key: K, value: Project[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateSection(i: number, s: ProjectSection) {
    const next = [...form.sections];
    next[i] = s;
    setField("sections", next);
  }

  function deleteSection(i: number) {
    setField("sections", form.sections.filter((_, j) => j !== i));
  }

  function moveSection(i: number, dir: -1 | 1) {
    const next = [...form.sections];
    const target = i + dir;
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]];
    setField("sections", next);
  }

  function addSection() {
    const newSection: ProjectSection = {
      type: "nutshell",
      heading: "New Section",
      label: "Section",
    };
    setField("sections", [...form.sections, newSection]);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess(false);

    // Auto-fill slug from id
    const payload: Project = {
      ...form,
      id: form.id || slug(form.title),
      slug: form.slug || slug(form.title),
    };

    try {
      const url = mode === "edit"
        ? `/api/admin/projects/${initial!.id}`
        : "/api/admin/projects";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "Terjadi kesalahan saat menyimpan.");
      } else {
        setSuccess(true);
        if (mode === "new") {
          router.push(`/admin/portfolio/${payload.id}`);
        }
      }
    } catch {
      setError("Koneksi gagal. Coba lagi.");
    }
    setSaving(false);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl border transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={15} />
          </button>
          <div>
            <h1 className="font-display font-extrabold text-2xl tracking-tight" style={{ color: "var(--text-primary)" }}>
              {mode === "new" ? "Tambah Proyek Baru" : `Edit: ${initial?.title ?? ""}`}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {mode === "new" ? "Isi semua field lalu simpan" : `ID: ${initial?.id}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {success && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: "#22c55e" }}>✓ Tersimpan</span>
              <a
                href={`/portfolio/${form.slug || form.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--accent)" }}
              >
                Lihat →
              </a>
            </div>
          )}
          {error && (
            <span className="text-xs" style={{ color: "#ef4444" }}>{error}</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-85 disabled:opacity-50"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
          >
            <Save size={14} />
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Basic info */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Card: Identitas */}
          <FormCard title="Identitas Proyek">
            <div className="grid grid-cols-2 gap-4">
              <Field label="ID (slug unik)" hint={mode === "new" ? "Auto-generate dari judul" : "Tidak bisa diubah setelah disimpan"}>
                <Input
                  value={form.id}
                  onChange={(v) => {
                    idTouched.current = true;
                    setField("id", v);
                    setField("slug", v);
                  }}
                  placeholder="aitiserve"
                />
              </Field>
              <Field label="Tipe">
                <Input value={form.type} onChange={(v) => setField("type", v)} placeholder="Redesign" />
              </Field>
            </div>
            <Field label="Judul">
              <Input
                value={form.title}
                onChange={(v) => {
                  // In new mode, keep syncing id+slug from title until user manually edits ID
                  if (mode === "new" && !idTouched.current) {
                    const generated = slug(v);
                    setForm((f) => ({ ...f, title: v, id: generated, slug: generated }));
                  } else {
                    setField("title", v);
                  }
                }}
                placeholder="Judul proyek..."
              />
            </Field>
            <Field label="Deskripsi Singkat">
              <Textarea
                value={form.description}
                onChange={(v) => setField("description", v)}
                placeholder="Deskripsi singkat proyek..."
                rows={3}
              />
            </Field>
          </FormCard>

          {/* Card: Sections */}
          <FormCard title="Sections" action={
            <button
              onClick={addSection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
            >
              <Plus size={11} /> Tambah Section
            </button>
          }>
            {form.sections.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                  Belum ada section. Tambah section pertama.
                </p>
                <button
                  onClick={addSection}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
                >
                  <Plus size={13} /> Tambah Section
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {form.sections.map((section, i) => (
                  <SectionEditor
                    key={i}
                    section={section}
                    index={i}
                    total={form.sections.length}
                    onChange={(s) => updateSection(i, s)}
                    onDelete={() => deleteSection(i)}
                    onMove={(dir) => moveSection(i, dir)}
                  />
                ))}
              </div>
            )}
          </FormCard>
        </div>

        {/* Right: metadata */}
        <div className="flex flex-col gap-5">
          <FormCard title="Detail Proyek">
            <Field label="Tahun">
              <Input value={form.year} onChange={(v) => setField("year", v)} placeholder="2024" />
            </Field>
            <Field label="Durasi">
              <Input value={form.duration} onChange={(v) => setField("duration", v)} placeholder="Juni 2024 · 3 Minggu" />
            </Field>
            <Field label="Role">
              <Input value={form.role ?? ""} onChange={(v) => setField("role", v)} placeholder="Lead UI/UX Designer" />
            </Field>
            <Field label="Klien">
              <Input value={form.client ?? ""} onChange={(v) => setField("client", v)} placeholder="Nama klien" />
            </Field>
          </FormCard>

          <FormCard title="Tags & Skills">
            <Field label="Tags" hint="Pisahkan dengan koma">
              <Input
                value={form.tags.join(", ")}
                onChange={(v) => setField("tags", v.split(",").map((t) => t.trim()).filter(Boolean))}
                placeholder="UX Research, UI Design"
              />
            </Field>
            <Field label="Skills" hint="Pisahkan dengan koma">
              <Input
                value={(form.skills ?? []).join(", ")}
                onChange={(v) => setField("skills", v.split(",").map((t) => t.trim()).filter(Boolean))}
                placeholder="Design Thinking, Figma"
              />
            </Field>
          </FormCard>

          <FormCard title="Visual & Links">
            <Field label="Warna Latar (hex)">
              <div className="flex gap-2">
                <Input value={form.color} onChange={(v) => setField("color", v)} placeholder="#1a1a1a" />
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) => setField("color", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 shrink-0"
                  style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
                />
              </div>
            </Field>
            <Field label="Warna Aksen (hex)">
              <div className="flex gap-2">
                <Input value={form.accent} onChange={(v) => setField("accent", v)} placeholder="#c8ff57" />
                <input
                  type="color"
                  value={form.accent}
                  onChange={(e) => setField("accent", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 shrink-0"
                  style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
                />
              </div>
            </Field>
            <Field label="Thumbnail" hint="Path dari /public">
              <Input value={form.thumbnail ?? ""} onChange={(v) => setField("thumbnail", v)} placeholder="/Thumbnail_Aitiserve.jpg" />
            </Field>
            <Field label="Live URL">
              <Input value={form.liveUrl ?? ""} onChange={(v) => setField("liveUrl", v)} placeholder="https://..." />
            </Field>
            <Field label="External Link (Notion)">
              <Input value={form.externalHref ?? ""} onChange={(v) => setField("externalHref", v)} placeholder="https://notion.so/..." />
            </Field>
          </FormCard>
        </div>
      </div>
    </div>
  );
}

/* ─── Card wrapper ─── */
function FormCard({
  title, children, action,
}: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-4"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}
