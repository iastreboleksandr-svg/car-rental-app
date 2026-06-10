'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';
import type { Car, CarPhoto, CreateCarDto } from '@/types/car';
import {
  EMPTY_CAR_FORM,
  fileToDataUrl,
  validateCarForm,
  validateField,
  validatePhotoFile,
  type CarFormErrors,
  type CarFormField,
  type CarFormValues,
} from '@/lib/carForm';

export type CarFormMode = 'create' | 'edit';

export interface PhotoDraft {
  uid: string;
  file: File;
  preview: string;
}

export type FormFeedback = { type: 'success' | 'error'; key: string } | null;

function carToFormValues(car: Car): CarFormValues {
  return {
    brand: car.brand,
    model: car.model,
    year: car.year,
    fuelType: car.fuelType,
    transmission: car.transmission,
    seats: car.seats,
    description: car.description ?? '',
    pricePerDay: car.pricePerDay,
    deposit: car.deposit,
    lat: car.lat,
    lng: car.lng,
    address: car.address,
  };
}

function sameValues(a: CarFormValues, b: CarFormValues): boolean {
  return (Object.keys(a) as (keyof CarFormValues)[]).every((k) => a[k] === b[k]);
}

export function useCarForm(mode: CarFormMode, carId?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const hydrated = useAuthStore((s) => s._hydrated);

  const [form, setForm] = useState<CarFormValues>(EMPTY_CAR_FORM);
  const [initialForm, setInitialForm] = useState<CarFormValues>(EMPTY_CAR_FORM);
  const [errors, setErrors] = useState<CarFormErrors>({});
  const [touched, setTouched] = useState<Set<CarFormField>>(new Set());

  const [newPhotos, setNewPhotos] = useState<PhotoDraft[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<CarPhoto[]>([]);
  const [removedPhotoIds, setRemovedPhotoIds] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<FormFeedback>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const uidRef = useRef(0);
  const [syncedId, setSyncedId] = useState<string | null>(null);

  // --- Edit mode: load the car and pre-fill once ---------------------------
  const { data: car, isError: isCarError } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => carService.getById(carId as string),
    enabled: mode === 'edit' && !!carId && hydrated,
  });

  // Sync the loaded car into form state once (React "adjust state during
  // render" idiom — runs before commit, no effect needed).
  if (mode === 'edit' && car && syncedId !== car.id) {
    const values = carToFormValues(car);
    setForm(values);
    setInitialForm(values);
    setExistingPhotos(car.photos ?? []);
    setSyncedId(car.id);
  }

  const photoCount = existingPhotos.length + newPhotos.length;

  const isDirty = useMemo(
    () => !sameValues(form, initialForm) || newPhotos.length > 0 || removedPhotoIds.length > 0,
    [form, initialForm, newPhotos.length, removedPhotoIds.length],
  );

  // --- Field handlers ------------------------------------------------------
  const revalidate = useCallback(
    (field: CarFormField, nextForm: CarFormValues, nextPhotoCount: number) => {
      setErrors((prev) => {
        const code = validateField(field, nextForm, nextPhotoCount);
        const next = { ...prev };
        if (code) next[field] = code;
        else delete next[field];
        return next;
      });
    },
    [],
  );

  const setField = useCallback(
    <K extends keyof CarFormValues>(key: K, value: CarFormValues[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (touched.has(key as CarFormField)) revalidate(key as CarFormField, next, photoCount);
        return next;
      });
    },
    [touched, revalidate, photoCount],
  );

  const blurField = useCallback(
    (field: CarFormField) => {
      setTouched((prev) => new Set(prev).add(field));
      revalidate(field, form, photoCount);
    },
    [form, photoCount, revalidate],
  );

  // --- Photos --------------------------------------------------------------
  const addFiles = useCallback(async (files: FileList | File[]) => {
    setPhotoError(null);
    const list = Array.from(files);
    const drafts: PhotoDraft[] = [];
    for (const file of list) {
      const invalid = validatePhotoFile(file);
      if (invalid) {
        setPhotoError(invalid);
        continue;
      }
      const preview = await fileToDataUrl(file);
      drafts.push({ uid: `p${uidRef.current++}`, file, preview });
    }
    if (drafts.length === 0) return;
    setNewPhotos((prev) => [...prev, ...drafts]);
    setTouched((prev) => new Set(prev).add('photos'));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.photos;
      return next;
    });
  }, []);

  const removeNewPhoto = useCallback((uid: string) => {
    setNewPhotos((prev) => prev.filter((p) => p.uid !== uid));
  }, []);

  const removeExistingPhoto = useCallback((id: string) => {
    setExistingPhotos((prev) => prev.filter((p) => p.id !== id));
    setRemovedPhotoIds((prev) => [...prev, id]);
  }, []);

  // --- Submit --------------------------------------------------------------
  const mutation = useMutation({
    mutationFn: async (values: CarFormValues) => {
      const dto: CreateCarDto = { ...values, description: values.description?.trim() || undefined };

      if (mode === 'create') {
        const created = await carService.create(dto);
        if (newPhotos.length > 0) {
          await carService.uploadPhotos(
            created.id,
            newPhotos.map((p) => p.file),
          );
        }
        return created;
      }

      // edit
      const id = carId as string;
      const updated = await carService.update(id, dto);
      for (const photoId of removedPhotoIds) {
        await carService.deletePhoto(id, photoId);
      }
      if (newPhotos.length > 0) {
        await carService.uploadPhotos(
          id,
          newPhotos.map((p) => p.file),
        );
      }
      return updated;
    },
    onSuccess: () => {
      setFormError(null);
      setFeedback({ type: 'success', key: 'toastSaved' });
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      if (carId) queryClient.invalidateQueries({ queryKey: ['car', carId] });
      window.setTimeout(() => router.replace('/dashboard'), 900);
    },
    onError: (err) => {
      setFormError(err instanceof Error ? err.message : null);
      setFeedback({ type: 'error', key: 'toastError' });
    },
  });

  const validateAll = useCallback((): boolean => {
    const next = validateCarForm(form, photoCount);
    setErrors(next);
    setTouched(new Set(Object.keys(next) as CarFormField[]));
    return Object.keys(next).length === 0;
  }, [form, photoCount]);

  const submit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      setFeedback(null);
      if (!validateAll()) return;
      mutation.mutate(form);
    },
    [validateAll, mutation, form],
  );

  // --- Cancel (with unsaved-changes confirmation) --------------------------
  const requestCancel = useCallback(() => {
    if (isDirty) setShowCancelConfirm(true);
    else router.push('/dashboard');
  }, [isDirty, router]);

  const confirmCancel = useCallback(() => {
    setShowCancelConfirm(false);
    router.push('/dashboard');
  }, [router]);

  const dismissCancel = useCallback(() => setShowCancelConfirm(false), []);

  // --- Delete car (edit mode only) -----------------------------------------
  const deleteMutation = useMutation({
    mutationFn: () => carService.remove(carId as string),
    onSuccess: () => {
      setShowDeleteConfirm(false);
      setFeedback({ type: 'success', key: 'toastDeleted' });
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      window.setTimeout(() => router.replace('/dashboard'), 900);
    },
    onError: (err) => {
      setShowDeleteConfirm(false);
      setFormError(err instanceof Error ? err.message : null);
      setFeedback({ type: 'error', key: 'toastDeleteError' });
    },
  });

  const requestDelete = useCallback(() => setShowDeleteConfirm(true), []);
  const confirmDelete = useCallback(() => deleteMutation.mutate(), [deleteMutation]);
  const dismissDelete = useCallback(() => setShowDeleteConfirm(false), []);

  return {
    mode,
    form,
    errors,
    setField,
    blurField,
    // photos
    newPhotos,
    existingPhotos,
    photoCount,
    photoError,
    addFiles,
    removeNewPhoto,
    removeExistingPhoto,
    // status
    isLoadingCar: mode === 'edit' && syncedId === null && !isCarError,
    isSubmitting: mutation.isPending,
    formError,
    feedback,
    clearFeedback: () => setFeedback(null),
    isDirty,
    // submit / cancel
    submit,
    requestCancel,
    showCancelConfirm,
    confirmCancel,
    dismissCancel,
    // delete (edit mode)
    requestDelete,
    showDeleteConfirm,
    confirmDelete,
    dismissDelete,
    isDeleting: deleteMutation.isPending,
    // for header
    car,
  };
}
