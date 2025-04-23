import { FC, useState } from "react";
import Image from "next/image";

interface FaviconIconProps {
  url: string;
  size?: number;
  className?: string;
  alt?: string;
}

const FaviconIcon: FC<FaviconIconProps> = ({
  url,
  size = 16,
  className = "",
  alt = "Website Favicon",
}) => {
  const [error, setError] = useState(false);

  // Extract hostname from URL
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  // Get favicon URL from Google's favicon service
  const getFaviconUrl = (url: string) => {
    const hostname = getHostname(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`;
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={error ? "/next.svg" : getFaviconUrl(url)}
        alt={alt}
        width={size}
        height={size}
        className="rounded-none"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default FaviconIcon;
