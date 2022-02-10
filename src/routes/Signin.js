import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleOauth from '../components/GoogleOauth'
import {toast} from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const Signin = () => {
    const [showpassword, setShowPassword] = useState(false)
    const [FormData, setFormData] = useState({
        email:'',
        password:''
    })
     
     const {email, password} = FormData;
   const navigate = useNavigate()

   const onChange = (e) => {
       setFormData((prevState) => ({
           ...prevState,
           [e.target.id]:e.target.value
       }))

   }

   const Submithandler = async (e) => {
       e.preventDefault()
       try {
           const auth = getAuth()

           const userCredential  = await signInWithEmailAndPassword(auth, email, password)
           if(userCredential.user){
               navigate('/')
           }
           
       } catch (error) {
           toast.error('Invalid Credentials')
   }
}



    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome Back!</p>
                </header>
                 <form onSubmit={Submithandler}>
                    <input type='email' className='emailInput' id='email' placeholder='email' value={email}
                    onChange={onChange}/>
                    <div className='passwordInputDiv'>
                        <input type={showpassword ? 'text' : 'password'} className='passwordInput'
                         value={password} id='password' 
                        placeholder='Password'
                        onChange={onChange}/>
                        <img src={visibilityIcon} className='showPassword'alt='show Password'
                        onClick={() => setShowPassword((prevState) => !prevState)}/> </div>
                    <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
                    <div className='signInBar'>
                        <p className='signInText'>Sign In</p>
                        <button style={{marginLeft:'8px', height:'40px', width:'10%', backgroundColor:'black',
                    color:'white'}}>Sign In</button>
                     
                
                    </div>
                </form>
                <Link style={{marginTop:'2px', color:'white'}} to='/sign-up' className='registerLink'>Sign Up Here</Link>
                 
                <GoogleOauth />
                
                

            </div>
        </>
    )
}

export default Signin
