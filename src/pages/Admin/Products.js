import {useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from "./../../components/Layout/Layout"
import axios from 'axios'
import toast from "react-hot-toast";
import {Link} from 'react-router-dom'

const Products = () => {
    const [products,setProducts]=useState([])

    const getAllProducts=async()=>{
        try{
         const {data}=await axios.get(`${process.env.REACT_APP_API}/product/get-product`)
         setProducts(data.products)
         console.log(data)
     
    }catch(error){
            console.log(error)
            toast.error('something went wrong ')
        }
    }

    useEffect(()=>{
        getAllProducts()
    },[])
  return (
    <Layout title='products Ecommerce App'>
        
      <div className='row m-3 p-3'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All Products List</h1>
            <div className='d-flex flex-wrap align-items-center justify-content-center'>
            {products?.map(p=>{

             return <Link  key={p._id} to={`/dashboard/admin/product/${p._id}`} className='product-link'><div className="card m-2" style={{width: "18rem"}}>
               <img src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`} className="card-img-top"  alt={p.product_name}/>
              <div className="card-body">
              <h5 className="card-title">{p.product_name}</h5>
             <p className="card-text">{p.description}</p>
             </div>
           </div></Link>
             })}
            </div>
           
        </div>
      </div>
  
    </Layout>
    
  )
}

export default Products
