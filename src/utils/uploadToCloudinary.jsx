import axios from "axios";

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Olx_clone"); // Get this from Cloudinary
  formData.append("cloud_name", "dw3u3jgxs"); // Your Cloudinary Cloud Name

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dw3u3jgxs/image/upload",
      formData
    );
    return response.data.secure_url; // Cloudinary URL
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

export default uploadImageToCloudinary;
