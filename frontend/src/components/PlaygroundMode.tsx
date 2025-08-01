import React, { useState } from "react";
import Piano from "./Piano";

const PlaygroundMode: React.FC = () => {
  const [showKeys, setShowKeys] = useState(false);

  const toggleKeys = () => {
    setShowKeys(!showKeys);
  };

  return (
    <div className="wrapper">
      <header className="header-row">
        <div className="header-column">
          <span className="header-text">Show Keys</span>
          <div className="keys-toggle">
            <label className="keys-toggle-label"></label>
            <div className="keys-checkbox">
              <input type="checkbox" checked={showKeys} onChange={toggleKeys} />
            </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="piano-container">
          <Piano showKeys={showKeys} />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundMode;
