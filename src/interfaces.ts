import { AxiosHeaders } from "axios"

export interface ILoginError {
    code: string
    response: {
        data: string
        status: number
        statusText: string
        headers: AxiosHeaders
    }
}

export interface IManagerModel {
    fullName: string
    email: string
    password: string
}

export interface IEmployeeModel extends IManagerModel {
    id?: string
    managerId: string
}

export interface EmployeeDetailsModalProps {
    open: boolean;
    onClose: () => void;
    employee: {
        fullName: string;
        email: string;
        managerName?: string;
    } | null;
}

export interface EditEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    employee: IEmployeeModel | null;
    onUpdateEmployee: (updatedEmployee: IEmployeeModel) => void;
}