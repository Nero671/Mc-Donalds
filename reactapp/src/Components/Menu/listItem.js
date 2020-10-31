import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';


const List = styled.ul`
  display: flex;
  justy fy-content: space-around;
  flex-wrap: wrap;
`;

const Item = styled.li`
  width: 400px;
  height: 155px;
  background-image: ${(props) => `url(${props.img})`};
  background-position: center;
  background-size: cover;
  margin-top: 30px;
  margin-right: 30px;
  padding: 15px;
  color: white;
  font-size: 30px;
  z-index: 1;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    background-color: black;
    opacity: 30%;
    z-index: -1;
  }
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 50px 30px rgba(0,0,0,1);
    &:after {
      opacity: 0;
    }
  }
`;

const ListItem = ({ itemList, setOpenItem }) => (
  <List>
    {itemList.map(item => (
      <Item 
        key={item.id} 
        img={item.img}
        onClick={() => setOpenItem(item)}
      >
        <p>{item.name}</p>
        <p>{item.price.toLocaleString('ru-RU',
        {style: 'currency', currency: 'RUB'}
        )}</p>
      </Item>
    ))}
  </List>
);

export default ListItem;