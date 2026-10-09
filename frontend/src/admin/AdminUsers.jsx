import { useEffect,useState,useContext } from "react";
import { authContext } from "../context/authContext";
import '../styles/adminUsers.css'
export default function AdminUsers(){

const[users,setUsers]=useState([]);

const {user}=useContext(authContext);

useEffect(() => {

    const fetchUsers = async () => {

        try {
            const res = await fetch('/api/auth/users', {
                credentials: 'include'
            });

            const data = await res.json();

            setUsers(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error(error);
        }

    };

    fetchUsers();

}, [user]);



    return(
<div  className="user-dir-container">

<h2>User Directory</h2>

<div>

<table>

<thead>
<tr>
<th>Id</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Joined</th>
</tr>
</thead>

<tbody>

{users.map(u=>(
 <tr key={u._id}>
<td>{u._id.substring(0,8)}...</td>
<td>{u.name}</td>
<td>{u.email}</td>
<td>{u.role}</td>
<td>{new Date(u.createdAt).toLocaleDateString()}</td>
 </tr>   
))}

</tbody>

</table>

</div>


</div>
    );

}