import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import {toast} from 'react-toastify';
const ProductDetails = () => {
   const [cart,setCart]=useCart()
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
 
    useEffect(() => {
        if (params?.id) getProduct();
      }, [params?.id]);

      const getProduct = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API}/product/get-product/${params.id}`
          );
          setProduct(data?.product);
          getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
          console.log(error);
        }
      };
      const getSimilarProduct = async (pid, cid) => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API}/product/related-product/${pid}/${cid}`
          );
          setRelatedProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };

    return (
<Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.product_name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.product_name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.product_name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price
                    }
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    More Details
                  </button>
                   <button
                  className="btn btn-dark ms-1"
                  onClick={() => { 
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails