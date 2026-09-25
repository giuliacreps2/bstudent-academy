import { getAccountData } from "@/lib/account";
import { defaultAccountSection, isAccountSection } from "@/constants/account";
import { AccountNav } from "@/components/account/AccountNav";
import { ProfileSection } from "@/components/account/ProfileSection";
import { SecuritySection } from "@/components/account/SecuritySection";
import { NotificationsSection } from "@/components/account/NotificationsSection";
import { AccessibilitySection } from "@/components/account/AccessibilitySection";
import { PrivacySection } from "@/components/account/PrivacySection";

interface AccountPageProps {
  searchParams: Promise<{ sezione?: string }>;
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { sezione } = await searchParams;
  const active = isAccountSection(sezione) ? sezione : defaultAccountSection;
  const { profile, notifications, consents } = await getAccountData();

  return (
    <div className="mx-auto max-w-5xl pb-10">
      <header className="mb-8 md:mb-10">
        {/* Decorazione della Home */}
        <span aria-hidden="true" className="relative mb-1 block h-7 w-8">
          <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
          <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
          <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
        </span>

        <h3 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Il tuo account
          <span className="text-brand-secondary">.</span>
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
          Gestisci i tuoi dati, la sicurezza e il modo in cui vuoi usare
          BStudent.
        </p>
      </header>

      <div className="space-y-6 xl:grid xl:grid-cols-[240px_1fr] xl:items-start xl:gap-8 xl:space-y-0">
        <AccountNav active={active} />

        <div>
          {active === "profilo" && <ProfileSection profile={profile} />}
          {active === "account" && <SecuritySection email={profile.email} />}
          {active === "notifiche" && (
            <NotificationsSection initial={notifications} />
          )}
          {active === "accessibilita" && <AccessibilitySection />}
          {active === "privacy" && (
            <PrivacySection consents={consents} isUnder14={profile.isUnder14} />
          )}
        </div>
      </div>
    </div>
  );
}
