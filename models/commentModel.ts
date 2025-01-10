import sequelize from "../config/db";
import { DataTypes, Model } from "sequelize";
import { IComment } from "../types/commentTypes";

import Post from "./postModel";
import User from "./userModel";

interface CommentAttributes extends IComment {
    createdAt?: Date;
    updatedAt?: Date;
}

interface CommentCreationAttributes extends Omit<CommentAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export const Comment = sequelize.define<Model<CommentAttributes, CommentCreationAttributes>>("Comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    }
}, {
    timestamps: true,
});

Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Post.hasMany(Comment, { foreignKey: 'postId' });
User.hasMany(Comment, { foreignKey: 'userId' });

export default Comment;