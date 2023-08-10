import React, { useState, useEffect } from "react";

function DisplayApplied() {
    const [appliedData, setappliedData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myapplieddata", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setappliedData(response)
        })

    }

    useEffect(() => {
        fetchMyOrder()
    }, [])
    return (
        <div>
            <div className='container'>
                <div className='row'>

                    {appliedData !== {} ? Array(appliedData).map(data => {
                        return (
                            data.appliedData ?
                                data.appliedData.job_data.slice(0).reverse().map((item) => {
                                    return (
                                         //{
                                           // return (
                                                <div  >
                                                    {item.applied_date ? <div className='m-auto mt-5'>

                                                        {data = item.applied_date}
                                                        <hr />
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{item.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        {item.CategoryName}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                    </div> :""

                                                    /*    <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>*/



                                                    }

                                                </div>
                                          //  )
                                     //   }

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>
        </div>
    );
}
export default DisplayApplied;