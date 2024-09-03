import jwt_decode from "jwt-decode";

const decode = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken; // return the decoded token
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("Token not found in localStorage");
  }

  return null;
};

export default decode;
