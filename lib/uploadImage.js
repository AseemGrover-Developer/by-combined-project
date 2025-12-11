export const uploadToImageKit = async (base64Image, folderName = "General") => {
  try {
    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: base64Image,
        fileName: `image_${Date.now()}.jpg`,
        folder: folderName,
      }),
    });

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("ImageKit upload failed:", error);
    throw new Error("Image upload failed");
  }
};
