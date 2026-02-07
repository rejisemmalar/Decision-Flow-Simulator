import { useEffect, useState } from "react";

const NodeDialog = ({ show, title, defaultValue = "", onClose, onSave, variant = "add" }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue, show]);

  if (!show) return null;

  return (
    <div className="dialog-overlay">
      <div className={`dialog-card glass ${variant}`}>
        <div className="dialog-title">{title}</div>

        <input
          className="dialog-input"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />

        <div className="dialog-actions center">
          <button className="dialog-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`dialog-btn primary ${variant}`}
            onClick={() => text.trim() && onSave(text)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeDialog;
