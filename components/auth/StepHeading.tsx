export function StepHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-[#172033]">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#667085]">
        {description}
      </p>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#172033]">
        {label}
      </span>

      {children}
    </label>
  );
}

export const inputClass =
  "h-12 w-full rounded-xl border border-[#e5eaf2] bg-white px-4 text-sm font-medium text-[#172033] outline-none transition placeholder:text-[#98a2b3] focus:border-[#3155d9] focus:ring-4 focus:ring-[#3155d9]/10";
