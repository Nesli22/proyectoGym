import { createCheckInService, getMembershipByIdService, createReportService } from '../services/customerService.js';

// Controlador para crear un Check-in
export const createCheckIn = async (req, res) => {
    const { clienteId, fechaHora } = req.body;

    try {
        const newCheckIn = await createCheckInService(clienteId, fechaHora);
        return res.status(201).json({
            status: 'Ok',
            message: 'Check-in registrado exitosamente',
            checkIn: newCheckIn,
        });
    } catch (error) {
        res.status(500).json({
            status: 'No',
            message: error.message,
        });
    }
};

// Controlador para obtener detalles de la membresía de un cliente
export const getMemberShipById = async (req, res) => {
    const { id } = req.params;

    try {
        const membership = await getMembershipByIdService(id);
        return res.status(200).json({
            status: 'Ok',
            message: 'Detalles de membresía obtenidos exitosamente',
            membership,
        });
    } catch (error) {
        res.status(500).json({
            status: 'No',
            message: error.message,
        });
    }
};

// Controlador para crear un reporte
export const createReport = async (req, res) => {
    const { userId, descripcion } = req.body;

    try {
        const newReport = await createReportService(userId, descripcion);
        return res.status(201).json({
            status: 'Ok',
            message: 'Reporte creado exitosamente',
            report: newReport,
        });
    } catch (error) {
        res.status(500).json({
            status: 'No',
            message: error.message,
        });
    }
};
