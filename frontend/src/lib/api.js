import axios from "axios";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});


const buildParams = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });
  return params;
};


export const fetchPublicInfo = async () => {
  const response = await apiClient.get("/public-info");
  return response.data;
};


export const fetchDataset = async ({ apiKey, category, filters = {} }) => {
  const params = buildParams({ category, ...filters });
  const response = await apiClient.get(`/datos?${params.toString()}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });
  return response.data;
};


export const triggerManualRefresh = async ({ apiKey, adminEmail, adminPassword }) => {
  const response = await apiClient.post(
    "/funcion",
    {
      action: "refresh",
      api_key: apiKey,
      admin_email: adminEmail,
      admin_password: adminPassword,
    },
    {
      headers: {
        "x-api-key": apiKey,
      },
    },
  );
  return response.data;
};


export const BACKEND_DOCS_URL = `${BACKEND_URL}/docs`;