import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isLoginOuRefresh =
      originalRequest.url.includes("/v1/login") ||
      originalRequest.url.includes("/v1/refresh");

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginOuRefresh) {
      originalRequest._retry = true;

      try {
        const resposta = await axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/v1/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = resposta.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("jogadorId");
        localStorage.removeItem("jogadorNome");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;