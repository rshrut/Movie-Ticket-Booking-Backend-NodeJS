import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Theatre = sequelize.define('Theatre', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seatingCapacity: {
        type: DataTypes.INTEGER
    }
}, { 
    tableName: 'theatres',
    indexes: [
        { fields: ['city'] }
    ] 
});

export default Theatre;