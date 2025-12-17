'use client';

import { useState, useEffect, useCallback } from 'react';
import { intervalToDuration } from 'date-fns';
import { timerApi } from '@/base/api/timer.api';

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await timerApi.startTimer();

      if (response.isOk()) {
        setSeconds(0);
        setIsRunning(true);
      } else {
        setError('Erro ao iniciar o timer.');
      }
      setSeconds(0);
      setIsRunning(true);
    } catch (err) {
      setError('Erro ao iniciar o timer. Tente novamente.');
      console.error('Erro ao iniciar timer:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const stopTimer = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await timerApi.stopTimer();

      if (response.isOk()) {
        setIsRunning(false);
      } else {
        setError('Erro ao parar o timer.');
      }
      setIsRunning(false);
    } catch (err) {
      setError('Erro ao parar o timer. Tente novamente.');
      console.error('Erro ao parar timer:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatTime = useCallback((totalSeconds: number): string => {
    const duration = intervalToDuration({ start: 0, end: totalSeconds * 1000 });

    const hours = duration.hours ?? 0;
    const minutes = duration.minutes ?? 0;
    const secs = duration.seconds ?? 0;

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
    error,
    loading,
  };
}

