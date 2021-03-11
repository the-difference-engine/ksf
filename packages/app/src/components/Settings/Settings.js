import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'react-day-picker/lib/style.css';
import './styles.css';

const Settings = () => {
    return ( 
        <div className="settings-container">
            <header className="settings-header">
                <h1 className="settings-heading">
                    Settings
                </h1>
            </header>
            <main className="settings-main">
                <aside className="settings-sidebar">
                    <ul className="settings-list">
                        <li>Grant Cycle</li>
                    </ul>
                </aside>
                <section className="settings-section">
                    <h2 className="settings-section-heading">Create Grant Cycle</h2>
                    <div>
                        <div className="settings-input-block">
                            <p>Start Date:</p>
                            <span className="settings-input">
                                <input className="settings-input" type="date"/>
                            </span>
                        </div>
                        <div className="settings-input-block">
                            <p>End Date:</p>
                            <span className="settings-input">
                                <input className="settings-input" type="date"/>
                            </span>
                        </div>
                    </div>
                    <button className="settings-button">Create</button>
                    <h2 className="settings-section-heading">Grant Cycle History</h2>
                    <table className="settings-table">
                        <thead className="settings-thead">
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Applicatons</th>
                            </tr>
                        </thead>
                        <tbody className="settings-tbody">
                            <tr>
                                <td>01/01/2021</td>
                                <td>03/31/2021</td>
                                <td className="settings-cell">4</td>
                            </tr>
                            <tr>
                                <td>10/01/2020</td>
                                <td>12/31/2020</td>
                                <td className="settings-cell">14</td>
                            </tr>
                            <tr>
                                <td>07/01/2020</td>
                                <td>09/30/2020</td>
                                <td className="settings-cell">22</td>
                            </tr>
                            <tr>
                                <td>04/01/2020</td>
                                <td>06/30/2020</td>
                                <td className="settings-cell">17</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
     );
}
 
export default Settings;
