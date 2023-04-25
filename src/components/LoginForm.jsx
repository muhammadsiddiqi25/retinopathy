import { Button, FormHelperText, TextField } from '@mui/material'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const navigate = useNavigate()
    const [error,setError] = useState()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validationSchema = yup.object({
        email:yup.string().email("Please enter a valid email!").required('This field is required.'),
        password:yup.string().required('This field is required').min(8, 'Password must be 8 characters long')
      })
    const { values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit, setFieldValue } = useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            onSubmit: async (values) => {
                console.log(values)
                try{
                    const resp = await axios.post('http://localhost:8000/api/auth/jwt/create/',values)
                    if(resp.status === 200){
                        setError('')
                        navigate('/upload')
                        localStorage.setItem('accessToken',resp.data.access)
                        localStorage.setItem('refreshToken',resp.data.refresh)
                    }
                }
                catch(e){
                    console.log(e)
                    setError(e.response.data.detail)
                }
            },
            validationSchema: validationSchema
        })
    return (
        <div>
            <h1>Hello there,</h1>
            <h1>Welcome back    </h1>
            <form onSubmit={handleSubmit}>
                <TextField variant='outlined' label='Email' fullWidth sx={{ margin: '10px auto' }}
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                />
                <FormControl variant="outlined" fullWidth sx={{ margin: '10px auto' }} >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                    />
                    <FormHelperText error>{touched.password ? errors.password : ""}</FormHelperText>
                    <FormHelperText error>{error? error: ""}</FormHelperText>
                    <button className='auth-button' type='submit'>SignIn</button>
                </FormControl>
            </form>
        </div>
    )
}

export default LoginForm