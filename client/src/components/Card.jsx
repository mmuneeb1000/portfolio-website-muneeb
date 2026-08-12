import { motion } from "motion/react";

export default function RepositoryCard({
  item,
  directory = true,
  showLive = true,
  showGithub = true,
}) {
  const name = `${item.name}${directory ? "/" : ""}`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="overflow-hidden rounded-lg border border-border bg-surface2 hover:border-green"
    >
      {item.image && item.live && (
        <a
          href={item.live}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden border-b border-border bg-black"
        >
          <div className="aspect-[4/3] overflow-hidden sm:aspect-video">
            <motion.img
              src={item.image}
              alt={`${item.name} website screenshot`}
              loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
            <motion.a
              href={item.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.18 }}
              className="min-w-0 truncate text-sm font-medium text-text"
            >
              {name}
            </motion.a>
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
              <motion.span
                key={tech}
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ duration: 0.15 }}
                className="rounded border border-border bg-green-muted px-2 py-1 text-[11px] text-green"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-5">
          {showGithub && item.github && (
            <motion.a
              href={item.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="text-xs text-green hover:text-text"
            >
              $ git clone →
            </motion.a>
          )}

          {showLive && item.live && (
            <motion.a
              href={item.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="text-xs text-green hover:text-text"
            >
              $ open live →
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
