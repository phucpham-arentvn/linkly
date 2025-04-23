"use client";

import { Link2, Loader2 } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface LinkInputProps {
  className?: string;
}

export default function LinkInput({ className }: LinkInputProps) {
  const [url, setUrl] = useState("");
  const [autoClipboard, setAutoClipboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handlePasteFromClipboard = () => {
    if (!autoClipboard) return;
    navigator.clipboard.readText().then((text) => {
      setUrl(text);
    });
  };
  const remainingLinks = 5;

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-6 w-full max-w-3xl mx-auto",
        className
      )}
    >
      <div className="join w-full bg-base-200 rounded-full shadow-lg overflow-hidden border-neutral-content border-2 p-3">
        <div className="flex-1 join-item flex items-center gap-2 px-6">
          <Link2 className="w-5 h-5 text-base-content/60" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onPaste={() => handlePasteFromClipboard()}
            placeholder="Enter the link here"
            className="flex-1 bg-transparent border-none focus:outline-none text-base-content/80 placeholder:text-base-content/40"
          />
        </div>
        <button
          onClick={handleShorten}
          disabled={!url.trim() || isLoading}
          className="join-item btn btn-primary px-8 rounded-full"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Shorten Now!"
          )}
        </button>
      </div>

      {/* Options */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={autoClipboard}
            onChange={(e) => setAutoClipboard(e.target.checked)}
            className="toggle toggle-primary toggle-sm"
          />
          <span className="text-sm text-base-content/60">
            Auto Paste from Clipboard
          </span>
        </div>

        {/* Remaining Links Info */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60">You can create </span>
          <span className="text-error font-bold">
            {String(remainingLinks).padStart(2, "0")}
          </span>
          <span className="text-base-content/60">
            more links.{" "}
            <a href="#" className="link link-primary">
              Register Now
            </a>{" "}
            to enjoy Unlimited usage
          </span>
          <div
            className="tooltip tooltip-top"
            data-tip="Free users are limited to 5 links per day"
          >
            <button className="btn btn-circle btn-ghost btn-xs">?</button>
          </div>
        </div>
      </div>
    </div>
  );
}
