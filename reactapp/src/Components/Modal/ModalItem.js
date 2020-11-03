import React from 'react';
import styled from 'styled-components';
import Button from '../Style/Button';
import CountItem from './CountItem';
import { useCount } from '../Hooks/UseCount';
import { totalPriceItems } from '../Functions/secondaryFunctions';
import { formatCurrency } from '../Functions/secondaryFunctions';



const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 20;
`;

const Modal = styled.div`
  background-color: #fff;
  width: 600px;
  height: 600px;
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${({img}) => img});
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
`;

const Price = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 50px 0 37px;
  font-size: 30px;
  font-family: Pacifico;
  font-style: normal;
  font-weight: normal;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 43px;
  flex: 1 0 auto;
  height: calc(100% - 200px);
`;

const TotalPriceItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 50px 0 37px;
`;


const ModalItem = ({ openItem, setOpenItem, orders, setOrders }) => {

  const counter = useCount();

  const closeModal = e => {
    if(e.target.id === 'overlay') {
      setOpenItem(null);
    }
  }

  const order = {
    ...openItem,
    count: counter.count
  };

    const addToOrder = () => {
    setOrders([...orders, order])
    setOpenItem(null); 
  }

   return (
     <Overlay id="overlay" onClick={closeModal}>
      <Modal>
        <Banner img={openItem.img}/>
        <Content>
          <Price>
              <span>{openItem.name}</span>
              <span>{formatCurrency(openItem.price)}</span>
          </Price>
          <CountItem {...counter}/>
          <TotalPriceItem>
            <span>Цена:</span>
            <span>{formatCurrency(totalPriceItems(order))}</span>
          </TotalPriceItem>
          <Button onClick={addToOrder}>Добавить</Button>
        </Content>
      </Modal>
   </Overlay>
   )
}

export default ModalItem;