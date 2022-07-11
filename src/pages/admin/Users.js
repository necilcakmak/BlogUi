import alertify from "alertifyjs";
import React, { useEffect, useState } from "react";
import { get } from "../../api/globalServices";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const users = async () => {
      const response = await get("user/getlist");
      if (response.success) {
        setUsers(response.data);
      } else {
        alertify.error(response.message);
      }
    };
    users();
  }, []);
  return (
    <div>
      <h5 className="float-left p-2">Users List</h5>

      {users?.map((a) => (
        
        <h3 key={a.id}>{a.userName}</h3>
      ))}
    </div>
  );
};

export default Users;
