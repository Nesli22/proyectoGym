import CheckIn from '../models/Checkin.js';
import Membership from '../models/Membership.js';
import Report from '../models/Report.js';

// Servicio para crear un check-in
export const createCheckInService = async (userId, fechaHora = new Date().getTime) => {
    try {
        const newCheckIn = await CheckIn.create({
            userId,
            fechaHora,
        });
        return newCheckIn;
    } catch (error) {
        console.error('Error en el servicio de crear check-in:', error);
        throw new Error('Error al crear el check-in');
    }
};

// Servicio para obtener la membresía de un cliente por su ID
export const getMembershipByIdService = async (userId) => {
    try {
        const membership = await Membership.findOne({ where: { userId } });
        if (!membership) {
            throw new Error('Membresía no encontrada para el cliente especificado');
        }
        return membership;
    } catch (error) {
        console.error('Error en el servicio de obtener membresía:', error);
        throw new Error(error.message || 'Error al obtener la membresía');
    }
};

// Servicio para crear un reporte
export const createReportService = async (userId, descripcion) => {
    if (!descripcion) {
        throw new Error('La descripción del reporte es obligatoria');
    }

    try {
        const newReport = await Report.create({
            userId,
            descripcion,
            fecha: new Date(),
        });
        return newReport;
    } catch (error) {
        console.error('Error en el servicio de crear reporte:', error);
        throw new Error('Error al crear el reporte');
    }
};

// Obtener el token desde localStorage
const token = localStorage.getItem('token');
if (token) {
    // Si el token existe, puedes hacer una solicitud con el token
    fetch('http://localhost:8080/(Las rutas permitidas para el usuario logueado)', {
        method: 'GET', // O POST dependiendo de la ruta que estés consumiendo
        headers: {
            'Authorization': `Bearer ${token}`, // Incluir el token en la cabecera Authorization
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) // Procesar la respuesta JSON
    .then(data => {
        console.log('Respuesta:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
} else {
    console.error('Token no disponible');
}

