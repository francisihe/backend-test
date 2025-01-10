import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
import { IUser } from '../types/userTypes';

interface UserAttributes extends IUser {
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

// const User = sequelize.define("User", {
const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default User;