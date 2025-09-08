-- Create workout reviews table
CREATE TABLE IF NOT EXISTS public.workout_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.workout_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for workout reviews
CREATE POLICY "Users can view their own workout reviews" 
  ON public.workout_reviews FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout reviews" 
  ON public.workout_reviews FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout reviews" 
  ON public.workout_reviews FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout reviews" 
  ON public.workout_reviews FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS workout_reviews_workout_id_idx ON public.workout_reviews(workout_id);
CREATE INDEX IF NOT EXISTS workout_reviews_user_id_idx ON public.workout_reviews(user_id);
