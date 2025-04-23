import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

interface HistoryProps {
  className?: string;
}

// Sample data
const History: FC<HistoryProps> = ({ className }) => {
  const links: any[] = [];

  if (!links?.length) {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center py-16 px-4",
          className
        )}
      >
        <div className="w-24 h-24 mb-6 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No links yet
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          Create your first shortened link by pasting a URL in the input field
          above
        </p>
      </div>
    );
  }

  return (
    <div className={clsx("overflow-x-auto", className)}>
      <table className="table">
        {/* Table head */}
        <thead>
          <tr className="bg-base-200">
            <th>Short Link</th>
            <th>Original Link</th>
            <th>QR Code</th>
            <th>Clicks</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {links.map((link, index) => (
            <tr key={index} className="hover">
              <td className="flex items-center gap-2">
                <span>{link.shortLink}</span>
                <button className="btn btn-ghost btn-xs">
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
                </button>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  {link.originalLink.includes("twitter.com") && (
                    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      />
                    </svg>
                  )}
                  {link.originalLink.includes("youtube.com") && (
                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z"
                      />
                    </svg>
                  )}
                  <span className="truncate max-w-md">{link.originalLink}</span>
                </div>
              </td>
              <td>
                <Image
                  src={link.qrCode}
                  alt="QR Code"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </td>
              <td>{link.clicks}</td>
              <td>
                <div
                  className={`badge ${
                    link.status === "Active" ? "badge-success" : "badge-error"
                  } gap-2`}
                >
                  {link.status}
                </div>
              </td>
              <td>{link.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
