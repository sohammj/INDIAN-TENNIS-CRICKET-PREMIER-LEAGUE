import Image from "next/image";

export function StadiumBg({
  children,
  overlay = "light",
}: {
  children: React.ReactNode;
  overlay?: "light" | "soft" | "none";
}) {
  const overlayClass =
    overlay === "none"
      ? ""
      : overlay === "light"
      ? "bg-white/65"
      : "bg-black/20";

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image
          src="/stadium.jpg"
          alt="Stadium background"
          fill
          priority
          className="object-cover object-center scale-105"
        />

        {/* 🔥 THIS is the actual blur */}
        <div className="absolute inset-0 backdrop-blur-[4px]" />

        {/* light overlay (keeps white theme) */}
        <div className={`absolute inset-0 ${overlayClass}`} />

        {/* subtle grid */}
        <div className="broadcast-grid absolute inset-0 opacity-20" />

        {/* lime glow accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(200,255,0,0.12),transparent_28%)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}