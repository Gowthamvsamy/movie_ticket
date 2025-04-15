import React from 'react'
import { Field, UserLogin } from '../../component/type';
import Form from '../../component/form';
import { loginUser } from '../../context/service/movieService';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigator = useNavigate()

    const LoginFields: Field[] = [
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true }
    ];

    const onSubmitForm = (formData: { [key: string]: string }) => {
        loginUser(formData as UserLogin);
        navigator("/")
    }

    return (
        <>
            <Form
                title="Login Form"
                btn="Login"
                fields={LoginFields}
                onSubmitForm={onSubmitForm}
            />
        </>
    )
}

export default Login