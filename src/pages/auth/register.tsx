import React from 'react'
import Form from '../../component/form';
import { Field, UserRegister } from '../../component/type';
import { registerUser } from '../../context/service/movieService';
import { useNavigate } from 'react-router-dom';



function Register() {

    const navigator = useNavigate()

    const fields: Field[] = [
        { name: 'username', type: 'text', placeholder: 'User Name', required: true },
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true }
    ];

    const onSubmitForm = (formData: { [key: string]: string }) => {
        registerUser(formData as UserRegister);
        navigator("/")

    }

    return (
        <>
            <Form
                title="Registration Form"
                btn="Register"
                fields={fields}
                onSubmitForm={onSubmitForm}
            />
        </>
    )
}

export default Register