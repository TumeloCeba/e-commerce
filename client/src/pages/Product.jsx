import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Error from '../components/Error';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { publicRequest, userRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({padding: '10px',flexDirection: 'column'})}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({height: '40vh'})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px; 
  ${mobile({width: '0px 10px'})}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 40%;
  margin 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({width: '100%'})}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor:pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({width: '100%'})}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight:700;
`;


const Amount = styled.span`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border 1px solid teal;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
`;

const Product = () => {
  document.title = 'Product';
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const dispatch = useDispatch();
 
  useEffect(() => {
    try {
      const getProduct = async () => {
        const response = await publicRequest.get(`/products/${productId}`);
        setProduct(response.data.data.product)
      }
      getProduct();  
    } catch (error) {
      console.log(error);
    }
  },[productId])

  useEffect(() => {
    setQuantity(1);
  }, [])

  const handleQuantity = (type) => {
    if(type === 'dec'){
      setQuantity(quantity > 1 ? quantity - 1 : quantity);
    }
    else{
      setQuantity(quantity + 1)
    }
  };

  const handleClick = () => {

    dispatch(
      addProduct({
        ...product,
        quantity,
        color,
        size,
      })
    )

  }

  return (
    <Container>
      <Navbar/>
      <Announcement/>
        <Wrapper>
          <ImageContainer>
            <Image src= {product.img}/>
          </ImageContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>
            {product.desc}
            </Desc>
            <Price>
              $ {product.price}
            </Price>
            <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                 {product.color && product.color.map((color) => <FilterColor className = 'selected' color={color} key = {color} onClick = {() => {setColor(color)}}/>)}
                </Filter>
                <Filter>
                  <FilterTitle >Size</FilterTitle>
                  <FilterSize className = 'selected' onClick = {(event) => {setSize(event.target.value)}}>
                  {product.size && product.size.map((size) => <FilterSizeOption size={size} key = {size}> {size} </FilterSizeOption>)}
                  </FilterSize>
                </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove className = 'selected' onClick = {() => {handleQuantity('dec')}}/>
                <Amount>{quantity}</Amount>
                <Add className = 'selected' onClick = {() => {handleQuantity('inc')}}/>
              </AmountContainer>
              <Button className = 'selected' onClick = {handleClick}>Add to cart</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      <Newsletter/>
      <Footer/>
    </Container>    
  )
}

export default Product;