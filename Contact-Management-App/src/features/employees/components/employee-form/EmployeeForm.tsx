import React, { useEffect } from 'react'
import { CompanyViewModel, CreateEmployeeViewModel, EmployeeViewModel, UpdateEmployeeViewModel } from '../../../../types';
import useEmailValidation from '../../../../hooks/useEmailValidation';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

interface IEmployeeFormProps {
    employee: CreateEmployeeViewModel;
    onSubmit: (values: CreateEmployeeViewModel | UpdateEmployeeViewModel) => void;
    companies: CompanyViewModel[];
    isEdit?: boolean;
    loading?: boolean;
}

export const EmployeeForm: React.FC<IEmployeeFormProps> = ({ employee, companies, onSubmit, loading, isEdit }) => {
    const { status, validate } = useEmailValidation();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string().optional(),
        jobTitle: Yup.string().optional(),
        companyID: Yup.number().required('Company is required'),
    });

    return (
        <div className="card">
            <Formik
                initialValues={employee}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
                    const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
                        handleBlur(e);
                        if (e.target.value) {
                            await validate(e.target.value);
                        }
                    };

                    return (
                        <Form className="p-fluid grid gap-3">
                            <div className="col-12">
                                <label htmlFor="name">Name</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.name && errors.name ? 'p-invalid' : ''}
                                />
                                {touched.name && errors.name && (
                                    <small className="p-error">{errors.name}</small>
                                )}
                            </div>

                            <div className="col-12">
                                <label htmlFor="email">Email</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleEmailBlur}
                                    className={touched.email && errors.email ? 'p-invalid' : ''}
                                />
                                {status === 'checking' && <small>Validating...</small>}
                                {status === 'valid' && <small style={{ color: "green" }}>Email is valid</small>}
                                {status === 'invalid' && <small className="p-error">Email is invalid</small>}
                                {touched.email && errors.email && (
                                    <small className="p-error">{errors.email}</small>
                                )}
                            </div>

                            <div className="col-12">
                                <label htmlFor="phone">Phone</label>
                                <InputText
                                    id="phone"
                                    name="phone"
                                    value={values.phone || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="jobTitle">Job Title</label>
                                <InputText
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={values.jobTitle || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="companyID">Company</label>
                                <Dropdown
                                    id="companyID"
                                    name="companyID"
                                    value={values.companyID}
                                    options={companies}
                                    onChange={(e) => setFieldValue('companyID', e.value)}
                                    optionValue="id"
                                    optionLabel="companyName"
                                    placeholder="Select a company"
                                    className={touched.companyID && errors.companyID ? 'p-invalid' : ''}
                                />
                                {touched.companyID && errors.companyID && (
                                    <small className="p-error">{errors.companyID}</small>
                                )}
                            </div>

                            <div className="col-12 md:col-6 flex align-items-center gap-2 mt-4">
                                <Checkbox
                                    inputId="isActive"
                                    name="isActive"
                                    checked={!!values.isActive}
                                    onChange={(e) => setFieldValue('isActive', e.checked)}
                                />
                                <label htmlFor="isActive">Active</label>
                            </div>

                            <div className="col-12">
                                <Button type="submit" label={isEdit ? 'Update' : 'Add'} loading={isSubmitting || loading} />
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}
