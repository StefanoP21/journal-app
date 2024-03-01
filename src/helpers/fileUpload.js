export const fileUpload = async (file) => {
  if (!file) throw new Error('No file selected');

  const cloudUrl = import.meta.env.VITE_VERCEL_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('Error uploading file');

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading file');
  }
};
