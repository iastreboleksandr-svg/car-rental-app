'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';

export function useCarDetailPage(id: string) {
  const token = useAuthStore((s) => s.token);
  const [activeImg, setActiveImg] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', id],
    queryFn: () => carService.getById(id, token!),
    enabled: !!id && !!token,
  });

  function handleBook() {
    setLoading(true);
    setTimeout(() => {
      setBooked(true);
      setLoading(false);
    }, 800);
  }

  function toggleExpanded() {
    setExpanded((v) => !v);
  }

  return {
    car,
    isLoading,
    isError,
    activeImg, setActiveImg,
    expanded, toggleExpanded,
    booked,
    loading,
    handleBook,
  };
}
