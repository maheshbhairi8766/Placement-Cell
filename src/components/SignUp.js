import React,{useState} from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

function SignUp()
{
    const [details, setdetails] = useState({name:"",email:"",password:"",address:"",contact:""})
    const [resume, setresume] = useState('')
    const handleForm=async (e)=>{
      const formData = new FormData()
      formData.append('name',details.name)
      formData.append('email',details.email)
      formData.append('password',details.password)
      formData.append('address',details.address)
      formData.append('contact',details.contact)
      formData.append('resume',resume)
      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } 
    const onChange=(event)=>{
      setdetails({...details,[event.target.name]:event.target.value})
    }
    const handleFileChange = (event) => {
      setresume(event.target.files[0]);
    };
    return(
        <div className="container">
            <Form onSubmit={handleForm} enctype="multipart/form-data">
        <FormGroup>
          <Label for="examplename">FullName</Label>
          <Input  name="name"value={details.name} placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input  name="email" value={details.email}  placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input  name="password" value={details.password}  placeholder="password placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Address</Label>
          <Input type="address" name="address" value={details.address} id="exampleaddress" placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">ContactNo</Label>
          <Input type="name" name="contact"  value={details.contact} id="examplecontact" placeholder="with a placeholder" onChange={onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        <Button type="submit">Submit</Button>
        <Link style={{display:'flex',marginRight:10}} to="/login">Already have account ?</Link>
      </Form>
        </div>
    );
}
export default SignUp;