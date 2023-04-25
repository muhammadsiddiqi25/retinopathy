import { Button, FormHelperText, TextField } from '@mui/material'
import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup'
import {useFormik}   from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRePassword, setShowRePassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const [error,setError] = useState('')
      const validationSchema = yup.object({
        first_name:yup.string().required('This is required'),
        last_name:yup.string().required('This is required'),
        email:yup.string().email("Email is not valid").required('This is required'),
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
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            },
            onSubmit: async (values) => {
                console.log(values)
                try{
                    const resp = await axios.post('http://localhost:8000/api/auth/users/',values)
                    if(resp.status === 201){
                        setError('')
                        navigate('/')
                    }
                }
                catch(e){
                    console.log(e)
                    setError(e.response.data.email)
                }
            },
            validationSchema: validationSchema
        })
  return (
    <div>
        <h1
        style={{
            margin:'10px auto'
        }}
        >Create Account</h1>
        <form
        onSubmit={handleSubmit}
        >
            <div
            style = {{
                display:'flex',
                gap:'10px'
            }}
            >
                <TextField type = 'text' label = 'First Name' fullWidth 
                name='first_name'
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.first_name ? errors.first_name : ""}
                error={touched.first_name && Boolean(errors.first_name)}
                />
                <TextField type = 'text' label = 'Last Name' fullWidth 
                name='last_name'
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.last_name ? errors.last_name : ""}
                error={touched.last_name && Boolean(errors.last_name)}
                />
            </div>
        <TextField variant = 'outlined' label = 'Email' fullWidth sx={{margin:'10px auto'}} 
        name='email'
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
        />
        <FormControl variant="outlined" fullWidth  sx={{margin:'10px auto'}} >
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
          <FormHelperText error>{error ? error: ""}</FormHelperText>
          <button className = 'auth-button' type = 'submit'>SignUp</button>
        </FormControl>
        </form>
    </div>
  )
}

export default SignupForm