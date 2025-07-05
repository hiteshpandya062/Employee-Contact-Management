import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../features/employees/employeeSlice';
import companyReducer from '../features/companies/companySlice';

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
        companies: companyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;