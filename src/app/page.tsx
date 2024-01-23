"use client"
import React from 'react'
import './Welcome.scss'

import { useRouter } from 'next/navigation'
function page() {
  const router=useRouter()
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
    
    <div className="landing">
    <div className="bg"></div>
    <div className="container landing-flex">
      <h1 className="landing-title">
      Velocity Forge
      </h1>
      <div className="landing-description">
     Velocity Forge is a tool or software designed to simulate a specific amount of load or traffic on a system, application, or website to assess its performance and behavior under various conditions. The primary goal of load testing is to identify how a system handles different levels of stress, ensuring it can perform optimally even during peak usage.
      </div>
      <button className="purchase-button" onClick={()=>router.push('/home')}>
        Purchase
      </button>
    </div>
</div>
</div>
     
  )
}

export default page