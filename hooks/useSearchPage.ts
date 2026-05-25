'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { carService, type CarFilters } from '@/services/car.service';
import type { DateRange } from 'react-day-picker';

export function useSearchPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [fuel, setFuel] = useState<string[]>([]);
  const [transmission, setTransmission] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<CarFilters>({});

  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ['cars', appliedFilters],
    queryFn: () => carService.getAll(appliedFilters),
  });

  function toggleFuel(type: string) {
    setFuel((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  }

  function applyFilters() {
    const filters: CarFilters = {};
    if (dateRange?.from) filters.date_from = dateRange.from.toISOString().split('T')[0];
    if (dateRange?.to) filters.date_to = dateRange.to.toISOString().split('T')[0];
    if (fuel.length > 0) filters.fuel_type = fuel;
    if (transmission) filters.transmission = transmission;
    if (maxPrice) filters.price_max = Number(maxPrice);
    setAppliedFilters(filters);
  }

  function resetFilters() {
    setDateRange(undefined);
    setFuel([]);
    setTransmission('');
    setMaxPrice('');
    setAppliedFilters({});
  }

  return {
    dateRange, setDateRange,
    fuel, toggleFuel,
    transmission, setTransmission,
    maxPrice, setMaxPrice,
    applyFilters,
    resetFilters,
    cars,
    isLoading,
    isError,
  };
}
