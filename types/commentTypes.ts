
export interface IComment {
    id: number;
    body: string;
    postId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}