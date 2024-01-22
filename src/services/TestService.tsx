import axios  from "axios";
import {BACKEND_API  } from "../Constants"



class TestServices {
     apipath = BACKEND_API

     async Test(data:any){
        try{        const response = await axios.post(`${this.apipath}`,data);
        console.log(response)
        return response.data;
     }
     catch(e)
     {
        console.log(e)
     }
     }
}



const TestService = new TestServices();

export default TestService;