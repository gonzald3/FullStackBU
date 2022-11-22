import { useEffect, useRef, useContext } from "react";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import withModal from "../common/Modal";

import Context from "../../context";


const Login = (props) => {
    //const { toggleModal } = props;
  
    const { setUser } = useContext(Context);
  
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
  
    const history = useNavigate();
  
    useEffect(() => { 
      const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
    //   if (authenticatedUser) { 
    //     history.push('/');
    //   }
    }, [history]);
  
    const getInputs = () => {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      return { email, password };
    };
  
    const isUserCredentialsValid = (email, password) => {
      return validator.isEmail(email) && password;
    };
  
    // const loginCometChat = async (user) => {
    //   const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    //   return await cometChat.login(user.id, authKey);
    // };
  
    const signin = async (email, password) => {
      //const url = 'http://localhost:8080/login';
      const url = 'https://morning-lowlands-96711.herokuapp.com/login';
      return await axios.post(url, { email, password });
    }
  
    const login = async () => {
      const { email, password } = getInputs();
      if (isUserCredentialsValid(email, password)) {
        //setIsLoading(true);
        const authenticatedUser = await signin(email, password);
        //const cometChatAccount = await loginCometChat({id: authenticatedUser.data.id});
        
        console.log(authenticatedUser.data);
        
        if (authenticatedUser) {
          localStorage.setItem('auth', JSON.stringify(authenticatedUser.data));
          setUser(authenticatedUser.data);
          //setIsLoading(false);
          //history.push('/');
        } else { 
          alert('Failure to log in, please try again');
          //setIsLoading(false);
        }
      }
    };
  
    return (
      <div>
        <h1>Hi</h1>
        <div>
            <input
                type="text"
                placeholder="Email or phone number"
                ref={emailRef}
            />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className="login__submit-btn" onClick={login}>
                Login
            </button>
          </div>
      </div>
    );
  }
  
  export default Login;