import React from 'react';
import styles from './newstyles.module.css';
import Title from './labelTypes/Title';
import Other from './labelTypes/Other';
import Provider from './labelTypes/Provider';

const ViewCard = props => {
  return (
    <div className={styles.card}>
      <div className={[styles.gridContainer, styles.content].join(' ')}>
        {props.keys.map(label => {
          switch (true) {
            // Render our titles in card
            case props.titleLabels.includes(label):
              return <Title label={label} />
            // Render dates
            case props.editableDates.includes(label):
              return (
                <div>
                  <label className={styles.label}>{label}</label>
                  <span className={styles.value}>
                    {props.formData[label].toLocaleDateString()}
                  </span>
                </div>
              );
            /* Link opens up provider name's nominations */
            case label === 'Provider Name':
              return <Provider 
                        id={props.id}
                        formData={props.formData}
                        openWindow={props.openWindow}
                        label={label}
                        />
            // renders diagnosis accross two columns
            case label === 'Diagnosis/case information':
              return <Other label={label} formData={props.formData} style={styles.diagnosis}/>
            // renders everything else  
            default:
              return <Other label={label} formData={props.formData} style={""}/>
          }
        })}
      </div>
    </div>
  );
};

export default ViewCard;
