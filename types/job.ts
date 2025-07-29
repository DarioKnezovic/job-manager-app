export enum JobStatus {
    Pending = 'pending',
    InProgress = 'in progress',
    Completed = 'completed',
}

export type Job = {
    id: string;
    title: string;
    description?: string;
    date: string;
    customerName: string;
    customerAddress?: string;
    customerPhone?: string;
    assignedTo?: string;
    status?: JobStatus;
    completedAt?: string;
};