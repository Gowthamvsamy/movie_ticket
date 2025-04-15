import React from 'react'
import Form from '../../component/form';
import { Field } from '../../component/type';
import { registerUser } from '../../context/service/movieService';

type UserRegister = {
    username: string,
    email: string,
    password: string,
}


function Register() {

    const fields: Field[] = [
        {name: 'username', type: 'text', placeholder: 'User Name', required: true},
        {name: 'email' , type: 'email', placeholder: 'Email', required: true},
        {name: 'password', type: 'password', placeholder: 'Password', required: true}
    ];



    const onSubmitForm = (formData: { [key: string]: string }) => {
        console.log("Received form data:", formData);

        registerUser(formData as UserRegister);
    }
    

  return (
    <>
        <Form 
            title="Registration Form"
            btn="Register user"
            fields={fields}
            onSubmitForm={onSubmitForm}
        />
    </>
  )
}

export default Register