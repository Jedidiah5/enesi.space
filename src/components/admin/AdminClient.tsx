"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Project, SiteContent, Skill } from "@/types/content";

function emptyProject(): Project {
  return {
    id: typeof crypto !== "undefined" ? crypto.randomUUID() : String(Date.now()),
    title: "New project",
    tagline: "",
    description: "",
    role: "",
    stack: [],
    outcome: "",
    codeUrl: "",
    liveUrl: "",
    featured: false,
  };
}

export function AdminClient() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState("");
  const [skillDraft, setSkillDraft] = useState("");

  const load = useCallback(async () => {
    setMessage("");
    const res = await fetch("/api/admin/content", { credentials: "include" });
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await res.json();
    if (!data.ok) {
      setAuthed(false);
      return;
    }
    setAuthed(true);
    setContent(data.content as SiteContent);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.ok) {
      setLoginError(data.error || "Login failed");
      return;
    }
    setPassword("");
    await load();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setContent(null);
  }

  async function save() {
    if (!content) return;
    setMessage("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.ok) {
      setMessage(data.error || "Save failed");
      return;
    }
    setMessage("Saved. Public site revalidated.");
  }

  function exportJson() {
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "default-site.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Downloaded default-site.json — replace content/default-site.json in the repo if not using Supabase.");
  }

  function updateSkill(i: number, name: string) {
    if (!content) return;
    const skills = [...content.skills];
    skills[i] = { ...skills[i], name };
    setContent({ ...content, skills });
  }

  function removeSkill(i: number) {
    if (!content) return;
    const skills = content.skills.filter((_, idx) => idx !== i);
    setContent({ ...content, skills });
  }

  function addSkill() {
    if (!content || !skillDraft.trim()) return;
    setContent({ ...content, skills: [...content.skills, { name: skillDraft.trim() }] });
    setSkillDraft("");
  }

  function updateProject(i: number, patch: Partial<Project>) {
    if (!content) return;
    const items = [...content.projects.items];
    items[i] = { ...items[i], ...patch };
    setContent({ ...content, projects: { ...content.projects, items } });
  }

  function updateProjectStack(i: number, raw: string) {
    const stack = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    updateProject(i, { stack });
  }

  if (authed === null) {
    return <p className="p-4 text-[13px] text-w95-muted">Checking session…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md p-4">
        <h1 className="text-lg font-bold text-w95-navy">Admin console</h1>
        <p className="mt-2 text-[13px] text-w95-muted">Sign in to edit projects and skills.</p>
        <form className="mt-4 space-y-3" onSubmit={login}>
          <input
            type="password"
            className="win95-sunken w-full px-2 py-1.5 text-[13px] text-w95-ink"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError ? <p className="text-[12px] text-red-700">{loginError}</p> : null}
          <button type="submit" className="win95-btn font-bold text-w95-ink">
            OK
          </button>
        </form>
        <Link href="/" className="mt-6 inline-block text-[12px] text-w95-link hover:underline">
          ← Back to site
        </Link>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="space-y-4 p-2 md:p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-w95-navy">Content editor</h1>
          <p className="text-[12px] text-w95-muted">Save updates the live site when Supabase is configured.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void save()} className="win95-btn font-bold text-w95-ink">
            Save to cloud
          </button>
          <button type="button" onClick={exportJson} className="win95-btn text-w95-ink">
            Export JSON
          </button>
          <button type="button" onClick={() => void logout()} className="win95-btn text-w95-ink">
            Log out
          </button>
          <Link href="/" className="win95-btn font-bold text-w95-ink no-underline">
            View site
          </Link>
        </div>
      </div>
      {message ? <p className="text-[12px] font-bold text-[#805000]">{message}</p> : null}

      <section className="win95-fieldset space-y-2">
        <legend className="font-bold">Hero</legend>
        <label className="block text-[11px] font-bold text-w95-muted">Name</label>
        <input
          className="win95-sunken w-full px-2 py-1 text-[13px]"
          value={content.hero.name}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, name: e.target.value } })}
        />
        <label className="block text-[11px] font-bold text-w95-muted">Role line</label>
        <input
          className="win95-sunken w-full px-2 py-1 text-[13px]"
          value={content.hero.roleLine}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, roleLine: e.target.value } })}
        />
        <label className="block text-[11px] font-bold text-w95-muted">Bio</label>
        <textarea
          className="win95-sunken min-h-[90px] w-full px-2 py-1 text-[13px]"
          value={content.hero.bio}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, bio: e.target.value } })}
        />
        <label className="block text-[11px] font-bold text-w95-muted">Resume URL (optional)</label>
        <input
          className="win95-sunken w-full px-2 py-1 text-[13px]"
          value={content.hero.resumeUrl || ""}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, resumeUrl: e.target.value } })}
        />
      </section>

      <section className="win95-fieldset space-y-2">
        <legend className="font-bold">Skills</legend>
        <div className="space-y-2">
          {content.skills.map((s: Skill, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                className="win95-sunken flex-1 px-2 py-1 text-[13px]"
                value={s.name}
                onChange={(e) => updateSkill(i, e.target.value)}
              />
              <button type="button" className="text-[12px] font-bold text-red-700" onClick={() => removeSkill(i)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="win95-sunken flex-1 px-2 py-1 text-[13px]"
            placeholder="New skill"
            value={skillDraft}
            onChange={(e) => setSkillDraft(e.target.value)}
          />
          <button type="button" className="win95-btn font-bold text-w95-ink" onClick={addSkill}>
            Add
          </button>
        </div>
      </section>

      <section className="win95-fieldset space-y-4">
        <legend className="font-bold">Projects</legend>
        {content.projects.items.map((p, i) => (
          <div key={p.id} className="win95-sunken-grey space-y-2 p-2">
            <div className="flex justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-w95-muted">{p.id}</span>
              <button
                type="button"
                className="text-[10px] font-bold uppercase text-red-700"
                onClick={() => {
                  const items = content.projects.items.filter((_, idx) => idx !== i);
                  setContent({ ...content, projects: { ...content.projects, items } });
                }}
              >
                Delete project
              </button>
            </div>
            <input
              className="win95-sunken w-full px-2 py-1 text-[13px] font-bold"
              value={p.title}
              onChange={(e) => updateProject(i, { title: e.target.value })}
            />
            <input
              className="win95-sunken w-full px-2 py-1 text-[12px]"
              value={p.tagline}
              onChange={(e) => updateProject(i, { tagline: e.target.value })}
            />
            <textarea
              className="win95-sunken min-h-[70px] w-full px-2 py-1 text-[12px]"
              value={p.description}
              onChange={(e) => updateProject(i, { description: e.target.value })}
            />
            <textarea
              className="win95-sunken min-h-[50px] w-full px-2 py-1 text-[12px]"
              value={p.role}
              onChange={(e) => updateProject(i, { role: e.target.value })}
            />
            <label className="text-[10px] font-bold uppercase text-w95-muted">Stack (comma-separated)</label>
            <input
              className="win95-sunken w-full px-2 py-1 text-[12px]"
              value={p.stack.join(", ")}
              onChange={(e) => updateProjectStack(i, e.target.value)}
            />
            <textarea
              className="win95-sunken min-h-[50px] w-full px-2 py-1 text-[12px]"
              value={p.outcome}
              onChange={(e) => updateProject(i, { outcome: e.target.value })}
            />
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className="win95-sunken px-2 py-1 text-[12px]"
                placeholder="Code URL"
                value={p.codeUrl || ""}
                onChange={(e) => updateProject(i, { codeUrl: e.target.value })}
              />
              <input
                className="win95-sunken px-2 py-1 text-[12px]"
                placeholder="Live URL"
                value={p.liveUrl || ""}
                onChange={(e) => updateProject(i, { liveUrl: e.target.value })}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="win95-btn w-full font-bold text-w95-ink"
          onClick={() =>
            setContent({
              ...content,
              projects: { ...content.projects, items: [...content.projects.items, emptyProject()] },
            })
          }
        >
          + Add project
        </button>
      </section>

      <section className="win95-fieldset space-y-2">
        <legend className="font-bold">Contact</legend>
        <input
          className="win95-sunken w-full px-2 py-1 text-[13px]"
          value={content.contact.email}
          onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
        />
        <textarea
          className="win95-sunken min-h-[60px] w-full px-2 py-1 text-[13px]"
          value={content.contact.locationLine}
          onChange={(e) => setContent({ ...content, contact: { ...content.contact, locationLine: e.target.value } })}
        />
      </section>
    </div>
  );
}
