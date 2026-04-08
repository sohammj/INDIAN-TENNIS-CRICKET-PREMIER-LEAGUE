import Image from "next/image";

export function StadiumBg({
  children,
  overlay = "dark",
}: {
  children: React.ReactNode;
  overlay?: "dark" | "medium" | "light";
}) {
  const overlayClass =
    overlay === "light"
      ? "bg-black/55"
      : overlay === "medium"
      ? "bg-black/70"
      : "bg-black/82";

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/stadium.jpg"
          alt="Stadium background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
        <div className="broadcast-grid absolute inset-0 opacity-60" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}