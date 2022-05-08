import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useState } from 'react';

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;  
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({margin: '0px 20px', display: 'flex', flexDirection: 'column'})}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({margin: "0px"})}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin: "10px 0px"})}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  //console.log(location);
  const category = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  const title = `${category.charAt(0).toUpperCase()}${category.substring(1)}`;
  document.title = title;

  const handleFilters = (event) => {
    const value = event.target.value;

    setFilters({
      ...filters,
      [event.target.name]: value,
    })
  }

  const handleSort = (event) => {
    const value = event.target.value;

    setSort(value);
  }

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Title>{title}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name='color' onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
            <Option>gray</Option>
          </Select>
          <Select name= 'size' onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option value = 'xs'>XSmall</Option>
            <Option value = 's'>Small</Option>
            <Option value = 'm'>Medium</Option>
            <Option value = 'l'>Large</Option>
            <Option value = 'xl'>XLarge</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name='order' onChange={handleSort}>
            <Option value='newest'>Newest</Option>
            <Option value='asc'>Price (asc)</Option>
            <Option value='desc'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category = {category} filters = {filters} sort={sort}/>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default ProductList;