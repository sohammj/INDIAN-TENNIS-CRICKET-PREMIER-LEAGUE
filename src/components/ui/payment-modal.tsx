"use client";

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  tournamentTitle: string;
  amount: string;
};

export function PaymentModal({
  open,
  onClose,
  tournamentTitle,
  amount,
}: PaymentModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-[#111] shadow-2xl">
        <div className="bg-[#072654] px-6 py-5">
          <div className="text-xl font-semibold text-white">Razorpay</div>
          <div className="mt-1 text-sm text-white/70">Test Payment Window</div>
        </div>

        <div className="p-6">
          <div className="text-sm text-white/55">Tournament</div>
          <div className="mt-1 text-lg font-semibold text-white">
            {tournamentTitle}
          </div>

          <div className="mt-5 text-sm text-white/55">Amount</div>
          <div className="mt-1 text-3xl font-bold text-white">{amount}</div>

          <div className="mt-6 rounded border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
            This is a demo payment popup for now. Later you can connect real
            Razorpay order creation and checkout.
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-white/10 px-4 py-3 text-sm font-medium text-white/70"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(`Demo payment successful for ${tournamentTitle}`);
                onClose();
              }}
              className="flex-1 bg-[#2b7cff] px-4 py-3 text-sm font-semibold text-white"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}