import React from 'react';
import { screen } from '@testing-library/react';

import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About.', () => {
  it('a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(
      'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon',
    );
    const secondParagraph = screen.getByText(
      'One can filter Pokémon by type, and see more details for each one of them',
    );

    expect(firstParagraph && secondParagraph).toBeInTheDocument();
  });

  it('a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByRole('img', { alt: 'Pokédex', src: imageUrl });

    expect(pokedexImage.src).toBe(imageUrl);
  });
});
