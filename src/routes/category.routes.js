import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const router = Router();

// GET /categories - Obtener todas las categorías
router.get("/", CategoryController.getAllCategories);

// GET /categories/:id - Obtener una categoría por ID
router.get("/:id", CategoryController.getCategoryById);

// POST /categories - Crear una nueva categoría
router.post("/", CategoryController.createCategory);

// PUT /categories/:id - Actualizar una categoría
router.put("/:id", CategoryController.updateCategory);

// DELETE /categories/:id - Eliminar una categoría
router.delete("/:id", CategoryController.deleteCategory);

export default router;
