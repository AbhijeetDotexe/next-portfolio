"use client";

export default function PrintButton({
  children,
  className = "btn btn-ghost btn-sm",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      {children}
    </button>
  );
}
