import React from 'react'
import { EmployeeList } from './EmployeeList'
import { Button } from 'primereact/button'

export const EmployeesView = () => {
    return (
        <div className="mx-auto px-3 w-full md:w-10 md:mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 text-center">Employee Contact Management</h3>
            <div className=''>
                <EmployeeList />
            </div>
        </div>
    )
}
