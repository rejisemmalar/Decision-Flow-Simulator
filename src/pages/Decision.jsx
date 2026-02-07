import { useState } from "react";
import TreeNode from "../components/TreeNode";
import { addNode, deleteNode, updateNode } from "../utils/TreeUtils";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/tree.css";

function DecisionPage() {
  const { id } = useParams();
  const decisions = JSON.parse(localStorage.getItem("decisions")) || [];
  const index = decisions.findIndex((d) => d.id === id);
  const decision = decisions[index];

  //   navigate
  const navigate = useNavigate();

  const initialRoot = decision.root || {
    id: "root",
    type: "decision",
    text: decision.title,
    children: [],
  };

  const [root, setRoot] = useState(initialRoot);

  const save = (updatedRoot) => {
    setRoot(updatedRoot);
    decisions[index].root = updatedRoot;
    localStorage.setItem("decisions", JSON.stringify(decisions));
  };

  const handleAdd = (parentId, text) => {
    const newNode = {
      id: Date.now().toString(),
      type: parentId === "root" ? "choice" : "result",
      text,
      children: [],
    };
    save(addNode(root, parentId, newNode));
  };

  const handleEdit = (nodeId, text) => {
    save(updateNode(root, nodeId, text));
  };

  const handleDelete = (nodeId) => {
    save(deleteNode(root, nodeId));
  };

  return (
    <div className="container py-4 flow-container">
      <div className="d-flex align-items-center gap-3 mb-3">
        <button className="back-btn-glass" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left"></i> 
        </button>

      </div>

      {/* <h3 className="fw-bold mb-4">{decision.title}</h3> */}
      <div className="d-flex justify-content-center">
        <div className="tree-canvas">
          <TreeNode
            node={root}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default DecisionPage;
