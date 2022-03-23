import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { Publish } from '@material-ui/icons';
import './product.css';
import Chart from '../../components/chart/Chart';
import { userRequest } from '../../requestMethods';
import { updateProduct } from '../../redux/apiCalls';


export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [productStats, setProductStats] = useState([]);
  //const product = useSelector(state => state.product.products.find((product)=> product._id === productId));
  const [inputs, setInputs] = useState({});
  const [product, setProduct] = useState({});
  //const [file, setFile] = useState(null);
  //const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const MONTHS = useMemo(() => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],[]);

  useEffect(() => {
    const getProductStats = async () => {
      try{
        const response = await userRequest.get('/orders/income?pid=' + productId);
        response.data.data.income.sort((a,b) => {
          return a._id - b._id;
        });
        response.data.data.income.map((item) => (
          setProductStats((prev) => [
            ...prev,
            {
                name: MONTHS[item._id - 1],
                Sales: item.total,
            }
          ])  
        ))
      } catch(error){
        console.log(error);
      }
    }
    getProductStats();
  }
  ,[productId,MONTHS]);

  useEffect(() => {
    const getProduct = async () => {
      try{
        const response = await userRequest.get('/products/' + productId);
        setProduct(response.data.data.product);
      }catch(error){
        console.log(error);
      }
    }
    getProduct();
  },
  [productId]);
 
  const handleChange = (event) => {
    setInputs((prev) => {
      return {
        ...prev, 
        [event.target.name]: event.target.value
      }
    })
  };

  const handleClick = (event) => {
    event.preventDefault();

    const updatedProduct = {...inputs, /*img: downloadURL, categories: cat*/};
    updateProduct(product._id, updatedProduct, dispatch);

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
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
          <div className='productTopLeft'>
              <Chart data={productStats} dataKey='Sales' title='Sales Performance'/>
          </div>
          <div className='productTopRight'>
              <div className='productInfoTop'>
                  <img src={product?.img} alt='product' className='productInfoImg' />
                  <span className='productName'>{product.title}</span>
              </div>
              <div className='productInfoBottom'>
                  <div className='productInfoItem'>
                      <span className='productInfoKey'>id:</span>
                      <span className='productInfoValue'>{product._id}</span>
                  </div>
                  {/*<div className='productInfoItem'>
                      <span className='productInfoKey'>sales:</span>
                      <span className='productInfoValue'>5123</span>
                    </div>*/}
                  <div className='productInfoItem'>
                      <span className='productInfoKey'>in stock:</span>
                      <span className='productInfoValue'>{`${product.inStock}`}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className='productBottom'>
          <form className='productForm'>
              <div className='productFormLeft'>
                <label>Product Name</label>
                <input type='text' name='title' placeholder={product.title} onChange={handleChange}/>
                <label>Product Description</label>
                <input type='text' name='desc' placeholder={product.desc} onChange={handleChange}/>
                <label>Price</label>
                <input type='text' name='price' placeholder={product.price} onChange={handleChange}/>
                <label>In Stock</label>
                <select name='inStock' id='idStock' default='true' value={`${product.inStock}`} onChange={handleChange}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>
              </div>
              <div className='productFormRight'>
                  <div className='productUpload'>
                      <img src={product.img} alt='product' className='productUploadImg' />
                      <label htmlFor='file'>
                          <Publish/>
                      </label>
                      <input type='file' id='file' style={{display:'none'}} />
                  </div>
                  <button className='productButton' onClick={handleClick}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
