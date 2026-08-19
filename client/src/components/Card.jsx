export default function RepositoryCard({
  item,
  directory = true,
  showLive = true,
  showGithub = true,
}) {
  const name = `${item.name}${directory ? "/" : ""}`;

  return (
    <div className="repo-card overflow-hidden rounded-lg border border-border bg-surface2 hover:border-green">
      {item.image && item.live && (
        <a
          href={item.live}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden border-b border-border bg-black"
        >
          <div className="aspect-[4/3] overflow-hidden sm:aspect-video">
            <img
              src={item.image}
              alt={`${item.name} website screenshot`}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </a>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between gap-4 md:grid md:grid-cols-[90px_70px_minmax(0,1fr)_120px]">
          <span className="hidden text-xs text-muted md:block">
            {directory ? "drwxr-xr-x" : "-rw-r--r--"}
          </span>

          <span className="hidden text-xs text-muted md:block">
            {item.size}
          </span>

          {showLive && item.live ? (
            <a
              href={item.live}
              target="_blank"
              rel="noreferrer"
              className="min-w-0 truncate text-sm font-medium text-text"
            >
              {name}
            </a>
          ) : (
            <span className="min-w-0 truncate text-sm font-medium text-text">
              {name}
            </span>
          )}

          <span className="shrink-0 text-xs text-muted md:text-right">
            {item.date}
          </span>
        </div>

        <p className="my-3 text-[13px] text-text">
          <span className="text-green"># </span>
          {item.description}
        </p>

        {!!item.tech?.length && (
          <div className="mb-3 flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="tech-pill rounded border border-border bg-green-muted px-2 py-1 text-[11px] text-green"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-5">
          {showGithub && item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-green hover:text-text"
            >
              $ git clone →
            </a>
          )}

          {showLive && item.live && (
            <a
              href={item.live}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-green hover:text-text"
            >
              $ open live →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
