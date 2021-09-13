import React from "react";
import { SearchBar } from "./components/SearchBar/SearchBar.jsx";
import { ImageGallery } from "./components/ImageGallery/ImageGallery.jsx";
import { Button } from "./components/Button/Button.jsx";
import s from "./App.module.css";

export class App extends React.Component {
  state = {
    image: null,
    page: 1,
    imageList: [],
  };

  handleSearchImages = (evt) => {
    evt.preventDefault();

    this.setState({
      image: evt.target.elements.inputSearch.value,
    });
  };

  handleOnLoadMore = (evt) => {
    evt.preventDefault();

    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
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

  render() {
    return (
      <div className={s.App}>
        <SearchBar onSearchImages={this.handleSearchImages} />
        <ImageGallery imageList={this.state.imageList} />
        <Button onLoadMore={this.handleOnLoadMore} />
      </div>
    );
  }
}
