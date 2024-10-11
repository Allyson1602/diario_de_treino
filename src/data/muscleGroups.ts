export interface IMuscleGroups {
  groupName: string;
  mainMuscles: string[];
}

export const muscleGroups: IMuscleGroups[] = [
  {
    groupName: "Peitoral",
    mainMuscles: ["Peitoral Maior", "Peitoral Menor"],
  },
  {
    groupName: "Costas",
    mainMuscles: ["Dorsal", "Trapézio", "Lombar"],
  },
  {
    groupName: "Ombros",
    mainMuscles: [
      "Deltoide Anterior",
      "Deltoide Lateral",
      "Deltoide Posterior",
    ],
  },
  {
    groupName: "Braços",
    mainMuscles: ["Bíceps", "Tríceps"],
  },
  {
    groupName: "Pernas",
    mainMuscles: [
      "Quadríceps",
      "Posteriores da Coxa",
      "Glúteos",
      "Panturrilhas",
    ],
  },
  {
    groupName: "Abdômen",
    mainMuscles: ["Reto Abdominal", "Oblíquos"],
  },
];
