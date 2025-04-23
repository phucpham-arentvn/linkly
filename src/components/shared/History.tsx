"use client";

import { FC, useState } from "react";
import clsx from "clsx";
import {
  useGetLinklyQuery,
  useUpdateLinklyMutation,
  useDeleteLinklyMutation,
} from "@/redux/services/linkly.api";
import { formatDistanceToNow } from "date-fns";
import CopyButton from "@/components/common/CopyButton";
import FaviconIcon from "@/components/common/FaviconIcon";
import { QRCodeSVG } from "qrcode.react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

interface HistoryProps {
  className?: string;
}

const History: FC<HistoryProps> = ({ className }) => {
  const { data: session } = useSession();
  const { data: response, isLoading } = useGetLinklyQuery({});
  const [updateLinkly] = useUpdateLinklyMutation();
  const [deleteLinkly] = useDeleteLinklyMutation();
  const [editingLink, setEditingLink] = useState<{
    shortCode: string;
    url: string;
    status: string;
  } | null>(null);
  const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null);

  const handleUpdate = async (
    shortCode: string,
    newUrl: string,
    newStatus: string
  ) => {
    try {
      await updateLinkly({
        shortCode,
        url: newUrl,
        status: newStatus,
      }).unwrap();
      toast.success("Link updated successfully");
    } catch {
      // Silent error handling
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLinkly(id).unwrap();
      toast.success("Link deleted successfully");
    } catch {
      // Silent error handling
    }
  };

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
            {session && <th>Action</th>}
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
                {session && (
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setEditingLink({
                            shortCode: link.short_link,
                            url: link.origin_link,
                            status: link.status,
                          })
                        }
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeletingLinkId(link.id)}
                        className="btn btn-ghost btn-sm btn-circle text-error"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      <EditModal
        isOpen={!!editingLink}
        onClose={() => setEditingLink(null)}
        originalUrl={editingLink?.url || ""}
        originalStatus={editingLink?.status || "active"}
        onSubmit={(newUrl, newStatus) => {
          if (editingLink) {
            handleUpdate(editingLink.shortCode, newUrl, newStatus);
          }
        }}
      />

      <DeleteModal
        isOpen={!!deletingLinkId}
        onClose={() => setDeletingLinkId(null)}
        linkId={deletingLinkId || ""}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default History;
