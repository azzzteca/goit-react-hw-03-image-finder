import React from "react";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import { ImageGallery } from "../ImageGallery/ImageGallery.jsx";
import { Button } from "../Button/Button.jsx";
import { Modal } from "../Modal/Modal.jsx";
import s from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";

export class App extends React.Component {
  state = {
    image: null,
    page: 1,
    imageList: [],
    modalIsShown: false,
    hiSrcImageUrl: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.image !== this.state.image ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        loading: true,
      });

      fetch(
        `https://pixabay.com/api/?key=22659093-928fc585fa86297f1703a77f0&q=${this.state.image}&orientation=horizontal&page=${this.state.page}&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) =>
          this.setState((prevState) => {
            return {
              imageList: [...prevState.imageList, ...data.hits],
            };
          })
        )
        .catch((error) => console.log(error))
        .finally(
          this.setState({
            loading: false,
          })
        );
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
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
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
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

        {this.state.loading && (
          <div className={s.Loader}>
            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
          </div>
        )}

        {this.state.modalIsShown && (
          <Modal
            url={this.state.hiSrcImageUrl}
            closeModal={this.onHandleCloseModal}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
