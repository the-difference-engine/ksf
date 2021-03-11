import React, { useContext } from 'react';
import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import { NominationsDataContext } from '../../utils/context/NominationsContext';


function HealthProviderDetail(props) {
      
    const [SearchResultData, setSearchResultData] = useContext(
      SearchResultDataContext
      );
      
    const [NominationsData, setNominationsData] = useContext(
      NominationsDataContext
      );
        
    const findSearchResults = (searchTerm) => {
          let filteredNoms = []
          if(NominationsData && searchTerm !== undefined) {
            filteredNoms = NominationsData.filter((nomination) => {
              return [
                nomination.providerName,
                nomination.patientName,
                nomination.nominationName,
                nomination.representativeName,
              ].some((nom) => nom.includes(searchTerm));
            });
            setSearchResultData(filteredNoms);
          } 
        }

    const { id } = useParams();
        
    const handleSubmit =  (val) => {
      if (val) {
        findSearchResults(val);
        window.open(`/nomination/${id}`, '_blank', 'noopener,noreferrer');
        return <Link to={`${process.env.APP_URL}/searchresults`} target="_blank" />
      }
    }

    const Switch = SearchResultData.length < 1 ? ( "/" ) : ( "/searchresults" );

      return (
        <div className={styles.main}>
          <div className={styles.header}>
          <label className={styles.bold}>{props.title}</label>
          </div>
          <div className={[styles.content, (props.gridContent && styles["grid-container"])].join(" ")}>
   
            {
              props.fields.map((obj, index) =>  obj.label === "Provider Name" ? (
                <div key={index} className={obj.label === "" ? styles.mobileHide: ""}>
                      <label className={styles.label}>{obj.label}</label>
                        <Link to={Switch} onClick={() => handleSubmit(obj.value)}  key={index}>
                          <span className={styles.value}>{String(obj.value)}</span>
                        </Link></div>) 
                      : (<div key={index} className={obj.label === "" ? styles.mobileHide: ""}>
                            <label className={styles.label}>{obj.label}</label>
                            <span className={styles.value}>{String(obj.value)}</span>
                        </div>))
            }
          </div>
        </div>
      );
    }
  
  export default HealthProviderDetail;
