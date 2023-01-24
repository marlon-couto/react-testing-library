import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testa o componente FavoritePokemon.', () => {
  it('é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemon />);

    const notFoundMessage = screen.queryByText(/no favorite pokémon found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Apenas os pokémon favoritos são exibidos', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const checkboxFavorite = screen.queryByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(checkboxFavorite);

    const favoriteLink = screen.queryByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoriteLink);

    const pokemonName = screen.queryByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
