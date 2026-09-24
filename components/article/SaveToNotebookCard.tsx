import { SaveToNotebookButton } from "./SaveToNotebookButton";

export function SaveToNotebookCard({
  isLoggedIn,
  isSaved,
  onToggle,
}: {
  isLoggedIn: boolean;
  isSaved: boolean;
  onToggle?: (saved: boolean) => void;
}) {
  return (
    <div className="card-papyrus flex flex-col items-center gap-3 p-6 text-center sm:p-8">
      <span className="text-3xl" aria-hidden="true">
        📓
      </span>

      <p
        className="text-lg font-extrabold"
        style={{ color: "var(--texture-papyrus-ink)" }}
      >
        Vuoi ritrovare questo articolo?
      </p>

      <p
        className="max-w-sm text-sm leading-6"
        style={{ color: "var(--texture-papyrus-ink-muted)" }}
      >
        Salvalo nel tuo Quaderno e costruisci la tua raccolta personale.
      </p>

      <div className="mt-2 w-full max-w-70">
        <SaveToNotebookButton
          isLoggedIn={isLoggedIn}
          initialSaved={isSaved}
          variant="full"
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}
