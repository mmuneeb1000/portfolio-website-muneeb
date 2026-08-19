import RepositoryCard from "./Card";
import projects from "../data/projects.json";

export default function Projects() {
  return (
    <section id="projects" className="px-2 py-8 md:px-4 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <p className="text-sm text-green">~/projects</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Web Application Projects
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Interactive apps, dashboards, tools, and frontend builds that show
            practical problem solving with modern JavaScript and React.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="min-w-0">
              <RepositoryCard item={project} />
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted">
          {projects.length} directories
        </p>
      </div>
    </section>
  );
}
