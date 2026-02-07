import React, { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

function AddDecision({ show, onClose, onSave, defaultValue = "" }) {
  const modalRef = useRef(null);
  const bsModal = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    bsModal.current = new Modal(modalRef.current);

    modalRef.current.addEventListener("hidden.bs.modal", onClose);
  }, []);

  useEffect(() => {
    if (!bsModal.current) return;

    show ? bsModal.current.show() : bsModal.current.hide();

    if (show && inputRef.current) {
      inputRef.current.value = defaultValue || "";
      inputRef.current.focus();
    }
  }, [show, defaultValue]);

  const handleSave = () => {
    const value = inputRef.current.value.trim();
    if (!value) return;

    onSave(value);
    bsModal.current.hide();
  };

  //   =============================Render JSX==============================//
  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow modal-3d">
          {/* Add Decision Modal */}
          <div className="modal-header">
            <h5 className="modal-title">
              {defaultValue ? "Edit Decision" : "New Decision"}
            </h5>
            <button
              className="btn-close"
              onClick={() => bsModal.current.hide()}
            />
          </div>

          <div className="modal-body">
            <input ref={inputRef} className="form-control form-control-lg" />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => bsModal.current.hide()}
            >
              Cancel
            </button>

            <button className="btn btn-dark" onClick={handleSave}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddDecision;
