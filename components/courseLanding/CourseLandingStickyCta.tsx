"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { RegisterModal } from "@/components/auth/RegisterModal";

const SHOW_AFTER_PX = 480;

export function CourseLandingStickyCta({ courseSlug }: { courseSlug: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [finalCtaInView, setFinalCtaInView] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Compare dopo la hero
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Si nasconde quando la CTA finale è visibile, per non duplicarla
  useEffect(() => {
    const target = document.getElementById("cta-finale");
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) =>
      setFinalCtaInView(entry.isIntersecting),
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !finalCtaInView;

  return (
    <>
      {/* Spazio in fondo alla pagina: la barra non copre il footer */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      <div
        aria-hidden={!visible}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(23,32,51,0.12)] backdrop-blur-sm transition-transform duration-200 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsRegisterOpen(true)}
          tabIndex={visible ? 0 : -1}
          className="btn-primary w-full active:scale-95"
        >
          Inizia gratis
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        courseSlug={courseSlug}
      />
    </>
  );
}
