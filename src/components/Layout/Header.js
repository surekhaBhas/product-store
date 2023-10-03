import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useCategory from '../../hooks/useCategory';
import {toast} from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import { useCart } from "../../context/cart";
import { Badge } from "antd";

function Header() {
  const [cart] = useCart();
  const [auth,setAuth]=useAuth()
 const categories=useCategory()
 console.log(categories)
  const handleLogout=()=>{
    setAuth({
      ...auth,user:null,token:''
    })
    
    localStorage.removeItem('auth')
    toast.success('Logout successfully')
  }
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link  to='/' className="navbar-brand" >🛒 Products App</Link>
    <SearchInput/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        <NavLink className="nav-link"  to="/">Home</NavLink>
        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c._id}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

        {
          !auth.user ?(<> <NavLink className="nav-link" to="/register">Sign Up</NavLink>
          <NavLink className="nav-link" to="/login">Login</NavLink></>):
          (<>
             <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                     
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
            
          </>)
        }
        <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>  
                 </div>
    </div>
  </div>
  </nav>
    </div>
    </>
  )
}

export default Header
