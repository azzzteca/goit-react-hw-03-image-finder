import PropTypes from "prop-types";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

export function ImageGallery({ imageList, onShowImageInModal }) {
  return (
    <ul className={s.imageGallery}>
      {imageList.map((image, idx) => (
        <li key={idx} className={s.imageGalleryItem}>
          <ImageGalleryItem
            image={image}
            onShowImageInModal={onShowImageInModal}
          />
        </li>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  imageList: PropTypes.array,
  onShowImageInModal: PropTypes.func,
};
