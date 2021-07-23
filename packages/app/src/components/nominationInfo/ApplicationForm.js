import React, { useEffect, useRef, useContext, useState } from 'react';
import styles from './newstyles.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import nominationsAPI from '../../utils/API/nominationsAPI';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import ViewCard from './ViewCard';
import EditCard from './EditCard';
import 'yup-phone';
import { useParams } from 'react-router-dom';

const ApplicationForm = props => {
  // Stores state to ensure useEffects do not render on load
  const firstUpdate = useRef(true);

  // passed down to card components for Link
  const { id } = useParams();

  // passed down to card component for Link
  const openWindow = val => {
    window.open(`/searchhealthprovider/${val}`);
  };

  // all nominations
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );

  // current nomination rendered on screen
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );

  // turn date into object for React Datepicker
  const [admissionDate, setAdmissionDate] = useState(new Date());
  const [dischargeDate, setDischargeDate] = useState(new Date());

  // turn date into object for React Datepicker
  useEffect(() => {
    if (props.patientInformationData['Admission Date'] != 'Invalid Date') {
      setAdmissionDate(props.patientInformationData['Admission Date']);
    }
  }, [props.patientInformationData['Admission Date']]);

  // turn date into object for React Datepicker
  useEffect(() => {
    if (props.patientInformationData['Discharge Date'] != 'Invalid Date') {
      setDischargeDate(props.patientInformationData['Discharge Date']);
    }
  }, [props.patientInformationData['Discharge Date']]);

  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  // watches for Save button click
  useEffect(() => {
    // makes sure useEffects don't run on initial render
    if (!firstUpdate.current) {
      handleSubmit(submitForm)();
    }
    firstUpdate.current = false;
  }, [props.saveHasBeenClicked]);

  const validationSchema = Yup.object({
    'Admission Date': Yup.date().required('Required'),
    'Discharge Date': Yup.date()
      .min(
        Yup.ref('Admission Date'),
        'Discharge date cannot be before admission date.'
      )
      .required('Required'),
    'Representative Name': Yup.string()
      .min(3, 'Must be 3 characters or more.')
      .max(30, 'Must be 30 characters or less.')
      .required('Required'),
    'Representative Email Address': Yup.string()
      .email('Invalid email address.')
      .required('Required'), // This handles email validation with no regex.
    'Representative Phone Number': Yup.string()
      .matches(phoneRegex, 'Please enter a valid phone number.')
      .required('Required'),
    Relationship: Yup.string()
      .min(3, 'Must be at least 3 characters.')
      .max(20, 'Must be no more than 20 characters.')
      .required('Required'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitForm = async data => {
    if (NominationsData) {
      let newActiveNomination = {};
      // loops through all nomination data to find active nomination
      const newNominationData = NominationsData.map(nomination => {
        if (nomination.id === props.id) {
          data['Admission Date']
            ? (nomination.admissionDate = data[
                'Admission Date'
              ].toLocaleDateString())
            : (nomination.admissionDate = data['Admission Date']);
          data['Discharge Date']
            ? (nomination.dischargeDate = data[
                'Discharge Date'
              ].toLocaleDateString())
            : (nomination.dischargeDate = data['Discharge Date']);
          nomination.representativeEmailAddress =
            data['Representative Email Address'];
          nomination.representativePhoneNumber =
            data['Representative Phone Number'];
          nomination.representativeRelationship = data['Relationship'];
          nomination.representativeName = data['Representative Name'];
          if (data['Request to communicate in Spanish?'] === 'Yes') {
            nomination.representativeSpanishRequested = true;
          } else {
            nomination.representativeSpanishRequested = false;
          }
          newActiveNomination = nomination;
        }
        return nomination;
      });

      const response = await nominationsAPI.updateActiveNomData(
        props.id,
        newActiveNomination
      );

      props.revertMode('view');
      setNominationsData(newNominationData);
      setActiveNomination(newActiveNomination);
    }
  };

  const editablePlainText = [
    // editable family info:
    'Representative Name',
    'Representative Email Address',
    'Representative Phone Number',
    'Relationship',
  ];

  const spanishDropdown = 'Request to communicate in Spanish?';

  const editableDates = [
    // editable patient info labels with dates:
    'Admission Date',
    'Discharge Date',
  ];

  const titleLabels = [
    'Patient Information',
    'Family Member Information',
    'Health Provider Information',
  ];

  // mode either 'view' or 'edit' and is changed by Save, Edit, or Cancel buttons in editOrSaveButton.js
  switch (props.mode) {
    case 'view':
      return (
        <div className={styles.dataContainer}>
          <div>
            <ViewCard
              titleLabels={titleLabels}
              editablePlainText={editablePlainText}
              editableDates={editableDates}
              spanishDropdown={spanishDropdown}
              formData={props.patientInformationData}
              id={id}
              openWindow={openWindow}
            />
          </div>
          <div>
            <ViewCard
              titleLabels={titleLabels}
              editablePlainText={editablePlainText}
              editableDates={editableDates}
              spanishDropdown={spanishDropdown}
              formData={props.familyMemberData}
              id={id}
              openWindow={openWindow}
            />
          </div>
          <div>
            <ViewCard
              titleLabels={titleLabels}
              editablePlainText={editablePlainText}
              editableDates={editableDates}
              spanishDropdown={spanishDropdown}
              formData={props.healthProviderData}
              id={id}
              openWindow={openWindow}
            />
          </div>
        </div>
      );
    default:
      return (
        <form>
          <div className={styles.dataContainer}>
            <div>
              <EditCard
                register={register}
                control={control}
                errors={errors}
                titleLabels={titleLabels}
                editablePlainText={editablePlainText}
                editableDates={editableDates}
                spanishDropdown={spanishDropdown}
                formData={props.patientInformationData}
                id={id}
                openWindow={openWindow}
              />
            </div>
            <div>
              <EditCard
                register={register}
                control={control}
                errors={errors}
                titleLabels={titleLabels}
                editablePlainText={editablePlainText}
                editableDates={editableDates}
                spanishDropdown={spanishDropdown}
                formData={props.familyMemberData}
                id={id}
                openWindow={openWindow}
              />
            </div>
            <div>
              <EditCard
                register={register}
                control={control}
                errors={errors}
                titleLabels={titleLabels}
                editablePlainText={editablePlainText}
                editableDates={editableDates}
                spanishDropdown={spanishDropdown}
                formData={props.healthProviderData}
                id={id}
                openWindow={openWindow}
              />
            </div>
          </div>
        </form>
      );
  }
};

export default ApplicationForm;
