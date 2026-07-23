import React, { useEffect, useState } from "react";
import RepositoryCard from "./Card";
import componentsInfo from "../data/components.json";

export default function Components() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProjects(componentsInfo);
    setLoading(false);
  }, []);

  return (
    <section id="components" className="mb-8">
      <h2 className="mb-6">~/components</h2>

      {loading ? (
        <p className="text-muted">fetching...</p>
      ) : (
        <div>
          <div className="mb-3 hidden grid-cols-[80px_60px_1fr_120px] gap-4 border-b border-border pb-2 text-xs text-muted md:grid">
            <span>perms</span>
            <span>size</span>
            <span>name</span>
            <span className="text-right">modified</span>
          </div>

          {projects.map((project) => (
            <RepositoryCard key={project.id} item={project} />
          ))}

          <p className="mt-4 text-xs text-muted">
            {projects.length} directories
          </p>
        </div>
      )}
    </section>
  );
}
