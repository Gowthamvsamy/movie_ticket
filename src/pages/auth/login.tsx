import React from 'react'
import { Field, UserLogin } from '../../component/type';
import Form from '../../component/form';
import { loginUser } from '../../context/service/movieService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {

    const navigator = useNavigate()

    const LoginFields: Field[] = [
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true }
    ];

    const onSubmitForm = async (formData: { [key: string]: string }) => {
        try {
            await loginUser(formData as UserLogin);
            toast.success("Login successfuly")
            navigator("/")
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: unknown) {
            navigator("/");
            toast.error("Login failed. please try again.")
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