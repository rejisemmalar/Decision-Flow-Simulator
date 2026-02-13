import "../styles/card.css";

function DeleteConfirmation({ show, title, onCancel, onConfirm, variant }) {
  if (!show) return null;

  return (
    <div className="dialog-overlay">
      <div className={`dialog-card ${variant === "danger" ? "danger-glass" : ""}`} style={{color:"white"}}>
        <h5 className="dialog-title text-danger">Delete Decision</h5>

        <p className="text-muted" >
          Are you sure you want to delete <b>{title}</b>?
        </p>

        <div className="dialog-actions">
          <button className="dialog-btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`dialog-btn danger ${variant === "danger" ? "danger-glass-btn" : ""}`}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
