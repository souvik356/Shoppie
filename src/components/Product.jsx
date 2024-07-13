import { useParams } from 'react-router-dom';
import { useProduct } from '../../Utils/useProduct';
import { useDispatch } from 'react-redux';
import { addItem } from '../../Utils/cartSlice';
import data from '../../Utils/RatingsData'
import { useState,useEffect } from 'react';
import user from '../assets/userLogo.png'
import Shimmer2 from './Shimmer2';

const Product = () => {
  const  {prodId}  = useParams();
  console.log(prodId)
  const prodInfo = useProduct(prodId); // useProduct - CustomHooks
  const dispatch = useDispatch();
  const handleAddItem = (prodInfo) => {
    dispatch(addItem(prodInfo));
  };
  const [review, setReview] = useState([])

  useEffect(() => {
    const product = data.find((item) => item.id === parseInt(prodId));
    if (product) {
      setReview(product.reviews);
    }
  }, [prodId]);
  //  console.log(review)
  if(prodInfo == null){
     return <Shimmer2/>
  }

  return (
    <>
     <div className="flex gap-[120px] flex items-center justify-center mt-4">
      {prodInfo && (
        <>
          <div className=" w-[400px] h-[400px]">
            <img
              className="w-full h-full"
              src={prodInfo.image}
              alt={`${prodInfo.title} product image`}
            />
          </div>
          <div className="flex flex-col text-center w-[32rem] bg-pink-100 hover:bg-blue-200 gap-8 items-center justify-center rounded-xl p-4">
            <h2 className='text-2xl'>{prodInfo.title}</h2>
            <p>{prodInfo.description}</p>
            <h2>Price:- $ {prodInfo.price}</h2>
            <h2>Ratings:- {prodInfo.rating.rate} stars</h2>
            <button
              className="p-2 bg-zinc-400 rounded-lg hover:bg-blue-400 hover:text-white"
              onClick={()=>handleAddItem(prodInfo)}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
    <div className='p-4 flex items-center justify-center flex-col gap-4'>
      <h1 className='text-xl text-center'>Review</h1>
     <div className='w-full p-2 rounded-lg flex items-center flex-col gap-4'>
       {
         review.map((elem,id)=>{
           return(
             <>
               <div className='w-[500px] flex flex-col items-center p-4 rounded-lg bg-pink-100 gap-2'>
                 <div className='flex items-center gap-4'>
                 <img src={user} className='w-[40px] h-[40px]'/>
                 <h1>{elem.userName}</h1>
                 </div>
                 <h1>{elem.rating} Rating</h1>
                <p>{elem.comment}</p>
               </div>
             </>
           )
         })
       }
       </div>
    </div>
    </>
  );
};

export default Product;
