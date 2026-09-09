export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="container-section">
        {/* MAIN FOOTER */}
        <div
          className="
            grid
            grid-cols-1
            gap-10
            border-t
            border-foreground/10
            py-10
            md:grid-cols-4
            md:gap-8
            md:py-12
          "
        >
          {/* BRAND */}
          <div className="md:col-span-1">
            <a>
              <img
                alt="Your Company"
                src="/Logo-BStudent-Home-1.webp"
                className="h-14 w-auto"
              />
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-brand-muted">
              Impara, gioca e cresci. Un nuovo modo di studiare le lingue
              classiche.
            </p>
          </div>

          {/* IMPARA */}
          <div>
            <h3 className="text-sm font-extrabold">Impara</h3>

            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Corsi
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Esercizi
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Versioni guidate
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Progressi
                </a>
              </li>
            </ul>
          </div>

          {/* BSTUDENT */}
          <div>
            <h3 className="text-sm font-extrabold">BStudent</h3>

            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Come funziona
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Chi siamo
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* SEGUICI */}
          <div>
            <h3 className="text-sm font-extrabold">Seguici</h3>

            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  Instagram
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  YouTube
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-brand-primary">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-foreground/10
            py-6
            text-xs
            text-brand-muted
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>© 2026 BStudent. Tutti i diritti riservati.</p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-primary">
              Privacy
            </a>

            <a href="#" className="hover:text-brand-primary">
              Termini
            </a>

            <a href="#" className="hover:text-brand-primary">
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
