import type { ReactNode } from "react";

//TODO cambiare l'immagine della missione tramite fetch associata
//TODO creare fetch associata per l'immagine missione

export default function MissionLayout({ children }: { children: ReactNode }) {
  const image = "/land.png";
  // Pagina immersiva, fuori dal gruppo (app): nessun chrome standard.
  return (
    <div
      className="bg-cover relative overflow-hidden text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0e2e]/70 via-[#0a0e2e]/10 to-[#0a0e2e]/0" />
      {children}
    </div>
  );
}
