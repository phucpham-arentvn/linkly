"use client";

import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useGetLinklyQuery } from "@/redux/services/linkly.api";
import { formatDistanceToNow } from "date-fns";
import CopyButton from "@/components/common/CopyButton";

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
          {response.data.map((link) => (
            <tr key={link.id} className="hover">
              <td className="flex items-center gap-2">
                <span>
                  {process.env.NEXT_PUBLIC_APP_URL}/api/l/${link.short_link}
                </span>
                <CopyButton
                  textToCopy={`${process.env.NEXT_PUBLIC_APP_URL}/api/l/${link.short_link}`}
                  className="btn btn-ghost btn-xs gap-2"
                />
              </td>
              <td>
                <div className="flex items-center gap-2">
                  {link.origin_link.includes("twitter.com") && (
                    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      />
                    </svg>
                  )}
                  {link.origin_link.includes("youtube.com") && (
                    <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z"
                      />
                    </svg>
                  )}
                  <span className="truncate max-w-md">{link.origin_link}</span>
                </div>
              </td>
              <td>
                {link.icon && (
                  <Image
                    src={link.icon}
                    alt="QR Code"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                )}
              </td>
              <td>{link.clicks}</td>
              <td>
                <div
                  className={clsx("badge gap-2", {
                    "badge-success": link.status === "active",
                    "badge-error": link.status === "inactive",
                  })}
                >
                  {link.status}
                </div>
              </td>
              <td>
                {formatDistanceToNow(new Date(link.created_at), {
                  addSuffix: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
