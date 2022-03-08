import { useState } from "react";
import { useDispatch} from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();
    login(dispatch,{email: userName, password});
  }
  //return auth ? <Outlet /> : <Navigate to="/login" />;
  return (
    <div style = {{
      height: '100vh',
      flexDirection: 'column',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <input style = {{
        padding: '10px',
        marginBottom: '20px',
      }} type ='text' placeholder='username' onChange={event => setUsername(event.target.value)}></input>
      <input style = {{
        padding: '10px',
        marginBottom: '20px',
      }} type ='password' placeholder='password' onChange={event => setPassword(event.target.value)}></input>
      <button style={{
        padding: 10,
        width: 100,
      }} onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login;