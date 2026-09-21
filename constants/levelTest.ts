import type { LevelTestQuestion } from "@/types/myCourses";

// TODO: sostituire con la fetch reale quando il BE è pronto.
// Struttura pronta per aggiungere le altre materie non appena verranno sbloccate.
export const levelTestQuestions: Record<string, LevelTestQuestion[]> = {
  latino: [
    {
      id: "latino-casi",
      prompt:
        "Sai riconoscere i casi latini (nominativo, accusativo, ...) in una frase semplice?",
      options: [
        { id: "a", label: "No, non li conosco ancora", level: "Principiante" },
        {
          id: "b",
          label: "Sì, ma faccio ancora qualche errore",
          level: "Intermedio",
        },
        { id: "c", label: "Sì, senza difficoltà", level: "Avanzato" },
      ],
    },
    {
      id: "latino-verbi",
      prompt: "Come te la cavi con le coniugazioni verbali latine?",
      options: [
        {
          id: "a",
          label: "Conosco solo il presente indicativo",
          level: "Principiante",
        },
        { id: "b", label: "Conosco i tempi principali", level: "Intermedio" },
        {
          id: "c",
          label: "Conosco anche congiuntivo e imperativo",
          level: "Avanzato",
        },
      ],
    },
    {
      id: "latino-periodo",
      prompt: "Hai già tradotto un periodo con proposizioni subordinate?",
      options: [
        { id: "a", label: "Non ancora", level: "Principiante" },
        { id: "b", label: "Qualche volta, con aiuto", level: "Intermedio" },
        { id: "c", label: "Sì, regolarmente", level: "Avanzato" },
      ],
    },
  ],
  greco: [
    {
      id: "greco-alfabeto",
      prompt: "Conosci l'alfabeto greco e sai leggere una parola semplice?",
      options: [
        {
          id: "a",
          label: "Sto ancora imparando l'alfabeto",
          level: "Principiante",
        },
        {
          id: "b",
          label: "Sì, leggo senza troppe difficoltà",
          level: "Intermedio",
        },
        {
          id: "c",
          label: "Sì, e conosco già le basi della morfologia",
          level: "Avanzato",
        },
      ],
    },
    {
      id: "greco-declinazioni",
      prompt: "Sai declinare un sostantivo della prima declinazione?",
      options: [
        { id: "a", label: "No, non ancora", level: "Principiante" },
        { id: "b", label: "Sì, con qualche incertezza", level: "Intermedio" },
        { id: "c", label: "Sì, senza problemi", level: "Avanzato" },
      ],
    },
    {
      id: "greco-verbi",
      prompt: "Come te la cavi con il verbo all'indicativo presente?",
      options: [
        { id: "a", label: "Non lo conosco ancora", level: "Principiante" },
        {
          id: "b",
          label: "Lo riconosco ma faccio errori",
          level: "Intermedio",
        },
        { id: "c", label: "Lo uso con sicurezza", level: "Avanzato" },
      ],
    },
  ],
};
