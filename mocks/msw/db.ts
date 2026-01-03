interface TimerDbEntity {
    timerId: string;
    userId: string;
    startTimeEpoch: number;
    endTimeEpoch: number | null;
}

export const timerDb: TimerDbEntity[] = [];
