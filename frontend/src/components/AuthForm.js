// Presentational pieces shared by the login and register forms.
// No hooks, so they render in either Server or Client Components.

export function Field({ label, ...props }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <input
        className="w-full rounded border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
        {...props}
      />
    </label>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded bg-red-500/10 px-3 py-2 text-sm text-red-600">
      {message}
    </p>
  );
}

export function SubmitButton({ pending, children, pendingText }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-foreground px-4 py-2 font-medium text-background disabled:opacity-50"
    >
      {pending ? pendingText : children}
    </button>
  );
}

export function AuthLayout({ title, children }) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {children}
      </div>
    </main>
  );
}
