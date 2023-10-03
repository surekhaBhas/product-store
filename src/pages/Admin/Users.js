import {useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'

const Users = () => {
  const [allUsers,setAllUsers]=useState([])

  useEffect(()=>{
    const getAllUsers=async()=>{
      try{
       const res=await axios.get(`${process.env.REACT_APP_API}/auth/all-users`)
       
      setAllUsers(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getAllUsers()
  },[])
  return (
    <Layout title='all users Ecommerce-app'>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
          <div className='col-md-3'><AdminMenu/></div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Users</h1>
            <ul class="list-group">
             {
              allUsers.map(u=>(
                <li class="list-group-item m-1" key={u._id}>
                  <h6>Name: {u.name}</h6>
                  <p>Email: {u.email}</p>
                  <p>Address: {u.address}</p>
                </li>
              ))
              }
            </ul>
          </div>
          </div>
      </div>
    </Layout>
  )
}

export default Users
