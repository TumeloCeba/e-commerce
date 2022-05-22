import styled from "styled-components";

const Container = styled.div`

`;

const ErrorMessage = styled.p`
  background-color: red;
  color: white;
  text-align: center;
  font-size: 20px;
`;


const Error = (props) => {
  return (
    <Container>
      <ErrorMessage className = 'fadeInOut'>
        {props.errorMessage}
     </ErrorMessage>  
    </Container>
  )
};

export default Error;