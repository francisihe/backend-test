
export interface IPost {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}