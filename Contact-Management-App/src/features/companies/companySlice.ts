import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CompanyViewModel } from '../../types';
import * as api from '../../api/companyApi';

interface CompanyState {
    data: CompanyViewModel[];
    loading: boolean;
    error?: string;
}

const initialState: CompanyState = {
    data: [],
    loading: false,
    error: undefined,
};

export const getCompanies = createAsyncThunk('companies/getAll', async () => {
    const response = await api.fetchCompanies();
    return response.data;
});

const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCompanies.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getCompanies.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default companySlice.reducer;