import React from 'react'
import Form from '../../component/form';
import { Field } from '../../component/type';



function Register() {

    const fields: Field[] = [
        {name: 'username', type: 'text', placeholder: 'User Name', required: true},
        {name: 'email' , type: 'email', placeholder: 'Email', required: true},
        {name: 'password', type: 'password', placeholder: 'Password', required: true}
    ];


  return (
    <>
        <Form 
            title="Registration Form"
            btn="Register user"
            fields={fields}
        />
    </>
  )
}

export default Register