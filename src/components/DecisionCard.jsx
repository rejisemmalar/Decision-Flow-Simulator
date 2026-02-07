import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/card.css";

function DecisionCard({ decision, onDelete }) {
  const navigate = useNavigate();

  //======================Render JSX======================//
  return (
    <div
      className="decision-card position-relative"
      onClick={() => navigate(`/decision/${decision.id}`)}
    >
      {/* Active Icons */}
      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-btn delete"
          title="Ddelete"
          onClick={() => onDelete(decision)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>

      <h5 className="fw-semibold">{decision.title}</h5>
      <p className="text-muted small mt-2">Click to explore flow →</p>
    </div>
  );
}

export default DecisionCard;
