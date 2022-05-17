import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL; 

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredProducts] = useState([]);

  useEffect(() => {
   const getProducts = async () => {
      try {
        const response = await axios.get(category ? `${BASE_URL}products?categories=${category}` : `${BASE_URL}products`);
        setProducts(response.data.data.products);
      } catch (error) {
        console.log(error);
      }
   };
   getProducts();
  }, [category]);

   useEffect(() => {
     category && 
      setFilteredProducts(
        products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))
        )
     );
   }, 
   [products, category, filters]);

   useEffect(() => {
     if(sort==='newest'){
       setFilteredProducts(prev => [...prev].sort((a,b) => a.createdAt - b.createdAt))
     } else if(sort==='asc'){
      setFilteredProducts(prev => [...prev].sort((a,b) => a.price - b.price))
     } else {
      setFilteredProducts(prev => [...prev].sort((a,b) => b.price - a.price))
    }
   },[sort]);

  return (
    <Container>
      {category 
         ? filteredproducts.map((product) => (<Product product={product} key={product.id}></Product>))
         : products.slice(0,8).map((product) => (<Product product={product} key={product.id}></Product>))
        }
    </Container>
  );
};

export default Products;
