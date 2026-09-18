"use client";

import { useState } from "react";
import { ArrowRightIcon, MapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { MissionTreeModal } from "./MissionTreeModal";
import type { MissionCourseTree } from "@/types/missions";

interface MissionActionsRowProps {
  startHref: string;
  courseTree: MissionCourseTree;
  variant: "inline" | "sticky";
}

export function MissionActionsRow({
  startHref,
  courseTree,
  variant,
}: MissionActionsRowProps) {
  const [treeOpen, setTreeOpen] = useState(false);

  const buttons = (
    <>
      <button
        type="button"
        onClick={() => setTreeOpen(true)}
        className="flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all duration-150"
      >
        <MapIcon className="h-4 w-4" />
        Mappa
      </button>
    </>
  );

  if (variant === "sticky") {
    return (
      <>
        <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0a0e2e]/95 backdrop-blur-sm p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2">{buttons}</div>
        </div>
        <MissionTreeModal
          open={treeOpen}
          onClose={() => setTreeOpen(false)}
          tree={courseTree}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">{buttons}</div>
      <MissionTreeModal
        open={treeOpen}
        onClose={() => setTreeOpen(false)}
        tree={courseTree}
      />
    </>
  );
}
