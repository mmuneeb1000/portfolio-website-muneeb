import React, { useEffect, useState } from "react";
import RepositoryCard from "./Card";
import projectsInfo from "../data/projects.json";
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProjects(projectsInfo);
    setLoading(false);
  }, []);

  return (
    <section id="projects" className="my-8">
      <h2 className="mb-6">~/projects</h2>

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
