declare module "favicon-fetch" {
  interface FaviconResult {
    url: string;
  }

  function fetchFavicon(url: string): Promise<FaviconResult>;
  export default fetchFavicon;
}
