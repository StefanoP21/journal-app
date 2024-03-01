import { InfoRounded } from '@mui/icons-material';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
} from '@mui/material';

export const ImageGallery = ({ images }) => {
  return (
    <ImageList sx={{ width: '100%', height: 400 }} cols={3} rowHeight={200}>
      {images.map((image, index) => (
        <ImageListItem key={index}>
          <img
            srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=248&fit=crop&auto=format`}
            alt="Imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
