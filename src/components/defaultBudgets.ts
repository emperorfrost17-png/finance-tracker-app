export const createdDefaultBudgets = () => {
    return [
      {
        id: crypto.randomUUID(),
        name: "Housing",
        icon: "◎",
        limit: 2000,
        tone: "blue",
      },
      {
        id: crypto.randomUUID(),
        name: "Food",
        icon: "▣",
        limit: 540,
        tone: "coral",
      },
      {
        id: crypto.randomUUID(),
        name: "Transportation",
        icon: "✦",
        limit: 180,
        tone: "blue",
      },

      {
        id: crypto.randomUUID(),
        name: "Personal Spending",
        icon: "●",
        limit: 300,
        tone: "lavender",
      },
      {
        id: crypto.randomUUID(),
        name: "Savings & Investments",
        icon: "●",
        limit: 300,
        tone: "peach",
      },
      {
        id: crypto.randomUUID(),
        name: "Healthcare",
        icon: "●",
        limit: 300,
        tone: "pink",
      },
      {
        id: crypto.randomUUID(),
        name: "Other",
        icon: "●",
        limit: 300,
        tone: "blue",
      },
      {
        id: crypto.randomUUID(),
        name: "Wellness",
        icon: "✦",
        limit: 160,
        tone: "mint",
      },
      {
        id: crypto.randomUUID(),
        name: "Entertainment",
        icon: "●",
        limit: 100,
        tone: "coral",
      },
    ];
  };