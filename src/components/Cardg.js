import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
    import { Document, Page } from 'react-pdf';
function Cardg(props) {
    let data = props.jobdetails;
    let ndata= props.jobdetails.name;
    
    const handleApply=async (e)=>{
        let userEmail = localStorage.getItem("userEmail")
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/applieduser",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({email:userEmail,job_data:data,applied_date:new Date().toDateString()})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success)
        {
          alert("Enter Valid Details")
        }
        else{
           // alert("Applied Success !")
            toast.success("Applied Successfully ..!")
        }
    }
    //const notify = () => toast("Wow so easy!");
    return (
        <div>
            <Card style={{width: '18rem'}} >
                <img alt="Sample" src={`http://localhost:5000/${props.jobdetails.img}`}/>
                
                <CardBody>
                    <CardTitle tag="h5">
                        {props.jobdetails.name}
                    </CardTitle>
                    <CardText>
                        {props.jobdetails.role}
                    </CardText>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {props.jobdetails.CategoryName}
                    </CardSubtitle>
                    <CardText>
                        {props.jobdetails.description}
                    </CardText>
                    <Button onClick={handleApply}>
                        <ToastContainer/>
                        Apply
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
export default Cardg;