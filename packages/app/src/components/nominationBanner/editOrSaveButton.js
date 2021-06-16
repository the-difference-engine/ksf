import React from 'react'


const EditOrSaveButton = (props) => {
    switch (props.badStyles.saveOrEditLabel) {
      case "Edit":
        return (
          <button className="button button-outline edit-button" style={{ backgroundColor: props.badStyles.backColor, color: props.badStyles.textColor }}
          onClick={props.handleClick} id="edit-button">{props.badStyles.saveOrEditLabel}</button>
        )
      case "Save":
          
        return (
          <button className="button button-outline edit-button" style={{ backgroundColor: props.badStyles.backColor, color: props.badStyles.textColor }}
          onClick={props.handleSaveHasBeenClicked} id="edit-button">{props.badStyles.saveOrEditLabel}</button>
        )
      default: 
        console.log(`THIS IS saveOrEditLabel in EditOrSaveButton ${props.badStyles.saveOrEditLabel}`)
        return (
            <h1>WTF</h1>
        )
  
    }
  }
  
  export default EditOrSaveButton;