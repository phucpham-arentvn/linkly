declare module "get-website-favicon" {
  export interface FaviconIcon {
    src: string;
    sizes?: string;
    type?: string;
    width?: number;
    height?: number;
  }

  export interface FaviconData {
    icons: FaviconIcon[];
  }

  function getFavicon(url: string): Promise<FaviconData>;
  export default getFavicon;
}
