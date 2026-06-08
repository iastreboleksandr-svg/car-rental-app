'use client';

import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { slotService } from '@/services/slot.service';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';
import type { Slot, CreateSlotDto } from '@/types/slot';

export type SlotKind = 'available' | 'blocked';

const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const parseYmd = (iso: string) => {
  const [y, m, day] = iso.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, day);
};
const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const covers = (slot: Slot, day: Date) => {
  const k = ymd(day);
  return slot.dateFrom.slice(0, 10) <= k && k <= slot.dateTo.slice(0, 10);
};

export function useCarSlotsPage(carId: string) {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hydrated);
  const locale = useLocale();
  const queryClient = useQueryClient();

  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const [selStart, setSelStart] = useState<Date | null>(null);
  const [selEnd, setSelEnd] = useState<Date | null>(null);
  const [pendingType, setPendingType] = useState<SlotKind>('available');
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null);
  const [alwaysAvailable, setAlwaysAvailable] = useState(false);

  const today = useMemo(() => new Date(), []);
  const slotsKey = ['slots', carId];

  const { data: car } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => carService.getById(carId),
    enabled: !!carId && hydrated,
  });

  const {
    data: slots = [],
    isLoading: slotsLoading,
    isError,
  } = useQuery({
    queryKey: slotsKey,
    queryFn: () => slotService.getAll(carId),
    enabled: !!carId && hydrated && !!token,
  });

  function clearSelection() {
    setSelStart(null);
    setSelEnd(null);
    setActiveSlot(null);
  }

  const createMut = useMutation({
    mutationFn: (dto: CreateSlotDto) => slotService.create(carId, dto),
    onSuccess: (created) => {
      queryClient.setQueryData<Slot[]>(slotsKey, (prev = []) => [...prev, created]);
      clearSelection();
    },
  });

  const deleteMut = useMutation({
    mutationFn: (slotId: string) => slotService.remove(carId, slotId),
    onSuccess: (_data, slotId) => {
      queryClient.setQueryData<Slot[]>(slotsKey, (prev = []) => prev.filter((s) => s.id !== slotId));
      setActiveSlot(null);
    },
  });

  function handleDayClick(day: Date) {
    const slot = slots.find((s) => covers(s, day));

    if (slot) {
      if (slot.periodType === 'booked') return;
      setSelStart(null);
      setSelEnd(null);
      setActiveSlot(slot);
      return;
    }

    setActiveSlot(null);
    if (!selStart || selEnd) {
      setSelStart(day);
      setSelEnd(null);
    } else if (ymd(day) < ymd(selStart)) {
      setSelEnd(selStart);
      setSelStart(day);
    } else {
      setSelEnd(day);
    }
  }

  function save() {
    if (!selStart) return;
    const a = selStart;
    const b = selEnd ?? selStart;
    const [from, to] = ymd(a) <= ymd(b) ? [a, b] : [b, a];
    createMut.mutate({ dateFrom: ymd(from), dateTo: ymd(to), type: pendingType });
  }

  function deleteActive() {
    if (activeSlot) deleteMut.mutate(activeSlot.id);
  }

  const prevMonth = () => setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const nextMonthDate = useMemo(
    () => new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1),
    [viewMonth],
  );

  const monthLabel = useMemo(
    () => capitalize(new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewMonth)),
    [locale, viewMonth],
  );
  const nextMonthLabel = useMemo(
    () =>
      capitalize(new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(nextMonthDate)),
    [locale, nextMonthDate],
  );

  const weekdayLabels = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    return Array.from({ length: 7 }, (_, i) =>
      capitalize(fmt.format(new Date(2024, 0, 1 + i)).replace('.', '')),
    );
  }, [locale]);

  const dayMonthFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }),
    [locale],
  );

  function formatRange(from: Date, to: Date): string {
    if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
      return `${from.getDate()} – ${dayMonthFmt.format(to)}`;
    }
    return `${dayMonthFmt.format(from)} – ${dayMonthFmt.format(to)}`;
  }

  const selectionLabel = useMemo(() => {
    if (!selStart) return '';
    const a = selStart;
    const b = selEnd ?? selStart;
    const [from, to] = ymd(a) <= ymd(b) ? [a, b] : [b, a];
    return formatRange(from, to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selStart, selEnd, dayMonthFmt]);

  const activeSlotLabel = useMemo(() => {
    if (!activeSlot) return '';
    return formatRange(parseYmd(activeSlot.dateFrom), parseYmd(activeSlot.dateTo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlot, dayMonthFmt]);

  return {
    car,
    slots,
    isLoading: !hydrated || slotsLoading,
    isError,
    viewMonth,
    nextMonthDate,
    monthLabel,
    nextMonthLabel,
    weekdayLabels,
    today,
    prevMonth,
    nextMonth,
    selStart,
    selEnd,
    selectionLabel,
    pendingType,
    setPendingType,
    handleDayClick,
    save,
    cancel: clearSelection,
    isSaving: createMut.isPending,
    activeSlot,
    activeSlotLabel,
    deleteActive,
    closeDelete: () => setActiveSlot(null),
    isDeleting: deleteMut.isPending,
    alwaysAvailable,
    setAlwaysAvailable,
  };
}
