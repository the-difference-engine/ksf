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

  const modes = {
    view: () => {
      let keys = Object.keys(props.formData)
      let jsxArray = keys.map(key => {
        switch (key) {
          case 'Provider Name':
            return (
              <h4>{key},{props.formData[key]}</h4>
            )
          case 'Patient Name':
            return (
              <h4>{key},{props.formData[key]}</h4>
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