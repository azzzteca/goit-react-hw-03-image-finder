import s from "./ImageGallery.module.css";

export function ImageGallery({ imageList }) {
  console.log(imageList);
  return (
    <div className={s.imageGallery}>
      {imageList.map((image) => (
        <div key={image.id} className={s.imageGalleryItem}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={s.imageGalleryImage}
          />
        </div>
      ))}
    </div>
  );
}
