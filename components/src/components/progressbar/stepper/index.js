import React, { useEffect, useRef, useState } from "react";
import './stepper.scss'

export default function Stepper(){
  const [currentStep, setCurrentSpet] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0
  })
  const stepRef = useRef([])

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth/2,
      marginRight: stepRef.current[checkoutSteps.length - 1].offsetWidth/2
    })
  }, [stepRef])

  const checkoutSteps = [
    {name: "Customer Info", Component: () => <div>Provide your contact details.</div>},
    {name: "Shipping Info", Component: () => <div>Enter your shipping address.</div>},
    {name: "Payment", Component: () => <div>Complete payment for your order.</div>},
    {name: "Delivered", Component: () => <div>Your order has been delivered.</div>}
  ]

  if (!checkoutSteps.length){
    return <></>
  }

  const handleNext = () => {
    setCurrentSpet(prevStep => {
      if (prevStep === checkoutSteps.length){
        setIsComplete(true)
        return prevStep
      } else{
        return prevStep + 1
      }
    })
  }

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (checkoutSteps.length - 1)) * 100
  }

  const ActiveComponent = checkoutSteps[currentStep - 1]?.Component

  return(
    <div className="container-stepper">
      <h2>Checkout</h2>
      <div className="stepper">
        {checkoutSteps.map((step, index) => {
          return(
            <div className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""} ${currentStep === index + 1 ? "active" : ""}`} ref={el => (stepRef.current[index] = el)} key={step.name}>
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? <span>&#10003;</span> : index + 1}</div>
              <div className="step-name">{step.name}</div>
            </div>
          )
        })}
        <div className="progress-bar" style={{ width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`, marginLeft: margins.marginLeft, marginRight: margins.marginRight}}>
          <div className="progress" style={{ width: `${calculateProgressBarWidth()}%` }}></div>
        </div>
      </div>

      <ActiveComponent/>

      {!isComplete && (
        <button className="btn" onClick={handleNext}>{currentStep === checkoutSteps.length ? "Finish" : "Next"}</button>
      )}
    </div>
  )
}