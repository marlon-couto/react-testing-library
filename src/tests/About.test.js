import React from 'react';
import { screen } from '@testing-library/react';

import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About.', () => {
  it('a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.queryByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.queryByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const secondParagraph = screen.queryByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.queryByRole('img', { name: /pokédex/i });

    expect(pokedexImage.src).toBe(imageUrl);
  });
});
