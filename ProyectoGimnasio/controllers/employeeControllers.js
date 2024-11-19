import {
  createMemberShipService,
  getAllMemberShipsService,
} from "../services/employeeService.js";

import {
  getProductsService,
  createProductService,
  deleteProductByIdService,
  updateProductByIdService,
} from "../services/productService.js";

// Controlador para crear una membresía
export const createMemberShip = async (req, res) => {
  const { tipo, costo, duracion_meses } = req.body;

  // Validar datos obligatorios
  if (!tipo || !costo || !duracion_meses) {
    return res.status(400).json({
      status: "No",
      message: "Todos los campos son obligatorios: tipo, precio, duracionMeses",
    });
  }

  try {
    const newMembership = await createMemberShipService(req.body);
    return res.status(201).json({
      status: "Ok",
      message: "Membresía creada con éxito",
      data: newMembership,
    });
  } catch (error) {
    console.error("Error al crear membresía:", error);
    res.status(500).json({
      status: "No",
      message: "Error al crear membresía",
      error: error.message,
    });
  }
};

// Controlador para obtener todas las membresías
export const getMemberShips = async (req, res) => {
  try {
    const memberships = await getAllMemberShipsService();
    return res.status(200).json({
      status: "Ok",
      message: "Membresías obtenidas con éxito",
      data: memberships,
    });
  } catch (error) {
    console.error("Error al obtener membresías:", error);
    res.status(500).json({
      status: "No",
      message: "Error al obtener membresías",
      error: error.message,
    });
  }
};

// Ver productos disponibles
export const getAllProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    res.status(200).json({
      status: "Ok",
      message: "Productos obtenidos con éxito",
      data: products,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      status: "No",
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  const { nombre, precio, cantidad } = req.body;

  // Validaciones
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      status: "No",
      message: "El nombre del producto es obligatorio.",
    });
  }

  if (!precio || isNaN(precio) || precio <= 0) {
    return res.status(400).json({
      status: "No",
      message: "El precio debe ser un número mayor que 0.",
    });
  }

  if (!cantidad || !Number.isInteger(cantidad) || cantidad <= 0) {
    return res.status(400).json({
      status: "No",
      message: "La cantidad debe ser un número entero mayor que 0.",
    });
  }

  const productData = { nombre, precio, cantidad };

  try {
    const newProduct = await createProductService(productData);
    res.status(201).json({
      status: "Ok",
      message: "Producto agregado con éxito",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({
      status: "No",
      message: "Error al agregar producto",
      error: error.message,
    });
  }
};
// Actualizar un producto
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad } = req.body;

  // Validaciones básicas
  if (!id || isNaN(id)) {
    return res.status(400).json({
      status: "No",
      message: "El ID del producto es inválido o no está definido",
    });
  }

  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({
      status: "No",
      message: "El nombre del producto es obligatorio y debe ser una cadena válida",
    });
  }

  if (precio === undefined || isNaN(precio) || precio < 0) {
    return res.status(400).json({
      status: "No",
      message: "El precio del producto debe ser un número válido y no negativo",
    });
  }

  if (cantidad === undefined || isNaN(cantidad) || cantidad < 0) {
    return res.status(400).json({
      status: "No",
      message: "La cantidad del producto debe ser un número válido y no negativo",
    });
  }

  try {
    const productData = { nombre, precio, cantidad };
    const updatedProduct = await updateProductByIdService(id, productData);

    if (!updatedProduct) {
      return res.status(404).json({
        status: "No",
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: "Ok",
      message: "Producto actualizado con éxito",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      status: "No",
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};

// Eliminar un producto
export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  // Validación básica del ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      status: "No",
      message: "El ID del producto es inválido o no está definido",
    });
  }

  try {
    const result = await deleteProductByIdService(id);

    // Validar si el producto existía
    if (!result) {
      return res.status(404).json({
        status: "No",
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: "Ok",
      message: "Producto eliminado con éxito",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      status: "No",
      message: "Error al eliminar producto",
      error: error.message,
    });
  }
};

