import React , { useContext } from 'react';
import styled from 'styled-components';
import Button from '../Style/Button';
import CountItem from './CountItem';
import { useCount } from '../Hooks/UseCount';
import { totalPriceItems } from '../Functions/secondaryFunctions';
import { formatCurrency } from '../Functions/secondaryFunctions';
import Toppings from './Toppings';
import Choices from './Choices';
import { useToppings } from '../Hooks/UseTopping';
import { useChoices } from '../Hooks/UseChoices';
import { Context } from '../Functions/context';



export const Overlay = styled.div`
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


const ModalItem = () => {

  const { 
      orders: { orders, setOrders },
      openItem: { openItem, setOpenItem }
  } = useContext(Context);

  const counter = useCount(openItem.count);
  const toppings = useToppings(openItem);
  const choices = useChoices(openItem);
  const isEdit = openItem.index > -1;

  const closeModal = e => {
    if(e.target.id === 'overlay') {
      setOpenItem(null);
    }
  }

  const order = {
    ...openItem,
    count: counter.count,
    topping: toppings.toppings,
    choice: choices.choice,
  };

  const editOrder = () => {
    const newOrder = [...orders]
    newOrder[openItem.index] = order;
    setOrders(newOrder);
    setOpenItem(null); 
  }


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
          {openItem.toppings && <Toppings {...toppings}/>}
          {openItem.choices && <Choices {...choices} openItem={openItem}/>}
          <TotalPriceItem>
            <span>Цена:</span>
            <span>{formatCurrency(totalPriceItems(order))}</span>
          </TotalPriceItem>
          <Button onClick={isEdit ? editOrder : addToOrder} disabled={order.choices && !order.choice}>
            {isEdit ? 'Редактировать' : 'Добавить'}
          </Button>
        </Content>
      </Modal>
   </Overlay>
   )
}

export default ModalItem;