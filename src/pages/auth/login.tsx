import React from 'react'
import { Field, UserLogin } from '../../component/type';
import Form from '../../component/form';
import { loginUser } from '../../context/service/movieService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
            }, 2000);
        } catch (error: unknown) {
            navigator("/");
            toast.error("Login failed. Please try again.")
            console.error("Login Error:", error);
        }
    }

    return (
        <>
            {/* Form */}
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