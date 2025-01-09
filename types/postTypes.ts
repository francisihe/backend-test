
export interface IPost {
    id: number;
    body: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}