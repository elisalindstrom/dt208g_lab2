export interface ITodo {
    id: number;
    task: string;
    completed: boolean;
    priority: number;
    completedAt?: Date;
}