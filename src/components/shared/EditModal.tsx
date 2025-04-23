import { FC, useEffect, useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalUrl: string;
  originalStatus: string;
  onSubmit: (url: string, status: string) => void;
}

const EditModal: FC<EditModalProps> = ({
  isOpen,
  onClose,
  originalUrl,
  originalStatus,
  onSubmit,
}) => {
  const [url, setUrl] = useState(originalUrl);
  const [status, setStatus] = useState(originalStatus);

  useEffect(() => {
    setUrl(originalUrl);
    setStatus(originalStatus);
  }, [originalUrl, originalStatus]);

  if (!isOpen) return null;

  console.log("url", url);

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Link</h3>
        <div className="form-control gap-4">
          <div>
            <label className="label">
              <span className="label-text">URL</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter new URL"
            />
          </div>
          <div className="pt-1">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onSubmit(url, status);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
