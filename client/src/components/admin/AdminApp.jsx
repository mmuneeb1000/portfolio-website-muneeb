import { useEffect, useMemo, useState } from "react";
import {
  checkSession,
  deleteItem,
  fetchCollection,
  login,
  logout,
  saveItem,
  slugify,
} from "../../api/admin";

const collections = [
  { id: "projects", label: "Projects", hint: "/api/projects.php" },
  { id: "websites", label: "Websites", hint: "/api/websites.php" },
  { id: "components", label: "Components", hint: "/api/components.php" },
];

const emptyForm = {
  id: "",
  name: "",
  slug: "",
  description: "",
  image: "",
  live: "",
  github: "",
  tech: "",
  size: "",
  date: "",
  category: "",
  featured: false,
  sort_order: 0,
};

function toForm(item) {
  return {
    ...emptyForm,
    ...item,
    tech: Array.isArray(item.tech) ? item.tech.join(", ") : "",
  };
}

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const ok = await login(password);

      if (!ok) {
        throw new Error("Login failed");
      }

      window.history.replaceState({}, "", "/admin");
      onLogin();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg px-4 py-10 text-text">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-lg border border-border bg-surface p-6 shadow-2xl shadow-black/20"
        >
          <div className="mb-6">
            <p className="text-sm text-green">~/admin/login</p>
            <h1 className="mt-2 text-2xl font-semibold">Portfolio Admin</h1>
            <p className="mt-2 text-sm text-muted">
              Manage the live portfolio data stored in MySQL.
            </p>
          </div>

          <label className="block text-xs text-muted" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
            autoComplete="current-password"
            autoFocus
          />

          {error && <p className="mt-3 text-xs text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="mt-5 w-full rounded border border-green bg-green px-4 py-2 text-sm font-semibold text-bg hover:bg-green-dim disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

function AdminForm({ activeType, form, setForm, onSubmit, onCancel, busy }) {
  function update(field, value) {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "name" && !current.id) {
        next.slug = slugify(value);
      }

      return next;
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-border bg-surface p-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-green">
            {form.id ? "edit record" : "new record"}
          </p>
          <h2 className="text-lg font-semibold">
            {form.id ? form.name : `Add ${activeType.slice(0, -1)}`}
          </h2>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-border px-3 py-1.5 text-xs text-muted hover:border-green hover:text-text"
        >
          Close
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-xs text-muted">
          Name
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
            required
          />
        </label>

        <label className="text-xs text-muted">
          Slug
          <input
            value={form.slug}
            onChange={(event) => update("slug", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
            required
          />
        </label>

        <label className="text-xs text-muted md:col-span-2">
          Description
          <textarea
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            rows={3}
            className="mt-1 w-full resize-y rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          Image
          <input
            value={form.image}
            onChange={(event) => update("image", event.target.value)}
            placeholder="closerkit.jpg"
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          Live URL
          <input
            value={form.live}
            onChange={(event) => update("live", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          GitHub URL
          <input
            value={form.github}
            onChange={(event) => update("github", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          Tech Stack
          <input
            value={form.tech}
            onChange={(event) => update("tech", event.target.value)}
            placeholder="React, PHP, MySQL"
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          Size
          <input
            value={form.size}
            onChange={(event) => update("size", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          Date
          <input
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          Category
          <input
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>

        <label className="text-xs text-muted">
          Sort Order
          <input
            type="number"
            value={form.sort_order}
            onChange={(event) => update("sort_order", event.target.value)}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
          />
        </label>
      </div>

      <label className="mt-4 flex items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(event) => update("featured", event.target.checked)}
          className="h-4 w-4 accent-green"
        />
        Featured
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded border border-green bg-green px-4 py-2 text-sm font-semibold text-bg hover:bg-green-dim disabled:opacity-60"
        >
          {busy ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-border px-4 py-2 text-sm text-muted hover:border-green hover:text-text"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function AdminDashboard({ onLogout }) {
  const [activeType, setActiveType] = useState("projects");
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const active = collections.find((collection) => collection.id === activeType);

  async function loadItems(type = activeType) {
    setStatus("loading");
    setMessage("");

    try {
      const data = await fetchCollection(type);
      setItems(data);
      setStatus("ready");
    } catch (error) {
      setItems([]);
      setStatus("error");
      setMessage(error.message);
    }
  }

  useEffect(() => {
    setForm(null);
    setQuery("");
    loadItems(activeType);
  }, [activeType]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return items;
    }

    return items.filter((item) =>
      [item.name, item.description, item.slug, item.category]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [items, query]);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      await saveItem(activeType, form);
      setForm(null);
      setMessage("Saved successfully.");
      await loadItems();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(`Delete ${item.name}?`);

    if (!confirmed) {
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      await deleteItem(activeType, item.id);
      setMessage("Deleted successfully.");
      await loadItems();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await logout();
    window.history.replaceState({}, "", "/admin/login");
    onLogout();
  }

  return (
    <main className="min-h-screen bg-bg px-4 py-6 text-text md:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-green">~/admin</p>
            <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
              Portfolio Control Panel
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              className="rounded border border-border px-3 py-2 text-xs text-muted hover:border-green hover:text-text"
            >
              View Site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded border border-border px-3 py-2 text-xs text-muted hover:border-green hover:text-text"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-border bg-surface p-3">
            <nav className="space-y-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => setActiveType(collection.id)}
                  className={`w-full rounded border px-3 py-3 text-left text-sm ${
                    activeType === collection.id
                      ? "border-green bg-green-muted text-green"
                      : "border-border text-muted hover:border-green hover:text-text"
                  }`}
                >
                  <span className="block font-semibold">{collection.label}</span>
                  <span className="mt-1 block text-[11px] opacity-80">
                    {collection.hint}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          <section className="min-w-0 space-y-4">
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs text-green">{active.hint}</p>
                  <h2 className="mt-1 text-xl font-semibold">
                    {active.label}
                  </h2>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-green"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...emptyForm,
                        category: activeType.slice(0, -1),
                        sort_order: items.length + 1,
                      })
                    }
                    className="rounded border border-green bg-green px-4 py-2 text-sm font-semibold text-bg hover:bg-green-dim"
                  >
                    Add New
                  </button>
                </div>
              </div>

              {message && (
                <p className="mt-3 rounded border border-border bg-bg px-3 py-2 text-xs text-muted">
                  {message}
                </p>
              )}
            </div>

            {form && (
              <AdminForm
                activeType={activeType}
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                onCancel={() => setForm(null)}
                busy={busy}
              />
            )}

            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              {status === "loading" && (
                <p className="p-4 text-sm text-muted">Loading records...</p>
              )}

              {status === "error" && (
                <p className="p-4 text-sm text-muted">Could not load records.</p>
              )}

              {status === "ready" && filtered.length === 0 && (
                <p className="p-4 text-sm text-muted">No records found.</p>
              )}

              {status === "ready" && filtered.length > 0 && (
                <div className="divide-y divide-border">
                  {filtered.map((item) => (
                    <article
                      key={item.id}
                      className="grid gap-3 p-4 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center"
                    >
                      <div className="h-16 overflow-hidden rounded border border-border bg-bg">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover object-top"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-muted">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-sm font-semibold">
                            {item.name}
                          </h3>
                          {item.featured && (
                            <span className="rounded border border-green bg-green-muted px-2 py-0.5 text-[10px] text-green">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs text-muted">
                          {item.description}
                        </p>
                        <p className="mt-2 text-[11px] text-muted">
                          #{item.id} / {item.slug} / {item.date || "no date"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {item.live && (
                          <a
                            href={item.live}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded border border-border px-3 py-1.5 text-xs text-muted hover:border-green hover:text-text"
                          >
                            Open
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setForm(toForm(item))}
                          className="rounded border border-border px-3 py-1.5 text-xs text-muted hover:border-green hover:text-text"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          disabled={busy}
                          className="rounded border border-border px-3 py-1.5 text-xs text-muted hover:border-red-300 hover:text-red-200 disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  async function refreshSession() {
    setChecking(true);
    const ok = await checkSession();
    setAuthenticated(ok);
    setChecking(false);
  }

  useEffect(() => {
    refreshSession();
  }, []);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-4 text-sm text-muted">
        Checking session...
      </main>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={refreshSession} />;
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}
