export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-6 py-20">
      <form className="glow-card w-full space-y-4 p-8">
        <h1 className="display-font text-5xl uppercase text-black">Register</h1>

        <input
          placeholder="Full name"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
        />
        <input
          placeholder="Email address"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
        />
        <input
          placeholder="Phone number"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
        />

        <button className="ui-font w-full rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
          Create Account
        </button>
      </form>
    </div>
  );
}