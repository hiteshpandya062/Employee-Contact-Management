import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateEmployeeViewModel, EmployeeViewModel, UpdateEmployeeViewModel } from "../../types";
import * as api from '../../api/employeeApi';

interface State {
    data: EmployeeViewModel[];
    selectedEmployee?: EmployeeViewModel;
    totalCount: number;
    loading: boolean;
    createLoading: boolean;
    updateLoading: boolean;
    error?: string;
}

const initialState: State = {
    data: [],
    selectedEmployee: undefined,
    totalCount: 0,
    loading: false,
    createLoading: false,
    updateLoading: false,
    error: undefined,
};

export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async ({ search = '', page = 1, pageSize = 10 }: { search?: string; page?: number; pageSize?: number }) => {
        const response = await api.fetchEmployees(search, page, pageSize);
        return response.data;
    }
);

export const getEmployeeById = createAsyncThunk('employees/getById', async (id: number) => {
    const response = await api.fetchEmployeeById(id);
    return response.data;
});

export const createNewEmployee = createAsyncThunk('employees/create', async (data: CreateEmployeeViewModel) => {
    await api.createEmployee(data);
});

export const updateEmployeeById = createAsyncThunk(
    'employees/update',
    async ({ id, data }: { id: number; data: UpdateEmployeeViewModel }) => {
        await api.updateEmployee(id, data);
    }
);

export const deleteEmployeeById = createAsyncThunk('employees/delete', async (id: number) => {
    await api.deleteEmployee(id);
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        clearSelectedEmployee: (state) => {
            state.selectedEmployee = undefined;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getEmployees.pending, state => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.totalCount = action.payload.totalCount;
                state.loading = false;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            .addCase(getEmployeeById.fulfilled, (state, action) => {
                state.selectedEmployee = action.payload;
            })
            .addCase(deleteEmployeeById.fulfilled, (state, action) => {
                state.data = state.data.filter(emp => emp.id !== action.meta.arg);
                state.totalCount -= 1;
            })

            // Create
            .addCase(createNewEmployee.pending, state => {
                state.createLoading = true;
            })
            .addCase(createNewEmployee.fulfilled, state => {
                state.createLoading = false;
            })
            .addCase(createNewEmployee.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.error.message;
            })

            .addCase(updateEmployeeById.pending, state => {
                state.updateLoading = true;
            })
            .addCase(updateEmployeeById.fulfilled, state => {
                state.updateLoading = false;
            })
            .addCase(updateEmployeeById.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;