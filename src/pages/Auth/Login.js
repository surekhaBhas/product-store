import {useState} from 'react'
import Layout from '../../components/Layout/Layout';
import {toast} from 'react-toastify';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../styles/Authstyles.css'
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [auth,setAuth] =useAuth()
    const navigate=useNavigate();
    const location=useLocation()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/auth/login`,
            {email,password})
            if(res.data.success){
              toast.success(res.data.message)
              
              setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
              })
              navigate(location.state||'/')
              localStorage.setItem('auth',JSON.stringify(res.data))
            }else{
              toast.error(res.data.message)
            }
           
          }
          catch(error){
            console.log(error)
            toast.error('Something went wrong')
          }
    }
  return (
    <Layout title='Login - Ecommerce App'>
    <div className='register form-container' style={{minHeight:"90vh"}}>
      <h4 className='title'>Login Form</h4>
      <form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input
     type="email"
      className="form-control" 
      id="exampleInputEmail1" 
      onChange={(e)=>{setEmail(e.target.value)}}
     placeholder='Enter your Email'
      required
      value={email}
      aria-describedby="emailHelp" 
      autoComplete="off"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input 
    onChange={(e)=>{setPassword(e.target.value)}}
    placeholder='Enter your password'
    type="password" 
    className="form-control" 
    id="exampleInputPassword1" 
    value={password}
    required
    autoComplete="off"/>
  </div>

  <button type='button' className='btn btn-dark d-block mb-3' onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button> 
  <button type="submit" className="btn btn-info text-white">LOGIN</button>
</form>
    </div>
    </Layout>
  )
}

export default Login
