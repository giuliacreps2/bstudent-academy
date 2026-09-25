import type {
  AccountPageData,
  AccountProfile,
  NotificationPreferences,
  SensitiveAction,
  SensitiveActionOutcome,
} from "@/types/account";

// TODO: sostituire con la fetch reale quando il BE è pronto
// const res = await fetch(`${process.env.API_URL}/student/account`);
// if (!res.ok) throw new Error("Impossibile caricare l'area account");
// return res.json();
export async function getAccountData(): Promise<AccountPageData> {
  return {
    profile: {
      name: "Giulia",
      username: "giulia_studia",
      email: "giulia@email.com",
      avatarUrl: "/studentessa.png",
      avatarName: "Studentessa",
      joinedAt: "12 set 2025",
      isUnder14: false,
      // guardianEmail: "genitore@email.com", // presente solo per gli under 14
    },
    notifications: {
      studyReminders: true,
      missionsToContinue: true,
      news: false,
    },
    consents: [
      {
        id: "terms",
        label: "Termini di servizio e Privacy Policy",
        description: "Necessari per usare BStudent.",
        required: true,
        granted: true,
        href: "/privacy",
      },
      {
        id: "analytics",
        label: "Statistiche anonime di utilizzo",
        description:
          "Ci aiutano a capire cosa migliorare. Non contengono dati personali.",
        required: false,
        granted: true,
      },
    ],
  };
}

/* ---------------------------------------------------------------------
   Le funzioni sotto sono placeholder: oggi registrano solo in console.
   Ogni TODO indica l'endpoint da collegare.
   --------------------------------------------------------------------- */

export async function saveProfile(
  input: Pick<AccountProfile, "name" | "username">,
): Promise<void> {
  // TODO: PATCH /student/profile
  // Il BE deve verificare l'unicità dello username e filtrare i nickname
  // inappropriati (l'utenza è in gran parte minorenne).
  console.log("SAVE PROFILE", input);
}

export async function changeEmail(input: {
  email: string;
  password: string;
}): Promise<void> {
  // TODO: POST /auth/change-email (richiede la password; conferma via email)
  console.log("CHANGE EMAIL", { email: input.email });
}

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  // TODO: POST /auth/change-password
  console.log("CHANGE PASSWORD");
}

export async function logout(): Promise<void> {
  // TODO: POST /auth/logout + pulizia della sessione
  console.log("LOGOUT");
}

export async function saveNotificationPreferences(
  preferences: NotificationPreferences,
): Promise<void> {
  // TODO: PUT /student/notifications
  // Collegare qui il sistema di reminder previsto.
  console.log("SAVE NOTIFICATIONS", preferences);
}

export async function saveConsent(
  consentId: string,
  granted: boolean,
): Promise<void> {
  // TODO: PUT /student/consents/:id (il BE conserva data e versione del consenso)
  console.log("SAVE CONSENT", { consentId, granted });
}

/**
 * Eliminazione account ed export dei dati.
 * Per gli under 14 il BE non esegue l'azione: invia un'email di conferma al
 * genitore/tutore e risponde "guardian-required". Il flag inviato dal client
 * serve solo alla UI: il BE deve ricalcolare l'età e non fidarsene.
 */
export async function requestSensitiveAction(
  action: SensitiveAction,
  isUnder14: boolean,
): Promise<SensitiveActionOutcome> {
  // TODO: POST /student/account/{delete|export}
  console.log("SENSITIVE ACTION", { action, isUnder14 });
  return isUnder14 ? "guardian-required" : "done";
}
