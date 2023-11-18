import './App.css'
import { useEffect, useState } from "react";

const App = () => {
  const [val, setVal] = useState({})
  const [dataa,setData]= useState([]);
  const handleValues = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value })
  }
  const sendData = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/demo', {
      method: 'POST',
      body: JSON.stringify(val),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rs = await response.json();
    console.log(rs)
  }
  const getData = async () => {
    const response = await fetch('http://localhost:3000/demo');
    const res = await response.json();
    setData(res);
    console.log(res)
  }
  useEffect(()=>{
    getData();
  },[]);
  // useEffect(()=>{
  //   getData();
  // },[sendData])
  return (
    <>
      <form onSubmit={sendData}>
        <p>{JSON.stringify(val)}</p>
        <input onChange={handleValues} type="text" name="userName" />
        <input onChange={handleValues} type="text" name="password" />
        <button >Submit</button>
      </form>
      <ul>{dataa.map(e=>(
            <li>{e.userName},{e.password}</li>
        ))}</ul>
    </>
  )
}

export default App;