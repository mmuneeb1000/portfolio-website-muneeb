import RepositoryCard from "./Card";
import usePortfolioCollection from "../hooks/usePortfolioCollection";

export default function Components() {
  const {
    items: projects,
    isLoading,
    hasError,
  } = usePortfolioCollection("components");

  return (
    <section id="components" className="px-2 py-8 md:px-4 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <p className="text-sm text-green">~/components</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Reusable UI Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Focused interface pieces and layout patterns built for responsive,
            accessible, and reusable frontend work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {isLoading && (
            <p className="text-sm text-muted">Loading directories...</p>
          )}

          {hasError && (
            <p className="text-sm text-muted">Components could not be loaded.</p>
          )}

          {!isLoading &&
            !hasError &&
            projects.map((project) => (
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
