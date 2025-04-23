import { FC } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkId: string;
  onConfirm: (id: string) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  linkId,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Delete Link</h3>
        <p>
          Are you sure you want to delete this link? This action cannot be
          undone.
        </p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={() => {
              onConfirm(linkId);
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
