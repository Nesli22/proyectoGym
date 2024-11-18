import Entrada from '../models/Entrada.js';
import Membresia from '../models/Membresia.js';
import Usuario from '../models/Usuario.js';
import Queja from '../models/Queja.js';

export const createCheckInService = async (
  usuarioId,
  fechaEntrada = new Date()
) => {
  try {
    const nuevaEntrada = await Entrada.create({
      fechaEntrada,
      usuarioId,
    });
    return nuevaEntrada;
  } catch (error) {
    console.error("Error en el servicio de crear la entrada:", error);
    throw new Error("Error al crear la entrada");
  }
};

export const getMembershipByIdService = async (usuarioId) => {
    try {
      // Busca al usuario por su ID
      const usuario = await Usuario.findByPk(usuarioId);
      
      // Verifica si se encontró al usuario
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
  
      // Busca la membresía asociada al usuario usando el membresiaId
      const membresia = await Membresia.findOne({
        where: { id: usuario.membresiaId },  // Corregir la consulta aquí
      });
  
      // Verifica si se encontró la membresía
      if (!membresia) {
        throw new Error('Membresía no encontrada');
      }
  
      // Retorna la membresía asociada al usuario
      return membresia;
    } catch (error) {
      console.error('Error en el servicio de obtener membresía:', error);
      throw new Error(error.message || 'Error al obtener la membresía');
    }
  };
  
  

// Servicio para crear un reporte
export const createReportService = async (asunto, descripcion, usuarioId) => {
   
    if (!asunto) {
        throw new Error("La descripción del reporte es obligatoria");
      }

    if (!descripcion) {
        throw new Error("La descripción del reporte es obligatoria");
      }
    
      if (!usuarioId) {
        throw new Error("El ID del usuario es obligatorio");
      }

  try {
    const nuevaQueja = await Queja.create({
      asunto,
      descripcion,
      fecha: new Date(),
      usuarioId,
    });
    return nuevaQueja;
  } catch (error) {
    console.error("Error en el servicio al crear la queja:", error);
    throw new Error("Error al crear la queja.");
  }
};
 

