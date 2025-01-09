import sequelize from "../config/db";
import { DataTypes, Model } from "sequelize";
import { IPost } from "../types/postTypes";

import User from "./userModel";

interface PostAttributes extends IPost {
    createdAt?: Date;
    updatedAt?: Date;
}

interface PostCreationAttributes extends Omit<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

const Post = sequelize.define<Model<PostAttributes, PostCreationAttributes>>("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

export default Post;