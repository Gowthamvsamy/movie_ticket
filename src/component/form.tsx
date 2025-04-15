import React, { useState } from 'react'
import { FormProps } from './type';



const Form: React.FC<FormProps> = ({ title, btn, fields, onSubmitForm }) => {

    const [formData, setFormData] = useState<{ [key: string]: string }>({});


    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

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
            </form>
        </div>
    )
}

export default Form