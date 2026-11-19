// Slotly-styled pieces shared by the login and register forms.
// No hooks, so they render in either Server or Client Components.

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7C6B]";

export const inputClass = `h-12 w-full rounded-xl border border-[#D5D9E0] bg-white px-3.5 text-[15px] text-[#12151A] placeholder:text-[#9AA0AC] ${focusRing}`;

export const linkClass = "font-semibold text-[#0E7C6B] hover:text-[#0A5E51]";

export function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      {children}
    </label>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-[13px] text-[#B42318]">
      {message}
    </p>
  );
}

export function SubmitButton({ pending, children, pendingText }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex min-h-[52px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#0E7C6B] text-[15px] font-semibold text-white hover:bg-[#0A5E51] disabled:cursor-progress disabled:opacity-60 ${focusRing}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
