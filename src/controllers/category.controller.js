import { CategoryModel } from "../models/category.model.js";
import { ProductModel } from "../models/product.model.js";

export const CategoryController = {
  getAllCategories: (req, res) => {
    try {
      const categories = CategoryModel.findAll();
      res.status(200).json({
        success: true,
        message: "Categorías obtenidas exitosamente",
        data: categories,
        errors: []
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener las categorías",
        data: null,
        errors: [error.message]
      });
    }
  },

  getCategoryById: (req, res) => {
    try {
      const { id } = req.params;
      const category = CategoryModel.findById(parseInt(id));
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
          data: null,
          errors: ["ID de categoría no existe"]
        });
      }

      res.status(200).json({
        success: true,
        message: "Categoría obtenida exitosamente",
        data: category,
        errors: []
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener la categoría",
        data: null,
        errors: [error.message]
      });
    }
  },

  createCategory: (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "El nombre de la categoría es requerido",
          data: null,
          errors: ["El campo name es obligatorio"]
        });
      }

      const newCategory = CategoryModel.create({ name });
      res.status(201).json({
        success: true,
        message: "Categoría creada exitosamente",
        data: newCategory,
        errors: []
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear la categoría",
        data: null,
        errors: [error.message]
      });
    }
  },

  updateCategory: (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "El nombre de la categoría es requerido",
          data: null,
          errors: ["El campo name es obligatorio"]
        });
      }

      const updatedCategory = CategoryModel.update(parseInt(id), { name });
      
      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
          data: null,
          errors: ["ID de categoría no existe"]
        });
      }

      res.status(200).json({
        success: true,
        message: "Categoría actualizada exitosamente",
        data: updatedCategory,
        errors: []
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar la categoría",
        data: null,
        errors: [error.message]
      });
    }
  },

  deleteCategory: (req, res) => {
    try {
      const { id } = req.params;
      const categoryId = parseInt(id);
      
      // Verificar si la categoría existe
      const category = CategoryModel.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Categoría no encontrada",
          data: null,
          errors: ["ID de categoría no existe"]
        });
      }
      
      // Validar integridad: verificar si hay productos vinculados
      const hasProducts = ProductModel.existsByCategoryId(categoryId);
      
      if (hasProducts) {
        return res.status(409).json({
          success: false,
          message: "No se puede eliminar la categoría porque tiene recursos vinculados",
          data: null,
          errors: ["La categoría tiene productos asociados"]
        });
      }
      
      // Si no hay productos vinculados, proceder con la eliminación
      const deleted = CategoryModel.delete(categoryId);
      
      res.status(200).json({
        success: true,
        message: "Categoría eliminada exitosamente",
        data: null,
        errors: []
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar la categoría",
        data: null,
        errors: [error.message]
      });
    }
  }
};
