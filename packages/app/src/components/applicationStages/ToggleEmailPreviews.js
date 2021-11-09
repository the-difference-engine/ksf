import { faDivide } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from '../applicationStages/style.css';
import nominationsAPI from '../../utils/API/nominationsAPI'

const Toggle = (props) => {

    async function toggleEmails(text) {
        try {
          const { data } = await nominationsAPI.toggleEmailPreviews(text);

        } catch (e) {
          console.log('Error using updateGrantCycle:', e);
        }
      }

    const handleToggle = (e) => {
        if(e.target.checked) {
            toggleEmails(true);
            console.log('ON')
        } else {
            toggleEmails(false)
            console.log('OFF')
        }
    }
    return (
        <div className="toggle-text">
        <text className="bumpedup-text">Enable Email Previews</text>
        <label className="toggle-switch">
        <input
          type="checkbox"
          name='toggle'
          onChange={handleToggle}
        />
        <span className={`switch`} />
      </label>
      </div>
    );
}

export default Toggle;
