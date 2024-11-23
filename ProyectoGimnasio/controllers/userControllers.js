import {
  getUsersService,
  createUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
} from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    // Obtiene todos los usuarios de la base de datos
    const usuarios = await getUsersService();

    // Envía la lista de usuarios en formato JSON
    res.status(201).json({
      status: "Ok",
      message: "Usuarios obtenidos con éxito",
      data: usuarios,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);

    // Envía un mensaje de error en caso de fallas en la consulta
    res.status(500).json({
      status: "No",
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { nombre, correo, contraseña, rol, fechaInicio, fechaVencimiento,membresiaId,estadoActivo } = req.body;

  if (!nombre || !correo || !contraseña || !rol) {
    return res.status(400).json({
      status: "No",
      message:
        "Todos los campos son obligatorios: nombre, correo, contraseña, rol",
    });
  }

  try {
    const usuario = await createUserService(req.body);

    return res.status(201).json({
      status: "Ok",
      message: "Usuario creado exitosamente",
      usuarioId: usuario.id,
      nombre: usuario.nombre,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({
      message: error.message || "Error al crear el usuario",
      status: "No",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (user) {
      return res.status(200).json({
        status: "Ok",
        message: "Usuario obtenido con éxito",
        user,
      });
    }
    res.status(404).json({
      status: "No",
      message: "Usuario no encontrado",
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({
      status: "No",
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUserByIdService(id, userData);
    if (updatedUser) {
      return res.status(200).json({
        status: "Ok",
        message: "Usuario actualizado con éxito",
        user: updatedUser,
      });
    }
    res.status(404).json({
      status: "No",
      message: "Usuario no encontrado",
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({
      status: "No",
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteUserByIdService(id);
    if (deleted) {
      return res.status(200).json({
        status: "Ok",
        message: "Usuario eliminado con éxito",
      });
    }
    res.status(404).json({
      status: "No",
      message: "Usuario no encontrado",
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({
      status: "No",
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
};
