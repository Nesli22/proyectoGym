import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/Connection.js';

class Product extends Model {}

Product.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, { sequelize, modelName: 'Product' });

export default Product;
