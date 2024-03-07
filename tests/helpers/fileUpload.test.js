import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dkgkw3suh',
  api_key: '283374765336418',
  api_secret: 'r08RgO6W9YXolhNXAxm4SRztdqI',
  secure: true,
});

describe('Pruebas en fileUpload.js', () => {
  test('debe de subir el archivo correctamente de Cloudinary', async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1576836165612-8bc9b07e7778?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZGV8ZW58MHx8MHx8fDA%3D';

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'image.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
    expect(url.includes('https://')).toBe(true);

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    await cloudinary.api.delete_resources(`journal/${imageId}`, {
      resource_type: 'image',
    });
  });

  test('debe de retornar null', async () => {
    const file = new File([], 'image.jpg');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
