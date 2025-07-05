export interface CompanyViewModel {
    id: number;
    companyName: string;
    domain: string;
    industry: string;
    website: string;
}

export interface EmployeeViewModel {
    id: number;
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
    companyName: number;
    companyID: number;
    isActive: boolean;
    createdAt: string;
}

export interface CreateEmployeeViewModel {
    name: string;
    email: string;
    phone?: string;
    jobTitle?: string;
    companyID: number;
    isActive?: boolean;
}

export interface UpdateEmployeeViewModel extends CreateEmployeeViewModel { }

export interface PaginatedResponse<T> {
    data: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}
