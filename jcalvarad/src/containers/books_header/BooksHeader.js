import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import axios from "axios";
import BooksHeader from "../../components/books_header/BooksHeader";

@inject("BooksStore")
@observer
class BooksHeaderContainer extends Component {
  constructor(props) {
    super(props);

    axios
      .get("https://api.bitso.com/v3/available_books/")
      .then(function(response) {
        props.BooksStore.setAvailableBooks(response.data.payload);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { BooksStore } = this.props;
    const { setBook, booksList, bookInfo } = BooksStore;

    return <BooksHeader {...toJS(BooksStore)} setBook={toJS(setBook)} booksList={toJS(booksList)} bookInfo={toJS(bookInfo)} />;
  }
}

export default BooksHeaderContainer;
