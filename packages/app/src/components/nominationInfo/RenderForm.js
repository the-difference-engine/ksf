import React, { useEffect, useRef } from 'react';  
import { useForm } from "react-hook-form";

const RenderForm = (props) => {

  const firstUpdate = useRef(true);

//   useEffect(() => {
//     if (!firstUpdate.current) {
//     console.log(`THIS IS MODE IN RENDERFORM ${props.mode}`)
//     }
//     firstUpdate.current = false;
//  }, [props.mode])

// Object.entries(obj).forEach(entry => {
//   const [key, value] = entry;
//   console.log(key, value);
// });


  // const topOfFormJSX = () => {
  //   return (
  //     <form onSubmit={console.log("at top of form")}>
  //   )
  // }

  // const bottomOfFormJSX = () => {
  //   return (
  //     </form>
  //   )
  // }

 const {handleSubmit} = useForm()

 const onSubmit = () => console.log("on submit triggered")

  const editablePlainText = [
  // editable family info:
    "Representative Name",
    "Email Address",
    "Phone Number",
    "Relationship",
    "Request to communicate in Spanish?",
  ]

  const editableDates = [
      // editable patient info labels with dates:
    "Admission Date",
    "Discharge Date",
  ]


  const modes = {
    view: () => {
      let keys = Object.keys(props.formData)
      let jsxArray = keys.map(key => {
        switch (true) {
          case editableDates.includes(key):
            return (
              <input 
              name={key} 
              type='date' 
              defaultValue={props.formData[key]}
              /> 
              
            )
          default:
            return (
              <h1>{key},{props.formData[key]}</h1>
            )
        }
      })
      jsxArray.push(<input type="submit" />)
      let reactElements = React.createElement("form", {onSubmit: handleSubmit(onSubmit)},
      jsxArray) 
      return reactElements
    },
    edit: () => {
      console.log(`This is hasBeenClicked in RenderForm ${props.hasBeenClicked}`)
      return (
        <h1>edit mode activated</h1>
      )
      
    }
  };
  return modes[props.mode]?.() ?? "Modes DNE"
    
}

export default RenderForm;