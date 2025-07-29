export enum Role {
    Manager,
    Worker
}

export type Session = {
    userId: string;
    token: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
};