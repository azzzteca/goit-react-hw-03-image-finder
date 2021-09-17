import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export function ImageGalleryItem({ image, onShowImageInModal }) {
  return (
    <img
      onClick={onShowImageInModal}
      id={image.id}
      src={image.webformatURL}
      lowsrc={image.largeImageURL}
      alt={image.tags}
      className={s.imageGalleryImage}
    />
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onShowImageInModal: PropTypes.func,
};
