import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export function NewsletterBanner() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-surface-blue px-6 py-10 sm:px-10 sm:py-12">
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Non perderti i prossimi articoli
          </h3>
          <p className="mt-2 text-sm leading-6 text-brand-muted sm:text-base">
            Iscriviti alla nostra newsletter e ricevi consigli, curiosità e
            nuovi contenuti direttamente nella tua casella di posta.
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
            <input
              type="email"
              required
              placeholder="La tua email"
              className="h-12 w-full rounded-pill border border-border bg-white pl-11 pr-4 text-sm font-medium text-foreground outline-none transition placeholder:text-brand-muted focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
            />
          </div>

          <button type="submit" className="btn-primary shrink-0 justify-center">
            Iscriviti
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>
      </div>

      <p className="relative z-10 mt-3 text-xs text-brand-muted md:text-right">
        Nessuno spam, promesso.
      </p>
    </div>
  );
}
