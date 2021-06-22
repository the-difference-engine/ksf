import React, { useEffect, useRef } from 'react';  
  
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

  const modes = {
    view: () => {
      return Object.keys(props.formData).map(key => {
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