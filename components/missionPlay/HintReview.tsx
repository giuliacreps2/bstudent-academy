"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHintReview } from "@/lib/courses";
import { resourceHref } from "@/constants/resources";
import type { HintReviewLink } from "@/types/courses";

/**
 * "Ripassa" (Blueprint Gamification §6.2): a tentativo chiuso, gli argomenti degli aiuti del cappello usati
 * e la Risorsa da rileggere. Niente se non sono stati usati aiuti.
 */
export function HintReview({ missionAttemptId }: { missionAttemptId: number }) {
  const [links, setLinks] = useState<HintReviewLink[]>([]);

  useEffect(() => {
    let active = true;
    getHintReview(missionAttemptId)
      .then((result) => {
        if (active) setLinks(result);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [missionAttemptId]);

  if (links.length === 0) return null;

  return (
    <div className="rounded-md bg-surface-blue px-4 py-3 text-left">
      <p className="font-bold">📜 Ripassa gli argomenti per cui hai chiesto aiuto</p>
      <ul className="mt-2 space-y-1">
        {links.map((link) => (
          <li key={link.topicName}>
            {link.subjectSlug && link.resourceSlug ? (
              <Link
                href={resourceHref(link.subjectSlug, link.resourceSlug)}
                className="font-semibold text-brand-primary hover:underline"
              >
                {link.resourceTitle ?? link.topicName}
              </Link>
            ) : (
              <span className="font-semibold">{link.topicName}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
