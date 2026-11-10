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
  { id: "07", kind: "clinic", name: "GIO ESTÉTICA AVANÇADA", year: "2026", type: "Institucional", tools: "Clínica estética · Belém · Website demonstrativo", tone: "project-visual--three", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", description: "Experiência digital para uma clínica de estética avançada, com apresentação de tratamentos faciais e corporais, resultados, depoimentos, estrutura e contato." },
  { id: "08", kind: "clinic", name: "HELEN DAMASCENO", year: "2026", type: "Institucional", tools: "Estética avançada · Marca pessoal · Website demonstrativo", tone: "project-visual--four", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85", description: "Site de marca pessoal para profissional de estética, com autoridade, apresentação da especialista, procedimentos, resultados, dúvidas e agendamento." },
  { id: "09", kind: "clinic", name: "ESSÊNCIA — SAÚDE & BEM-ESTAR", year: "2026", type: "Institucional", tools: "Saúde integrativa · Bem-estar · Website demonstrativo", tone: "project-visual--two", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85", description: "Experiência editorial de saúde e bem-estar com identidade botânica, apresentação de equipe, áreas de cuidado, jornada personalizada e conteúdo informativo." },
  { id: "10", kind: "clinic", name: "CLÍNICA LAVANITÉ", year: "2026", type: "Institucional", tools: "Medicina integrativa · Estética avançada · Website demonstrativo", tone: "project-visual--one", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", description: "Site sofisticado para clínica de medicina integrativa e estética avançada, com áreas de cuidado, apresentação da clínica, depoimentos, FAQ e formulário de consulta." },
  { id: "11", kind: "hotel", name: "FOREST RETREAT", year: "2026", type: "Institucional", tools: "Hotelaria · Hospedagem · Website demonstrativo", tone: "project-visual--one", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=85", description: "Experiência digital de hotelaria inspirada na estrutura do projeto Forest Inn." },
  { id: "12", kind: "sales", name: "DOCE ESTAÇÃO", year: "2026", type: "Landing Pages", tools: "Produto digital · Oferta · Página de vendas", tone: "project-visual--four", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=85", description: "Página de vendas demonstrativa para um produto digital fictício." },
];


function DemoExperience({ project, onBack }: { project: (typeof projects)[number]; onBack: () => void }) {
  const hotel = project.kind === "hotel";
  const sales = project.kind === "sales";
  const demos: Record<string, { brand: string; kicker: string; hero: string; lead: string; intro: string; about: string; area: string; servicesTitle: string; cards: string[][]; feature: string; featureTitle: string; featureText: string; contact: string; image: string; nav: string[]; theme: string }> = {
    "07": { brand: "GIO", kicker: "SAÚDE · BELEZA · ESTÉTICA AVANÇADA", hero: "O tratamento estético ideal para você.", lead: "Tecnologia, cuidado e resultados em uma experiência de beleza e bem-estar.", intro: "Resultados com cuidado em cada detalhe.", about: "A GIO apresenta uma jornada de cuidado estético com tratamentos faciais e corporais, informações claras e contato facilitado. Esta é uma demonstração conceitual, sem vínculo comercial com uma clínica real.", area: "TRATAMENTOS", servicesTitle: "Conheça nossos tratamentos.", cards: [["Harmonização facial", "Procedimentos demonstrativos para realçar a beleza natural."], ["Toxina botulínica", "Informações claras sobre indicações e cuidados."], ["Preenchimento labial", "Uma apresentação visual de possibilidades estéticas."], ["Ultrassom microfocado", "Tecnologia e cuidado em protocolos personalizados."], ["Tratamentos corporais", "Opções ilustrativas para diferentes objetivos."], ["Limpeza de pele", "Rotinas de cuidado facial e bem-estar."]], feature: "RESULTADOS E EXPERIÊNCIA", featureTitle: "Cuidado, tecnologia e acolhimento.", featureText: "Galeria de resultados, depoimentos e informações sobre os procedimentos ajudam o visitante a entender a experiência antes de entrar em contato. Imagens e resultados são ilustrativos.", contact: "Agende sua avaliação.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", nav: ["A clínica", "Tratamentos", "Resultados", "Dúvidas"], theme: "gio" },
    "08": { brand: "HELEN DAMASCENO", kicker: "ESTÉTICA AVANÇADA · HARMONIZAÇÃO", hero: "Descubra sua melhor versão.", lead: "Uma experiência de cuidado que valoriza sua beleza, autoestima e individualidade.", intro: "Cuidar da sua beleza é uma missão.", about: "Uma página de marca pessoal que apresenta a profissional, sua trajetória, abordagem de atendimento e procedimentos. A identidade visual prioriza proximidade, confiança e conversão por agendamento. Perfil e credenciais são fictícios nesta demonstração.", area: "PROCEDIMENTOS", servicesTitle: "Tratamentos que elevam sua autoestima.", cards: [["Harmonização de glúteos", "Apresentação ilustrativa de procedimento e jornada."], ["Bioestimuladores de colágeno", "Conteúdo informativo sobre cuidado e firmeza da pele."], ["Preenchimento corporal", "Descrição demonstrativa de protocolos personalizados."], ["Estética facial", "Cuidados e procedimentos para o rosto."], ["Avaliação individual", "Uma jornada de atendimento personalizada."], ["Acompanhamento", "Orientações e suporte ao longo do cuidado."]], feature: "SOBRE A PROFISSIONAL", featureTitle: "Uma relação de confiança em cada etapa.", featureText: "Espaço para história profissional, formação, abordagem, estrutura e diferenciais. Todos os dados pessoais e credenciais exibidos neste conceito devem ser substituídos por informações verificadas.", contact: "Sua transformação começa com uma conversa.", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85", nav: ["Sobre", "Tratamentos", "Resultados", "Contato"], theme: "helen" },
    "09": { brand: "ESSÊNCIA", kicker: "SAÚDE · ESTÉTICA · BEM-ESTAR", hero: "Saúde e bem-estar em um cuidado integrado.", lead: "Uma abordagem acolhedora e personalizada para diferentes fases da vida.", intro: "Diferentes possibilidades de cuidado, conectadas por um mesmo olhar.", about: "Uma identidade editorial inspirada na natureza, com paleta verde profunda, tipografia elegante e espaços amplos. A experiência organiza áreas de cuidado, equipe, ambiente e informações para uma jornada mais consciente. Marca conceitual.", area: "ÁREAS DE CUIDADO", servicesTitle: "Como podemos cuidar de você?", cards: [["Saúde integrativa", "Uma visão ampla para apoiar o equilíbrio e o bem-estar."], ["Estética avançada", "Procedimentos apresentados com clareza e responsabilidade."], ["Longevidade", "Conteúdo informativo para diferentes fases da vida."], ["Terapias", "Abordagens complementares em uma jornada individual."], ["Cuidado personalizado", "Informações organizadas conforme cada necessidade."], ["Equipe multidisciplinar", "Apresentação de profissionais e especialidades."]], feature: "UM ESPAÇO PARA VOCÊ", featureTitle: "Um ambiente pensado para o seu bem-estar.", featureText: "Galeria de ambientes, apresentação da equipe e informações sobre a filosofia de cuidado reforçam a experiência acolhedora. Os serviços e profissionais são ilustrativos.", contact: "Seu cuidado começa com uma conversa.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85", nav: ["Essência", "Cuidados", "Equipe", "Contato"], theme: "essencia" },
    "10": { brand: "Clínica LaVanité", kicker: "MEDICINA INTEGRATIVA · ESTÉTICA AVANÇADA", hero: "Sua saúde. Sua melhor fase.", lead: "Cuidado individualizado que integra saúde, longevidade e estética com naturalidade.", intro: "Ciência e cuidado em cada fase da vida.", about: "Uma experiência digital sofisticada para clínica de medicina integrativa, saúde hormonal, longevidade e medicina estética. A estrutura prioriza informação, confiança e agendamento. Conteúdo e dados clínicos são demonstrativos.", area: "ÁREAS DE CUIDADO", servicesTitle: "Cuidado personalizado para cada fase da vida.", cards: [["Saúde hormonal", "Informações de cuidado individualizado e acompanhamento."], ["Longevidade e performance", "Conteúdo sobre vitalidade e qualidade de vida."], ["Medicina integrativa", "Uma visão ampla e personalizada de saúde."], ["Soroterapia", "Apresentação informativa de terapias e cuidados."], ["Medicina estética facial", "Procedimentos estéticos apresentados com clareza."], ["Medicina estética corporal", "Tecnologias e tratamentos corporais ilustrativos."]], feature: "SOBRE A CLÍNICA", featureTitle: "Uma relação de confiança, ciência e cuidado.", featureText: "Apresentação institucional, áreas de atuação, depoimentos ilustrativos, perguntas frequentes e formulário de consulta compõem a experiência. Profissionais, credenciais e informações clínicas devem ser validados antes de qualquer publicação.", contact: "Agendar minha consulta.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", nav: ["Sobre", "Tratamentos", "Dúvidas", "Contato"], theme: "lavanite" }
  };
  const config = demos[project.id];
  const brand = config?.brand ?? (hotel ? "FOREST RETREAT" : "DOCE ESTAÇÃO");
  const nav = config?.nav ?? (hotel ? ["Experiência", "Acomodações", "Galeria", "Contato"] : ["Oferta", "Conteúdo", "Bônus", "Dúvidas"]);
  const navTargets = ["#demo-part-0", "#demo-part-1", "#demo-part-2", "#demo-contact"];
  const cards = config?.cards ?? (hotel ? [["Suíte Jardim", "Acomodação confortável com vista para áreas verdes."], ["Suíte Refúgio", "Um espaço acolhedor para descansar."], ["Suíte Essencial", "Praticidade e conforto para sua próxima viagem."]] : [["Conteúdo principal", "Materiais digitais organizados para facilitar sua rotina."], ["Ferramentas práticas", "Modelos editáveis e recursos para colocar ideias em ação."], ["Acesso imediato", "Tudo reunido em uma área digital simples de consultar."]]);
  const featureImage = config?.image ?? (hotel ? "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85" : "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85");
  const questions = [["Como faço para saber mais?", "Entre em contato pelo canal de atendimento do estabelecimento."], ["Preciso agendar uma consulta?", "O fluxo pode ser conectado a um canal de atendimento real quando o projeto for personalizado."], ["Onde encontro mais informações?", "As seções desta página organizam os principais detalhes para facilitar a navegação."]];
  return <section className={"demo-site demo-site--" + project.kind + (config ? " demo-site--" + config.theme : "")} id="project-detail">
    <div className="demo-topline"><span>DEMONSTRAÇÃO INTERATIVA · PROJETO CONCEITUAL · DADOS FICTÍCIOS</span></div>
    <header className="demo-nav"><a href="#demo-home" className="demo-brand">{brand}</a><nav>{nav.map((item,i)=><a key={item} href={navTargets[i]}>{item}</a>)}</nav><a className="demo-nav-cta" href="#demo-contact">{hotel ? "CONSULTAR ESTADIA" : sales ? "VER OFERTA" : "AGENDAR CONSULTA"}</a></header>
    <section className="demo-hero" id="demo-home" style={{backgroundImage:"linear-gradient(90deg,rgba(0,0,0,.63),rgba(0,0,0,.10)),url("+project.image+")"}}><div className="demo-hero-copy"><span>{config?.kicker ?? (hotel ? "HOSPITALIDADE · NATUREZA · CONFORTO" : "MATERIAL DIGITAL · CONTEÚDO PRÁTICO")}</span><h2>{config?.hero ?? (hotel ? "Seu lugar para respirar." : "Ideias prontas para acontecer.")}</h2><p>{config?.lead ?? (hotel ? "Um refúgio tranquilo para desacelerar e aproveitar cada momento." : "Tudo o que você precisa em uma experiência digital simples.")}</p><a href="#demo-part-1">{hotel ? "CONHECER A EXPERIÊNCIA" : sales ? "CONHECER A OFERTA" : "CONHECER A CLÍNICA"} <ArrowUpRight size={15}/></a></div><span className="demo-hero-mark">{project.id} / CONCEPT</span></section>
    <section className="demo-intro" id="demo-part-0"><span>{config?.area ?? (hotel ? "SOBRE A EXPERIÊNCIA" : "SOBRE O PROJETO")}</span><h3>{config?.intro ?? (hotel ? "Mais do que uma hospedagem, uma pausa no ritmo da cidade." : "Uma experiência digital pensada para você.")}</h3><p>{config?.about ?? project.description}</p></section>
    <section className="demo-services" id="demo-part-1"><div className="demo-section-heading"><span>{config?.area ?? (hotel ? "ACOMODAÇÕES" : "O QUE VOCÊ ENCONTRA")}</span><h3>{config?.servicesTitle ?? (hotel ? "Encontre seu espaço ideal." : "Conheça os detalhes.")}</h3></div><div className="demo-service-grid">{cards.map(([name,desc],i)=><article key={name}><span>0{i+1}</span><h4>{name}</h4><p>{desc}</p><a href="#demo-contact">SAIBA MAIS ↗</a></article>)}</div></section>
    <section className="demo-feature" id="demo-part-2"><div className="demo-feature-image" style={{backgroundImage:"url("+featureImage+")"}}/><div><span>{config?.feature ?? (hotel ? "DETALHES QUE ACOLHEM" : "NOSSA EXPERIÊNCIA")}</span><h3>{config?.featureTitle ?? (hotel ? "Uma estadia pensada para você aproveitar." : "Informação clara em cada etapa.")}</h3><p>{config?.featureText ?? project.description}</p></div></section>
    <section className="demo-gallery" id="demo-gallery"><div><span>GALERIA</span><h3>{hotel ? "Um olhar pelos ambientes." : "Uma experiência visual que acolhe."}</h3></div><div className="demo-gallery-grid"><img src={featureImage} alt="Ambiente ilustrativo do projeto"/><img src={project.image} alt="Imagem ilustrativa do projeto"/><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85" alt="Detalhe de ambiente ilustrativo"/></div></section>
    <section className="demo-review"><span>EXPERIÊNCIA · CONTEÚDO ILUSTRATIVO</span><h3>{hotel ? "Uma experiência que merece ser lembrada." : "Cuidado e atenção em cada detalhe."}</h3><p>{config ? "Esta área demonstra como apresentar diferenciais, equipe e depoimentos após validação do conteúdo real do negócio." : "Informações e avaliações demonstrativas."}</p><small>PROJETO CONCEITUAL — NÃO REPRESENTA DEPOIMENTOS OU RESULTADOS REAIS</small></section>
    <section className="demo-faq" id="demo-part-3"><span>DÚVIDAS FREQUENTES</span><h3>Antes de continuar.</h3>{questions.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <section className="demo-contact" id="demo-contact"><span>PRÓXIMO PASSO</span><h3>{config?.contact ?? (hotel ? "Sua próxima pausa começa aqui." : "Vamos conversar sobre seu projeto?")}</h3><p>Este botão é ilustrativo. Nenhum agendamento, consulta ou reserva real será realizado.</p><a href="#demo-home">CONTATO DEMONSTRATIVO <ArrowUpRight size={15}/></a></section>
    <footer className="demo-footer"><span>{brand} · PROJETO CONCEITUAL</span><span>MARCA, CONTEÚDO E DADOS FICTÍCIOS · 2026</span></footer>
  </section>;
}

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
    const projectId = new URLSearchParams(window.location.search).get("project");
    if (!projectId) return;
    const project = projects.find((item) => item.id === projectId);
    if (project) setSelectedProject(project);
  }, []);


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
            {selectedProject ? (
              <button className="text-link magnetic-link intro-back-link" type="button" onClick={() => {
                setSelectedProject(null);
                window.history.replaceState(null, "", "/#projects");
                window.setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
              }}><ArrowLeft size={16} /> Voltar ao portfólio</button>
            ) : (
              <span className="explore-cue" aria-label="Explore os projetos abaixo">
                Explorar projetos <ArrowDownRight size={16} />
              </span>
            )}
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

          {selectedProject && (
            <div className="detail-tech-row project-tech-outside">
              <div>
                <p className="eyebrow">TECNOLOGIAS</p>
                <div className="detail-tech-list">{["React", "TypeScript", "CSS", "TanStack Start", "Vite"].map((tech) => <span key={tech}>{tech}</span>)}</div>
              </div>
              <button className="detail-live-button" type="button" aria-label="Ver na web — demonstração visual, link desativado">Ver na web <ArrowUpRight size={16} /></button>
            </div>
          )}
          {!selectedProject ? (
            <>
              <div className="project-grid" aria-live="polite" key={activeFilter}>
                {visibleProjects.map((project, index) => (
                  <button className="project-card project-card-button" key={project.id} type="button" style={{ animationDelay: String(index * 90) + "ms" }}
                    onClick={() => {
                      setSelectedProject(project);
                      window.history.replaceState(null, "", "/?project=" + project.id);
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
          ) : selectedProject.kind !== "portfolio" ? (
            <DemoExperience project={selectedProject} onBack={() => {
              setSelectedProject(null);
              window.history.replaceState(null, "", "/#projects");
              window.setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
            }} />
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
