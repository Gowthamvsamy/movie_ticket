import React from 'react'
import { Field, UserLogin } from '../../Component/Type';
import { loginUser } from '../../context/Service/MovieService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from '../../Component/Form';

function Login() {

    const navigator = useNavigate()

    // Login form field
    const LoginFields: Field[] = [
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true }
    ];

    // Login process
    const onSubmitForm = async (formData: { [key: string]: string }) => {
        try {
            await loginUser(formData as UserLogin);
            toast.success("Logged in successfully!")
            navigator("/")
            setTimeout(() => {
                window.location.reload();
            }, 0)
        } catch (error: unknown) {
            navigator("/");
            toast.error("Login failed. Please try again.")
            console.error("Login Error:", error);
        }
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