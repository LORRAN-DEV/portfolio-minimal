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
  { id: "07", kind: "clinic", name: "CLÍNICA LUMI", year: "2026", type: "Institucional", tools: "Clínica · Estética · Website demonstrativo", tone: "project-visual--three", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", description: "Site demonstrativo de clínica com foco em especialidades, equipe, estrutura e agendamento." },
  { id: "08", kind: "clinic", name: "VITTA CLINIC", year: "2026", type: "Institucional", tools: "Clínica · Saúde · Website demonstrativo", tone: "project-visual--four", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85", description: "Site demonstrativo de clínica com foco institucional, apresentação e confiança." },
  { id: "09", kind: "clinic", name: "ÉLAN ESTÉTICA", year: "2026", type: "Institucional", tools: "Estética · Tratamentos · Website demonstrativo", tone: "project-visual--two", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", description: "Site demonstrativo de estética com foco em tratamentos, resultados e conversão." },
  { id: "10", kind: "clinic", name: "SANNA CLÍNICA", year: "2026", type: "Institucional", tools: "Clínica · Bem-estar · Website demonstrativo", tone: "project-visual--one", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85", description: "Site demonstrativo de clínica com foco em acolhimento, experiência e contato." },
  { id: "11", kind: "hotel", name: "FOREST RETREAT", year: "2026", type: "Institucional", tools: "Hotelaria · Hospedagem · Website demonstrativo", tone: "project-visual--one", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=85", description: "Experiência digital de hotelaria inspirada na estrutura do projeto Forest Inn." },
  { id: "12", kind: "sales", name: "DOCE ESTAÇÃO", year: "2026", type: "Landing Pages", tools: "Produto digital · Oferta · Página de vendas", tone: "project-visual--four", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=85", description: "Página de vendas demonstrativa para um produto digital fictício." },
];


function DemoExperience({ project, onBack }: { project: (typeof projects)[number]; onBack: () => void }) {
  const clinic = project.kind === "clinic";
  const hotel = project.kind === "hotel";
  const sales = project.kind === "sales";
  const brand = clinic ? project.name : hotel ? "FOREST RETREAT" : "DOCE ESTAÇÃO.";
  const nav = clinic ? ["A clínica", "Especialidades", "Estrutura", "Dúvidas"] : hotel ? ["Experiência", "Acomodações", "Galeria", "Contato"] : ["Oferta", "Conteúdo", "Bônus", "Dúvidas"];
  const navTargets = hotel ? ["#demo-part-0", "#demo-part-1", "#demo-gallery", "#demo-contact"] : sales ? ["#demo-part-0", "#demo-part-1", "#demo-bonus", "#demo-faq"] : ["#demo-part-0", "#demo-part-1", "#demo-part-2", "#demo-part-3"];
  const cards = clinic
    ? [["Estética facial", "Cuidados personalizados para realçar sua beleza natural."], ["Estética corporal", "Protocolos demonstrativos focados em bem-estar."], ["Saúde integrativa", "Uma visão ampla do cuidado e da qualidade de vida."]]
    : hotel
      ? [["Suíte Jardim", "Acomodação confortável com vista para áreas verdes."], ["Suíte Refúgio", "Um espaço acolhedor para descansar."], ["Suíte Essencial", "Praticidade e conforto para sua próxima viagem."]]
      : [["Conteúdo principal", "Materiais digitais organizados para facilitar sua rotina."], ["Ferramentas práticas", "Modelos editáveis e recursos para colocar ideias em ação."], ["Acesso imediato", "Tudo reunido em uma área digital simples de consultar."]];
  const questions = sales ? [["Como recebo o material?", "Esta área explicaria o acesso e a entrega do produto digital."], ["Preciso de experiência?", "A oferta pode apresentar orientações para iniciantes e usuários avançados."], ["Existe garantia?", "As condições reais de garantia devem ser informadas antes da publicação."]] : [["Como faço para saber mais?", "Entre em contato pelo canal de atendimento do estabelecimento."], ["Preciso agendar ou reservar?", "O fluxo pode ser conectado a um canal de atendimento real quando o projeto for personalizado."], ["Onde encontro mais informações?", "As seções desta página organizam os principais detalhes para facilitar a navegação."]];
  const featureImage = hotel ? "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85" : clinic ? "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85" : "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85";
  return <section className={"demo-site demo-site--" + project.kind} id="project-detail">
    <div className="demo-topline"><span>DEMONSTRAÇÃO INTERATIVA · DADOS FICTÍCIOS</span></div>
    <header className="demo-nav"><a href="#demo-home" className="demo-brand">{brand}</a><nav>{nav.map((item,i)=><a key={item} href={navTargets[i]}>{item}</a>)}</nav><a className="demo-nav-cta" href="#demo-contact">{sales ? "VER OFERTA" : hotel ? "CONSULTAR ESTADIA" : "AGENDAR AVALIAÇÃO"}</a></header>
    <section className="demo-hero" id="demo-home" style={{backgroundImage:"linear-gradient(90deg,rgba(0,0,0,.68),rgba(0,0,0,.12)),url("+project.image+")"}}><div className="demo-hero-copy"><span>{clinic ? "SAÚDE · ESTÉTICA · BEM-ESTAR" : hotel ? "HOSPITALIDADE · NATUREZA · CONFORTO" : "MATERIAL DIGITAL · CONTEÚDO PRÁTICO"}</span><h2>{clinic ? "Seu momento de cuidado." : hotel ? "Seu lugar para respirar." : "Ideias prontas para acontecer."}</h2><p>{clinic ? "Cuidado, beleza e bem-estar em uma experiência feita para você." : hotel ? "Um refúgio tranquilo para desacelerar e aproveitar cada momento." : "Tudo o que você precisa para transformar sua paixão em uma renda extra."}</p><a href="#demo-part-1">{sales ? "CONHECER A OFERTA" : "CONHECER A EXPERIÊNCIA"} <ArrowUpRight size={15}/></a></div><span className="demo-hero-mark">{project.id} / CONCEPT</span></section>
    <section className="demo-intro" id="demo-part-0"><span>{clinic ? "SOBRE A CLÍNICA" : hotel ? "SOBRE A EXPERIÊNCIA" : "UMA NOVA FORMA DE ORGANIZAR SUA ROTINA"}</span><h3>{clinic ? "Um espaço pensado para acolher você em cada detalhe." : hotel ? "Mais do que uma hospedagem, uma pausa no ritmo da cidade." : "O essencial reunido em um só lugar, com acesso simples e prático."}</h3><p>{clinic ? project.name + " é uma marca fictícia criada para demonstrar uma presença digital acolhedora e sofisticada. Conteúdo, equipe e serviços são ilustrativos." : hotel ? "Forest Retreat é uma marca fictícia inspirada na estrutura do projeto Forest Inn. Ambientes, acomodações e serviços não representam uma operação real." : "Doce Estação é uma oferta fictícia. Conteúdo, benefícios, preço e condições são apenas ilustrativos."}</p></section>
    <section className="demo-services" id="demo-part-1"><div className="demo-section-heading"><span>{clinic ? "ÁREAS DE CUIDADO" : hotel ? "ACOMODAÇÕES" : "O QUE VOCÊ RECEBE"}</span><h3>{clinic ? "Conheça nossas especialidades." : hotel ? "Encontre seu espaço ideal." : "Um conteúdo pensado para facilitar."}</h3></div><div className="demo-service-grid">{cards.map(([name,desc],i)=><article key={name}><span>0{i+1}</span><h4>{name}</h4><p>{desc}</p><a href="#demo-contact">SAIBA MAIS ↗</a></article>)}</div></section>
    <section className="demo-feature" id="demo-part-2"><div className="demo-feature-image" style={{backgroundImage:"url("+featureImage+")"}}/><div><span>{clinic ? "NOSSO ESPAÇO" : hotel ? "DETALHES QUE ACOLHEM" : "MATERIAL DEMONSTRATIVO"}</span><h3>{clinic ? "Conforto em cada etapa da sua jornada." : hotel ? "Uma estadia pensada para você aproveitar." : "Apresentação clara, visual e objetiva."}</h3><p>{clinic ? "Ambientes, profissionais e informações de atendimento seriam apresentados aqui com dados fornecidos pelo estabelecimento." : hotel ? "Galeria de ambientes, comodidades e informações práticas ajudam o visitante a escolher sua hospedagem." : "Imagens ilustrativas, lista de entregáveis, benefícios, bônus e uma oferta clara ajudam a explicar o valor do produto."}</p></div></section>
    {hotel && <><section className="demo-services demo-extra"><div className="demo-section-heading"><span>CONFORTO E COMODIDADES</span><h3>Pequenos detalhes, uma estadia melhor.</h3></div><div className="demo-service-grid">{[["Café da manhã","Uma seleção ilustrativa para começar bem o dia."],["Jardim e descanso","Espaços verdes para desacelerar."],["Conforto essencial","Comodidades pensadas para uma estadia tranquila."]].map(([a,b],i)=><article key={a}><span>0{i+1}</span><h4>{a}</h4><p>{b}</p></article>)}</div></section><section className="demo-gallery" id="demo-gallery"><div><span>GALERIA</span><h3>Um olhar pelos ambientes.</h3></div><div className="demo-gallery-grid"><img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=85" alt="Quarto ilustrativo"/><img src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=85" alt="Jardim ilustrativo"/><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85" alt="Ambiente ilustrativo"/></div></section><section className="demo-review"><span>AVALIAÇÕES · EXEMPLOS FICTÍCIOS</span><h3>Uma experiência que merece ser lembrada.</h3><p>“Ambiente acolhedor e uma estadia muito agradável.”</p><small>AVALIAÇÃO ILUSTRATIVA — NÃO É DE UM HÓSPEDE REAL</small></section></>}
    {clinic && <><section className="demo-review"><span>ACOLHIMENTO EM PRIMEIRO LUGAR</span><h3>Uma experiência de cuidado do primeiro contato ao atendimento.</h3><p>Apresentação da equipe, credenciais profissionais, estrutura e depoimentos podem ser incluídos com informações verificadas da clínica contratante.</p></section><section className="demo-gallery"><div><span>AMBIENTES</span><h3>Conheça nosso espaço.</h3></div><div className="demo-gallery-grid"><img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85" alt="Ambiente de bem-estar ilustrativo"/><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85" alt="Atendimento clínico ilustrativo"/><img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85" alt="Espaço de cuidado ilustrativo"/></div></section></>}
    {sales && <><section className="demo-services demo-extra"><div className="demo-section-heading"><span>VOCÊ RECEBE</span><h3>Materiais para sair da ideia e colocar em prática.</h3></div><div className="demo-service-grid">{[["Guia principal","Conteúdo organizado em etapas."],["Modelos editáveis","Arquivos para personalizar."],["Planilhas práticas","Ferramentas para organizar tarefas."],["Aulas rápidas","Orientações objetivas."],["Bônus especiais","Materiais complementares."],["Acesso digital","Consulte quando quiser."]].map(([a,b],i)=><article key={a}><span>0{i+1}</span><h4>{a}</h4><p>{b}</p></article>)}</div></section><section className="demo-review" id="demo-bonus"><span>BÔNUS DEMONSTRATIVOS</span><h3>Mais recursos para complementar sua experiência.</h3><p>Três materiais adicionais ilustrativos podem ser apresentados nesta área.</p></section><section className="demo-offer"><span>CONDIÇÃO COMERCIAL FICTÍCIA</span><h3>Uma oferta clara, com tudo explicado.</h3><p>Preço demonstrativo: R$ XX,XX</p><small>Checkout, depoimentos, escassez e garantia não são reais nesta demonstração.</small><a href="#demo-part-3">VER DÚVIDAS FREQUENTES</a></section></>}
    <section className="demo-faq" id="demo-part-3"><span>DÚVIDAS FREQUENTES</span><h3>Antes de continuar.</h3>{questions.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <section className="demo-contact" id="demo-contact"><span>{sales ? "OFERTA DEMONSTRATIVA" : "PRÓXIMO PASSO"}</span><h3>{sales ? "Conheça uma experiência de compra completa." : hotel ? "Sua próxima pausa começa aqui." : "Vamos conversar sobre seu cuidado?"}</h3><p>{sales ? "Preço, checkout, depoimentos e condições reais não são utilizados nesta demonstração." : "Este botão é ilustrativo. Nenhum agendamento ou reserva real será realizado."}</p><a href="#demo-home">{sales ? "BOTÃO DEMONSTRATIVO" : "CONTATO DEMONSTRATIVO"} <ArrowUpRight size={15}/></a></section>
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
