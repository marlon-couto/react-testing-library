import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App.', () => {
  it('deve conter um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);

    const homeLink = screen.queryByRole('link', { name: /home/i });
    const aboutLink = screen.queryByRole('link', { name: /about/i });
    const favoriteLink = screen.queryByRole('link', { name: /favorite pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('a aplicação é redirecionada para a página inicial ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.queryByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/');
  });

  it('a aplicação é redirecionada para a página About ao clicar no link About.', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.queryByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/about');
  });

  it('a aplicação é redirecionada para a página Pokémon Favoritados ao clicar no link Favorite Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.queryByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoriteLink);

    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/favorites');
  });

  it('a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/test');
    });

    const notFoundText = screen.queryByText(/page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
