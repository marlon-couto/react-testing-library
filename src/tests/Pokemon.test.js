import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon.', () => {
  it('é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.queryByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);

    const pokemonType = screen.queryByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const pokemonWeight = screen.queryByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);

    const imageUrl = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImage = screen.queryByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonImage.alt).toBe('Pikachu sprite');
    expect(pokemonImage.src).toBe(imageUrl);
  });

  it('o card do pokémon contém um link de navegação', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toBe('http://localhost/pokemon/25');
  });

  it('ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const detailsTitle = screen.queryByRole('heading', {
      name: /pikachu details/i,
    });
    expect(detailsTitle).toBeInTheDocument();

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/pokemon/25');
  });

  it('existe um ícone de estrela nos pokémon favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const pokemonFavorite = screen.queryByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(pokemonFavorite);

    act(() => {
      history.push('/favorites');
    });

    const starIcon = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.alt).toBe('Pikachu is marked as favorite');
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
