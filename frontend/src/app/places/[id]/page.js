import { notFound } from "next/navigation";
import { headingFont, slotlyFonts } from "@/components/fonts";
import { COVERS } from "@/components/home/PlaceCard";
import BookingFlow from "@/components/places/BookingFlow";
import SaveButton from "@/components/places/SaveButton";
import { BackLink, Container } from "@/components/ui";
import { PLACES, getPlace } from "@/data/places";

// Places come from local sample data for now, so every page can be prerendered.
export function generateStaticParams() {
  return PLACES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const place = getPlace((await params).id);
  return { title: place ? `${place.name} – Book on Slotly` : "Place not found" };
}

export default async function PlacePage({ params }) {
  const place = getPlace((await params).id);
  if (!place) notFound();

  return (
    <div className={`${slotlyFonts} flex flex-auto flex-col bg-surface text-ink`}>
      <main className="flex-auto py-6 min-[861px]:py-8">
        <Container className="flex flex-col gap-4">
          <BackLink href="/">Back to results</BackLink>

          {/* Two columns on desktop: header + pickers on the left, summary on the right (placed by BookingFlow). */}
          <div className="grid items-start gap-5 min-[961px]:grid-cols-[minmax(0,1fr)_400px] min-[961px]:gap-6">
            <header className="flex min-w-0 flex-col gap-5 min-[961px]:col-start-1">
              <div
                aria-hidden="true"
                className={`${headingFont} flex h-[180px] items-center justify-center rounded-[18px] text-7xl font-bold min-[861px]:h-[220px] ${COVERS[place.cover] ?? COVERS.grey}`}
              >
                {place.name[0]}
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <h1 className={`${headingFont} text-[26px] leading-tight font-bold text-ink min-[861px]:text-[32px]`}>{place.name}</h1>
                  <span className="text-[15px] text-muted">
                    <span className="font-semibold text-ink">{place.rating} ★</span> ({place.reviews} reviews) · {place.address} · Open till{" "}
                    {place.closes}
                  </span>
                </div>
                <SaveButton />
              </div>
            </header>

            <BookingFlow place={place} />
          </div>
        </Container>
      </main>
    </div>
  );
}
