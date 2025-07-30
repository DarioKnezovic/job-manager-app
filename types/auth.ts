export enum Role {
    Manager = 'Manager',
    Worker = 'Worker',
}

export type Session = {
    userId: string;
    token: string;
    email: string;
    firstName: string;
    lastName: string;
    companyId: string;
    role: Role;
};