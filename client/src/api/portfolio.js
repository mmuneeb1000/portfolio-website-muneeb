const endpoints = {
  projects: "/api/projects.php",
  websites: "/api/websites.php",
  components: "/api/components.php",
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

function unwrapCollection(result) {
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  return [];
}

function normalizeItem(item, type) {
  return {
    id: item.id,
    name: item.name ?? item.title ?? item.slug ?? "",
    description: item.description ?? "",
    tech: normalizeTech(item.tech ?? item.tech_stack),
    github: item.github ?? item.github_url ?? item.source_url ?? "",
    live: item.live ?? item.live_url ?? item.url ?? item.demo_url ?? "",
    size: item.size ?? "",
    image: item.image ?? item.preview_image ?? "",
    date: item.date ?? item.project_date ?? "",
    category: item.category ?? type,
    slug: item.slug ?? "",
    featured: Boolean(item.featured),
  };
}

export async function fetchPortfolioCollection(type) {
  const endpoint = endpoints[type];

  if (!endpoint) {
    throw new Error(`Unknown portfolio collection: ${type}`);
  }

  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${type}`);
  }

  const result = await response.json();

  return unwrapCollection(result).map((item) => normalizeItem(item, type));
}
