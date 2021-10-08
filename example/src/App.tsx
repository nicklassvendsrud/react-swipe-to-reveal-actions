import React from 'react';
import './App.css'
import SwipeToRevealActions from "../../SwipeToRevealActions";

function App() {
  const list = [];
  for (let i = 1; i <= 10; i++) {
    list.push({
      itemName: `Item #${i}`,
      index: i,
    });
  }

  const getActions = (index: number) => [
    {
      content: (
        <div className="action-button-content action-button-content--edit">
          <span>EDIT</span>
        </div>
      ),
      onClick: () => alert(`Pressed the EDIT button of item #${index}`),
    },
    {
      content: (
        <div className="action-button-content action-button-content--delete">
          <span>DELETE</span>
        </div>
      ),
      onClick: () => alert(`Pressed the DELETE button of item #${index}`),
    },
  ];

  const swipeContainerStyles = {
    backgroundColor: '#FFF',
    paddingLeft: '1rem'
  };

  return (
    <div className="example">
      <ul className="example-list">
        {list.map((item) => (
          <li className="example-list__item" key={item.index}>
            <SwipeToRevealActions
              actionButtons={getActions(item.index)}
              actionButtonMinWidth={70}
              containerStyle={swipeContainerStyles}
              hideDotsButton={item.index > 5}
              onOpen={() => console.log('Item opened')}
              onClose={() => console.log('Item closed')}
            >
              {item.itemName}
            </SwipeToRevealActions>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
