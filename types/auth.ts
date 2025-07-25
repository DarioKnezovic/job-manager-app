export enum Role {
    Manager,
    Worker
}

export type Session = {
    userId: string;
    token: string;
    role: Role;
};