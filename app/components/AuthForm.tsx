import Link from "next/link";
import type { ReactNode, SubmitEvent } from "react";

type AuthFormProps = {
  children: ReactNode;
  topMsg: string;
  panelTitle: string;
  panelDescription: string;
  panelFooter: string;
  title: string;
  prompt: string;
  linkHref: string;
  linkLabel: string;
  submitLabel: string;
  message?: string;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
};

export function AuthInput({
  id,
  label,
  type,
  placeholder,
}: {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required
        className="h-12 w-full rounded-md border border-slate-300 px-3.5 text-sm outline-none transition focus:border-[#477d64] focus:ring-2 focus:ring-[#477d64]/20"
      />
    </div>
  );
}

export default function AuthForm({
  children,
  topMsg,
  panelTitle,
  panelDescription,
  panelFooter,
  title,
  prompt,
  linkHref,
  linkLabel,
  submitLabel,
  message,
  onSubmit,
}: AuthFormProps) {
  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl bg-white shadow-[0_24px_80px_-48px_rgba(21,38,31,0.45)] md:min-h-[680px] md:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#193b32] p-7 text-white sm:p-10 md:p-12">
          <Link href="/" className="relative w-fit text-xl font-semibold italic">
            Sho<span className="text-blue-500">pify</span>
          </Link>
          <div className="relative my-10 max-w-sm md:my-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#d5edaa]">
              {topMsg}
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {panelTitle}
            </h1>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
              {panelDescription}
            </p>
          </div>
          <p className="relative text-xs text-white/55">{panelFooter}</p>
        </aside>

        <section className="mx-auto w-full px-6 py-9 sm:px-10 sm:py-12 md:px-14 md:py-16">
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d2924]">
            {title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {prompt}{" "}
            <Link href={linkHref} className="font-medium text-[#315c4c]">
              {linkLabel}
            </Link>
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            {children}
            {message && (
              <p
                role="status"
                className="rounded-md bg-[#eef5ed] px-3.5 py-3 text-sm leading-5 text-[#315c4c]"
              >
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-[#193b32] px-4 py-3 text-sm font-semibold text-white hover:bg-[#285344]"
            >
              {submitLabel}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}