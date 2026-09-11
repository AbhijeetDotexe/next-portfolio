"use client";

import { useState } from "react";
import WorkCard from "@/components/WorkCard";
import ScrollReveal from "@/components/ScrollReveal";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";

export default function ProjectFilter() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = PROJECTS.filter(
    (project) =>
      activeFilter === "all" || project.tags.includes(activeFilter),
  );

  return (
    <>
      <ScrollReveal className="chips" style={{ marginTop: "36px" }}>
        {PROJECT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`chip ${activeFilter === category.id ? "active" : ""}`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </ScrollReveal>

      <section style={{ paddingTop: "24px" }}>
        <div className="container work-stack">
          {filteredProjects.map((project, idx) => (
            <WorkCard
              key={project.slug}
              project={project}
              delay={`${idx * 0.1}s`}
              detail
            />
          ))}
        </div>
      </section>
    </>
  );
}
