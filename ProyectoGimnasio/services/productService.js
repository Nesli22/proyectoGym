import Producto from '../models/Producto.js';

export const getProductsService = async () => {
    try {
        return await Producto.findAll();
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
};

export const createProductService = async (producto) => {
    try {
        // Crear el producto en la base de datos
        const nuevoProducto = await Producto.create(producto);
        return nuevoProducto;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
};

export const getProductByIdService = async (id) => {
    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return null;
        }
        return producto;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error;
    }
};

export const updateProductByIdService = async (id, productData) => {
    try {
        // Buscar el producto por ID
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return null;
        }

        // Actualizar el producto con los nuevos datos
        return await producto.update(productData);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
};

export const deleteProductByIdService = async (id) => {
    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            await producto.destroy();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
};

export const getStockProductByIdService = async (id) => {
    try {
      const producto = await Producto.findByPk(id, {
        attributes: ['cantidad'],
      });
  
      if (!producto) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
  
      return producto; // Devuelve el producto con su stock
    } catch (error) {
      throw new Error(error.message); // Propaga el error para manejarlo en el controlador
    }
  };