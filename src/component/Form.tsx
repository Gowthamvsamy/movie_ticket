// import
import React, { useState } from 'react'
import { FormProps } from './Type';
import { Link } from 'react-router-dom';

const Form: React.FC<FormProps> = ({ title, btn, fields, onSubmitForm }) => {

    // Form state
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    // Listen to the form input.
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Store the formDat to the onSubmitForm
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitForm?.(formData);
    }

    return (
        <div className='form-bg'>
            <form className='form-popup' onSubmit={handleSubmit}>
                <h2 className='form-title'>{title}</h2>
                {fields.map((field) => (
                    <div key={field.name} className='form-box'>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            className='form-input'
                            onChange={handelChange}
                        />
                    </div>
                ))}
                <button type="submit" className='form-btn'>{btn}</button>
                {btn === 'Register' ? (
                    <p className='change-text'>Already have an account?&nbsp;<Link to="/login" className='change-form'>Login now</Link></p>
                ) : (
                    <p className='change-text'>Don't have an account yet?&nbsp;<Link to="/register" className='change-form'>Sign up</Link></p>
                )}
            </form>
        </div>
    )
}

export default Form
