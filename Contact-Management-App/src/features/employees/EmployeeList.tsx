import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createNewEmployee, deleteEmployeeById, getEmployees, updateEmployeeById } from './employeeSlice';
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Button } from 'primereact/button';
import { CreateEmployeeViewModel, EmployeeViewModel, UpdateEmployeeViewModel } from '../../types';
import { ConfirmDialog, ConfirmDialogProps } from 'primereact/confirmdialog';
import { DialogHeader } from '../../components/dialog-header';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { EmployeeForm } from './components/employee-form';
import { getCompanies } from '../companies/companySlice';
import { useToastContext } from '../../utils/ToastMessageProvider';
import { Badge } from 'primereact/badge';

export const EmployeeList = () => {
    const dispatch = useAppDispatch();
    const { showError, showSuccess } = useToastContext();
    const { data: employees, loading, totalCount, createLoading, updateLoading } = useAppSelector(state => state.employees);
    const { data: companies } = useAppSelector(state => state.companies);
    const [lazyParams, setLazyParams] = useState({ page: 0, rows: 10 });
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeViewModel>();
    const [showEmployeeForm, setShowEmployeeForm] = useState<boolean>(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(
                getEmployees({
                    page: lazyParams.page + 1,
                    pageSize: lazyParams.rows,
                    search: searchText
                })
            );
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [dispatch, lazyParams, searchText]);

    useEffect(() => {
        dispatch(getCompanies())
    }, [])

    const onPage = (event: DataTablePageEvent) => {
        setLazyParams({ page: event.page ?? 0, rows: event.rows });
    };

    const handleShowDeleteConfirmDialog = (rowData: EmployeeViewModel) => {
        setShowDeleteConfirmDialog(true);
        setSelectedEmployee(rowData);
    }

    const handleRejectDeleteConfirmationDialog = () => {
        setShowDeleteConfirmDialog(false);
        setSelectedEmployee(undefined);
    }

    const handleAcceptDeleteconfirmationDialog = async () => {
        try {
            await dispatch(deleteEmployeeById(selectedEmployee?.id ?? 0)).unwrap();
            showSuccess('Employee deleted successfully.');

            dispatch(
                getEmployees({
                    page: lazyParams.page + 1,
                    pageSize: lazyParams.rows,
                    search: searchText
                })
            );
        } catch (error: any) {
            showError(error?.message || 'Something went wrong while deleting employee.');
        }
    };

    const handleShowEditDialog = (rowData: EmployeeViewModel) => {
        setShowEmployeeForm(true);
        setSelectedEmployee(rowData);
    }

    const actionBodyTemplate = (rowData: EmployeeViewModel, op: ColumnBodyOptions) => {
        return (<div>
            <Button icon="pi pi-pencil" severity="secondary" className="p-button" text size='small' onClick={() => handleShowEditDialog(rowData)} />
            <Button icon="pi pi-trash" severity="danger" text size='small' onClick={() => handleShowDeleteConfirmDialog(rowData)} />
        </div>)
    }

    const dateBodyTemplate = (rowData: EmployeeViewModel, op: ColumnBodyOptions) => {
        const createDate = rowData.createdAt ? moment.utc(rowData.createdAt).local().format("L") : "-";
        return <div>
            <span>{createDate}</span>
        </div>
    }

    const activeFlagBodyTemplate = (rowData: EmployeeViewModel) => {
        return <div>
            {rowData?.isActive ? <Badge severity="success"></Badge> : <Badge severity="danger"></Badge>}
        </div>
    }

    const confirmDeleteDialogFooter = (e: ConfirmDialogProps) => {
        return (<div>
            <Button label="No" severity="secondary" text onClick={() => e.reject && e.reject()} />
            <Button label="Yes" severity="danger" onClick={() => e.accept && e.accept()} />
        </div>)
    }

    const handleAddEmployee = () => {
        setShowEmployeeForm(true);
    }

    const deleteConfirmationDialog = (
        <ConfirmDialog
            header={() => <DialogHeader header="Confirmation" color='red' />}
            message="Are you sure you want to delete this employee?"
            icon="pi pi-exclamation-triangle"
            visible={showDeleteConfirmDialog}
            onHide={() => setShowDeleteConfirmDialog(false)}
            reject={handleRejectDeleteConfirmationDialog}
            accept={handleAcceptDeleteconfirmationDialog}
            footer={confirmDeleteDialogFooter}
        />
    )

    const onCloseEmployeeForm = () => {
        setShowEmployeeForm(false);
        setSelectedEmployee(undefined);
    }

    const handleSubmit = async (
        values: CreateEmployeeViewModel
    ) => {
        try {
            const payload = { ...values, id: selectedEmployee?.id ?? 0 };
            if (!selectedEmployee?.id) {
                await dispatch(createNewEmployee(payload)).unwrap();
                showSuccess('Employee added successfully');
            } else {
                await dispatch(updateEmployeeById({ id: selectedEmployee?.id, data: payload })).unwrap();
                showSuccess('Employee updated successfully');
            }

            // Refresh data
            dispatch(
                getEmployees({
                    page: lazyParams.page + 1,
                    pageSize: lazyParams.rows,
                    search: searchText
                })
            );

            onCloseEmployeeForm();
        } catch (error: any) {
            showError(error?.message || 'Something went wrong. Please contact your administrator.');
        }
    };

    const employeeFormDialog = (
        <Dialog visible={showEmployeeForm} header={selectedEmployee ? "Edit Employee" : "Add New Employee"} onHide={onCloseEmployeeForm} style={{ width: "550px" }}>
            <EmployeeForm employee={{
                name: selectedEmployee?.name || "",
                email: selectedEmployee?.email || "",
                phone: selectedEmployee?.phone,
                jobTitle: selectedEmployee?.jobTitle,
                companyID: selectedEmployee?.companyID ?? 0,
                isActive: selectedEmployee?.isActive
            }}
                isEdit={!!selectedEmployee?.id}
                companies={companies}
                onSubmit={handleSubmit}
                loading={createLoading || updateLoading}
            />
        </Dialog>
    )

    return (
        <div className="card">
            <div className="flex justify-content-between flex-wrap gap-2 items-center mb-3 w-full">
                <Button
                    label="Add Employee"
                    icon="pi pi-plus"
                    className="p-button-sm w-full md:w-auto"
                    onClick={handleAddEmployee}
                    style={{ width: "fit-content" }}
                    size='small'
                />
                <InputText
                    placeholder="Search by name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full md:w-auto"
                />
            </div>
            <DataTable
                value={employees}
                loading={loading}
                paginator
                lazy
                totalRecords={totalCount}
                first={lazyParams.page * lazyParams.rows}
                rows={lazyParams.rows}
                onPage={onPage}
                size="small"
                scrollable
                scrollHeight="calc(100vh - 17rem)"
                className="p-datatable-sm"
                stripedRows
            >
                <Column field="isActive" header="" body={activeFlagBodyTemplate} />
                <Column field="name" header="Name" />
                <Column field="email" header="Email" />
                <Column field="jobTitle" header="Job Title" />
                <Column field="companyName" header="Company" />
                <Column field="createdAt" header="Added On" body={dateBodyTemplate} />
                <Column header="Actions" alignHeader="center" body={actionBodyTemplate} style={{ width: "120px" }} />
            </DataTable>
            {deleteConfirmationDialog}
            {employeeFormDialog}
        </div>
    );
}
