import RepositoryCard from "./Card";
import usePortfolioCollection from "../hooks/usePortfolioCollection";

export default function Websites() {
  const {
    items: websites,
    isLoading,
    hasError,
  } = usePortfolioCollection("websites");

  return (
    <section id="websites" className="px-2 py-8 md:px-4 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <p className="text-sm text-green">~/websites</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Production Websites
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Live websites and client-ready builds focused on performance,
            responsive layouts, content systems, and polished user experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {isLoading && (
            <p className="text-sm text-muted">Loading directories...</p>
          )}

          {hasError && (
            <p className="text-sm text-muted">Websites could not be loaded.</p>
          )}

          {!isLoading &&
            !hasError &&
            websites.map((website) => (
              <div key={website.id} className="min-w-0">
                <RepositoryCard item={website} />
              </div>
            ))}
        </div>

        <p className="mt-3 text-xs text-muted">
          {websites.length} directories
        </p>
      </div>
    </section>
  );
}
