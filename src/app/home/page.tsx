"use client";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import ApiSelectComponent from "../../components/ApiSelectComponent";
import DurationSelectComponent from "../../components/DurationSelectComponent";
import InputField from "../../components/InputField";
import { useRecoilState } from "recoil";
import data from "../../atom/data.atom"; // Adjust the import path and atom name
import { Charts } from "../../components/chart/Charts";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from '@mui/material/CircularProgress';
import TestService from "@/services/TestService";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface IFormData {
  testName: string;
  requestsPer: number;
  unit: "second" | "minute";
  totalRequests: number;
  api:string;
}

function Page() {

  const [formdata, setFormData] = useState<IFormData>({
    requestsPer: 0,
    testName: "",
    totalRequests: 0,
    unit: "second",
    api:"",
  });
const[loading,setloading]=useState(false)
const[average,setAverage]=useState(0);
const[failedNo,setFailedNo]=useState(0);
const[successRate,setSuccessRate]=useState(0);
const [graphData, setGraphData] = useState({ x: [], y: [] });
const avg=()=>{
const total = graphData.y.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

const avrg=total/formdata.totalRequests;
console.log(avrg)
setAverage(avrg);
let fail = 0;
graphData.y.map((item) => {
  if (item === 0) {
    fail += 1;
  }
});
setFailedNo(fail);
const success=100-((total/total-fail)*100)??100
console.log(success)
setSuccessRate(success)
} 


  useEffect(() => {
    console.log({ formdata });
  }, [formdata]);
useEffect(()=>{console.log({graphData})},[graphData])
  const duration = [
    {
      value: "minute",
      label: "Minute",
    },
    {
      value: "second", 
      label: "Second",
    },
  ];
  const showToastMessage = () => {
    toast.error("Please enter the valid API !", {
  
    });
  };
  const sendRequest = async () => {
    setloading(true);
    const data:any = await TestService.Test(formdata);
    setloading(false);
    console.log(data)
    if(data[0]==null)
    {
    showToastMessage()
    console.log('hii');
    }
  else{
    console.log('bye')
 
    setGraphData({
      x: data.map((item:any) => item.index),
      y: data.map((item:any) =>{ 
        if(item?.reason)
        return 0;
        else
        return item.responseTime}),
    });
   
  }
  };

  useEffect(() => {
    avg();
  }, [graphData]);
  
  return (
    <div className="wrapper">
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="home-wrapper">
        <div className="container">
          <h3>Test the Load</h3>
          <div className="form-wrapper">
            <div className="input__box">
              <FormLabel>Test Name</FormLabel>
              <div className="text-wrapper">
                <OutlinedInput
                  placeholder="Enter test name"
                  sx={{ width: "100%" }}
                  value={formdata.testName}
                  onChange={(e) =>
                    setFormData({ ...formdata, testName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="input__box">
              <FormLabel>API</FormLabel>
              <div className="text-wrapper">
                <OutlinedInput
                  placeholder="Enter the API"
                  sx={{ width: "100%" }}
                  value={formdata.api}
                  onChange={(e) =>
                    setFormData({ ...formdata, api: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="input__box">
              <FormLabel>Request Rate</FormLabel>
              <div className="request-wrapper">
                <OutlinedInput
                  placeholder="Enter number of requests"
                  sx={{ height: "50%", width: "90%" }}
                  value={formdata.requestsPer}
                  onChange={(e) =>
                    setFormData({
                      ...formdata,
                      requestsPer: Number(e.target.value),
                    })
                  }
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Per"
                  helperText="unit"
                  value={formdata.unit}
                  onChange={(e) =>
                    setFormData({
                      ...formdata,
                      unit: e.target.value as "second" | "minute",
                    })
                  }
                >
                  {duration.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="input_box">
              <FormLabel>Total Requests</FormLabel>
              <div className="text-wrapper">
                <OutlinedInput
                  placeholder="Enter total requests"
                  sx={{ width: "100%" }}
                  value={formdata.totalRequests}
                  onChange={(e) =>
                    setFormData({
                      ...formdata,
                      totalRequests: Number(e.target.value),
                    })
                  }
                  type="number"
                />
              </div>
            </div>
            <div className="button-container">
              <Button variant="contained" onClick={sendRequest}>
                Test
              </Button>
         
            </div>
          </div>
        </div>
        <div className="container-1">
          {loading ?
        <div className="loading-wrapper"><CircularProgress /></div>:<><Charts data={graphData}/>
        <div className="average-wrapper">
          <p>Average Latency:{average} ms</p>
          <p>Total no of Request Failed:{failedNo}</p>
          <p>Failure Rate:{successRate}%</p>
        </div>
        </>
        }
        
        <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Page;
