import React from "react";
import Loader from "react-loader-spinner";
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import { ImageGallery } from "../ImageGallery/ImageGallery.jsx";
import { Button } from "../Button/Button.jsx";
import { Modal } from "../Modal/Modal.jsx";
import s from "./App.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export class App extends React.Component {
  state = {
    image: null,
    page: 1,
    imageList: [],
    modalIsShown: false,
    hiSrcImageUrl: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.image !== this.state.image ||
      prevState.page !== this.state.page
    ) {
      fetch(
        `https://pixabay.com/api/?key=22659093-928fc585fa86297f1703a77f0&q=${this.state.image}&orientation=horizontal&page=${this.state.page}&per_page=12`
      )
        .then((r) => r.json())
        .then((data) =>
          this.setState((prevState) => {
            return {
              imageList: [...prevState.imageList, ...data.hits],
            };
          })
        )
        .catch((error) => console.log(error));
    }
  }

  handleSearchImages = (evt) => {
    evt.preventDefault();

    this.setState({
      image: evt.target.elements.inputSearch.value,
      imageList: [],
      page: 1,
    });
  };

  handleOnLoadMore = (evt) => {
    evt.preventDefault();

    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onHandleShowImageInModal = (evt) => {
    evt.preventDefault();
    this.setState({
      hiSrcImageUrl: evt.target.lowsrc,
      modalIsShown: true,
    });
  };

  onHandleCloseModal = () => {
    this.setState({
      modalIsShown: false,
    });
  };

  render() {
    return (
      <div className={s.App}>
        <SearchBar onSearchImages={this.handleSearchImages} />
        <ImageGallery
          imageList={this.state.imageList}
          onShowImageInModal={this.onHandleShowImageInModal}
        />

        {this.state.imageList.length !== 0 && (
          <Button onLoadMore={this.handleOnLoadMore} />
        )}

        <Loader
          // visible="false"
          type="ThreeDots"
          color="#00BFFF"
          height={50}
          width={50}
          // timeout={5000}
        />

        {this.state.modalIsShown && (
          <Modal
            url={this.state.hiSrcImageUrl}
            closeModal={this.onHandleCloseModal}
          />
        )}
      </div>
    );
  }
}
