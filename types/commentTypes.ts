
export interface IComment {
    id: number;
    content: string;
    postId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}