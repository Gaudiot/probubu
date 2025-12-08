'use client';

import { useState, useEffect, useCallback } from 'react';

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = useCallback(() => {
    setSeconds(0);
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    // If less than 1 hour, show only mm:ss
    if (hours === 0) {
      return [
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0'),
      ].join(':');
    }

    // Otherwise show hh:mm:ss
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  }, []);

  return {
    seconds,
    isRunning,
    formattedTime: formatTime(seconds),
    startTimer,
    stopTimer,
  };
}

