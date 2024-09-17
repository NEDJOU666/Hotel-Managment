export interface StaffDetails {
    _id?:string,
    name: string;
    email:string;
    position: string;
    department: string;
    contact: string;
    dateOfHire: string;
    salary: number;
    leave:boolean;
    holidays:boolean;
}