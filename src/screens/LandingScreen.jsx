import React, { useEffect, useState } from "react";
import heroResidential from "../assets/landing/hero-residential-premium.png";
import mapHorizontal from "../assets/landing/condo-map-horizontal.png";
import tabletopOperations from "../assets/landing/tabletop-operations.png";
import { Ic, Logo } from "../components/ui.jsx";
import LandingPreview from "../components/LandingPreview.jsx";
import LandingMetrics from "../components/LandingMetrics.jsx";
import { useReveal } from "../lib/useReveal.js";

const navLinks = [
  { label: "Mapa visual", target: "landing-map" },
  { label: "Comite", target: "landing-committee" },
  { label: "Operacion", target: "landing-operations" },
  { label: "Portal residente", href: "#/residente" },
];

const whatsappMessage = encodeURIComponent(
  "Hola, me interesa Condo by Virtualia. Quiero recibir mas informacion.",
);
const WHATSAPP_CONTACT_URL = `https://wa.me/527443839939?text=${whatsappMessage}`;

const platformMoments = [
  {
    title: "Cobranza visible",
    body: "Saldos, comprobantes por revisar y seguimiento por unidad en una lectura clara.",
    icon: "Receipt",
  },
  {
    title: "Comite informado",
    body: "Reportes ejecutivos para revisar ingresos, egresos y estados sin rehacer hojas.",
    icon: "FileText",
  },
  {
    title: "Operacion diaria",
    body: "Mantenimiento, comunicados, amenidades y accesos dentro del mismo contexto.",
    icon: "Wrench",
  },
];

const mapHighlights = [
  { title: "Unidades ubicables", body: "Cada departamento o casa vive dentro del mapa, no en una lista aislada." },
  { title: "Capas operativas", body: "Cobranza, mantenimiento y ocupacion se leen sin mezclar responsabilidades." },
  { title: "Accion correcta", body: "El mapa guia hacia padron, cobranza o seguimiento sin crear atajos inseguros." },
];

const committeeHighlights = [
  "Resumen financiero listo para reunion.",
  "Estados y reportes derivados del mismo contexto.",
  "Exportaciones claras para compartir avances.",
];

const operationCards = [
  {
    title: "Mantenimiento",
    body: "Tickets, prioridades y seguimiento para cerrar pendientes sin perder contexto.",
    icon: "Wrench",
  },
  {
    title: "Portal residente",
    body: "Consultas y comprobantes desde unidades propias, con alcance controlado.",
    icon: "Users",
    href: "#/residente",
    cta: "Abrir portal",
  },
  {
    title: "Amenidades",
    body: "Solicitudes y calendario para areas comunes, albercas y reservas basicas.",
    icon: "CalendarCheck",
  },
  {
    title: "Comunicados",
    body: "Avisos y documentos publicados para staff y residentes.",
    icon: "Bell",
  },
  {
    title: "Accesos",
    body: "Folios, visitantes y bitacora manual para vigilancia sin exponer finanzas.",
    icon: "KeyRound",
  },
];

function scrollToSection(target) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionNav() {
  return (
    <nav className="landing-nav" aria-label="Navegacion publica">
      {navLinks.map((item) =>
        item.href ? (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ) : (
          <button key={item.label} type="button" onClick={() => scrollToSection(item.target)}>
            {item.label}
          </button>
        ),
      )}
    </nav>
  );
}

function LandingButton({ href, children, variant = "primary", ...props }) {
  return (
    <a className={`landing-btn landing-btn--${variant}`} href={href} {...props}>
      {children}
    </a>
  );
}

