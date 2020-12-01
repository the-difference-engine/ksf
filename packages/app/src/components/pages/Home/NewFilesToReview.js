import React, { useEffect, useState, useContext } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const NewFilesToReview = () => {
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );
  const [newNominations, setNewNominations] = useState([])

  const renderList = () => {
    if(NominationsData) {
      return NominationsData.forEach((nomination) => {
        if (nomination.status === 'received') {
          return (
           nomination
          );
        }
      });
    }
  };

  // if(NominationsData) {
  //   renderList(NominationsData)
  // }

  return (
    <div className="flat-list">
      {renderList()}
    </div>
  );

  // if (NominationsData) {
  //   const filteredNoms = NominationsData.forEach((nomination) => {
  //     if(nomination.status === "received") {
  //       return [
  //         (nomination.providerName),
  //         (nomination.nominationName),
  //         (nomination.representativeName),
  //         (nomination.dateReceived),
  //       ]
  //     }
  //   })
  //   // return setNewNominations(filteredNoms)
  //   // return filteredNoms
  // }


//   return (
//     <div>
//       <h1>
//         {console.log(NominationsData)}
//         New Files To Review
//       </h1>
//       <div>
//         <ul>
//           {/* {console.log(newNominations)} */}
//           {newNominations.map(nomination => {
//             console.log(nomination)
//             return <li key={nomination.id}>
//               <div>
//                 HP Name
//                 {nomination.providerName}
//               </div>
//             </li>
//           })}
//         </ul>
//       </div>
//     </div>
//   );
};

export default NewFilesToReview;
