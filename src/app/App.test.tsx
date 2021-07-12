import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';import React, { ReactElement } from 'react'

interface Props {

}

export default function App.test({}: Props): ReactElement {
  return (
    <div>

    </div>
  )
}

import { store } from './store';
import App from '../components/App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
