import api from "@/api/instance/axiosInstance";
import { useState, useEffect, useRef } from "react";

export const useAuthImages = (paths: string[] | undefined) => {
  const [blobUrls, setBlobUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const allCreatedUrls = useRef<string[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const cleanup = () => {
      allCreatedUrls.current.forEach((url) => URL.revokeObjectURL(url));
      allCreatedUrls.current = [];
    };

    if (!paths || paths.length === 0) {
      setBlobUrls([]);
      cleanup();

      return;
    }

    const fetchImages = async () => {
      setLoading(true);

      try {
        const promises = paths.map(async (path) => {
          const response = await api.get(path, { responseType: "blob" });

          return URL.createObjectURL(response.data);
        });

        const urls = await Promise.all(promises);

        if (isCancelled) {
          urls.forEach((url) => URL.revokeObjectURL(url));

          return;
        }

        allCreatedUrls.current = urls;
        setBlobUrls(urls);
      } catch (error) {
        if (!isCancelled) console.error(error);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchImages();

    return () => {
      isCancelled = true;
      cleanup();
    };
  }, [JSON.stringify(paths)]);

  return { blobUrls, loading };
};