// Wrapper de scroll-reveal: aplica clase animada y un indice de stagger opcional.
function Reveal({ as: Tag = "div", className = "", index, style, children, ...rest }) {
  const [ref, revealClass] = useReveal();
  const mergedStyle = index != null ? { "--reveal-i": index, ...style } : style;
  return (
    <Tag ref={ref} className={`${revealClass} ${className}`.trim()} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export default function LandingScreen() {
  const scrolled = useScrolled();

  // Habilita el scroll natural del documento mientras se muestra la landing.
  useEffect(() => {
    document.documentElement.classList.add("landing-active");
    return () => document.documentElement.classList.remove("landing-active");
  }, []);

  return (
    <main className="landing-page">
      <header className={`landing-header${scrolled ? " landing-header--scrolled" : ""}`}>
        <a href="/" className="landing-logo" aria-label="Condo by Virtualia">
          <Logo />
        </a>
        <SectionNav />
        <LandingButton
          href={WHATSAPP_CONTACT_URL}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
        >
          Contacto
          <Ic name="Phone" size={16} />
        </LandingButton>
      </header>

      <section className="landing-hero" aria-labelledby="landing-title">
        <img className="landing-hero__bg" src={heroResidential} alt="" aria-hidden="true" />
        <div className="landing-hero__wash" aria-hidden="true" />

        <div className="landing-hero__grid">
          <div className="landing-hero__copy">
            <p className="landing-kicker">Backoffice residencial premium</p>
            <h1 id="landing-title">Condo by Virtualia</h1>
            <p>
              Administracion residencial con mapa visual, cobranza, reportes para comite y portal residente en una
              experiencia clara, privada y operativa.
            </p>
            <div className="landing-actions">
              <LandingButton href="#/login" variant="primary">
                Entrar al panel
                <Ic name="ArrowRight" size={16} />
              </LandingButton>
              <LandingButton href="#/dashboard" variant="secondary">
                Ver dashboard
                <Ic name="ChartPie" size={16} />
              </LandingButton>
              <LandingButton href="#/residente" variant="ghost">
                Portal residente
                <Ic name="Users" size={16} />
              </LandingButton>
            </div>
            <div className="landing-proof" aria-label="Alcance de la demo">
              <span><Ic name="Map" size={14} />Mapa visual</span>
              <span><Ic name="Wallet" size={14} />Cobranza manual</span>
              <span><Ic name="FileText" size={14} />Datos ficticios</span>
            </div>
          </div>

          <figure className="landing-hero__figure">
            <LandingPreview screen="dashboard" label="Panel de inicio de Condo con KPIs y cobranza" />
          </figure>
        </div>
      </section>

      <LandingMetrics />

      <section className="landing-section landing-platform" id="landing-platform">
        <div className="landing-feature">
          <figure className="landing-feature__media">
            <img src={tabletopOperations} alt="Mesa de administracion residencial con documentos y tablet." />
          </figure>
          <div className="landing-feature__copy">
            <span className="landing-section-label">Plataforma</span>
            <h2>Una operacion clara para administradores y comite.</h2>
            <p>
              Condo organiza cobranza, reportes y seguimiento diario en una vista comun, con estados honestos y
              accion manual cuando corresponde.
            </p>
            <div className="landing-moments">
              {platformMoments.map((item, i) => (
                <Reveal as="article" key={item.title} className="landing-moment" index={i}>
                  <span><Ic name={item.icon} size={20} /></span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section landing-map" id="landing-map">
        <Reveal className="landing-section-head">
          <span className="landing-section-label">Mapa visual</span>
          <h2>El condominio se entiende mejor cuando se ve completo.</h2>
          <p>La vista de mapa convierte unidades, amenidades y accesos en una superficie operable para cada rol.</p>
        </Reveal>
        <Reveal className="landing-preview-wrap">
          <LandingPreview screen="mapa" label="Mapa visual del condominio por capas operativas" />
        </Reveal>
        <div className="landing-highlight-grid">
          {mapHighlights.map((item, i) => (
            <Reveal as="article" key={item.title} index={i}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="landing-section landing-committee" id="landing-committee">
        <Reveal className="landing-preview-wrap landing-preview-wrap--committee">
          <LandingPreview screen="reportes" label="Reporte financiero para comite con indicadores" />
        </Reveal>
        <Reveal className="landing-committee__copy">
          <span className="landing-icon-chip"><Ic name="ShieldCheck" size={22} /></span>
          <span className="landing-section-label">Comite</span>
          <h2>Reportes que se pueden leer sin pedir otra hoja.</h2>
          <p>
            La informacion financiera se presenta con jerarquia ejecutiva, estados claros y origen consistente.
          </p>
          <div className="landing-checklist">
            {committeeHighlights.map((item) => (
              <div key={item}>
                <Ic name="FileText" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="landing-section landing-operations" id="landing-operations">
        <Reveal className="landing-section-head">
          <span className="landing-section-label">Operacion</span>
          <h2>El trabajo diario con menos friccion.</h2>
          <p>
            Los modulos se ordenan alrededor de lo que staff, comite y residentes necesitan resolver.
          </p>
        </Reveal>
        <div className="landing-ops-grid">
          <article className="landing-ops-visual">
            <img src={tabletopOperations} alt="" aria-hidden="true" />
            <div>
              <h3>Cobranza y seguimiento en contexto.</h3>
              <p>La operacion financiera convive con mantenimiento, comunicados y acceso sin romper responsabilidades.</p>
            </div>
          </article>
          {operationCards.map((item, i) => {
            const content = (
              <>
                <span className="landing-card-icon"><Ic name={item.icon} size={18} /></span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.cta ? (
                  <span className="landing-card-cta">
                    {item.cta}
                    <Ic name="ArrowRight" size={15} />
                  </span>
                ) : null}
              </>
            );
            return item.href ? (
              <Reveal as="a" className="landing-op-card" key={item.title} href={item.href} index={i}>
                {content}
              </Reveal>
            ) : (
              <Reveal as="article" className="landing-op-card" key={item.title} index={i}>
                {content}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="landing-final">
        <div>
          <span className="landing-section-label landing-section-label--invert">Siguiente paso</span>
          <h2>Listo para entrar al panel.</h2>
          <p>Revisa mapa, cobranza, reportes y operacion desde el entorno visual de Condo.</p>
          <div className="landing-actions">
            <LandingButton href="#/login" variant="light">
              Entrar al panel
              <Ic name="ArrowRight" size={16} />
            </LandingButton>
            <LandingButton
              href={WHATSAPP_CONTACT_URL}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              Contactar por WhatsApp
              <Ic name="Phone" size={16} />
            </LandingButton>
          </div>
        </div>
        <figure>
          <img src={mapHorizontal} alt="" aria-hidden="true" />
        </figure>
      </section>

      <footer className="landing-footer">
        <Logo />
        <p>Administracion residencial clara, trazable y bajo control.</p>
      </footer>
    </main>
  );
}
