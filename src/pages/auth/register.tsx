import React from 'react'
import Form from '../../component/form';
import { Field, UserRegister } from '../../component/type';
import { registerUser } from '../../context/service/movieService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {

    const navigator = useNavigate()

    const fields: Field[] = [
        { name: 'username', type: 'text', placeholder: 'User Name', required: true },
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true }
    ];

    const onSubmitForm = async (formData: { [key: string]: string }) => {
        try {
            await registerUser(formData as UserRegister);
            toast.success("Registered successfully!");
            navigator("/");
        } catch (error: unknown) {
            navigator("/");
            toast.error("Registration failed. Please try again.");
            console.error("Registration Error:", error);
        }
    };

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