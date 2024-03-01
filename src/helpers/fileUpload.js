export const fileUpload = async (file) => {
  if (!file) return null;

  const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL;

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
    return null;
  }
};
