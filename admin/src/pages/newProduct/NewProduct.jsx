import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './newProduct.css';
import  firebaseApp from '../../firebase';
import {addProduct} from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';


export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInputs((prev) => {
      return {
        ...prev, 
        [event.target.name]: event.target.value
      }
    })
  };

  const handleCategories = (event) => {
    setCat(event.target.value.split(','));
  };

  const handleClick = (event) => {
    event.preventDefault();
    const fileName = `${new Date().getTime()}_${file.name}`;
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
        console.log('downloadURL ', downloadURL);
        const product = {...inputs, img: downloadURL, categories: cat};
        addProduct(product, dispatch);
       });
    }
  );
};

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input type='file' id='file' onChange={event => setFile(event.target.files[0])}/>
        </div>
        <div className='addProductItem'>
          <label>Title</label>
          <input name = 'title' type='text' placeholder='Title' onChange={handleChange}/>
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input name = 'price' type='number' placeholder='Price' onChange={handleChange}/>
        </div>
        <div className='addProductItem'>
          <label>Categories</label>
          <input name = 'categories' type='text' placeholder='Categories' onChange={handleCategories}/>
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input name = 'desc' type='text' placeholder='Description' onChange={handleChange}/>
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <select name = 'stock' onChange={handleChange}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <button onClick = {handleClick} className='addProductButton'>Create</button>
      </form>
    </div>
  );
}
