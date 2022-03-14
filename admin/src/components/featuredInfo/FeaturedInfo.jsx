import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import './featuredInfo.css';


export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(()=>{
    const getIncome = async () => {
      try{
        const response = await userRequest.get('/orders/income');
        //console.log('income0', response.data.data.income);
        setIncome(response.data.data.income);
        setPercentage((response.data.data.income[1].total * 100) / response.data.data.income[0].total - 100);
        //console.log('percentage0', response.data.data[1]);
      } catch(error){
        console.log(error);
      }
    }
    console.log('here');
    getIncome();
  },[])

  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Revanue</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>{income[1]?.total}</span>
          <span className='featuredMoneyRate'>
           {Math.floor(percentage)} %
            {percentage < 0 ? <ArrowDownward  className= 'featuredIcon negative'/> : <ArrowUpward className='featuredIcon'/>}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Sales</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>$4,415</span>
          <span className='featuredMoneyRate'>
            -1.4 <ArrowDownward className='featuredIcon negative'/>
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Cost</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>$2,225</span>
          <span className='featuredMoneyRate'>
            +2.4 <ArrowUpward className='featuredIcon'/>
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
    </div>
  );
}
