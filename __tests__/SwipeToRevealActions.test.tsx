import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SwipeToRevealActions from '../SwipeToRevealActions';

const getActions = (index: number) => [
  {
    content: (
      <div>
        <span>EDIT</span>
      </div>
    ),
    onClick: () => alert(`Pressed the EDIT button of item #${index}`),
  },
  {
    content: (
      <div>
        <span>DELETE</span>
      </div>
    ),
    onClick: () => alert(`Pressed the DELETE button of item #${index}`),
  },
];

test("renders Item #1 item text", () => {
  const { getByText } = render(
    <SwipeToRevealActions
      actionButtons={getActions(1)}
      actionButtonMinWidth={70}
    >
      Item #1
    </SwipeToRevealActions>
  );
  const item = getByText(/Item #1/i);
  expect(item).toBeInTheDocument();
});


test("onOpen callback is called on dots button click", () => {
  const onClick = jest.fn();
  const { getByLabelText } = render(
    <SwipeToRevealActions
      actionButtons={getActions(1)}
      actionButtonMinWidth={70}
      dotsBtnAriaLabel="Click to swipe open"
      onOpen={onClick}
    >
      Item #1
    </SwipeToRevealActions>
  );
  const button = getByLabelText('Click to swipe open');
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});

test("expands item on dots click, then delete callback is called on Delete button", () => {
  const onOpen = jest.fn();
  const onDelete = jest.fn();
  const { getByLabelText, getByText } = render(
    <SwipeToRevealActions
      actionButtons={[
        {
          content: (
            <>DELETE</>
          ),
          onClick: onDelete,
        }
      ]}
      actionButtonMinWidth={70}
      dotsBtnAriaLabel="Click to swipe open"
      onOpen={onOpen}
    >
      Item #1
    </SwipeToRevealActions>
  );
  const swipeOpenButton = getByLabelText('Click to swipe open');
  const deleteButton = getByText('DELETE');
  fireEvent.click(swipeOpenButton);
  fireEvent.click(deleteButton);
  expect(onDelete).toHaveBeenCalled();
});