import React from 'react';
import styled from 'styled-components';
import trashImage from '../../image/trash.svg';
import { totalPriceItems } from '../Functions/secondaryFunctions';
import { formatCurrency } from '../Functions/secondaryFunctions';

const TrashButton = styled.button`
  width: 24px;
  height: 24px;
  border-color: transparent;
  background-color: transparent;
  background-image: url(${trashImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const OrderItemStyled = styled.li`
  display: flex;
  margin: 15px 0;
  flex-wrapr: wrpa;
`;

const ItemName = styled.span`
  flex-grow: 1;
`;

const ItemPrice = styled.span`
  margin-left: 20px;
  margin-right: 10px;
  min-width: 65px;
  text-align: right;
`;

const Topping = styled.div`
  color: #9A9A9A;
  font-size: 14px;
  width: 100%;
`;

const OrderListItem = ({ order }) => {

  const toppings = order.topping.filter(item => item.checked === true);

  return (
    <>
      <OrderItemStyled>
        <ItemName>{order.name}</ItemName>
        <span>{order.count}</span>
        <ItemPrice>{formatCurrency(totalPriceItems(order))}</ItemPrice>
        <TrashButton/>
      </OrderItemStyled>
      {toppings.length !== 0 && toppings.map((item, i) => <Topping key={i}>{item.name}</Topping>)}
    </>
  );
};

export default OrderListItem;