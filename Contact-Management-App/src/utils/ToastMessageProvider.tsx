import { Toast } from "primereact/toast";
import React, { createContext, FC, ReactNode, useContext, useRef } from "react";

interface ToastContextType {
    showSuccess: (props: string) => void;
    showError: (props: string, detail?: string) => void;
    showWarning: (props: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastMessageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const toast = useRef<any>(null);

    const showSuccess = (props: string) => {
        setTimeout(() => {
            toast?.current && toast?.current?.show({ severity: "success", summary: props, closable: true, life: 5000 });
        }, 1000);
    };

    const showError = (props: string, detail?: string) => {
        setTimeout(() => {
            toast.current.show({ severity: "error", summary: props, detail: detail, closable: true, life: 5000 });
        }, 1000);
    };

    const showWarning = (props: string) => {
        setTimeout(() => {
            toast.current && toast.current.show({ severity: "warn", summary: props, closable: true, life: 5000 });
        });
    };
    return (
        <ToastContext.Provider value={{ showSuccess, showError, showWarning }}>
            <Toast ref={toast} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToastContext = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastContext must be used within a ToastMessageProvider");
    }
    return context;
};