import { http, HttpResponse } from "msw";
import { timerDb, userDb } from "./db";

const BASE_URL = "https://your-api-url.com";

export const handlers = [
    // POST /timer/start
    http.post(`${BASE_URL}/timer/start`, async ({ request }) => {
        const body = await request.json();
        const userId = "123";
        const now = Date.now();
        const timerId = crypto.randomUUID();

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

    http.post(`${BASE_URL}/register`, async ({ request }) => {
        const body = (await request.json()) as {
            email: string;
            username: string;
            password: string;
        };
        const user = userDb.find((u) => u.email === body.email);

        if (user) {
            return HttpResponse.json(
                { error: "User already exists" },
                { status: 400 },
            );
        }

        userDb.push({
            id: crypto.randomUUID(),
            username: body.username,
            email: body.email,
            password_hash: body.password,
            balance: 0,
        });

        return HttpResponse.json({
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token",
        });
    }),

    http.post(`${BASE_URL}/login`, async ({ request }) => {
        const body = (await request.json()) as {
            email: string;
            password: string;
        };

        const user = userDb.find((u) => u.email === body.email);

        if (!user) {
            return HttpResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        if (user?.password_hash !== body.password) {
            return HttpResponse.json(
                { error: "Invalid password" },
                { status: 401 },
            );
        }

        return HttpResponse.json({
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token",
        });
    }),

    http.post(`${BASE_URL}/logout`, async ({ request }) => {
        return HttpResponse.json({}, { status: 200 });
    }),
];
