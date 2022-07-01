import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect.js';
import React from 'react';
import InfoResult from '../../src/components/InfoResult';

describe('FormSearch', () => {
  it('render InfoResult ', () => {
    const component = render(
      <InfoResult  totalItems={0} loading={''} />
    );
    expect(component).toMatchSnapshot();

    expect(screen.queryByDisplayValue('Found 0 results')).toBeNull();
    expect(screen.queryByDisplayValue('network error')).toBeNull();
  });
  it('render InfoResult with success load', () => {
    const component = render(
      <InfoResult  totalItems={2} loading={'success'} />
    );
    expect(component).toMatchSnapshot();
    expect(screen.getByText('Found 2 results')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('network error')).toBeNull();
  });
  it('render InfoResult with failed load', () => {
    const component = render(
      <InfoResult  totalItems={3} loading={'failed'} />
    );
    expect(component).toMatchSnapshot();
    expect(screen.queryByDisplayValue('Found 3 results')).toBeNull();
    expect(screen.getByText('network error')).toBeInTheDocument();
  });
});
