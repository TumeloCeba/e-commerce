import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userRequest } from '../../requestMethods';
import './user.css';

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try{
        const response = await userRequest.get('/users/' + userId);
        setUser(response.data.data.user);
      }catch(error){
        console.log(error);
      }
    }
    getProduct();
  },
  [userId]);

  //console.log('user', user);
  console.log('inputs', inputs);

  const handleChange = (event) => {
    setInputs((prev) => {
      return {
        ...prev, 
        [event.target.name]: event.target.value
      }
    })
  };

  const handleClick = (event) => {
    console.log('click');
    event.preventDefault();

    const updatedUser = {...inputs, /*img: downloadURL, categories: cat*/};
    const updateUser = async () => {
      try {
        await userRequest.patch('/users/' + userId, updatedUser);        
      } catch (error) {
        console.log(error);
      }
    }

    updateUser();
    //updateProduct(product._id, updatedUser, dispatch);

    /*const fileName = `${new Date().getTime()}_${file.name}`;
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed', 
      (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
      }
    }, 
    (error) => {
      console.log(error);
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref)
       .then((downloadURL) => {
        const product = {...inputs, img: downloadURL, categories: cat};
        addProduct(product, dispatch);
       });
    }
  );*/
    window.location.reload();
};

  return (
    user && 
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
        <Link to='/newUser'>
          <button className='userAddButton'>Create</button>
        </Link>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowTop'>
            <img
              src={user.img}
              alt='user'
              className='userShowImg'
            />
            <div className='userShowTopTitle'>
              <span className='userShowUsername'>{user.fullName}</span>
            </div>
          </div>
          <div className='userShowBottom'>
            <span className='userShowTitle'>Account Details</span>
            <div className='userShowInfo'>
              <PermIdentity className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.userName}</span>
            </div>
            {/* <div className='userShowInfo'>
              <CalendarToday className='userShowIcon' />
              <span className='userShowInfoTitle'>10.12.1999</span>
            </div> */}
            <span className='userShowTitle'>Contact Details</span>
            <div className='userShowInfo'>
              <PhoneAndroid className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.phone}</span>
            </div>
            <div className='userShowInfo'>
              <MailOutline className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.email}</span>
            </div>
            {/* <div className='userShowInfo'>
              <LocationSearching className='userShowIcon' />
              <span className='userShowInfoTitle'>New York | USA</span>
            </div> */}
          </div>
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm'>
            <div className='userUpdateLeft'>
              {/* <div className='userUpdateItem'>
                <label>Username</label>
                <input
                  type='text'
                  name='userName'
                  placeholder={user.userName}
                  className='userUpdateInput'
                />
              </div> */}
              <div className='userUpdateItem'>
                <label>Full Name</label>
                <input
                  type='text'
                  name='fullName'
                  onChange={handleChange}
                  placeholder={user.fullName}
                  className='userUpdateInput'
                />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={handleChange}
                  placeholder={user.email}
                  className='userUpdateInput'
                />
              </div>
              <div className='userUpdateItem'>
                <label>Phone</label>
                <input
                  type='text'
                  name='phone'
                  onChange={handleChange}
                  placeholder={user.phone}
                  className='userUpdateInput'
                />
              </div>
              {/* <div className='userUpdateItem'>
                <label>Address</label>
                <input
                  type='text'
                  placeholder='New York | USA'
                  className='userUpdateInput'
                />
              </div> */}
            </div>
            <div className='userUpdateRight'>
              <div className='userUpdateUpload'>
                <img
                  className='userUpdateImg'
                  src={user.img}
                  alt='user'
                />
                <label htmlFor='file'>
                  <Publish className='userUpdateIcon' />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} />
              </div>
              <button className='userUpdateButton' onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
