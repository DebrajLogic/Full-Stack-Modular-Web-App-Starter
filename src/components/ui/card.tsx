export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`card-gloss rounded-2xl p-6 ${className}`}>
      {children}
    </section>
  );
}
