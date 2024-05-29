import axios from "axios";
export const baseURLOrigin = "https://zalo-web-app.online";
const baseURL = "https://zalo-web-app.online/v1";

export const typeHTTP = {
  POST: "post",
  PUT: "put",
  GET: "get",
  DELETE: "delete",
};

export const api = ({ method, url, body, sendToken }) =>
  new Promise((resolve, reject) => {
    const headers = {};

    if (sendToken) {
      const token = localStorage.getItem("accessToken");
      console.log("TokenAPI:", token);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        // Nếu không có token mà cần gửi, có thể xử lý ở đây
        // Ví dụ: reject(new Error("Token is missing"));
      }
    }
    switch (method) {
      case typeHTTP.POST:
        axios
          .post(`${baseURL}${url}`, body, { headers })
          .then((res) => resolve(res.data))
          .catch((error) => reject(error));
        break;

      case typeHTTP.PUT:
        axios
          .put(`${baseURL}${url}`, body, { headers })
          .then((res) => resolve(res.data))
          .catch((error) => reject(error));
        break;
      case typeHTTP.GET:
        axios
          .get(`${baseURL}${url}`, { headers })
          .then((res) => resolve(res.data))
          .catch((error) => reject(error));
        break;
      case typeHTTP.DELETE:
        axios
          .delete(`${baseURL}${url}`, { headers })
          .then((res) => resolve(res.data))
          .catch((error) => reject(error));
        break;
      default:
        reject(new Error("Invalid method"));
    }
  });
