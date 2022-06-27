import React from 'react';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import DCandidates from './components/DCandidates';
import SearchForm from './components/SearchForm';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import Header from './components/Header';

function App() {

  const [signin, setSignin] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(0)

  return (
    <Provider store={store}>
      <Header isLoggedIn={signin} setSignin={setSignin} />
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <h1>Blood - Donors</h1>
          <SearchForm {...({ openModal, setOpenModal, currentId, setCurrentId, isLoggedIn: signin })} />
          <DCandidates {...({ openModal, setOpenModal, currentId, setCurrentId, isLoggedIn: signin })} />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
