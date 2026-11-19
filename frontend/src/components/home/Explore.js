"use client";

import { useMemo, useRef, useState } from "react";
import ChipGroup from "@/components/ui/ChipGroup";
import { Container, EmptyState, List, SectionTitle, Select, Stack } from "@/components/ui";
import HeroSearch from "./HeroSearch";
import PlaceCard from "./PlaceCard";

const SORTERS = {
  near: (a, b) => a.km - b.km,
  rating: (a, b) => b.rating - a.rating,
  price: (a, b) => a.price - b.price,
};

const matches = (p, term) =>
  [p.name, p.type, p.area].some((s) => s.toLowerCase().includes(term));

/**
 * Home page body: hero search + category chips + sortable place grid.
 * `children` renders between the hero and the category row (e.g. the next-appointment banner).
 */
export default function Explore({ places, categories, sorts, children }) {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("rec");
  const titleRef = useRef(null);

  const shown = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = places.filter(
      (p) => (category === "all" || p.category === category) && (!term || matches(p, term)),
    );
    return SORTERS[sort] ? list.toSorted(SORTERS[sort]) : list;
  }, [places, query, category, sort]);

  const cat = categories.find((c) => c.value === category);

  return (
    <>
      <HeroSearch
        query={draft}
        onQueryChange={setDraft}
        onSubmit={() => {
          setQuery(draft);
          titleRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="flex-auto py-8 min-[861px]:py-10">
        <Container className="flex flex-col gap-8 min-[861px]:gap-10">
          {children}

          <Stack as="section" aria-labelledby="cats-title">
            <SectionTitle id="cats-title">Browse by category</SectionTitle>
            <ChipGroup label="Category" options={categories} value={category} onChange={setCategory} />
          </Stack>

          <Stack as="section" aria-labelledby="results-title">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <SectionTitle id="results-title" ref={titleRef} className="scroll-mt-24" aria-live="polite">
                {cat?.title ?? cat?.label} near you ({shown.length})
              </SectionTitle>
              <label className="flex items-center gap-2 text-sm text-muted">
                Sort by
                <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {sorts.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <List
              layout="grid"
              items={shown}
              renderItem={(p) => <PlaceCard place={p} href={`/places/${p.id}`} />}
              empty={<EmptyState>No places match your search. Try another category or keyword.</EmptyState>}
            />
          </Stack>
        </Container>
      </main>
    </>
  );
}
