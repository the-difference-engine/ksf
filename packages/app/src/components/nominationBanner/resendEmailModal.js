import React, { useState } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';

const ResendEmailModal = (props) => {
  const [recipientChecked, setRecipientChecked] = useState('');
  const [emailTypeChecked, setEmailTypeChecked] = useState('');

  const handleRecipientChange = (e) => {
    setRecipientChecked(e.target.value);
  };

  const handleEmailTypeChange = (e) => {
    setEmailTypeChecked(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nominationsAPI.resendEmail(
      props.nomination.id,
      recipientChecked,
      emailTypeChecked
    );
    props.toggleEmailModalState();
  };

  const emailTypeHipaa = (
    <div>
      <label htmlFor="hipaa" className="survey">
        <input
          type="radio"
          value="hipaa"
          id="hipaa"
          checked={emailTypeChecked === 'hipaa'}
          onChange={handleEmailTypeChange}
          className="hipaa radio"
        />
        HIPAA
      </label>
    </div>
  );

  return (
    <div className="modal-background">
      <div className="email-modal-container">
        <button className="exit-button" onClick={props.toggleEmailModalState}>
          &times;
        </button>
        <form className="email-form" onSubmit={handleSubmit}>
          <div className="email-form-container">
            <fieldset className="resend-fieldset">
              <legend className="resend-legend">Recipient</legend>
              <div>
                <label htmlFor="family-member" className="survey">
                  <input
                    type="radio"
                    value="family-member"
                    id="family-member"
                    checked={recipientChecked === 'family-member'}
                    onChange={handleRecipientChange}
                    className="family-member radio"
                  />
                  Family Member
                </label>
              </div>
              <div>
                <label htmlFor="healthcare-provider" className="survey">
                  <input
                    type="radio"
                    value="healthcare-provider"
                    id="healthcare-provider"
                    checked={recipientChecked === 'healthcare-provider'}
                    onChange={handleRecipientChange}
                    className="healthcare-provider radio"
                  />
                  Healthcare Provider
                </label>
              </div>
            </fieldset>

            <fieldset className="resend-fieldset">
              <legend className="email-legend resend-legend">Email Type</legend>
              {props.status === 'Awaiting HIPAA' ||
              props.status === 'HIPAA Verified' ? (
                { emailTypeHipaa }
              ) : (
                <div>
                  { emailTypeHipaa }
                  <div>
                    <label htmlFor="survey" className="survey">
                      <input
                        type="radio"
                        value="survey"
                        id="survey"
                        checked={emailTypeChecked === 'survey'}
                        onChange={handleEmailTypeChange}
                        className="survey radio"
                      />
                      Survey
                    </label>
                  </div>
                </div>
              )}
            </fieldset>
          </div>
          <div className="email-modal-buttons">
            <button
              className="button-yes"
              type="submit"
              disabled={recipientChecked === '' || emailTypeChecked === ''}
            >
              Submit
            </button>
            <button className="button-no" onClick={props.toggleEmailModalState}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResendEmailModal;
