"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { markTutorialSeen } from "@/lib/courses";

/**
 * Tutorial della prima volta (blueprint §5.9): si mostra una sola volta per studente, poi il backend lo
 * segna come visto. Spiega le regole già decise: tappe, tempo, soglia, vite, aiuto del cappello, pausa.
 * TODO (testi): da rivedere con Giulia.
 */
export function MissionTutorial({ passingThreshold }: { passingThreshold: number }) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    // Se non arriva, il tutorial ricompare la prossima volta: nessun danno
    markTutorialSeen().catch(() => undefined);
  }

  return (
    <Modal open={open} onClose={handleClose} eyebrow="La tua prima missione" title="Come funziona">
      <ul className="space-y-3 text-sm leading-6 text-foreground">
        <li>📖 <strong>Tappe:</strong> leggi le lezioni e svolgi gli esercizi, uno alla volta, nell&apos;ordine.</li>
        <li>⏱️ <strong>Tempo:</strong> ogni esercizio ha un tempo. La lettura non ha tempo.</li>
        <li>🎯 <strong>Per superare</strong> un esercizio serve almeno il {passingThreshold}%.</li>
        <li>❤️ <strong>Vite:</strong> un esercizio non superato o il tempo scaduto costano una vita. Le vite si ricaricano da sole.</li>
        <li>📜 <strong>Aiuto del cappello:</strong> se hai l&apos;accessorio, ti ricorda l&apos;argomento, mai la risposta.</li>
        <li>💾 <strong>Salva missione:</strong> puoi fermarti quando vuoi e riprendere da dove eri rimasto.</li>
      </ul>
      <button type="button" onClick={handleClose} className="btn-primary mt-6 inline-flex w-full justify-center py-2.5">
        Ho capito
      </button>
    </Modal>
  );
}
