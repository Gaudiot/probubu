export type TimerStartResult =
    | { success: true }
    | { success: false; error: string };

export type TimerStopResult =
    | {
          success: true;
          data: {
              secondsElapsed: number;
              coinsEarned: number;
          };
      }
    | { success: false; error: string };

