interface LoadMoreButtonProps {
  onClick: () => void;
  className?: string;
}

export function LoadMoreButton({
  onClick,
  className = "",
}: LoadMoreButtonProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="btn-secondary active:scale-95 transition-transform duration-150"
      >
        Carica altri articoli
      </button>
    </div>
  );
}
