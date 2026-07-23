export default function RepositoryCard({
  item,
  directory = true,
  showLive = true,
  showGithub = true,
}) {
  return (
    <div className="repo-card mb-4 rounded-md border border-border bg-surface p-4">
      <div className="grid gap-2 md:grid-cols-[60px_60px_1fr_120px] md:items-center md:gap-4">
        <div className="flex items-center justify-between md:contents">
          <span className="text-xs text-green">
            {directory ? "drwxr-xr-x" : "-rw-r--r--"}
          </span>

          <span className="text-xs text-muted md:hidden">{item.date}</span>
        </div>

        <div className="flex items-center justify-between md:contents">
          <span className="mr-8 text-xs text-muted">{item.size}</span>

          {showLive ? (
            <a
              href={item.live}
              target="_blank"
              rel="noreferrer"
              className="font-medium  text-text text-right lg:text-left"
            >
              {item.name}
              {directory && "/"}
            </a>
          ) : (
            <span className="font-medium text-text">
              {item.name}
              {directory && "/"}
            </span>
          )}

          <span className="hidden text-right text-xs text-muted md:block">
            {item.date}
          </span>
        </div>
      </div>

      <p className="mt-4 mb-3 text-[13px] text-text">
        <span className="text-green"># </span>
        {item.description}
      </p>

      {item.tech?.length > 0 && (
        <div className=" mb-4 flex flex-wrap gap-2">
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
            className="text-xs text-green transition-colors hover:text-text"
          >
            $ git clone →
          </a>
        )}
      </div>
    </div>
  );
}
