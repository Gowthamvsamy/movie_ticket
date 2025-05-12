import React from 'react'
import { Field, UserRegister } from '../../Component/Type';
import { registerUser } from '../../context/Service/MovieService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from '../../Component/Form';

function Register() {

    const navigator = useNavigate()

    // Registration field
    const fields: Field[] = [
        { name: 'username', type: 'text', placeholder: 'User Name', required: true },
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true }
    ];

    // Registration process
    const onSubmitForm = async (formData: { [key: string]: string }) => {
        try {
            await registerUser(formData as UserRegister);
            toast.success("Account created successfully!");
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