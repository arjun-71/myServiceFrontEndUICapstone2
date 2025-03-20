import axios from "./axios"; // axios.js already has "/api/v1"

export const getCategories = async () => {
  try {
    const response = await axios.get("/categories"); // ✅ FIXED
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getSubCategories = async (parentId) => {
  try {
    const response = await axios.get(`/subcategories/${parentId}`); // ✅ FIXED
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get("/services"); // ✅ FIXED
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getSingleService = async (serviceId) => {
  try {
    const response = await axios.get(`/services/${serviceId}`); // ✅ FIXED
    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

export const addService = async (serviceData) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post("/services", serviceData, { // ✅ FIXED
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.put(`/services/${serviceId}`, serviceData, { // ✅ FIXED
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (serviceId) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.delete(`/services/${serviceId}`, { // ✅ FIXED
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`/upload`, formData, { // ✅ FIXED
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const getAuthStatus = async (accessToken) => {
  try {
    const response = await axios.get("/auth/me", { // ✅ FIXED
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};
