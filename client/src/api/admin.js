const endpoints = {
  projects: "/api/projects.php",
  websites: "/api/websites.php",
  components: "/api/components.php",
};

const collectionLabels = {
  projects: "Project",
  websites: "Website",
  components: "Component",
};

function normalizeTech(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string" || value.trim() === "") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeItem(item, type) {
  return {
    id: item.id,
    name: item.name ?? item.title ?? "",
    slug: item.slug ?? slugify(item.name ?? item.title ?? ""),
    description: item.description ?? "",
    image: item.image ?? item.preview_image ?? "",
    live: item.live ?? item.live_url ?? item.url ?? item.demo_url ?? "",
    github: item.github ?? item.github_url ?? item.source_url ?? "",
    tech: normalizeTech(item.tech ?? item.tech_stack),
    size: item.size ?? "",
    date: item.date ?? item.project_date ?? "",
    category: item.category ?? type.slice(0, -1),
    featured: Boolean(Number(item.featured ?? 0)),
    sort_order: Number(item.sort_order ?? 0),
  };
}

function unwrapData(result) {
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  return [];
}

async function parseResponse(response, fallbackMessage) {
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(text || fallbackMessage);
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || fallbackMessage);
  }

  return data;
}

export async function checkSession() {
  const response = await fetch("/api/session.php", {
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return Boolean(data.authenticated);
}

export async function login(password) {
  const response = await fetch("/api/login.php", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const data = await parseResponse(response, "Login failed");
  return Boolean(data.success || data.authenticated);
}

export async function logout() {
  await fetch("/api/logout.php", {
    method: "POST",
    credentials: "same-origin",
  }).catch(() => {});
}

export async function fetchCollection(type) {
  const response = await fetch(endpoints[type], {
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await parseResponse(
    response,
    `Failed to load ${collectionLabels[type].toLowerCase()}s`,
  );

  return unwrapData(data).map((item) => normalizeItem(item, type));
}

function toApiPayload(type, form) {
  const tech_stack = form.tech
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const common = {
    name: form.name,
    slug: form.slug || slugify(form.name),
    description: form.description,
    image: form.image,
    github: form.github,
    github_url: form.github,
    tech_stack,
    tech: tech_stack,
    size: form.size,
    date: form.date,
    project_date: form.date,
    category: form.category,
    featured: form.featured,
    sort_order: Number(form.sort_order || 0),
  };

  if (type === "projects") {
    return {
      ...common,
      title: form.name,
      live: form.live,
      live_url: form.live,
    };
  }

  if (type === "websites") {
    return {
      ...common,
      url: form.live,
      live: form.live,
    };
  }

  return {
    ...common,
    preview_image: form.image,
    demo_url: form.live,
    live: form.live,
    source_url: form.github,
  };
}

export async function saveItem(type, form) {
  const isEditing = Boolean(form.id);
  const url = isEditing ? `${endpoints[type]}?id=${form.id}` : endpoints[type];

  const response = await fetch(url, {
    method: isEditing ? "PUT" : "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toApiPayload(type, form)),
  });

  return parseResponse(response, `Failed to save ${collectionLabels[type]}`);
}

export async function deleteItem(type, id) {
  const response = await fetch(`${endpoints[type]}?id=${id}`, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
    },
  });

  return parseResponse(response, `Failed to delete ${collectionLabels[type]}`);
}
