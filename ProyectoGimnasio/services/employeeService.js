import moment from 'moment-timezone';


import Membresia from "../models/Membresia.js";
import Queja from "../models/Queja.js";
import Pago from "../models/Pago.js";

import { updateUserByIdService } from "../services/userService.js";

// Servicio para crear una membresía
export const createMemberShipService = async (membershipData) => {
  return await Membresia.create(membershipData);
};

// Servicio para obtener todas las membresías
export const getAllMemberShipsService = async () => {
  return await Membresia.findAll();
};

export const updateReportByIdService = async (id, data) => {
  // Buscar la queja por ID
  const queja = await Queja.findByPk(id);

  if (!queja) {
    return null;
  }

  // Validar que el estado esté dentro de los valores permitidos
  const validStates = ["Pendiente", "En revisión", "Resuelta", "Rechazada"];
  if (!validStates.includes(data.estado)) {
    throw new Error("Estado no válido");
  }

  // Actualizar la queja con los datos proporcionados
  await queja.update(data);
  return queja;
};

export const createPaymentService = async (paymentData) => {
  try {
    const { tipo, usuarioId } = paymentData;
    // Crear el registro de pago
    const nuevoPago = await Pago.create(paymentData);

    const fechaInicio = moment().tz("America/Mexico_City").format();
    const fechaVencimiento = moment().tz("America/Mexico_City").format();

    // Asignar la duración según el tipo de membresía
    switch (tipo.toLowerCase()) {
      case "normal":
        fechaVencimiento.setMonth(fechaInicio.getMonth() + 3); // 3 meses
        break;
      case "estudiante":
        fechaVencimiento.setMonth(fechaInicio.getMonth() + 5); // 5 meses
        break;
      case "vip":
        fechaVencimiento.setMonth(fechaInicio.getMonth() + 12); // 12 meses
        break;
      default:
        throw new Error(
          "Tipo de membresía inválido. Debe ser Normal, Estudiante o VIP."
        );
    }

    // Actualizar el estadoActivo y las fechas del usuario
    if (usuarioId) {
      await updateUserByIdService(usuarioId, {
        estadoActivo: true,
        fechaInicio,
        fechaVencimiento,
      });
    }

    return nuevoPago;
  } catch (error) {
    // Lanza el error al controlador
    throw new Error(error.message);
  }
};

export const findReportByIdService = async (id) => {
  return await Queja.findByPk(id);
};
