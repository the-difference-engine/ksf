import React, { useContext } from 'react';
import styles from './styles.module.css';
import { useParams, Link } from 'react-router-dom';

function HealthProviderDetail(props) {
  const { id } = useParams();

  const openWindow = (val) => {
    window.open(`/searchhealthprovider/${val}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <label className={styles.title}>{props.title}</label>
      </div>
      <div className={[styles.content, props.gridContent && styles['grid-container']].join(' ')}>
        {props.propsData.map((obj, index) =>
          obj.label === 'Provider Name' ? (
            <div key={index} className={obj.label === '' ? styles.mobileHide : ''}>
              <label className={styles.label}>{obj.label}</label>

              <Link to={`/nomination/${id}`} className={styles.underline}>
                <span className={(styles.value, 'green')} onClick={() => openWindow(obj.value)} key={index}>
                  {obj.value}
                </span>
              </Link>
            </div>
          ) : (
            <div key={index} className={obj.label === '' ? styles.mobileHide : ''}>
              <label className={styles.label}>{obj.label}</label>
              <span className={styles.value}>{obj.value}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default HealthProviderDetail;
