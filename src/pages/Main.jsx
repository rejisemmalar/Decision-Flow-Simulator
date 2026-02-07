import { useEffect, useState } from "react";
import "../styles/main.css";
import "../styles/card.css";
import AddDecision from "../modals/AddDecision";
import DecisionCard from "../components/DecisionCard";
import DeleteConfirmation from "../modals/DeleteConfirmation";

function MainPage() {
  const [decisions, setDecisions] = useState([]);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showEditDecision, setShowEditDecision] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("decisions")) || [];
    setDecisions(stored);
  }, []);

  // Add or Update
  const saveDecision = (title) => {
    let updated;

    if (showEditDecision) {
      updated = decisions.map((d) =>
        d.id === showEditDecision.id ? { ...d, title } : d,
      );
    } else {
      updated = [
        ...decisions,
        {
          id: Date.now().toString(),
          title,
          root: {
            id: "root",
            type: "decision",
            text: title,
            children: [],
          },
        },
      ];
    }

    setDecisions(updated);
    localStorage.setItem("decisions", JSON.stringify(updated));

    setShowAddEdit(false);
    setShowEditDecision(null);
  };

  // Delete
  const deleteConfirmation = () => {
    const updated = decisions.filter((d) => d.id !== deleteTarget.id);
    setDecisions(updated);
    localStorage.setItem("decisions", JSON.stringify(updated));

    setShowDelete(false);
    setDeleteTarget(null);
  };

  // =========================Render JSX=============================//
  return (
    <div className="container py-4 main-container">
      <div className="d-flex justify-content-between mb-4">
        {/* Title */}
        <h2 className="fw-bold app-title gradient-title">
          <span className="title-decision">Decision</span>{" "}
          <span className="title-flow">Flow</span>{" "}
          <span className="title-simulator">Simulator</span>
        </h2>

        {/* add Decicion btn */}
        <button
          className="btn glass-3d-btn"
          onClick={() => {
            setShowEditDecision(null);
            setShowAddEdit(true);
          }}
        >
          <i className="bi bi-plus-circle me-2"></i> Decision
        </button>
      </div>

      <div className="row">
        {decisions.map((decision) => (
          <div className="col-md-4 mb-4" key={decision.id}>
            {/* visibile decison card */}
            <DecisionCard
              decision={decision}
              onEdit={(d) => {
                setShowEditDecision(d);
                setShowAddEdit(true);
              }}
              onDelete={(d) => {
                setDeleteTarget(d);
                setShowDelete(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* ====================Add Decision or Edit Decision================= */}
      <AddDecision
        show={showAddEdit}
        defaultValue={showEditDecision?.title}
        onClose={() => {
          setShowAddEdit(false);
          setShowEditDecision(null);
        }}
        onSave={saveDecision}
      />

      {/* ===================Delete Confirmations==================== */}
      <DeleteConfirmation
        show={showDelete}
        title={deleteTarget?.title}
        onCancel={() => setShowDelete(false)}
        onConfirm={deleteConfirmation}
      />
    </div>
  );
}

export default MainPage;
