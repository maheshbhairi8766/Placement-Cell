import React,{useState} from "react";
import Navbr from "./Navbr";
import SignUp from "./SignUp";
import { Link,useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
function Login()
{

  const [details, setdetails] = useState({email:"",password:""})
  let navigate=useNavigate()
  const handleForm=async (e)=>{
      e.preventDefault();
      const response= await fetch("http://localhost:5000/api/loginadmin",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:details.email,password:details.password})
      });
      const json = await response.json()
      console.log(json);

      if(!json.success)
      {
        alert("Enter Valid Details")
      }
      if(json.success)
      {
        localStorage.setItem("adminEmail",details.email)
        localStorage.setItem("authToken",json.authToken)
        localStorage.setItem("adminauthToken",json.authToken)
        console.log(localStorage.getItem("adminauthToken"))
        navigate("/");
      }
  } 
  const onChange=(event)=>{
    setdetails({...details,[event.target.name]:event.target.value})
  }
    return(
        <div className="container">
          <Form onSubmit={handleForm}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input  name="email" value={details.email}  placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input  name="password" value={details.password}  placeholder="password placeholder" onChange={onChange}/>
        </FormGroup>
        <Button type="submit">Submit</Button>
        <Link style={{display:'flex',marginRight:10}} to="/login">Already have account ?</Link>
      </Form>
        </div>
    );
}
export default Login;