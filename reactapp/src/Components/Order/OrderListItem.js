import React, { useContext } from 'react';
import styled from 'styled-components';
import trashImage from '../../image/trash.svg';
import { totalPriceItems } from '../Functions/secondaryFunctions';
import { formatCurrency } from '../Functions/secondaryFunctions';
import { Context } from '../Functions/context';


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
  cursor: pointer;
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
  cursor: pointer;
  margin-right: 5px;
`;

const OrderListItem = ({ order, index, deleteItem }) => {

  const { openItem: { setOpenItem } } = useContext(Context);

  const toppings = order.topping.filter(item => item.checked === true);

  const refDeleteButton = React.useRef(null);

  return (
    <>
      <OrderItemStyled onClick={(e) => e.target !== refDeleteButton.current && setOpenItem({...order, index})}>
        <ItemName>{order.name} {order.choice}</ItemName>
        <span>{order.count}</span>
        <ItemPrice>{formatCurrency(totalPriceItems(order))}</ItemPrice>
        <TrashButton ref={refDeleteButton} onClick={() => deleteItem(index)}/>
      </OrderItemStyled>
      {toppings.length !== 0 && toppings.map((item, i) => <Topping key={i}>{item.name}</Topping>)}
    </>
  );
};

export default OrderListItem;