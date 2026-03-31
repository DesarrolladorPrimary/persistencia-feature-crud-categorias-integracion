import categoriesData from "../data/categories.data.js";

const getNextId = () => {
  if (categoriesData.length === 0) return 1;
  return Math.max(...categoriesData.map((category) => category.id)) + 1;
};

export const CategoryModel = {
  findAll: () => {
    return categoriesData;
  },

  findById: (id) => {
    return categoriesData.find((c) => c.id === id);
  },

  create: (newCategory) => {
    const id = getNextId();
    const categoryWithId = { id, ...newCategory };
    categoriesData.push(categoryWithId);
    return categoryWithId;
  },

  update: (id, updatedFields) => {
    const index = categoriesData.findIndex((c) => c.id === id);
    if (index === -1) return null;

    categoriesData[index] = { ...categoriesData[index], ...updatedFields };
    return categoriesData[index];
  },

  delete: (id) => {
    const index = categoriesData.findIndex((category) => category.id === id);
    if (index === -1) return false;
    categoriesData.splice(index, 1);
    return true;
  },
};
