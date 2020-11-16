import React, { useContext } from 'react';
import styled from 'styled-components';
import { Overlay } from '../Modal/ModalItem';
import { OrderTitle, Total, TotalPrice } from './Order';
import Button from '../Style/Button';
import { projection } from '../Functions/secondaryFunctions';
import { totalPriceItems } from '../Functions/secondaryFunctions';
import { formatCurrency } from '../Functions/secondaryFunctions';
import { Context } from '../Functions/context';

const Modal = styled.div`
  background-color: white;
  width: 600px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`;

const rulesData = {
  name: ['name'],
  price: ['price'],
  count: ['count'],
  topping: ['topping', arr => arr.filter(obj => obj.checked).map(obj => obj.name),
      arr => arr.length ? arr : 'no topping'],
  choice: ['choice', item => item ? item : 'no choices']
}

const sendOrder = (dataBase, orders, authentification) => {
    const newOrder = orders.map(projection(rulesData));
    dataBase.ref('orders').push().set({
      nameClient: authentification.displayName,
      email: authentification.email,
      order: newOrder
    });
  }

export const OrderConfirm = () => {

  const {
    orders: { orders, setOrders },
    auth: { authentification },
    orderConfirm: { setOpenOrderConfirm },
    firebaseDatabase
  } = useContext(Context);

  const dataBase = firebaseDatabase();
  const total = orders.reduce((result, order) => totalPriceItems(order) + result, 0);

  return (
    <Overlay>
      <Modal>
        <OrderTitle>{authentification.displayName}</OrderTitle>
        <Text>Осталось только подтвердить ваш заказ</Text>
        <Total>
          <span>Итого:</span>
          <TotalPrice>{formatCurrency(total)}</TotalPrice>
        </Total>
        <Button onClick={() => {
          sendOrder(dataBase, orders, authentification);
          setOrders([]);
          setOpenOrderConfirm(false);
        }}>Подтвердить</Button>
      </Modal>
    </Overlay>
  )
};