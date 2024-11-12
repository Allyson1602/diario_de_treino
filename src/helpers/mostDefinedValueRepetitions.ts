import { TrainingModel } from "../models/training.model";

export const mostDefinedValueRepetitions = (trainings: TrainingModel[]) => {
  const repetitionsCount: Record<number, number> = {};
  let repetitionsValues: number[] = [];
  let mostUsedRepetitions: string | undefined = undefined;
  let maxCount = 0;

  trainings.forEach(({ exercises }) => {
    exercises.forEach(({ repetitions }) => {
      if (repetitions) repetitionsValues.push(repetitions);
    });
  });

  repetitionsValues.forEach((repetitionsItem) => {
    repetitionsCount[repetitionsItem] = (repetitionsCount[repetitionsItem] || 0) + 1;
  });

  for (const [repetitionsKey, count] of Object.entries(repetitionsCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostUsedRepetitions = repetitionsKey;
    }
  }

  console.log("repetitionsValues", repetitionsValues);
  return Number(mostUsedRepetitions) || 4;
};
