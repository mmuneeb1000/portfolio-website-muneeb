import { motion } from "motion/react";

export default function RepositoryCard({
  item,
  directory = true,
  showLive = true,
  showGithub = true,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="rounded-lg border border-border bg-surface2 p-4 transition-colors hover:border-green"
    >
      <div className="md:grid md:grid-cols-[80px_60px_1fr_120px] md:gap-4">
        <div className="mb-2 flex items-center justify-between md:mb-0 md:contents">
          <span className="text-xs text-muted">
            {directory ? "drwxr-xr-x" : "-rw-r--r--"}
          </span>

          <span className="text-xs text-muted md:hidden">{item.date}</span>
        </div>

        <div className="flex items-center justify-between md:contents">
          <span className="mr-8 text-xs text-muted">{item.size}</span>

          {showLive ? (
            <motion.a
              href={item.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                x: 4,
              }}
              transition={{
                duration: 0.18,
              }}
              className="text-right font-medium text-text lg:text-left"
            >
              {item.name}
              {directory && "/"}
            </motion.a>
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

      <p className="mb-3 mt-3 text-[13px] text-text">
        <span className="text-green"># </span>
        {item.description}
      </p>

      {item.tech?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{
                y: -2,
                scale: 1.03,
              }}
              transition={{
                duration: 0.15,
              }}
              className="tech-pill rounded border border-border bg-green-muted px-2 py-1 text-[11px] text-green"
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
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              duration: 0.18,
            }}
            className="text-xs text-green transition-colors hover:text-text"
          >
            $ git clone →
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
