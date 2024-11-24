import moment from 'moment-timezone';

import Membresia from "../models/Membresia.js";
import Queja from "../models/Queja.js";
import Pago from "../models/Pago.js";
import Usuario from "../models/Usuario.js";
import Venta from "../models/Venta.js";

import { updateUserByIdService } from "../services/userService.js";

export const createMemberShipService = async (membershipData) => {
  return await Membresia.create(membershipData);
};

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

    const fechaInicio = new Date(); 
    let fechaVencimiento = new Date(fechaInicio); 

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
      const estadoActivo=true;
      await updateUserByIdService(usuarioId, {
        fechaInicio,
        fechaVencimiento,
        estadoActivo
      });
    }

    return nuevoPago;
  } catch (error) {
    // Lanza el error al controlador
    throw new Error(error.message);
  }
};

export const getPaymentsService = async () => {
  return await Pago.findAll({
    include: [
      {
        model: Usuario,
        as: 'usuario', // Asociación para el usuario que realizó el pago
        attributes: ['id', 'nombre'], // Incluye el id y el nombre
      },
      {
        model: Usuario,
        as: 'empleado', // Asociación para el empleado que atendió el pago
        attributes: ['id', 'nombre'], // Incluye el id y el nombre
      },
    ],
  });
};

export const findReportByIdService = async (id) => {
  return await Queja.findByPk(id);
};

export const getReportsService = async () => {
  return await Queja.findAll({
    include: [
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['nombre'], // Selecciona sólo el campo 'nombre'
      },
    ],
  });
}

export const getVentasService = async () => {
  return await Venta.findAll();
}

export const createVentaService = async ({ total, cantidad, empleadoId }) => {
  try {
    // Crear una nueva venta en la base de datos
    const nuevaVenta = await Venta.create({
      total,
      cantidad,
      empleadoId,
    });

    // Retornar la venta creada
    return nuevaVenta;
  } catch (error) {
    throw new Error(`Error al crear la venta: ${error.message}`);
  }
};