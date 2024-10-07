export interface IMuscleGroups {
  groupName: string;
  mainMuscles: string[];
}

export const muscleGroups: IMuscleGroups[] = [
  {
    groupName: "Chest",
    mainMuscles: ["Peitoral"],
  },
  {
    groupName: "Back",
    mainMuscles: ["Dorsais", "Trapézio", "Lombar (Eretor da espinha)"],
  },
  {
    groupName: "Shoulders",
    mainMuscles: ["Deltoide (frente)", "Deltoide (lado)", "Deltoide (trás)"],
  },
  {
    groupName: "Arms",
    mainMuscles: ["Bíceps", "Tríceps"],
  },
  {
    groupName: "Legs",
    mainMuscles: ["Quadríceps", "Posteriores", "Glúteos", "Panturrilhas"],
  },
  {
    groupName: "Abs",
    mainMuscles: ["Reto abdominal", "Oblíquos"],
  },
];
