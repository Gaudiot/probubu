import { http, HttpResponse } from "msw";
import { timerDb } from "./db";

const BASE_URL = "https://your-api-url.com";

export const handlers = [
    // POST /timer/start
    http.post(`${BASE_URL}/timer/start`, async ({ request }) => {
        const body = await request.json();
        const userId = "123";
        const now = Date.now();
        const timerId = now.toString();

        timerDb.push({
            userId,
            timerId,
            startTimeEpoch: now,
            endTimeEpoch: null,
        });

        return HttpResponse.json({
            timerId: timerId,
            start_time_epoch: now,
        });
    }),

    // POST /timer/stop
    http.post(`${BASE_URL}/timer/stop`, async ({ request }) => {
        const body = await request.json();

        const userId = "123";
        const timer = timerDb.find(
            (t) => t.userId === userId && t.endTimeEpoch === null,
        );
        if (!timer) {
            return HttpResponse.json(
                {
                    error: "Timer not found",
                },
                { status: 404 },
            );
        }
        const now = Date.now();
        const secondsElapsed = Math.floor((now - timer.startTimeEpoch) / 1000);
        const coinsEarned = Math.floor(secondsElapsed * 0.2);

        return HttpResponse.json({
            timer_id: timer.timerId,
            end_time_epoch: now,
            coins_earned: coinsEarned,
            seconds_elapsed: secondsElapsed,
        });
    }),
];
