import React from "react";
import StatusTag from "../components/StatusTag.jsx";
import { Ic, Logo } from "../components/ui.jsx";

export default function LoginScreen({ onEnter }) {
  return (
    <main className="login">
      <section className="login__aside" aria-label="Virtualia Condo">
        <Logo size="lg" onDark />
        <div className="login__quote">
          La administración de tu comunidad, <span>clara y bajo control</span>.
        </div>
        <div className="login__meta">
          <div className="login__stat">
            <span className="login__stat-icon">
              <Ic name="Building2" size={20} />
            </span>
            <div>
              <div className="login__stat-num">174</div>
              <div className="login__stat-label">unidades en 2 comunidades</div>
            </div>
          </div>
          <div className="login__stat">
            <span className="login__stat-icon">
              <Ic name="ShieldCheck" size={20} />
            </span>
            <div>
              <div className="login__stat-num">Instancia privada</div>
              <div className="login__stat-label">Acceso administrativo</div>
            </div>
          </div>
        </div>
      </section>

      <section className="login__main">
        <form
          className="login__card"
          onSubmit={(event) => {
            event.preventDefault();
            onEnter();
          }}
        >
          <StatusTag>Virtualia Condo</StatusTag>
          <div className="login__lock">
            <Ic name="Lock" size={13} />
            Instancia privada
          </div>
          <div>
            <h1>Acceso administrativo</h1>
            <p className="muted">
              Gestiona tu comunidad desde un panel privado.
            </p>
          </div>
          <label className="field">
            <span className="field__label">Correo</span>
            <input
              className="field__input"
              type="email"
              placeholder="usuario@virtualia.local"
              autoComplete="off"
            />
          </label>
          <label className="field">
            <span className="field__label">Contraseña</span>
            <input
              className="field__input"
              type="password"
              placeholder="••••••••"
              autoComplete="off"
            />
          </label>
          <div className="row row--between login__form-row">
            <label className="row login__remember">
              <input type="checkbox" defaultChecked />
              Recordar este equipo
            </label>
            <button type="button" className="card__link" onClick={onEnter}>
              Acceso rápido
            </button>
          </div>
          <button className="btn btn--primary btn--lg btn--block" type="submit">
            Entrar al panel
            <Ic name="ArrowRight" size={16} />
          </button>
          <div className="banner banner--teal">
            <span className="banner__icon">
              <Ic name="Info" size={16} />
            </span>
            Acceso privado · Gestión operativa centralizada.
          </div>
        </form>
      </section>
    </main>
  );
}
