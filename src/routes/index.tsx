import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Menu, X } from "lucide-react";

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
  { id: "01", name: "AURA", year: "2026", type: "Web Design", tools: "Estética · Wellness · Website", tone: "project-visual--one", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", description: "Experiência digital para um espaço de bem-estar e estética." },
  { id: "02", name: "NŌMA", year: "2026", type: "Institucional", tools: "Hotelaria · Hospitality · Website", tone: "project-visual--two", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", description: "Site institucional de um hotel boutique com foco em reservas." },
  { id: "03", name: "FORMA", year: "2025", type: "Web Design", tools: "Barbearia · Branding · Website", tone: "project-visual--three", image: "https://images.unsplash.com/photo-1503951914875-4521620b0b6f?auto=format&fit=crop&w=1200&q=85", description: "Presença digital para uma barbearia contemporânea." },
  { id: "04", name: "ATELIÊ", year: "2025", type: "E-commerce", tools: "Lifestyle · Loja online · UI/UX", tone: "project-visual--four", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85", description: "Loja conceito para uma marca independente de lifestyle." },
  { id: "05", name: "VÉRTICE", year: "2025", type: "Institucional", tools: "Arquitetura · Portfólio · Website", tone: "project-visual--one", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", description: "Portfólio digital para um estúdio de arquitetura." },
  { id: "06", name: "ESSENZA", year: "2025", type: "Landing Pages", tools: "Skincare · Campanha · Landing page", tone: "project-visual--two", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85", description: "Landing page de campanha para uma marca de skincare." },
];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const visibleProjects = useMemo(
    () => activeFilter === "Todos" ? projects : projects.filter((project) => project.type === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    nodes.forEach((node) => observer.observe(node));

    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let frame = 0;
    const moveCursor = (event: PointerEvent) => {
      if (!cursor || !finePointer) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      });
    };
    if (finePointer) window.addEventListener("pointermove", moveCursor, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", moveCursor);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <main className="portfolio-shell" id="top">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-follower" ref={cursorRef} aria-hidden="true" />
      <header className="topbar" data-reveal="fade">
        <a className="wordmark" href="#top" aria-label="Voltar ao início">L<span>.</span></a>
        <span className="topbar-note">PORTFOLIO / 2026</span>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>
      </header>

      <nav className={menuOpen ? "menu-panel is-open" : "menu-panel"} aria-label="Navegação principal" aria-hidden={!menuOpen}>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Projetos <ArrowUpRight size={15} /></a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Sobre <ArrowUpRight size={15} /></a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contato <ArrowUpRight size={15} /></a>
      </nav>

      <div className="content-column">
        <section className="intro-panel" data-reveal="clip">
          <p className="eyebrow">PORTFOLIO / PROJETOS SELECIONADOS</p>
          <h1><span className="title-line">Ideias transformadas</span><span className="title-line">em experiências digitais<span className="title-dot">.</span></span></h1>
          <div className="intro-bottom">
            <p>Web design, desenvolvimento de sites<br className="desktop-break" /> e landing pages com intenção.</p>
            <a className="text-link magnetic-link" href="#projects">Explorar projetos <ArrowDownRight size={16} /></a>
          </div>
          <span className="intro-index" aria-hidden="true">SCROLL TO EXPLORE ↓</span>
        </section>

        <section className="projects-section" id="projects" data-reveal="fade">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / TRABALHOS</p>
              <h2>Projetos construídos<br />com intenção.</h2>
            </div>
            <span className="project-count" key={visibleProjects.length}>({String(visibleProjects.length).padStart(2, "0")})</span>
          </div>

          {!selectedProject && <div className="filter-area">
            <p className="eyebrow">DISCIPLINAS</p>
            <div className="filter-list" role="group" aria-label="Filtrar projetos por categoria">
              {filters.map((filter) => (
                <button key={filter} type="button" className={activeFilter === filter ? "filter-chip is-active" : "filter-chip"} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>
                  {filter}
                </button>
              ))}
            </div>
          </div>}

          {!selectedProject ? (
            <>
              <div className="project-grid" aria-live="polite" key={activeFilter}>
                {visibleProjects.map((project, index) => (
                  <button className="project-card project-card-button" key={project.id} type="button" style={{ animationDelay: String(index * 90) + "ms" }}
                    onClick={() => {
                      setSelectedProject(project);
                      window.history.replaceState(null, "", "#project-" + project.id);
                      window.setTimeout(() => document.getElementById("project-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                    }}
                    aria-label={"Ver detalhes do projeto " + project.name}>
                    <span className={"project-visual " + project.tone}>
                      <img className="project-image" src={project.image} alt={project.description} loading="lazy" />
                      <span className="visual-index">PROJECT / {project.id}</span>
                      <span className="concept-stamp">CONCEPT PROJECT</span>
                      <span className="visual-corner"><ArrowUpRight size={19} strokeWidth={1.3} /></span>
                      <span className="visual-scan" aria-hidden="true" />
                    </span>
                    <span className="project-meta">
                      <span>
                        <span className="project-card-title">{project.name}</span>
                        <span className="project-card-tools">{project.tools}</span>
                      </span>
                      <span className="project-year">{project.year}</span>
                    </span>
                    <span className="project-category">{project.type}</span>
                  </button>
                ))}
              </div>
              <p className="content-note">PROJETOS CONCEITUAIS — marcas e experiências fictícias criadas apenas para demonstrar possibilidades de design.</p>
            </>
          ) : (
            <section className="project-detail" id="project-detail" aria-live="polite">
              <button className="detail-back" type="button" onClick={() => {
                setSelectedProject(null);
                window.history.replaceState(null, "", "#projects");
                window.setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
              }}>
                <ArrowLeft size={15} /> Voltar para todos os projetos
              </button>
              <div className="detail-heading">
                <div>
                  <p className="eyebrow">PROJECT / {selectedProject.id} — CONCEPT</p>
                  <h2>{selectedProject.name}<span>.</span></h2>
                  <p className="detail-subtitle">{selectedProject.tools}</p>
                </div>
                <span className="detail-year">{selectedProject.year}</span>
              </div>
              <div className={"detail-hero " + selectedProject.tone}>
                <img src={selectedProject.image} alt={"Imagem principal do conceito " + selectedProject.name} />
                <span className="concept-stamp">CONCEPT PROJECT · ESTUDO VISUAL</span>
              </div>
              <div className="detail-overview">
                <div>
                  <p className="eyebrow">VISÃO GERAL</p>
                  <h3>{selectedProject.description}</h3>
                </div>
                <p>Um estudo conceitual de presença digital que explora direção de arte, hierarquia de informação e uma experiência de navegação pensada para o público da marca.</p>
              </div>
              <div className="detail-information">
                <article>
                  <p className="eyebrow">01 / OBJETIVO</p>
                  <p>Criar uma apresentação digital clara e memorável, destacando a identidade do negócio e conduzindo o visitante às informações mais importantes.</p>
                </article>
                <article>
                  <p className="eyebrow">02 / DIREÇÃO CRIATIVA</p>
                  <p>Composição editorial, imagens protagonistas, tipografia expressiva e interações sutis para equilibrar personalidade visual e facilidade de uso.</p>
                </article>
                <article>
                  <p className="eyebrow">03 / EXPERIÊNCIA</p>
                  <p>Navegação responsiva, conteúdo organizado por prioridade e pontos de contato visíveis para facilitar a jornada do visitante.</p>
                </article>
              </div>
              <div className="detail-gallery">
                <div className="detail-gallery-image">
                  <img src={selectedProject.image} alt={"Detalhe visual do projeto " + selectedProject.name} loading="lazy" />
                </div>
                <div className="detail-gallery-caption">
                  <span>VISUAL DIRECTION / {selectedProject.name}</span>
                  <span>ESTUDO CONCEITUAL</span>
                </div>
              </div>
              <div className="detail-bottom">
                <p className="eyebrow">GOSTOU DA DIREÇÃO?</p>
                <h3>Vamos criar algo<br />para sua marca<span>?</span></h3>
                <a className="contact-link" href="#contact">Iniciar um projeto <ArrowUpRight size={17} /></a>
              </div>
            </section>
          )}
        </section>

        <section className="about-section" id="about" data-reveal="fade">
          <p className="eyebrow">02 / SOBRE</p>
          <div className="about-content">
            <h2>Design claro.<br />Experiências que<br />fazem sentido.</h2>
            <p>Desenvolvimento de experiências digitais para marcas e negócios. Do conceito à publicação, cada detalhe é pensado para unir estética, clareza e funcionalidade.</p>
          </div>
        </section>

        <footer className="contact-section" id="contact" data-reveal="clip">
          <div>
            <p className="eyebrow">03 / CONTATO</p>
            <h2>Tem um projeto<br />em mente<span>?</span></h2>
          </div>
          <a className="contact-link magnetic-link" href="mailto:seuemail@exemplo.com">Vamos conversar <ArrowUpRight size={18} /></a>
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
