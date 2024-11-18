import {
  createMemberShipService,
  getAllMemberShipsService,
} from "../services/employeesService.js";

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

