import "../styles/Modal.css";
function Modal({ show, onClose, onConfirm, message, taskId }) {
  if (!show) {
    return null;
  }
  const handleConfirm = () => {
    onConfirm(taskId);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={handleConfirm} className="button-si">
            Si, borrala
          </button>
          <button onClick={onClose} className="button-no">
            No, dejala
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
