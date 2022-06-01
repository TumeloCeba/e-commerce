import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { styled } from "@material-ui/core";

const Button = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;

const ButtonContainer = styled.div`

`;

export default function UserList() {
  const [data, setData] = useState(userRows);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const response = await userRequest.get('/users');
        setUsers(response.data.data.users);
      }catch(error){
        console.log(error);
      }
    }
    getUsers();
  },
  []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    /*{
      field: "status",
      headerName: "Transaction Volume",
      width: 160,
    },*/
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    
    users && <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        getRowId={row => row._id}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
      <ButtonContainer>
        <Link to='/newUser'>
          <Button >Create</Button>
        </Link>
      </ButtonContainer>
      
    </div>

    
  );
}
