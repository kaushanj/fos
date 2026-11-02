import { renderRouter, screen } from 'expo-router/testing-library';

import HomeScreen from '../src/app/index';

describe('HomeScreen', () => {
  it('renders the app title as a header', async () => {
    await renderRouter({ index: HomeScreen });

    expect(await screen.findByRole('header', { name: 'Keells FoS' })).toBeOnTheScreen();
  });
});
