import React from "react";
import family_info from "./family_info"

function FamilyMemberInfo (props) {
      return (
        <div>
            <p>Family Member Information</p>
            <p>Name</p>
            <p>{props.familyRepresentativeName}</p>
            <p>Email Address</p>
            <p>{props.familyRepresentativeEmailAddress}</p>
            <p>Phone Number</p>
            <p>{props.familyRepresentativePhoneNumber}</p>
            <p>Relationship</p>
            <p>{props.representativeRelationship}</p>
        </div>
      );
    }
  
  export default FamilyMemberInfo;
  