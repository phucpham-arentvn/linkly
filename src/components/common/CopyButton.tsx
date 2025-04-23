import { FC, useState } from "react";
import toast from "react-hot-toast";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  label?: string;
  onCopySuccess?: () => void;
}

const CopyButton: FC<CopyButtonProps> = ({
  textToCopy,
  className = "btn btn-ghost btn-xs",
  label,
  onCopySuccess,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success("Copied to clipboard!");
      onCopySuccess?.();
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy text");
    }
  };

  return (
    <button className={className} onClick={handleCopy}>
      {isCopied ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-success"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          {label && <span className="ml-2">{label}</span>}
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg>
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};

export default CopyButton;
