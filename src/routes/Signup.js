import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import GoogleOauth from '../components/GoogleOauth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import {db} from '../firebase.config'

const Signin = () => {
    const [showpassword, setShowPassword] = useState(false)
    const [FormData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    })
     
     const {name, email, password} = FormData;
   

   const onChange = (e) => {
       setFormData((prevState) => ({
           ...prevState,
           [e.target.id]:e.target.value
       }))

   }


   const SubmitHandler  = async(e) => {
       e.preventDefault()
 
      try {
          const auth = getAuth()
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName:name
            })
            const formDatacopy = {...FormData}
            delete formDatacopy.password
            formDatacopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDatacopy)
            setFormData('')

             toast.success('Registration Succsessful You Can Sign In Now')
            //navigate('/sign-in')
        } catch (error) {
          toast.error('Something Went Wrong')
      }


   }



    return (
        <>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome Back!</p>
                </header>
                <form onSubmit={SubmitHandler}>
                <input type='text' className='nameInput' id='name' placeholder='name' value={name}
                    onChange={onChange}/>
                    <input type='email' className='emailInput' id='email' placeholder='email' value={email}
                    onChange={onChange}/>
                    <div className='passwordInputDiv'>
                        <input type={showpassword ? 'text' : 'password'} className='passwordInput'
                         value={password} id='password' 
                        placeholder='Password'
                        onChange={onChange}/>
                        <img src={visibilityIcon} className='showPassword'alt='show Password'
                        onClick={() => setShowPassword((prevState) => !prevState)}/>
                          
                    </div>
                    <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
                  
                    <div className='signUpBar'>
                    <p className='signUpText'>Sign Up</p>
                        <button style={{marginLeft:'8px', height:'40px', width:'10%', backgroundColor:'black',
                    color:'white'}}>Sign Up</button>
                     <Link style={{ marginLeft:'60px', color:'white'}} to='/sign-in' className='registerLink'>Sign In Here</Link>
                      
                    </div>
                </form>
                   
                <div style={{marginBottom:'5%'}}>
                          
                          <GoogleOauth />
                         
                     </div>
                
             
                
                
                

            </div>
        </>
    )
}

export default Signin
