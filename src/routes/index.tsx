import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Web Design & Development" },
      { name: "description", content: "Projetos selecionados de web design, desenvolvimento de sites e landing pages." },
      { property: "og:title", content: "Portfolio — Web Design & Development" },
      { property: "og:description", content: "Projetos selecionados de web design e desenvolvimento." },
    ],
  }),
  component: Portfolio,
});

const filters = ["Todos", "Web Design", "Landing Pages", "E-commerce", "Institucional"];

const projects = [
  { id: "01", name: "Projeto em destaque", year: "2026", type: "Web Design", tools: "Design · Desenvolvimento", tone: "project-visual--one", note: "Substitua pela imagem do seu projeto" },
  { id: "02", name: "Projeto em destaque", year: "2026", type: "Landing Pages", tools: "Landing page · Conversão", tone: "project-visual--two", note: "Substitua pela imagem do seu projeto" },
  { id: "03", name: "Projeto em destaque", year: "2025", type: "Institucional", tools: "Website · Responsivo", tone: "project-visual--three", note: "Substitua pela imagem do seu projeto" },
  { id: "04", name: "Projeto em destaque", year: "2025", type: "E-commerce", tools: "E-commerce · UI/UX", tone: "project-visual--four", note: "Substitua pela imagem do seu projeto" },
];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(
    () => activeFilter === "Todos" ? projects : projects.filter((project) => project.type === activeFilter),
    [activeFilter],
  );

  return (
    <main className="portfolio-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Voltar ao início">L<span>.</span></a>
        <span className="topbar-note">PORTFOLIO / 2026</span>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="menu-panel" aria-label="Navegação principal">
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projetos <ArrowUpRight size={15} /></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Sobre <ArrowUpRight size={15} /></a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contato <ArrowUpRight size={15} /></a>
        </nav>
      )}

      <div className="content-column" id="top">
        <section className="intro-panel">
          <p className="eyebrow">PORTFOLIO / PROJETOS SELECIONADOS</p>
          <h1>Ideias transformadas<br />em experiências digitais<span>.</span></h1>
          <div className="intro-bottom">
            <p>Web design, desenvolvimento de sites<br className="desktop-break" /> e landing pages com intenção.</p>
            <a className="text-link" href="#projects">Explorar projetos <ArrowDownRight size={16} /></a>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / TRABALHOS</p>
              <h2>Projetos construídos<br />com intenção.</h2>
            </div>
            <span className="project-count">({String(visibleProjects.length).padStart(2, "0")})</span>
          </div>

          <div className="filter-area">
            <p className="eyebrow">DISCIPLINAS</p>
            <div className="filter-list" role="group" aria-label="Filtrar projetos por categoria">
              {filters.map((filter) => (
                <button key={filter} type="button" className={activeFilter === filter ? "filter-chip is-active" : "filter-chip"} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid" aria-live="polite">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className={`project-visual ${project.tone}`}>
                  <span className="visual-index">PROJECT / {project.id}</span>
                  <div className="visual-placeholder">
                    <span>IMAGE</span>
                    <small>{project.note}</small>
                  </div>
                  <span className="visual-corner">↗</span>
                </div>
                <div className="project-meta">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.tools}</p>
                  </div>
                  <span className="project-year">{project.year}</span>
                </div>
                <span className="project-category">{project.type}</span>
              </article>
            ))}
          </div>
          <p className="content-note">Os espaços acima são marcadores temporários para inserir as imagens e informações dos seus projetos reais.</p>
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">02 / SOBRE</p>
          <div className="about-content">
            <h2>Design claro.<br />Experiências que<br />fazem sentido.</h2>
            <p>Desenvolvimento de experiências digitais para marcas e negócios. Do conceito à publicação, cada detalhe é pensado para unir estética, clareza e funcionalidade.</p>
          </div>
        </section>

        <footer className="contact-section" id="contact">
          <div>
            <p className="eyebrow">03 / CONTATO</p>
            <h2>Tem um projeto<br />em mente<span>?</span></h2>
          </div>
          <a className="contact-link" href="mailto:seuemail@exemplo.com">Vamos conversar <ArrowUpRight size={18} /></a>
          <div className="footer-bottom">
            <span>© 2026 — PORTFOLIO</span>
            <span>DESIGN & DEVELOPMENT</span>
            <a href="#top">VOLTAR AO TOPO ↑</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
