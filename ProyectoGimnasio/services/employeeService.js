import Membresia from '../models/Membresia.js';
import Queja from '../models/Queja.js';

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
  const validStates = ['Pendiente', 'En revisión', 'Resuelta', 'Rechazada'];
  if (!validStates.includes(data.estado)) {
    throw new Error('Estado no válido');
  }

  // Actualizar la queja con los datos proporcionados
  await queja.update(data);
  return queja;
};

export const findReportByIdService = async (id) => {
  return await Queja.findByPk(id);
}
