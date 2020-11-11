import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import GlobalStyle from './Components/Style/GlobalStyle'
import NavBar from './Components/NavBar/NavBar';
import Menu from './Components/Menu/Menu';
import ModalItem from './Components/Modal/ModalItem';
import Order from './Components/Order/Order';
import { useOpenItem } from './Components/Hooks/UseOpenItem';
import { useOrders } from './Components/Hooks/UseOrders';
import { useAuth } from './Components/Hooks/UseAuth';
import { useTitle } from './Components/Hooks/UseTitle';

const firebaseConfig = {
  apiKey: "AIzaSyACq0InaRtvLfBrRaUleLwd4-Gp-ZVUj3c",
  authDomain: "mrdonalds-bf0ab.firebaseapp.com",
  databaseURL: "https://mrdonalds-bf0ab.firebaseio.com",
  projectId: "mrdonalds-bf0ab",
  storageBucket: "mrdonalds-bf0ab.appspot.com",
  messagingSenderId: "264105233741",
  appId: "1:264105233741:web:826170952aec933fbffb04"
};

firebase.initializeApp(firebaseConfig);


function App() {

  const auth = useAuth(firebase.auth);
  const openItem = useOpenItem();
  const orders = useOrders();
  useTitle(openItem.openItem);

  return (
    <>
      <GlobalStyle/>
      <NavBar {...auth} />
      <Order 
        {...orders} 
        {...openItem} 
        {...auth}
        firebaseDatabase={firebase.database} 
      />
      <Menu {...openItem} />
      { openItem.openItem && <ModalItem {...openItem} {...orders} /> }
    </>
  );
}

export default App;
