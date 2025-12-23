import { intervalToDuration } from "date-fns";

export function formatTime(totalSeconds: number): string {
    const duration = intervalToDuration({
        start: 0,
        end: totalSeconds * 1000,
    });

    const hours = duration.hours ?? 0;
    const minutes = duration.minutes ?? 0;
    const secs = duration.seconds ?? 0;

    if (hours === 0) {
        return [
            minutes.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    }

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        secs.toString().padStart(2, "0"),
    ].join(":");
}
