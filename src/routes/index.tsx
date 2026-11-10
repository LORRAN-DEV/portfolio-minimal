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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const id = project.id;
  const demos: Record<string, any> = {
    "07": { brand:"GIO", title:"O tratamento estético ideal para você em Belém", kicker:"Bem-vinda à GIO Estética Avançada Belém", palette:"gio", hero:"https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1100&q=85", intro:"Resultados rápidos, duradouros e seguros", servicesTitle:"Tratamentos faciais", services:["Harmonização facial","Toxina botulínica","Preenchimento labial","Preenchimento dérmico","Ultrassom","Lavieen","Limpeza de pele ultrassônica","GIObooster","Microagulhamento com Smart Derma Pen","Peeling","Radiofrequência facial"], body:["Emagrecimento avançado","Tratamento corporal para celulite e estrias","Drenagem linfática","Radiofrequência corporal","Harmonização de glúteos","Estética masculina"], phone:"(91) 98888-2026",email:"contato@gio-demo.com.br",person:"Marina Costa",address:"Av. Visconde de Souza Franco, 500 — Umarizal, Belém — PA",map:"Umarizal, Belém, Pará, Brasil", gallery:["https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=85"] },
    "08": { brand:"HD | HELEN DAMASCENO",title:"Descubra a sua melhor versão com Helen Damasceno",kicker:"Helen Damasceno",palette:"helen",hero:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",intro:"Cuidar da sua beleza é minha missão",servicesTitle:"Tratamentos que elevam sua autoestima",services:["Harmonização de Glúteos","Bioestimuladores de Colágeno","Preenchimento Corporal","Harmonização facial","Toxina botulínica","Estética corporal"],phone:"(91) 98425-4100",email:"agenda@helendamasceno.demo",person:"Helen Damasceno",address:"Rua dos Mundurucus, 1200 — Batista Campos, Belém — PA",map:"Batista Campos, Belém, Pará, Brasil",gallery:["https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85"] },
    "09": {brand:"essência",title:"Saúde, estética e bem-estar em um cuidado integrado.",kicker:"SAÚDE INTEGRADA",palette:"essencia",hero:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",intro:"Diferentes possibilidades de cuidado, conectadas por um mesmo olhar.",servicesTitle:"Conheça a equipe médica Essência",services:["Saúde hormonal","Saúde integrativa","Longevidade","Estética avançada","Terapias complementares","Bem-estar"],phone:"(91) 98222-3030",email:"acolhimento@essencia.demo",person:"Dra. Laura Mendes",address:"Alameda das Flores, 85 — Nazaré, Belém — PA",map:"Nazaré, Belém, Pará, Brasil",gallery:["https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85"]},
    "10": {brand:"Clínica LaVanité",title:"Sua saúde. Sua melhor fase.",kicker:"MEDICINA INTEGRATIVA E ESTÉTICA AVANÇADA",palette:"lavanite",hero:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85",intro:"Ciência e cuidado em cada fase da vida.",servicesTitle:"Cuidado personalizado para cada fase da vida",services:["Saúde Hormonal","Longevidade & Performance","Medicina Integrativa","Soroterapia","Medicina Estética Facial","Medicina Estética Corporal"],phone:"(91) 98111-4040",email:"consultas@lavanite.demo",person:"Dra. Clara Oliveira",address:"Av. Braz de Aguiar, 350 — Nazaré, Belém — PA",map:"Nazaré, Belém, Pará, Brasil",gallery:["https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85"]}
  };
  const d = demos[id];
  if (!d) return <section className="demo-site" id="project-detail"><button onClick={onBack}>Voltar ao portfólio</button><h2>{project.name}</h2></section>;
  const faq = [["Preciso fazer uma avaliação antes do tratamento?","Sim. A avaliação individual é importante para conhecer objetivos, histórico e possibilidades de cuidado."],["Os procedimentos são dolorosos?","A sensação varia conforme o procedimento. A equipe explica os cuidados e o que esperar antes de qualquer decisão."],["Como posso agendar?","Entre em contato pelos canais demonstrativos desta página."],["Onde a clínica está localizada?","O endereço e o mapa são fictícios e foram criados apenas para esta demonstração."]];
  return <section className={"demo-site demo-clinic-rebuilt demo-"+d.palette} id="project-detail">
    <div className="clinic-demo-strip">PROJETO CONCEITUAL · INFORMAÇÕES, PROFISSIONAIS, CONTATOS E ENDEREÇO FICTÍCIOS</div>
    <header className="clinic-demo-nav"><a href="#clinic-home" className="clinic-demo-logo">{d.brand}</a><nav>{(id==="07"?["Home","Resultados","Tratamentos","A clínica"]:id==="08"?["Sobre","Tratamentos","Por que","Perguntas frequentes","Contato"]:id==="09"?["O espaço","Tratamentos","Equipe médica","Dúvidas"]:["Sobre","Tratamentos","Dúvidas"]).map((n,i)=><a key={n} href={["#clinic-home","#clinic-services","#clinic-about","#clinic-faq","#clinic-contact"][i]}>{n}</a>)}</nav><a className="clinic-demo-cta" href="#clinic-contact">{id==="07"?"Agende seu horário":"Agendar consulta"}</a></header>
    <section className="clinic-demo-hero" id="clinic-home"><div><small>{d.kicker}</small><h1>{d.title}</h1><p>{id==="07"?"Na GIO Belém, você encontra tratamentos estéticos com cuidado, tecnologia e atenção em um ambiente preparado para o seu conforto.":id==="08"?"Com mais de 15 anos de experiência demonstrativa, apresentamos uma jornada de estética, autoestima e cuidado individual.":id==="09"?"Um olhar integrado para saúde, estética e qualidade de vida, respeitando a individualidade de cada pessoa.":"Na LaVanité, unimos medicina integrativa, saúde hormonal, longevidade e estética em uma experiência individualizada."}</p><a href="#clinic-contact">{id==="07"?"Chamar no WhatsApp":"Agende sua consulta"}</a></div><img src={d.hero} alt="Imagem ilustrativa do projeto"/></section>
    {id==="07" ? <><section className="clinic-results"><h2>{d.intro}</h2><div>{d.gallery.map((im,i)=><article key={im}><small>{["Preenchimento labial","Toxina botulínica","Ultrassom"][i]}</small><img src={im} alt="Imagem ilustrativa de tratamento"/><footer>ANTES <span>DEPOIS</span></footer></article>)}</div></section><section className="clinic-demo-services gio-services" id="clinic-services"><h2>Tratamentos faciais</h2><div>{d.services.map((s,i)=><article key={s}><i>{["♧","♙","✧","◎","♧","♙","✥","♧","◎","♙","✧"][i]}</i><h3>{s}</h3><p>Informações sobre o procedimento, avaliação e cuidados personalizados.</p><a href="#clinic-contact">Saiba mais</a></article>)}</div></section><section className="clinic-demo-body"><h2>Tratamentos corporais</h2><p>Cuidados e tecnologias para diferentes objetivos, com avaliação individualizada.</p><div><img src={d.gallery[1]} alt="Tratamento corporal ilustrativo"/><div>{d.body.map(s=><article key={s}><b>{s}</b><p>Conheça as possibilidades deste tratamento.</p></article>)}</div></div></section></> : null}
    {id==="08" ? <><section className="helen-proof"><article><b>+15 anos</b><span>de experiência</span></article><article><b>+1200</b><span>pacientes atendidos*</span></article><article><b>98%</b><span>de satisfação*</span></article><small>*Indicadores fictícios para demonstração.</small></section><section className="clinic-split" id="clinic-about"><img src={d.gallery[0]} alt="Ambiente ilustrativo"/><div><h2>Cuidar da sua beleza é minha missão</h2><p>Sou Helen Damasceno, profissional fictícia criada para demonstrar uma presença digital de marca pessoal. Aqui você encontra uma apresentação da trajetória, abordagem e tratamentos.</p><a href="#clinic-contact">Agende sua avaliação</a></div></section><section className="clinic-demo-services" id="clinic-services"><h2>{d.servicesTitle}</h2><p>Procedimentos apresentados com informação e cuidado.</p><div>{d.services.map((s,i)=><article key={s}><img src={d.gallery[i%d.gallery.length]} alt="Imagem ilustrativa"/><h3>{s}</h3><p>Conheça as possibilidades e tire suas dúvidas em uma avaliação.</p></article>)}</div></section><section className="clinic-split helen-video"><div><h2>Sua transformação começa agora</h2><p>Agende uma conversa e conheça a proposta de atendimento.</p><a href="#clinic-contact">Agendar consulta</a></div><div className="clinic-video-placeholder">Vídeo de apresentação</div></section></> : null}
    {id==="09" ? <><div className="essence-subnav">SAÚDE INTEGRATIVA　 ·　 ESTÉTICA AVANÇADA　 ·　 LONGEVIDADE</div><section className="clinic-split essence-intro" id="clinic-about"><img src={d.gallery[2]} alt="Pessoa em ambiente de bem-estar"/><div><small>UM OLHAR INTEGRADO</small><h2>{d.intro}</h2><p>Uma experiência pensada para acolher cada pessoa, considerando saúde, estética e bem-estar como partes de uma mesma jornada.</p><a href="#clinic-services">Conheça nosso cuidado ↗</a></div></section><section className="essence-space"><small>O ESPAÇO</small><h2>Um espaço pensado para o seu bem-estar.</h2><div>{d.gallery.map(im=><img key={im} src={im} alt="Ambiente ilustrativo"/></div></section><section className="clinic-demo-services" id="clinic-services"><h2>{d.servicesTitle}</h2><div>{d.services.map((s,i)=><article key={s}><h3>{s}</h3><p>Uma abordagem individualizada com atenção à sua jornada de cuidado.</p><a href="#clinic-contact">Saiba mais →</a></article>)}</div></section><section className="essence-cta"><h2>Um cuidado mais completo pode começar agora.</h2><a href="#clinic-contact">Agendar avaliação ↗</a></section></> : null}
    {id==="10" ? <><section className="clinic-split" id="clinic-about"><img src={d.gallery[0]} alt="Consulta ilustrativa"/><div><small>SOBRE A CLÍNICA</small><h2>Ciência e cuidado em cada fase da vida.</h2><p>Na LaVanité, cada paciente é recebido com atenção individualizada, considerando sua história, seus objetivos e sua fase de vida.</p></div></section><section className="clinic-demo-services" id="clinic-services"><small>ÁREAS DE CUIDADO</small><h2>{d.servicesTitle}</h2><p>Uma abordagem que integra saúde, longevidade, performance e estética.</p><div>{d.services.map((s,i)=><article key={s}><span>—</span><h3>{s}</h3><p>Estratégias e cuidados personalizados para seus objetivos e qualidade de vida.</p><a href="#clinic-contact">Saiba mais →</a></article>)}</div></section><section className="lavanite-reviews"><h2>O que nossas pacientes dizem</h2><div>{["Atendimento cuidadoso e acolhedor.","Fui muito bem orientada em todas as etapas.","Me senti cuidada em cada detalhe."].map((s,i)=><article key={i}>“<p>{s}</p><small>RELATO FICTÍCIO · PACIENTE {i+1}</small></article>)}</div></section></> : null}
    <section className="clinic-faq" id="clinic-faq"><h2>{id==="08"?"Dúvidas":id==="09"?"Como podemos cuidar de você?":"Perguntas frequentes"}</h2>{faq.map(([q,a],i)=><article key={q} className={openFaq===i?"is-open":""}><button onClick={()=>setOpenFaq(openFaq===i?null:i)}>{q}<span>{openFaq===i?"−":"＋"}</span></button>{openFaq===i&&<p>{a}</p>}</article>)}</section>
    <section className="clinic-contact" id="clinic-contact"><h2>{id==="09"?"Um cuidado mais completo pode começar agora.":id==="10"?"Agendar Minha Consulta":"Entre em contato"}</h2><p>Preencha os dados demonstrativos ou utilize os canais fictícios abaixo.</p><div className="clinic-contact-grid"><form onSubmit={e=>e.preventDefault()}><input placeholder="Seu nome"/><input placeholder="Seu e-mail"/><input placeholder="Seu telefone / WhatsApp"/><textarea placeholder="Como podemos ajudar?"/><button type="submit">Enviar mensagem</button></form><aside><h3>Informações de contato</h3><p>⌖ {d.address}</p><p>☎ {d.phone}</p><p>✉ {d.email}</p><p>◎ @{d.person.toLowerCase().replaceAll(" ",".")}</p><small>Dados inteiramente fictícios para demonstração.</small></aside></div><div className="clinic-map"><iframe title={"Mapa demonstrativo de "+d.brand} src={"https://maps.google.com/maps?q="+encodeURIComponent(d.map)+"&z=14&output=embed"} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><small>Localização ilustrativa — {d.address}</small></div></section>
    <footer className="clinic-demo-footer"><b>{d.brand}</b><span>{d.phone}　·　{d.email}</span><small>© 2026 · PROJETO CONCEITUAL · NOMES, TELEFONES, E-MAILS, ENDEREÇOS, MAPA E INDICADORES FICTÍCIOS</small><button onClick={onBack}>← Voltar ao portfólio</button></footer>
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
