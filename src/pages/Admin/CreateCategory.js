import {useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {toast} from 'react-toastify';
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState('')
  const [visible,setVisible]=useState(false)
  const [selected,setSelected]=useState(null)
  const [updatedName,setUpdatedName]=useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
       const {data}= await axios.post(`${process.env.REACT_APP_API}/category/create-category`,{name})
       if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      }catch(err){
      console.log(err)
      toast.error('something went wrong in input form')
    }
  }

const handleUpdate=async(e)=>{
  e.preventDefault()
  try{
   const {data}=await axios.put(`${process.env.REACT_APP_API}/category/update-category/${selected._id}`,
   {name:updatedName})
   if(data.success){
    toast.success(`${updatedName} is updated`)
    setSelected(null)
    setUpdatedName("")
    setVisible(false)
    getAllCategory()
   } else {
    toast.error(data.message)
   }
  }catch(error){
    console.log(error)
    toast.error("Something went wrong")
  }
}

const handleDelete=async(id)=>{
 
  try{
   const {data}=await axios.delete(`${process.env.REACT_APP_API}/category/delete-category/${id}`)
   if(data.success){
    toast.success(`category is deleted`)
    setSelected(null)
    
    
    getAllCategory()
   } else {
    toast.error(data.message)
   }
  }catch(error){
    console.log(error)
    toast.error("Something went wrong")
  }
}


  const getAllCategory = async () => {
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/category/all-category`)
      if(data.success){
        setCategories(data.category)
      }
      
    }catch(err){
      console.log(err)
      toast.error("Something went wrong in getting category");
    }
  }
  useEffect(()=>{
    getAllCategory()
  },[])
    return (
        <Layout title='all users Ecommerce-app'>
          <div className='container-fluid m-3 p-3'>
          <div className='row'>
              <div className='col-md-3'><AdminMenu/></div>
              <div className='col-md-9'>
                <h1>Manage Category</h1>
                <div className='p-3 w-50' >
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                </div>
                <div className='w-75'>
                <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  
      {
        categories.map(category=>(
          <tr  key={category._id}>
          <td>{category.name}</td>
          <td><button 
          className='btn btn-primary ms-2'
           onClick={()=>{setVisible(true); setUpdatedName(category.name);
           setSelected(category)}}>Edit</button>
          <button 
          className='btn btn-danger ms-2'
          onClick={()=>{handleDelete(category._id)}}
          >
            Delete</button>
          </td>
          </tr>))
      }
    
  </tbody>
</table>
                </div>
                <Modal onCancel={()=>{setVisible(false)}}
                 footer={null}
                 open={visible}>
                  <CategoryForm 
                  value={updatedName}
                   setValue={setUpdatedName}
                   handleSubmit={handleUpdate}
                  />
                 </Modal>
              </div>
          </div>
          </div>
        </Layout>
      )
}

export default CreateCategory
