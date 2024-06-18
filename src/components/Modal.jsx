import "../assets/modal.css";

const Modal = ({ children, isVisible, onClose }) => {
  // if (!isVisible) return null;

  return (
    <div
      className={`modal-overlay ${!isVisible && "hidden"}`}
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
