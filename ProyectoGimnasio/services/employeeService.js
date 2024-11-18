import Membresia from '../models/Membresia.js';

// Servicio para crear una membresía
export const createMemberShipService = async (membershipData) => {
  return await Membresia.create(membershipData);
};

// Servicio para obtener todas las membresías
export const getAllMemberShipsService = async () => {
  return await Membresia.findAll();
};
