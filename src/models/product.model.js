import productsData from "../data/products.data.js";

const getNextId = () => {
  if (productsData.length === 0) return 1;
  return Math.max(...productsData.map((product) => product.id)) + 1;
};

export const ProductModel = {
  findAll: () => {
    return productsData;
  },

  findById: (id) => {
    return productsData.find((p) => p.id === id);
  },

  create: (newProduct) => {
    const id = getNextId();
    const categoryId = newProduct.categoryId ?? newProduct.category_id;
    const productWithId = {
      id,
      name: newProduct.name,
      price: newProduct.price,
      categoryId,
    };
    productsData.push(productWithId);
    return productWithId;
  },

  existsByCategoryId: (categoryId) => {
    return productsData.some(
      (product) => (product.categoryId ?? product.category_id) === categoryId
    );
  },

  update: (id, updatedFields) => {
    const index = productsData.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const normalizedFields = { ...updatedFields };
    if ("category_id" in normalizedFields) {
      normalizedFields.categoryId = normalizedFields.category_id;
      delete normalizedFields.category_id;
    }

    productsData[index] = { ...productsData[index], ...normalizedFields };
    return productsData[index];
  },

  delete: (id) => {
    const index = productsData.findIndex((product) => product.id === id);
    if (index === -1) return false;
    productsData.splice(index, 1);
    return true;
  },
};
