import sequelize from "../config/db";
import { DataTypes } from "sequelize";

import Post from "./postModel";

export const Comment = sequelize.define("Comment", {
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
}, {
    timestamps: true,
});

Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

export default Comment;