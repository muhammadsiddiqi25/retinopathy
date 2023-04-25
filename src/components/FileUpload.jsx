import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import uploadIcon from '../Assets/Upload_Icon.png'
import medBack from '../Assets/Medical_Icon.png'
import { FormHelperText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const FileUpload = () => {
    const [error,setError] = useState(false)
    const [image,setImage] = useState(null)
    const navigate = useNavigate()
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0])
        setImage(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className='gradient-background' >
            <div>
                <div className='nav'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <svg width="53" height="58" viewBox="0 0 53 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M39.8386 0.133167C34.5287 -0.62732 29.0758 1.96717 26.0033 7.2114C23.0123 2.09975 17.5977 -0.65494 12.163 0.133167C12.0566 0.906543 12 1.69833 12 2.50301C12 11.0617 18.2681 18 26 18C33.7319 18 40 11.0617 40 2.50301C40.0016 1.69833 39.9467 0.906543 39.8386 0.133167ZM16.7094 5.29453C19.9998 6.26862 22.5998 9.10986 23.4881 12.8C20.1977 11.8111 17.601 8.93677 16.7094 5.29453ZM28.5169 12.7981C29.4085 9.11906 32.0152 6.27598 35.2939 5.29822C34.4006 8.93861 31.8056 11.8111 28.5169 12.7981Z" fill="white" />
                            <path d="M48.7172 21.7458C45.2561 18.4906 40.1428 17.3018 34.319 18.3968C31.634 18.9015 28.9363 19.8748 26.3511 21.2471C26.3511 21.2471 26.3532 21.2471 26.3532 21.2491C23.7679 19.8748 21.0681 18.9035 18.3831 18.3988C12.5594 17.3038 7.44607 18.4926 3.98489 21.7478C0.52159 25.001 -0.742418 29.81 0.421912 35.2873C1.49293 40.3257 4.54479 45.4159 9.01335 49.6206C13.6813 54.0108 19.872 57.2939 26.3489 58C32.8259 57.2919 39.0166 54.0108 43.6845 49.6206C48.1531 45.4179 51.205 40.3277 52.276 35.2873C53.4445 29.81 52.1784 25.001 48.7172 21.7458ZM39.2032 45.404C35.3603 49.0182 30.6966 51.4038 26.3489 51.9902C22.0013 51.4038 17.3376 49.0182 13.4946 45.404C6.52775 38.8517 4.22454 29.9477 8.46406 25.9604C9.88713 24.622 11.9464 23.9658 14.3366 23.9658C16.239 23.9658 18.3492 24.3827 20.5103 25.2025C20.0247 25.6114 19.5453 26.0382 19.0788 26.477C16.6547 28.7569 14.6399 31.318 13.1341 33.9908C13.8213 36.117 15.2316 38.355 17.1467 40.3596C18.241 36.9827 20.4849 33.5859 23.5622 30.6937C30.5291 24.1413 39.9964 21.9752 44.2359 25.9624C48.4755 29.9477 46.1701 38.8517 39.2032 45.404Z" fill="white" />
                        </svg>
                        <h1 className='heading'>Diabetic Retinopathy Detection</h1>
                    </div>
                    <button className='logout-button'
                    onClick={()=>{
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        navigate('/')
                    }}
                    >Logout</button>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent:'space-around',
                    alignItems:'center'
                }}>
                <div style={{
                    display: 'flex',
                    width: 'max-content',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>

                    <div {...getRootProps()} className='drop-box'>
                        <input {...getInputProps()} className='drag-input' />
                        <h1>Upload Image</h1>
                        <div className='drop-icon-div'>
                            <img src={image?URL.createObjectURL(image):uploadIcon} style={{
                                maxWidth:'300px',
                                maxHeight:'300px'
                            }}/>
                        </div>
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                   {error? <FormHelperText error>Please upload a file first.</FormHelperText>:null}
                    <button className='auth-side-button'
                    onClick = {async ()=>{
                        if(!image){
                            setError(true)
                        }
                        else{
                            const formData = new FormData()
                            formData.append('image',image)
                            try{
                                const resp = await axios.post('http://localhost:8000/api/image/',formData)
                                navigate(`/report/${image.name}`)
                            }
                            catch(e){
                                
                            }
                        }
                    }}
                    >Generate Report</button>
                </div>
                <img src = {medBack} />
                </div>
            </div>
        </div>
    )
}

export default FileUpload