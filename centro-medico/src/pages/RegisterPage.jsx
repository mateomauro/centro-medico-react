import React, { useState } from 'react';
import '../styles/RegisterPage.css'

const RegisterPage = () => {
    // Definimos el estado para cada campo del formulario
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmPassword

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '' // Error para la confirmación de la contraseña
    });

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const validateForm = () => {
        let isValid = true;

        if (!formData.firstName) {
            isValid = false;
        }
        if (!formData.lastName) {
            isValid = false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
        }
        if (!formData.password) {
            isValid = false;
        }
        if (formData.password !== confirmPassword) {
            isValid = false;
        }

        return isValid;
    };

    const submitForm = async (event) => {
        event.preventDefault();
   
        if (!validateForm()) {
            return;
        }
   
        console.log(JSON.stringify(formData)); // Verifica el contenido del cuerpo del POST
   
        try {
            const response = await fetch('http://localhost:8080/api/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData) // Verifica que esto esté correctamente formado
            });
   
            if (response.ok) {
                const data = await response.json();
                alert("¡Registro exitoso!");
            } else {
                const data = await response.json();
                alert("No se pudo registrar");
            }
        } catch (error) {
            alert("Error al conectarse a la API");
            console.error(error);
        }
    };
   

    return (
        <div className='Register'>
            <h1>Registro</h1>
            <form onSubmit={submitForm}>
                <div className='input-register'>
                    <label>Nombre</label>
                    <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} />
                </div>
                <div className='input-register'>
                    <label>Apellido</label>
                    <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} />
                </div>
                <div className='input-register'>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className='input-register'>
                    <label>Contraseña</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className='input-register'>
                    <label>Confirmar contraseña</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <button type="submit">Registrarme</button>
            </form>
        </div>
    );
};

export default RegisterPage;
