import React, { useEffect, useState } from 'react';
import NominationBanner from './nominationBanner'
import nominationsAPI from '../../utils/API/nominationsAPI';
import HealthProvider from '../healthProvider/healthProvider';
import FamilyMemberInfo from '../familyInformation/familyInformation';

const dummyStyle = {
  margin: '0 auto',
  backgroundColor: 'var(--light-background)',
  padding: '2em',
}

const NominationShow = ({ match: { params: { id } } }) => {
  const [NominationData, setNominationData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    nominationsAPI.fetchNomination(id)
      .then(function (response) {
        const nomination = response.data.nomination
        setNominationData(nomination)
      })
      .catch(function (err) {
        setErrorMessage(err.response)
      })
  }, [id]);

  if (errorMessage && (errorMessage.status === 404 || errorMessage.status === 400)) {
    return (
      <div className="nomination-show-page">
        <p>Nomination does not exist.</p>
      </div>
    );
  }

  if (errorMessage && errorMessage.status === 500) {
    return (
      <div className="nomination-show-page">
        <p>Unknown Error, Please try again in a few minutes.</p>
      </div>
    );
  }
  
  const fields = [
    {
      label: "Name",
      value: NominationData.providerName
    },
    {
      label: "Email Address",
      value: NominationData.providerEmailAddress
    },
    {
      label: "Phone Number",
      value: NominationData.providerPhoneNumber
    },
    {
        label: "Title",
        value: NominationData.providerTitle
    },
    {
      label: "Email Validated",
      value: NominationData.emailValidated
    },
    {
      label: "Public Email Domain",
      value: NominationData.publicEmailDomain
    },
    {
      label: "Patient Diagnosis",
      value: NominationData.patientDiagnosis
    }];

    const familyinfo = [
      {
        label: "Name",
        value: NominationData.representativeName
      },
      {
        label: "Email Address",
        value: NominationData.representativeEmailAddress
      },
      {
        label: "Phone Number",
        value: NominationData.representativePhoneNumber
      },
      {
        label: "Relationship",
        value: NominationData.representativeRelationship
      }];
    
  return (
    <div className="nomination-show-page">
      <NominationBanner nomination={NominationData && NominationData}/>
      <div style={dummyStyle}>
        <HealthProvider fields={fields} />
      </div>
      <div style={dummyStyle}>
        <FamilyMemberInfo fields={familyinfo} />
      </div>
    </div>
  );
};

export default NominationShow;
