export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-6 py-20">
      <form className="glow-card w-full space-y-4 p-8">
        <h1 className="display-font text-5xl uppercase">Register</h1>
        <input
          placeholder="Full name"
          className="w-full border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />
        <input
          placeholder="Email address"
          className="w-full border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />
        <input
          placeholder="Phone number"
          className="w-full border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />
        <button className="ui-font w-full bg-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-white">
          Create Account
        </button>
      </form>
    </div>
  );
}