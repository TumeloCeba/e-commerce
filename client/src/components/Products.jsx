import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ category, filters, sort }) => {
  //console.log({category, filters, sort});
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredProducts] = useState([]);

  useEffect(() => {
   const getProducts = async () => {
      try {
        const response = await axios.get(category ? `http://localhost:5000/api/products?categories=${category}` : 'http://localhost:5000/api/products');
        console.log(response.data.data);
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

   useEffect()

   console.log('filteredproducts',filteredproducts);

  return (
    <Container>
      {filteredproducts.map((product) => (<Product product={product} key={product.id}></Product>))}
    </Container>
  );
};

export default Products;
