export default function DraftPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-section py-10 md:py-16">
        {/* =================================================
            HEADER
            ================================================= */}

        <header className="mb-14 max-w-3xl">
          <div className="quest-eyebrow">BStudent UI Playground</div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Game UI
            <span className="text-brand-secondary">.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-muted">
            Un linguaggio visivo ispirato a pergamene, libri antichi e materiali
            naturali, mantenendo la leggibilità e la semplicità di BStudent.
          </p>
        </header>

        {/* =================================================
            BUTTONS
            ================================================= */}

        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
              01 / Interaction
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">Buttons</h2>

            <p className="mt-2 text-sm text-brand-muted">
              I pulsanti sono gli elementi che hanno una risposta fisica:
              rilievo, bordo, crepe e pressione.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button className="btn-primary">
              Continua
              <span aria-hidden>→</span>
            </button>

            <button className="btn-secondary">Indietro</button>

            <button className="btn-tertiary">Scopri di più →</button>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-5">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-muted">
              Existing classes / states
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <button className="btn-primary">Default</button>

              <button className="btn-primary">Hover</button>

              <button className="btn-primary">Active</button>

              <button className="btn-primary" disabled>
                Disabled
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            CARDS / PARCHMENT
            ================================================= */}

        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
              02 / Containers
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">Cards / parchment</h2>

            <p className="mt-2 text-sm text-brand-muted">
              Qui cambiamo completamente linguaggio rispetto ai pulsanti: la
              card sembra una pagina di un libro.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            {/* MAIN PAGE */}

            <article className="stone-card">
              <span className="game-grass bottom-1 left-5 rotate-[-8deg]" />
              <span className="game-flower bottom-3 right-8" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="quest-eyebrow">Missione 03</div>

                  <span className="reward-badge">⭐ +40 XP</span>
                </div>

                <h3 className="mt-6 max-w-2xl text-2xl font-extrabold leading-tight text-parchment-ink md:text-3xl">
                  Riconosci la struttura della frase
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-brand-muted">
                  Allenati a riconoscere soggetto, verbo e complementi prima di
                  affrontare la traduzione.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="skill-chip">Sintassi</span>

                  <span className="skill-chip">Analisi</span>

                  <span className="skill-chip">Traduzione</span>
                </div>

                <div className="mt-8 max-w-xl">
                  <div className="mb-2 flex justify-between text-xs font-bold">
                    <span>Progressi</span>
                    <span>68%</span>
                  </div>

                  <div className="game-progress">
                    <div
                      className="game-progress-fill"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button className="btn-primary">
                    Continua missione
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </article>

            {/* SECOND PAGE */}

            <article className="stone-card flex min-h-[280px] flex-col justify-between">
              <span className="game-grass bottom-1 right-3 rotate-[8deg]" />
              <span className="game-flower bottom-8 right-12" />

              <div className="relative z-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-muted">
                  Obiettivo
                </p>

                <p className="mt-4 text-3xl font-extrabold text-parchment-ink">
                  4 attività
                </p>

                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Completa il circuito per continuare il tuo percorso.
                </p>
              </div>

              <div className="relative z-10">
                <div className="mb-2 flex justify-between text-xs font-bold">
                  <span>2 / 4</span>
                  <span>50%</span>
                </div>

                <div className="game-progress">
                  <div
                    className="game-progress-fill"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* =================================================
            PROGRESS
            ================================================= */}

        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
              03 / Progression
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">Progress</h2>
          </div>

          <div className="game-panel">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-parchment-ink">
                    Le basi della traduzione
                  </p>

                  <p className="mt-1 text-xs text-brand-muted">
                    Missione 3 di 7
                  </p>
                </div>

                <span className="text-sm font-extrabold">42%</span>
              </div>

              <div className="mt-5 game-progress">
                <div className="game-progress-fill" style={{ width: "42%" }} />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            INFORMATIONAL ELEMENTS
            ================================================= */}

        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
              04 / Information
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              Informational elements
            </h2>

            <p className="mt-2 text-sm text-brand-muted">
              XP e timer non hanno rilievo: comunicano informazioni, non
              invitano al click.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 rounded-3xl bg-white/70 p-6">
            <div>
              <p className="mb-2 text-xs font-bold text-brand-muted">XP</p>

              <span className="reward-badge">⭐ +20 XP</span>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-brand-muted">Timer</p>

              <span className="game-timer">⏱ 01:24</span>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-brand-muted">Skill</p>

              <span className="skill-chip">◈ Sintassi</span>
            </div>
          </div>
        </section>

        {/* =================================================
            EXERCISE
            ================================================= */}

        <section className="mb-20">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
              05 / Exercise
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">Exercise interface</h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="game-panel">
              <div className="relative z-10">
                {/* TOP */}

                <div className="flex items-center justify-between gap-4">
                  <span className="game-timer">⏱ 01:24</span>

                  <span className="text-xs font-bold text-brand-muted">
                    3 / 8
                  </span>
                </div>

                {/* PROGRESS */}

                <div className="mt-5 game-progress">
                  <div
                    className="game-progress-fill"
                    style={{ width: "37.5%" }}
                  />
                </div>

                {/* QUESTION */}

                <div className="mt-10">
                  <div className="quest-eyebrow">Analisi della frase</div>

                  <h3 className="mt-4 text-2xl font-extrabold leading-tight text-parchment-ink md:text-3xl">
                    Qual è il soggetto della frase?
                  </h3>

                  <div className="mt-6 rounded-2xl border border-[#cbd8ec] bg-surface-blue p-6 text-center">
                    <p className="text-xl font-bold italic text-foreground md:text-2xl">
                      Puella rosam amat.
                    </p>
                  </div>
                </div>

                {/* ANSWERS */}

                <div className="mt-8 grid gap-3">
                  <button className="answer-option">Puella</button>

                  <button className="answer-option is-selected">Rosam</button>

                  <button className="answer-option">Amat</button>
                </div>

                {/* ACTIONS */}

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button className="btn-tertiary">💡 Aiuto</button>

                  <button className="btn-primary">
                    Controlla
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FEEDBACK
            ================================================= */}

        <section className="pb-8">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-muted">
              06 / Feedback
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">Feedback</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="feedback-success">
              <p className="font-extrabold">✓ Risposta corretta</p>

              <p className="mt-1 text-sm">
                Hai riconosciuto correttamente il soggetto.
              </p>
            </div>

            <div className="feedback-error">
              <p className="font-extrabold">✕ Non proprio</p>

              <p className="mt-1 text-sm">Rosam è il complemento oggetto.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
