import { useState, useCallback } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, body = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await API({ method, url, data: body, ...config });
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    get: (url, config) => request("get", url, null, config),
    post: (url, body, config) => request("post", url, body, config),
    patch: (url, body, config) => request("patch", url, body, config),
    put: (url, body, config) => request("put", url, body, config),
    del: (url, config) => request("delete", url, null, config),
  };
}
