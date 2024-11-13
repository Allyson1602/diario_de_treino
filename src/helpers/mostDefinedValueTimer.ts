import { TrainingModel } from "../models/training.model";

export const mostDefinedValueTimer = (trainings: TrainingModel[]) => {
  const timerCount: Record<string, number> = {};
  let timerValues: string[] = [];
  let mostUsedTimer: string | undefined = undefined;
  let maxCount = 0;

  trainings.forEach(({ exercises }) => {
    exercises.forEach(({ timer }) => {
      if (timer) timerValues.push(timer);
    });
  });

  timerValues.forEach((timerItem) => {
    timerCount[timerItem] = (timerCount[timerItem] || 0) + 1;
  });

  for (const [timerKey, count] of Object.entries(timerCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostUsedTimer = timerKey;
    }
  }

  return mostUsedTimer || "1:30";
};
