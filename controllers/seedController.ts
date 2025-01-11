import { Request, Response } from 'express';
import User from '../models/userModel';
import Post from '../models/postModel';
import Comment from '../models/commentModel';
import * as fs from 'fs';
import * as path from 'path';

export const seedDatabase = async (req: Request, res: Response): Promise<void> => {
    try {
        await Comment.destroy({ where: {} });
        await Post.destroy({ where: {} });
        await User.destroy({ where: {} });

        // Updated to use path.resolve instead of path.join to avoid issues with different environments
        const usersFilePath = path.resolve(__dirname, '..', 'seed', 'users.json');
        const postsFilePath = path.resolve(__dirname, '..', 'seed', 'posts.json');
        const commentsFilePath = path.resolve(__dirname, '..', 'seed', 'comments.json');

        if (!fs.existsSync(usersFilePath) || !fs.existsSync(postsFilePath) || !fs.existsSync(commentsFilePath)) {
            throw new Error('One or more seed files are missing.');
        }

        const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const postsData = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
        const commentsData = JSON.parse(fs.readFileSync(commentsFilePath, 'utf-8'));

        await User.bulkCreate(usersData, { validate: true });
        await Post.bulkCreate(postsData, { validate: true });
        await Comment.bulkCreate(commentsData, { validate: true });

        res.status(200).json({
            status: true,
            message: 'Database successfully seeded.',
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Failed to seed the database.',
            error: error.message,
        });
    }
};


// import { Request, Response } from 'express';
// import fs from 'fs';
// import path from 'path';

// import Post from '../models/postModel';
// import User from '../models/userModel';
// import Comment from '../models/commentModel';

// export const seedDatabase = async (req: Request, res: Response): Promise<void> => {
//     try {
//         await User.destroy({ where: {} });
//         await Post.destroy({ where: {} });
//         await Comment.destroy({ where: {} });

//         const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../seed/users.json'), 'utf-8'));

//         console.log(usersData);
//         const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../seed/posts.json'), 'utf-8'));
//         const commentsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../seed/comments.json'), 'utf-8'));

        
//         const users = await User.bulkCreate(usersData);
//         // console.log(users);
//         // const posts = await Post.bulkCreate(postsData);
//         // await Comment.bulkCreate(commentsData);

//         res.status(201).json({
//             status: true,
//             message: 'Database has been seeded successfully.',
//         });

//     } catch (error: any) {
//         res.status(500).json({
//             status: false,
//             message: 'Failed to seed the database.',
//             error: error.message,
//         });
//     }
// };
