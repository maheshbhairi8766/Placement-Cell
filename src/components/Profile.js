import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from "react-router-dom";




function Profile(args) {

  const [image, setimage] = useState('')
  const [credentials, setcredentials] = useState({name:"",email:"",CategoryName:"",role:"",address:"",contact:"",description:""})
  const handleFormSubmit=async(e)=>{
    e.preventDefault();
      const formData = new FormData()
      formData.append('name',credentials.name)
      formData.append('email',credentials.email)
      formData.append('CategoryName',credentials.CategoryName)
      formData.append('role',credentials.role)
      formData.append('address',credentials.address)
      formData.append('contact',credentials.contact)
      formData.append('description',credentials.description)
      formData.append('img',image)
        const response= await fetch("http://localhost:5000/api/createnewjobs",{
          method:'POST',
          body:formData
        });
        const json = await response.json()
        console.log(json);

        if(!json.success)
        {
          alert("Enter Valid Details")
        }
  }
  const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }





  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);






  const [details, setdetails] = useState([])
  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('adminEmail'))
    await fetch("http://localhost:5000/api/loadadmindata", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('adminEmail')
      })
    }).then(async (res) => {
      let response = await res.json()
      console.log(response)
      await setdetails(response)
    })

  }




  const [appliedEmail, setappliedEmail] = useState({})
  let cname = localStorage.getItem("adminname")
  const fetchAppliedJob = async () => {
    await fetch("http://localhost:5000/api/loadjobdata", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cname
      })
    }).then(async (res) => {
      let response = await res.json()
      console.log(response)
      console.log(localStorage.getItem("adminname"))
      await setappliedEmail(response)
    })

  }
  

  useEffect(() => {
    fetchMyOrder()
    fetchAppliedJob()
  }, [])
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                {details !== []
                  ?
                  details.adminData ?
                    <div>
                      Hello HR
                      {localStorage.setItem("adminname", details.adminData.name)}
                      <p className="text-muted mb-1">{details.adminData.name}</p>
                      <p className="text-muted mb-4">{details.adminData.email}</p>
                    </div>
                    : ""
                  : ""
                }
                <div className="d-flex justify-content-center mb-2">

                  <MDBBtn color="primary" onClick={toggle}>POST</MDBBtn>
                  <Modal isOpen={modal} toggle={toggle} {...args}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>


                      <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                          <Label for="examplename">FullName</Label>
                          <Input name="name" value={credentials.name} placeholder="with a placeholder"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input name="email" value={credentials.email} placeholder="with a placeholder"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampletext">CategoryName</Label>
                          <Input  name="CategoryName" value={credentials.CategoryName}  placeholder="password placeholder"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="examplePassword">Role</Label>
                          <Input name="role" value={credentials.role} placeholder="password placeholder"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Address</Label>
                          <Input type="address" name="address"value={credentials.address}  id="exampleaddress" placeholder="with a placeholder" onChange={onChange} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">ContactNo</Label>
                          <Input type="name" name="contact" value={credentials.contact} id="examplecontact" placeholder="with a placeholder" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Short description about Role</Label>
                          <Input type="name" name="description" value={credentials.description} id="examplecontact" placeholder="with a placeholder" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleFile">File</Label>
                          <Input type="file" onChange={(e)=>setimage(e.target.files[0])} name="img" id="exampleFile" />
                          <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                          </FormText>
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                      </Form>
                      
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={toggle} >
                        POST JOb
                      </Button>
                      <Button color="secondary" onClick={toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>

                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {details !== []
                      ?
                      details.adminData ?
                        <div>
                          <MDBCardText className="text-muted">{details.adminData.name}</MDBCardText>
                        </div>
                        : ""
                      : ""
                    }

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {details !== []
                      ?
                      details.adminData ?
                        <div>
                          <MDBCardText className="text-muted">{details.adminData.email}</MDBCardText>
                        </div>
                        : ""
                      : ""
                    }

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">

                    {details !== []
                      ?
                      details.adminData ?
                        <div>
                          <MDBCardText className="text-muted">{details.adminData.contact}</MDBCardText>
                        </div>
                        : ""
                      : ""
                    }
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {details !== []
                      ?
                      details.adminData ?
                        <div>
                          <MDBCardText className="text-muted">{details.adminData.address}</MDBCardText>
                        </div>
                        : ""
                      : ""
                    }
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Applied</span> jobs </MDBCardText>

                    {appliedEmail !== {} ? Array(appliedEmail).map(data => {
                      return (
                        data.appliedEmail ?
                          data.appliedEmail.jobemail.slice(0).reverse().map((item) => {
                            return (
                              <div  >
                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{item}</MDBCardText>
                                <hr />
                              </div>
                              //  )
                              //   }

                            )
                          }) : ""
                      )
                    }) : ""}

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


      {appliedEmail !== {} ? Array(appliedEmail).map(data => {
        return (
          data.appliedEmail ?
            data.appliedEmail.jobemail.slice(0).reverse().map((item) => {
              return (
                <div  >
                  {item}

                </div>
                //  )
                //   }

              )
            }) : ""
        )
      }) : ""}


    </section>
  );
}
export default Profile;