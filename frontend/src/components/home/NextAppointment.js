import { Alert, Button } from "@/components/ui";

export default function NextAppointment({ appointment }) {
  if (!appointment) return null;
  const { service, place, when } = appointment;
  return (
    <Alert tone="green">
      <span className="flex flex-auto flex-col gap-0.5">
        <span className="text-[13px] font-semibold">Your next appointment</span>
        <span className="text-base font-semibold text-ink">
          {service} · {place} · {when}
        </span>
      </span>
      <Button href="/my-bookings" variant="outline" className="self-start min-[600px]:self-auto">
        Manage
      </Button>
    </Alert>
  );
}
