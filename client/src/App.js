// import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios"
function App() {

  // const [users, setUsers] = useState([{id: 1, name: "Mark", age: 30,  username: "mark3000"}])
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [username, setUsername] = useState("")


  useEffect(()=>{

Axios.get("http://localhost:3001/getUsers").then((response)=>{
      setUsers(response.data)  
  });
  },[])

const createUser = ()=> {
Axios.post("http://localhost:3001/createUsers", {
  name: name, 
  age: age, 
  username: username,
}).then((response)=>{
  alert("User Created");
})
  }

  const update_User = (id) =>{

      const newAge = prompt("Enter new age please:")
      Axios.put("http://localhost:3001/updateAge", {
        newAge: newAge, id: id
      }).then(()=>{
        setUsers(users.map((val,index)=>{
          return val._id === id ? {name: val.name, age: newAge} : val;
        }))
      })
  }

  const  delete_User = (id) =>{
    Axios.delete(`http://localhost:3001/deleteUser/${id}`).then(()=>{
      setUsers(users.filter((val,index)=>{
            return val._id != id;
      }))
    })
}

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>User Generator Full-Stack Application</h1>
        </div>
      <div>
        <input type="text" placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
        <input type="number" placeholder='Age...' onChange={(e)=>{setAge(e.target.value)}}/>
        <input type="text" placeholder='Username...' onChange={(e)=>{setUsername(e.target.value)}}/>
        <button onClick={createUser}>Create User</button>
      </div>
      </header>
      <div className='App'>
    <div className='userDisplay'>
      {/* {users.map((user,index)=>{
          return <div key={index}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Username: {user.username}</h1>
          </div>
      })} */}
    </div>
      </div>
      <div className='ListOfUSers'>
        {users.map((value, index)=>{
          return (
            <div key={index}>
              <h2>Name: {value.name}</h2>
              <h2>Age: {value.age}</h2>
              <h2>Username: {value.username}</h2>
              <button onClick={()=>{
                update_User(value._id)
              }}>Update Age</button>
              <button id='removeBtn' onClick={()=>{
                delete_User(value._id)
              }}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
