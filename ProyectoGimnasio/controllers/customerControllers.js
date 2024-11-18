import { createCheckInService, getMembershipByIdService, createReportService } from '../services/customerService.js';

// Controlador para crear un Check-in
export const createCheckIn = async (req, res) => {
    const {usuarioId} = req.body;

    try {
        const nuevaEntrada = await createCheckInService(usuarioId);
        return res.status(201).json({
            status: 'Ok',
            message: 'Entrada registrada exitosamente',
            entrada: nuevaEntrada,
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
    const { usuarioId } = req.body;

    
    try {
        const membresia = await getMembershipByIdService(usuarioId);
        return res.status(200).json({
            status: 'Ok',
            message: 'Detalles de membresía obtenidos exitosamente',
            data: membresia,
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
    const { asunto, descripcion, usuarioId } = req.body;

    try {
        const nuevaQueja = await createReportService(asunto, descripcion, usuarioId);
        return res.status(201).json({
            status: 'Ok',
            message: 'Reporte creado exitosamente',
            report: nuevaQueja,
        });
    } catch (error) {
        res.status(500).json({
            status: 'No',
            message: error.message,
        });
    }
};


