import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUp } from '../redux/apiCalls';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center;
  background-size: cover;
`;
 
const Wrapper = styled.div`
  width: 40%;
  background-color: white;
  padding: 20px;
  ${mobile({display: '75%'})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-wight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-flow: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-size: 17px;

`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const handleDetailChange = (event) => {
    setUserDetails((prev) => {
      return {
        ...prev, 
        [event.target.name]: event.target.value
      }
    })
  };

  const handleRegister = (event) => {
    event.preventDefault();
    signUp(dispatch,userDetails);
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input onChange = {handleDetailChange} name = 'firstName' placeholder='Name'/>
          <Input onChange = {handleDetailChange} name = 'lastName' placeholder='Last Name'/>
          <Input onChange = {handleDetailChange} name = 'userName' placeholder='Username'/>
          <Input onChange = {handleDetailChange} name = 'email' placeholder='Email'/>
          <Input onChange = {handleDetailChange} name = 'password' type='Password' placeholder='Password'/>
          <Input onChange = {handleDetailChange} name = 'passwordConfirm' type='Password' placeholder='Confirm password'/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )

}

export default Register;