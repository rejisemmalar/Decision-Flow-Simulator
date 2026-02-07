import { useState } from "react";
import DeleteConfirmation from "../modals/DeleteConfirmation";
import NodeDialog from "./NodeDialog";

function TreeNode({ node, onAdd, onEdit, onDelete }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  return (
    <div className="tree-node">
      <div className={`node-card ${node.type}`}>
        <span>{node.text}</span>

        <div className="node-actions">
          {/* Add */}
          <button className="icon-btn add" onClick={() => setShowAdd(true)}>
            <i className="bi bi-plus-circle"></i>
          </button>

          {/* edit */}
          <button className="icon-btn edit" onClick={() => setShowEdit(true)}>
            <i className="bi bi-pencil-square"></i>
          </button>

          {/* delete */}
          {node.id !== "root" && (
            <button
              className="icon-btn danger"
              onClick={() => setShowConfirm(true)}
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmations */}
      <DeleteConfirmation
        show={showConfirm}
        title={node.text}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          onDelete(node.id);
          setShowConfirm(false);
        }}
        variant="danger"
      />

      {/* Children */}
      {node.children.length > 0 && (
        <div className="node-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <NodeDialog
        show={showAdd}
        title={node.id === "root" ? "Add Choice" : "Add Result"}
        onClose={() => setShowAdd(false)}
        onSave={(text) => {
          onAdd(node.id, text);
          setShowAdd(false);
        }}
        variant="add"
      />

      {/* EDIT */}
      <NodeDialog
        show={showEdit}
        title="Edit"
        defaultValue={node.text}
        onClose={() => setShowEdit(false)}
        onSave={(text) => {
          onEdit(node.id, text);
          setShowEdit(false);
        }}
        variant="edit"
      />
    </div>
  );
}
export default TreeNode;
