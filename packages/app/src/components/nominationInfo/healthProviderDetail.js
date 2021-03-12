import React, { useContext } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';

function HealthProviderDetail(props) {
  function openNewBackgroundTab(val) {
    var a = document.createElement('a');
    a.href = `/searchhealthprovider/${val}`;
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
    a.dispatchEvent(evt);
  }

  const { id } = useParams();

  const handleSubmit = (val) => {
    if (val) {
      window.open(`/nomination/${id}`, '_blank');
      openNewBackgroundTab(val);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <label className={styles.title}>{props.title}</label>
      </div>
      <div className={[styles.content, props.gridContent && styles['grid-container']].join(' ')}>
        {props.fields.map((obj, index) =>
          obj.label === 'Provider Name' ? (
            <div key={index} className={obj.label === '' ? styles.mobileHide : ''}>
              <label className={styles.label}>{obj.label}</label>
              <a>
                <span className={styles.value} onClick={() => handleSubmit(obj.value)} key={index}>
                  {String(obj.value)}
                </span>
              </a>
            </div>
          ) : (
            <div key={index} className={obj.label === '' ? styles.mobileHide : ''}>
              <label className={styles.label}>{obj.label}</label>
              <span className={styles.value}>{String(obj.value)}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default HealthProviderDetail;