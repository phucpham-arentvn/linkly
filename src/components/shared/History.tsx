"use client";

import { FC } from "react";
import clsx from "clsx";
import { useGetLinklyQuery } from "@/redux/services/linkly.api";
import { formatDistanceToNow } from "date-fns";
import CopyButton from "@/components/common/CopyButton";
import FaviconIcon from "@/components/common/FaviconIcon";
import { QRCodeSVG } from "qrcode.react";

interface HistoryProps {
  className?: string;
}

const History: FC<HistoryProps> = ({ className }) => {
  const { data: response, isLoading } = useGetLinklyQuery({});

  if (isLoading) {
    return (
      <div className={clsx("flex justify-center py-16", className)}>
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!response?.data?.length) {
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
        <h3 className="text-lg font-semibold text-primary mb-2">
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
    <div className={clsx("", className)}>
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
          {response.data.map((link) => {
            const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/l/${link.short_link}`;
            return (
              <tr key={link.id} className="hover">
                <td className="flex items-center gap-2">
                  <span>{shortUrl}</span>
                  <CopyButton
                    textToCopy={shortUrl}
                    className="btn btn-ghost btn-xs gap-2"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <FaviconIcon url={link.origin_link} size={20} />
                    <span className="truncate max-w-md">
                      {link.origin_link}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="relative w-8 h-8 cursor-pointer group">
                    <QRCodeSVG value={shortUrl} size={32} />
                    <div className="absolute hidden group-hover:block top-0 left-0 transform -translate-x-1/2 -translate-y-full bg-white p-4 rounded-lg shadow-lg z-10">
                      <QRCodeSVG value={shortUrl} size={200} />
                    </div>
                  </div>
                </td>
                <td>{link.clicks}</td>
                <td>
                  <div
                    className={clsx("badge gap-2", {
                      "badge-success": link.status === "active",
                      "badge-warning": link.status === "inactive",
                    })}
                  >
                    {link.status === "active" ? "Active" : "Inactive"}
                  </div>
                </td>
                <td>
                  {formatDistanceToNow(new Date(link.created_at), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default History;
