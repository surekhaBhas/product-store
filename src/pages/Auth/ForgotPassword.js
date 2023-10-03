import {useState} from 'react'
import Layout from '../../components/Layout/Layout';
import {toast} from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Authstyles.css'


const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const [newPassword,setNewPassword]=useState('')
    const [answer,setAnswer]=useState('')
   
    const navigate=useNavigate();


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/auth/forgot-password`,
            {email,newPassword,answer})
            if(res.data.success){
              toast.success(res.data.message)
              
              navigate('/login')
            
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
    <Layout title='forgot password Ecommerce-app'>
       <div className='register form-container' style={{minHeight:"90vh"}}>
      <h4 className='title'>RESET PASSWORD</h4>
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
    <label htmlFor="question" className="form-label">Enter your favorite sports</label>
    <input 
    onChange={(e)=>{setAnswer(e.target.value)}}
    type="text" 
    className="form-control" 
    id="question" 
    value={answer}
    required
    autoComplete="off"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input 
    onChange={(e)=>{setNewPassword(e.target.value)}}
    placeholder='Enter your password'
    type="password" 
    className="form-control" 
    id="exampleInputPassword1" 
    value={newPassword}
    required
    autoComplete="off"/>
  </div>

 
  <button type="submit" className="btn btn-info text-white">RESET</button>
</form>
    </div>
    </Layout>
  )
}

export default ForgotPassword
