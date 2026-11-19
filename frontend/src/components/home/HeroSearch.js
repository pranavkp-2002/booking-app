"use client";

import { headingFont } from "@/components/fonts";
import { Container, buttonClass } from "@/components/ui";

const field =
  "flex min-w-0 flex-col gap-0.5 rounded-xl bg-surface px-3.5 py-2.5 text-left focus-within:outline-2 focus-within:outline-brand";
const fieldLabel = "text-xs font-semibold text-ink-2";
const fieldInput = "w-full bg-transparent text-[15px] text-ink placeholder:text-faint outline-none";

/** Hero banner with the What / Where / When search. `query` is controlled by the parent. */
export default function HeroSearch({ query, onQueryChange, onSubmit }) {
  return (
    <section className="bg-ink py-12 text-white min-[861px]:py-[72px]">
      <Container>
        <h1 className={`${headingFont} max-w-[720px] text-[34px] leading-[1.1] font-bold text-white min-[861px]:text-[56px]`}>
          Book your next salon or clinic visit in under a minute
        </h1>
        <p className="mt-4 max-w-[620px] text-base leading-relaxed text-line-strong min-[861px]:mt-6 min-[861px]:text-lg">
          See real-time availability, pick your stylist or doctor, and get reminders before you go.
        </p>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mt-7 flex max-w-[900px] flex-col gap-2 rounded-2xl bg-white p-2 text-ink min-[861px]:flex-row min-[861px]:items-stretch"
        >
          <label className={`${field} min-[861px]:flex-[1.4]`}>
            <span className={fieldLabel}>What</span>
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Haircut, facial, dentist…"
              className={fieldInput}
            />
          </label>
          <label className={`${field} min-[861px]:flex-1`}>
            <span className={fieldLabel}>Where</span>
            <input type="text" defaultValue="Indiranagar, Bengaluru" className={fieldInput} />
          </label>
          <label className={`${field} min-[861px]:flex-[0.8]`}>
            <span className={fieldLabel}>When</span>
            <select className={`${fieldInput} cursor-pointer`} defaultValue="any">
              <option value="any">Any time</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="weekend">This weekend</option>
            </select>
          </label>
          <div className="flex">
            <button type="submit" className={buttonClass({ className: "min-h-[52px] w-full rounded-xl min-[861px]:h-full min-[861px]:w-auto min-[861px]:px-7" })}>
              Search
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}
