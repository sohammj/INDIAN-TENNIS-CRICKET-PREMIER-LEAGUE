export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="section-shell py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="display-font text-2xl uppercase tracking-[0.22em] text-gray-900">
              <span className="text-black display-font text-2xl font-semibold uppercase tracking-[0.28em]">
                ITC <span className="text-[#c8ff00]">PL</span>
              </span>
            </div>

            <p className="mt-3 max-w-xl text-sm text-gray-500">
              This platform is a conceptual demonstration built to showcase product vision, design direction, and technical capabilities. Certain features and modules are illustrative and may not represent the final production implementation.
            </p>

            {/* 🔥 Professional Disclaimer */}
            <p className="mt-4 max-w-xl text-xs text-gray-400">
              Designed and developed by{" "}
              <a
                href="https://sovratech.com"
                target="_blank"
                className="underline hover:text-gray-600"
              >
                SovraTech
              </a>
            </p>
          </div>

          <div className="mono-font text-xs uppercase tracking-[0.22em] text-gray-400">
            ITCPL Season 2026 · All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}