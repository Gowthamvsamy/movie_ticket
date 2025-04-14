import React from 'react'
import { Field } from './type';

interface FormProps {
    title: string;
    btn: string;
    fields: Field[];
}

const Form: React.FC<FormProps> = ({ title, btn, fields }) => {


    return (
        <div className='form-bg'>
            <form className='form-popup'>
                <h2 className='form-title'>{title}</h2>
                {fields.map((field) => (
                    <div key={field.name} className='form-box'>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            className='form-input'
                        />
                    </div>
                ))}
                <button type="submit" className='form-btn'>{btn}</button>
            </form>
        </div>
    )
}

export default Form