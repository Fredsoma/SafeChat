import React from 'react';
import './MentalHealth.css';

export default function MentalHealth() {
  return (
    <div className="mh-container">
      <h2>Mental Health & Domestic Violence Resources</h2>
      <div className="mh-section">
        <h3>National Hotlines (USA)</h3>
        <ul>
          <li>
            <strong>National Suicide Prevention Lifeline</strong><br/>
            988<br/>
            <a href="https://988lifeline.org/" target="_blank" rel="noreferrer">Visit Website</a>
          </li>
          <li>
            <strong>National Domestic Violence Hotline</strong><br/>
            1−800−799−7233 (SAFE)<br/>
            <a href="https://www.thehotline.org/" target="_blank" rel="noreferrer">Visit Website</a>
          </li>
          <li>
            <strong>Crisis Text Line</strong><br/>
            Text HOME to 741741<br/>
            <a href="https://www.crisistextline.org/" target="_blank" rel="noreferrer">Visit Website</a>
          </li>
        </ul>
      </div>
      <div className="mh-section">
        <h3>Indiana/Local Resources</h3>
        <ul>
          <li>
            <strong>Indiana 211</strong><br/>
            211<br/>
            <a href="https://in211.communityos.org/" target="_blank" rel="noreferrer">Visit Website</a>
          </li>
          <li>
            <strong>Indiana Coalition Against Domestic Violence</strong><br/>
            (317) 917-3684<br/>
            <a href="https://www.icadvinc.org/" target="_blank" rel="noreferrer">Visit Website</a>
          </li>
          <li>
            <strong>Area Mental Health Helpline (Central Indiana)</strong><br/>
            (317) 251-7575<br/>
            <a href="https://www.nami.org/Local-NAMI?state=IN" target="_blank" rel="noreferrer">Local Affiliates</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
