import axios from 'axios';
import { useState } from 'react';

const useEmailValidation = () => {
    const [status, setStatus] = useState<'valid' | 'invalid' | 'checking' | null>(null);

    const validate = async (email: string) => {
        setStatus('checking');
        const validationUrl = process.env.REACT_APP_ABSTRACT_API_URL;
        try {
            const res = await axios.get(`${validationUrl}${email}`);
            setStatus(res.data.is_valid_format?.value ? 'valid' : 'invalid');
        } catch {
            setStatus('invalid');
        }
    };

    return { status, validate };
};

export default useEmailValidation;