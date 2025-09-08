-- Make duration and workout_date optional (nullable)
ALTER TABLE public.workouts
  ALTER COLUMN duration DROP NOT NULL,
  ALTER COLUMN workout_date DROP NOT NULL,
  ALTER COLUMN workout_date DROP DEFAULT;

-- Note: existing rows keep their current values. New rows may omit these fields.

