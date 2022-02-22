import React from 'react';
import styled from 'styled-components';
//import  from '@mui/icons-material/Search';
import {Badge} from '@mui/material';
import {ShoppingCartOutlined, Search} from '@mui/icons-material';
import {mobile} from '../responsive';

const Container = styled.div`
  height: 60px;
  ${mobile({height: '50px'})}
 
`;

const Wrapper = styled.div`
  padding: 10px;  
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({padding: '10px 0px'})}

`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  ${mobile({width: '50px'})}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font:weight: bold;
  ${mobile({fontSize: '24px'})}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({justifyContent: 'center',flex: 2})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize: '12px',marginLeft: '10px'})}
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: 'none'})}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
      <Left>
        <Language>EN</Language>
        <SearchContainer>
          <Input placeholder='search'/>
          <Search style={{color:'gray', fontSize:'16px'}}/>
        </SearchContainer>
        </Left>
        <Center>
          <Logo>
            LAMA.
          </Logo>
        </Center>
        <Right>
          <MenuItem> REGISTER </MenuItem>
          <MenuItem> SIGN IN</MenuItem>
          <MenuItem> 
          <Badge badgeContent={4} color='primary'>
            <ShoppingCartOutlined/>
          </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;