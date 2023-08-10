import React, { useState, useEffect } from "react";
import Navbr from "../components/Navbr";
import Crousel from "../components/Crousel";
import Footr from "../components/Footr";
import Cardg from "../components/Cardg";

function Home() {
    const [searchb, setsearchb] = useState('')
    const [jobdata, setjobdata] = useState([])
    const [catdata, setcatdata] = useState([])
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/displaydata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setjobdata(response[0])
        setcatdata(response[1])
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <div>
            <Crousel />
            <div class="input-group" style={{margin:'10px'}}>
                <div className="form-outline">
                    <input type="search" id="form1" class="form-control" value={searchb} onChange={(e)=>{setsearchb(e.target.value)}}/>
                    <label class="form-label" for="form1">Search</label>
                </div>
                <button type="button" class="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="container" style={{ margin: '3px' }}>

                {
                    catdata !== []
                        ?
                        catdata.map((data) => {
                            return (
                                <div className="row mb-3">
                                    <div key={data._id}  >
                                        {data.CategoryName}
                                    </div>
                                    <hr />

                                    {jobdata !== []
                                        ?
                                        jobdata.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchb.toLocaleLowerCase())))
                                            .map((filteritems) => {
                                                return (
                                                    <div key={filteritems._id} className="col-md-6 col-lg-3">
                                                        <Cardg
                                                          /*  jobName={filteritems.name}
                                                            jobimg={filteritems.img}
                                                            jobdesc={filteritems.description}
                                                            jobcate={filteritems.CategoryName}*/
                                                            jobdetails={filteritems}
                                                        />
                                                    </div>
                                                );
                                            })
                                        : ""
                                    }
                                </div>

                            );
                        })
                        : ""
                }

            </div>
            <Footr />
        </div>
    );
}
export default Home;