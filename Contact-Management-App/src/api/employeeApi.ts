import { CreateEmployeeViewModel, EmployeeViewModel, PaginatedResponse, UpdateEmployeeViewModel } from "../types";
import axios from "./axiosInstance";

export const fetchEmployees = (search = '', page = 1, pageSize = 10) =>
    axios.get<PaginatedResponse<EmployeeViewModel>>('/employees', {
        params: { search, page, pageSize },
    });

export const fetchEmployeeById = (id: number) => axios.get<EmployeeViewModel>(`/employees/${id}`);

export const createEmployee = (data: CreateEmployeeViewModel) => axios.post('/employees', data);

export const updateEmployee = (id: number, data: UpdateEmployeeViewModel) => axios.put(`/employees/${id}`, data);

export const deleteEmployee = (id: number) => axios.delete(`/employees/${id}`);