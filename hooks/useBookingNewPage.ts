'use client';

import { useState } from 'react';

function diffDays(from: string, to: string): number {
  return Math.max(0, Math.round((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24)));
}

export function useBookingNewPage() {
  const today = new Date().toISOString().split('T')[0];
  const defaultEnd = new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = diffDays(startDate, endDate);

  function handleStartDateChange(v: string) {
    setStartDate(v);
    if (v >= endDate) setEndDate(v);
  }

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 900);
  }

  return {
    today,
    startDate,
    endDate,
    days,
    loading,
    confirmed,
    handleStartDateChange,
    setEndDate,
    handleConfirm,
  };
}
