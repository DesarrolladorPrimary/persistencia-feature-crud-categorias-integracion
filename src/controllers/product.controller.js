import { ProductModel } from "../models/product.model.js";
import { CategoryModel } from "../models/category.model.js";

const getAllProducts = (req, res) => {
  const products = ProductModel.findAll();
  res.status(200).json({
    success: true,
    message: "Lista de productos",
    data: products,
    errors: [],
  });
};

const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = ProductModel.findById(Number(id));
    // Validamos si el producto existe
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto encontrado correctamente",
      data: product,
      errors: [],
    });
  } catch (error) { 
    res.status(500).json({
      success: false,
      message: "Error al procesar la búsqueda",
      data: [],
      errors: [],
    });
  }
};

const createProduct = (req, res) => {
  const { name, price } = req.body;
  const categoryId = req.body.categoryId ?? req.body.category_id;

  if (!name || price == null || categoryId == null) {
    return res.status(400).json({
      success: false,
      message: "Nombre, precio y categoryId son obligatorios",
      data: [],
      errors: [],
    });
  }

  const category = CategoryModel.findById(Number(categoryId));
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "La categoría indicada no existe",
      data: [],
      errors: [],
    });
  }

  const newProduct = ProductModel.create({
    name,
    price,
    categoryId: Number(categoryId),
  });
  res.status(201).json({
    success: true,
    message: "Producto creado correctamente",
    data: newProduct,
    errors: [],
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedFields = { ...req.body };

  if ("category_id" in updatedFields && !("categoryId" in updatedFields)) {
    updatedFields.categoryId = updatedFields.category_id;
    delete updatedFields.category_id;
  }

  if ("categoryId" in updatedFields) {
    const category = CategoryModel.findById(Number(updatedFields.categoryId));
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "La categoría indicada no existe",
        data: [],
        errors: [],
      });
    }
    updatedFields.categoryId = Number(updatedFields.categoryId);
  }

  const updatedProduct = ProductModel.update(Number(id), updatedFields);
  if (!updatedProduct) { 
    return res.status(404).json({
      success: false,
      message: `Producto con ID ${id} no encontrado`,
      data: [],
      errors: [],
    });
  }
  res.status(200).json({
    success: true,
    message: "Producto actualizado correctamente",
    data: updatedProduct,
    errors: [],
  });
};

const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = ProductModel.delete(Number(id));
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: `No se pudo eliminar: Producto con ID ${id} no encontrado`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: [],
      errors: [],
    });    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error al intentar eliminar el producto`,
      data: [],
      errors: [],
    });
  } 
};

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
