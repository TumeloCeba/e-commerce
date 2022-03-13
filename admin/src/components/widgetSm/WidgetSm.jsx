import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const response = await userRequest.get('/users/?true');
        console.log('users',response.data.data.users);
        setUsers(response.data.data.users);
      } catch(error){

      }
    }
    getUsers();
  },[]) //Empty array allows use effect to be ran once, during the initial render

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => 
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
              alt=""
              className="widgetSmImg"
              />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.userName}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
          )}
      </ul>
    </div>
  );
}
