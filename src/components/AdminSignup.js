import React,{useState} from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link ,useNavigate} from "react-router-dom";

function AdminSignUp()
{
    const [admindetails, setadmindetails] = useState({name:"",email:"",password:"",address:"",contact:""})
    let navigate=useNavigate()
    const handleForm=async (e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/createadmin",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name:admindetails.name,email:admindetails.email,password:admindetails.password,address:admindetails.address,contact:admindetails.contact})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success)
        {
          alert("Enter Valid Details")
        }
        else{
          navigate("/adminlogin");
        }
    } 
    const onChange=(event)=>{
      setadmindetails({...admindetails,[event.target.name]:event.target.value})
    }
    return(
        <div className="container">
            <Form onSubmit={handleForm}>
        <FormGroup>
          <Label for="examplename">FullName of Company</Label>
          <Input  name="name"value={admindetails.name} placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">HR Email</Label>
          <Input  name="email" value={admindetails.email}  placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Account Password</Label>
          <Input  name="password" value={admindetails.password}  placeholder="password placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleAddress">Address</Label>
          <Input type="address" name="address" value={admindetails.address} id="exampleaddress" placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleAddress">Contact</Label>
          <Input type="number" name="contact" value={admindetails.contact} id="exampleaddress" placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <Button type="submit">Signup</Button>
        <Link style={{display:'flex',marginRight:10}} to="/login">Already have account ?</Link>
      </Form>
        </div>
    );
}
export default AdminSignUp;