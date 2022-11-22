import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import Header from '../common/Header';
//import UserProfile from './UserProfile';
//import Actions from './Actions';
//import Posts from '../post/Posts';
import Context from '../../context';

const Profile = (props) => {
  //const params = this.props.params;
  //console.log(params);
  const { id } = useParams();
  //console.log(id);


  let loadUser = null;


  const history = useNavigate();
  
    // useEffect(() => { 
    //   const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
    // //   if (authenticatedUser) { 
    // //     history.push('/');
    // //   }
    // }, [history]);





  loadUser = useCallback(async () => {
    try {
      const userId = id;
      console.log(userId);
      if (!userId) {
        return;
      }
      //setIsLoading(true);
      //const url = `http://localhost:8080/users/${userId}`
      const url = `https://morning-lowlands-96711.herokuapp.com/users/${userId}`
      const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
      if(authenticatedUser){
      const response = await axios.get(url);
      
      if (response && response.data && response.data.message) {
        alert(response.data.message);
      }} else {
        //setUserProfile(response.data[0]);
        //await loadUserFollower();
      }
      //setIsLoading(false);
    } catch (error) {
      //setIsLoading(false);
    }
  }, [])
  

 
  


  return (
    <div>
      <div id="header">
        <Header />
        <button onClick={loadUser}>
      Click me!
    </button>

      </div>
  

    </div>
  );
};
export default Profile;