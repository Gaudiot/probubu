interface TimerDbEntity {
    timerId: string;
    userId: string;
    startTimeEpoch: number;
    endTimeEpoch: number | null;
}

interface UserDbEntity {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    balance: number;
}

export const timerDb: TimerDbEntity[] = [];

export const userDb: UserDbEntity[] = [
    {
        id: "123",
        username: "test",
        email: "test@test.com",
        password_hash: "test",
        balance: 0,
    },
];
