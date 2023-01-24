import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  it('as informações detalhadas do pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const detailsName = screen.queryByRole('heading', {
      name: /pikachu details/i,
    });
    const summary = screen.queryByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const summaryText = /this intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i;
    const summaryParagraph = screen.queryByText(summaryText);

    expect(detailsLink).not.toBeInTheDocument();
    expect(detailsName).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryParagraph).toHaveTextContent(summaryText);
  });

  it('existe na página uma seção com os mapas contendo as localizações.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const gameLocationsTitle = screen.queryByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    const firstLocation = screen.queryByText(/kanto viridian forest/i);
    const locationImage = screen.queryAllByRole('img', {
      name: /pikachu location/i,
    });
    const secondLocation = screen.queryByText(/kanto power plant/i);

    expect(gameLocationsTitle).toBeInTheDocument();

    expect(firstLocation).toBeInTheDocument();
    expect(firstLocation).toHaveTextContent('Kanto Viridian Forest');
    expect(locationImage[0].src).toBe(
      'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locationImage[0].alt).toBe('Pikachu location');

    expect(secondLocation).toBeInTheDocument();
    expect(secondLocation).toHaveTextContent('Kanto Power Plant');
    expect(locationImage[1].src).toBe(
      'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(locationImage[1].alt).toBe('Pikachu location');
  });

  it('o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favoriteCheckbox = screen.queryByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    const favoriteLabel = screen.queryByLabelText(/pokémon favoritado?/i);
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteLabel).toBeInTheDocument();

    const favoriteStar = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteStar).not.toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(
      screen.queryByRole('img', { name: /pikachu is marked as favorite/i }),
    ).toBeInTheDocument();
  });
});
