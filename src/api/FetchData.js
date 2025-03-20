import axios from "./axios";

// -------------------------------
// GET REQUESTS
// -------------------------------

export const getData = async (url, options) => {
  try {
    let request_url = `/api/v1/data/${url}`;

    const response = await axios.get(request_url, { params: options });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSingleData = async (url, options, accessToken) => {
  try {
    let request_url = `/api/v1/data/${url}/single`;

    const response = await axios.get(request_url, {
      params: options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching single data:", error);
    throw error;
  }
};

export const getFileData = async (url, options, accessToken) => {
  try {
    const requestUrl = `/api/v1/data/${url}/file`;

    const response = await axios.get(requestUrl, {
      params: options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching file data:", error);
    throw error;
  }
};

export const fetchWithToken = async (url, accessToken, params = {}) => {
  try {
    let requestUrl = `/api/v1/fetch/${url}`;

    const response = await axios.get(requestUrl, {
      params: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// -------------------------------
// POST REQUESTS
// -------------------------------

export const postData = async (url, options) => {
  try {
    let request_url = `/api/v1/post/${url}`;

    const accessToken = localStorage.getItem("access_token");

    const response = await axios.post(
      request_url,
      { options },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return { status: "error" };
  }
};

export const authenticateAndPostData = async (url, options, accessToken) => {
  try {
    let request_url = `/api/v1/post/${url}/authenticate`;

    const response = await axios.post(
      request_url,
      options, // Directly send options object
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error authenticating and posting data:", error);
    throw error;
  }
};

// -------------------------------
// FILE UPLOAD REQUESTS
// -------------------------------

export const fileUpload = async (url, formData) => {
  try {
    let request_url = `/api/v1/upload/${url}`;

    const accessToken = localStorage.getItem("access_token");

    // Create a FormData object for multipart uploads
    const multipartFormData = new FormData();
    formData.document_data &&
      multipartFormData.append("file", formData.document_data);
    multipartFormData.append("document_name", formData.document_name);
    multipartFormData.append("document_type", formData.document_type);
    multipartFormData.append("document_sub_type", formData.document_sub_type);

    const response = await axios.post(request_url, multipartFormData, {
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

export const uploadFile = async (url, accessToken, data = {}) => {
  try {
    let requestUrl = `/api/v1/upload/${url}`;

    const response = await axios.put(requestUrl, data, {
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

// -------------------------------
// DELETE REQUESTS
// -------------------------------

export const deleteData = async (url, options, accessToken) => {
  try {
    let request_url = `/api/v1/delete/${url}`;

    const response = await axios.delete(request_url, {
      params: options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
