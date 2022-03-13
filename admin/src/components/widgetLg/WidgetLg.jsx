import { useEffect, useState } from 'react';
import {format} from 'timeago.js';
import { userRequest } from '../../requestMethods';

import './widgetLg.css';

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const response = await userRequest.get('/orders');
        console.log('orders',response.data.data.orders);
        setOrders(response.data.data.orders);
      } catch(error){

      }
    }
    getUsers();
  },[]) //Empty array allows use effect to be ran once, during the initial render
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };
  return (
    <div className='widgetLg'>
      <h3 className='widgetLgTitle'>Latest transactions</h3>
      <table className='widgetLgTable'>
        <tr className='widgetLgTr'>
          <th className='widgetLgTh'>Customer</th>
          <th className='widgetLgTh'>Date</th>
          <th className='widgetLgTh'>Amount</th>
          <th className='widgetLgTh'>Status</th>
        </tr>
        {orders?.map((order) => 
        <tr className='widgetLgTr'>
          <td className='widgetLgUser'>
            <span className='widgetLgName'>{order.user.userName}</span>
          </td>
          <td className='widgetLgDate'>{format(order.createdAt)}</td>
          <td className='widgetLgAmount'>{order.amount}</td>
          <td className='widgetLgStatus'>
            <Button type={order.status} />
          </td>
        </tr>)}
      </table>
    </div>
  );
}
