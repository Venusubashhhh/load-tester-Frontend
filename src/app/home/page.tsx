"use client";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Charts } from "../../components/chart/Charts";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from "@mui/material/CircularProgress";
import TestService from "@/services/TestService";
import { io, Socket } from "socket.io-client";
import { ToastContainer, toast, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { BACKEND_API } from "@/Constants";
import { LTTB } from "downsample";
interface IFormData {
  testName: string;
  requestsPer: number;
  unit: "second" | "minute";
  totalRequests: number;
  api: string;
  ram:number;
  time:number;
}

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

const socket: Socket = io(BACKEND_API);
socket.connect();

function Page() {
  const [formdata, setFormData] = useState<IFormData>({
    requestsPer: 0,
    testName: "",
    totalRequests: 0,
    unit: "second",
    api: "",
    ram:0,
    time:0,
  });

  function sendMessage() {
    socket.emit("form-data", { formdata });
  }

  const [loading, setloading] = useState(false);
  const [average, setAverage] = useState(0);
  const [failedNo, setFailedNo] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [graphData, setGraphData] = useState({
    x: [] as any[],
    y: [] as any[],
  });
  const [downsampledData, setDownsampledData] = useState({
    x: [] as any[],
    y: [] as any[],
  });

  useEffect(() => {
    socket.on("data", (data: any) => {

      setloading(false);

      if (data.data.length && data.data.length > 0) {
        setGraphData((prev) => ({
          x: [...(prev.x as any[]), ...data.data.map((item: any) => item.index)],
          y: [
            ...(prev.y as any[]),
            ...data.data.map((item: any) => (item.reason ? 0 : item.responseTime)),
          ],
        }));
      }

    });
  }, [socket]);

  useEffect(() => {
    if (graphData.x.length > 0) {
      const downsample = LTTB(
        [
          ...graphData.x.map((item: any, index) => ({
            x: item,
            y: graphData.y[index],
          })),
        ],
        200
      );
      console.log(graphData);
      setDownsampledData({
        x: (downsample as any).map((item: any) => item.x),
        y: (downsample as any).map((item: any) => item.y),
      });
    }
    avg();
  }, [graphData]);

  const avg = () => {
    const total = graphData?.y.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const avrg = total / graphData?.y.length;
    setAverage(avrg);
    let fail = 0;
    graphData.y.map((item) => {
      if (item === 0) {
        fail += 1;
      }
    });
    setFailedNo(fail);

    const success = (fail / graphData?.y.length) * 100;

    setSuccessRate(success);
  };

  const showToastMessage = () => {
    toast.error("Please enter the valid API !", {});
  };

  const sendRequest = async () => {
    setGraphData({
      x: [],
      y: []
    });
    setDownsampledData({
      x: [],
      y: []
    })
    setloading(true);
    sendMessage();

    await TestService.Test(formdata);
  };

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
            <div className="input__box">
              <FormLabel>RAM</FormLabel>
              <FormLabel sx={{marginLeft:'41%'}}>Request Timemout(max)</FormLabel>
              <div className="request-wrapper">
                <OutlinedInput
                  placeholder="Enter number of requests"
                  sx={{ height: "50%", width: "50%" }}
                  value={formdata.ram}
                  onChange={(e) =>
                    setFormData({
                      ...formdata,
                      ram: Number(e.target.value),
                    })
                  }
                />
                
            <OutlinedInput
                  placeholder="Enter number of requests"
                  sx={{  width: "50%" }}
                  value={formdata.time}
                  onChange={(e) =>
                    setFormData({
                      ...formdata,
                      time: Number(e.target.value),
                    })
                  }
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
          <h1>Statistical data</h1>
          {loading ? (
            <div className="loading-wrapper">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                {downsampledData && <Charts data={downsampledData} />}
              </div>
              <div className="average-wrapper">
                <p className="text"><b>Average Latency:{average} ms</b></p>
                <p className="text"><b>Total no of Request Failed:{failedNo}</b></p>
                <p className="text"><b>Failure Rate:{successRate}%</b></p>
              </div>
              <div className="dashboardlink-wrapper">
               <a>Click here to view the dashboard</a>
              </div>
            </>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Page;
