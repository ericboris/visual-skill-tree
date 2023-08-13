const skills = [
  {
    id: 1,
    name: "Central Skill",
    category: "Central",
    relatedSkills: [2, 8, 14, 18, 23, 29]
  },
  // Category 1: Linear progression
  { id: 2, name: "Skill 1.1", category: "Category 1", relatedSkills: [3] },
  { id: 3, name: "Skill 1.2", category: "Category 1", relatedSkills: [4] },
  { id: 4, name: "Skill 1.3", category: "Category 1", relatedSkills: [5] },
  { id: 5, name: "Skill 1.4", category: "Category 1", relatedSkills: [6] },
  { id: 6, name: "Skill 1.5", category: "Category 1", relatedSkills: [7] },
  { id: 7, name: "Skill 1.6", category: "Category 1", relatedSkills: [] },

  // Category 2: Two primary branches
  { id: 8, name: "Skill 2.1", category: "Category 2", relatedSkills: [9, 11] },
  { id: 9, name: "Skill 2.2", category: "Category 2", relatedSkills: [10] },
  { id: 10, name: "Skill 2.3", category: "Category 2", relatedSkills: [] },
  { id: 11, name: "Skill 2.4", category: "Category 2", relatedSkills: [12] },
  { id: 12, name: "Skill 2.5", category: "Category 2", relatedSkills: [13] },
  { id: 13, name: "Skill 2.6", category: "Category 2", relatedSkills: [] },

  // Category 3: Three primary linear branches
  { id: 14, name: "Skill 3.1", category: "Category 3", relatedSkills: [15, 16] },
  { id: 15, name: "Skill 3.2", category: "Category 3", relatedSkills: [] },
  { id: 16, name: "Skill 3.3", category: "Category 3", relatedSkills: [17] },
  { id: 17, name: "Skill 3.4", category: "Category 3", relatedSkills: [] },

  // Category 4: One primary branch that splits
  { id: 18, name: "Skill 4.1", category: "Category 4", relatedSkills: [19] },
  { id: 19, name: "Skill 4.2", category: "Category 4", relatedSkills: [20, 21] },
  { id: 20, name: "Skill 4.3", category: "Category 4", relatedSkills: [] },
  { id: 21, name: "Skill 4.4", category: "Category 4", relatedSkills: [22] },
  { id: 22, name: "Skill 4.5", category: "Category 4", relatedSkills: [] },

  // Category 5: Two primary branches
  { id: 23, name: "Skill 5.1", category: "Category 5", relatedSkills: [24] },
  { id: 24, name: "Skill 5.2", category: "Category 5", relatedSkills: [25, 26] },
  { id: 25, name: "Skill 5.3", category: "Category 5", relatedSkills: [] },
  { id: 26, name: "Skill 5.4", category: "Category 5", relatedSkills: [27, 28] },
  { id: 27, name: "Skill 5.5", category: "Category 5", relatedSkills: [] },
  { id: 28, name: "Skill 5.6", category: "Category 5", relatedSkills: [] },

  // Category 6: One linear branch followed by a branching node
  { id: 29, name: "Skill 6.1", category: "Category 6", relatedSkills: [30] },
  { id: 30, name: "Skill 6.2", category: "Category 6", relatedSkills: [31, 32, 33] },
  { id: 31, name: "Skill 6.3", category: "Category 6", relatedSkills: [] },
  { id: 32, name: "Skill 6.4", category: "Category 6", relatedSkills: [] },
  { id: 33, name: "Skill 6.5", category: "Category 6", relatedSkills: [] }
];

