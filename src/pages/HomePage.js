import {useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {Checkbox,Radio} from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from "../context/cart";
import {toast} from 'react-toastify';
import '../styles/Homepage.css'
function HomePage() {
  const [cart,setCart]=useCart()
  const navigate=useNavigate()
  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)

  const getTotal=async(req,res)=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/product/product-count`)
      setTotal(data?.total)
    }catch(err){
      console.log(err)
    }
  }

  const getAllProducts=async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`)
      setProducts(data.products)
      setLoading(false)
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/category/all-category`);
      
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getAllCategory()
    getTotal()
  },[])
  
useEffect(()=>{
  if(!checked.length || !radio.length) getAllProducts()
 
},[checked.length,radio.length])
useEffect(()=>{
 if(checked.length || radio.length) filterProduct()
},[checked,radio])

const filterProduct=async()=>{
  try{
    const {data}=await axios.post(`${process.env.REACT_APP_API}/product/product-filters`,{checked,radio})
    setProducts(data?.products)
  
  }catch(err){
    console.log(err)
  }

}

const handleFilter=(value,id)=>{
  let all=[...checked]
  if(value){
    all.push(id)
  }else{
    all=all.filter(c=>c!==id)
  }
  setChecked(all)
}
useEffect(()=>{
  if(page===1) return
    loadMore()
  
},[page])

const loadMore=async()=>{
  try{
    setLoading(true)
    const {data}=await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`)
    setProducts([...products,...data?.products])
    setLoading(false)
  }catch(error){
    console.log(error)
    setLoading(false)
  }
}

  return (
    <Layout title='All products - Best offers'>
        <div className='container-fluid row mt-3 home-page'>
        <div className="col-md-3 filters">
            <h6 className='text-center'>Filter By Category</h6>
            <div className='d-flex flex-column'>
            {categories?.map(c=>(
              <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))}
            </div>
            <h6 className='text-center mt-4'>Filter By Price</h6>
            <div className='d-flex flex-column'>
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
              {Prices?.map(p=>(
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
            <div className='d-flex flex-columns m-3'>
            <button className='btn btn-danger' onClick={()=>window.location.reload()}>RESET FILTERS</button>
           </div>
           </div>
           
           <div className='col-md-9'>
            
            <h1 className='text-center'>All Products</h1>
           <div className='d-flex flex-wrap '>
                 {products?.map(p=>{return <div  key={p._id}  className='product-link m-auto'>
                  <div className="card d-flex" style={{width: "18rem"}}>
                 <img src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`} className="card-img-top"  alt={p.product_name}/>
                 <div className="card-body">
                <div className='card-name-price'>
                <h6 className="card-title">{p.product_name}</h6>
                 <h6 className='card-title card-price'>Rs {p.price}/-</h6>
                 
                </div>
                 <p className='card-text'>{p.description.substring(0, 30)}</p>
                 <div className='card-name-price'>
                 <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p._id}`)}>More Details</button>
                 <button className="btn btn-secondary ms-1" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}>ADD TO CART</button>
                 </div>
                
                 </div>
                 </div></div>
              })}  
                 
           </div>
           <div className='m-2 p-3'>
                    {products && products.length <total && (
                      <button className='btn btn-warning d-block' onClick={(e)=>{
                        e.preventDefault();
                        setPage(page+1);
                        }}>
                        {loading ?"Loading...":"Load more"}
                      </button>
                    )}
                  </div>
           </div>
        </div>
    </Layout>
  )
}

export default HomePage
