import React, { useState } from 'react';

const RegisterPage = () => {
    // Definimos el estado para cada campo del formulario
    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : ''
    });

    const [errors, setErrors] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : ''
    });

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          //... prevData hacian una copia del formulario  
          ...formData,
          //actuali
          [name]: value
        });
      };

    
    const submitForm = (event) => {
        event.preventDefault();
        console.log(formData);
    }

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={submitForm}>
                <label>Nombre</label>
                <input type="firstName" name='firstName' onChange={handleChange}/>
                <label>Apellido</label>
                <input type="lastName"  name='lastName' onChange={handleChange}/>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange}/>
                <label>Contraseña</label>
                <input type="password" name="password" onChange={handleChange}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default RegisterPage;
