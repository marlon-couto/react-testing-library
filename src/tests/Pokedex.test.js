import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa o componente Pokedex.', () => {
  it('a página contém um heading h2 o texto "Encountered Pokémon".', () => {
    renderWithRouter(<App />);

    const encounteredTitle = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(encounteredTitle).toBeInTheDocument();
  });

  it('é exibido o próximo pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      const currentPokemon = screen.getByText(pokemon.name);
      expect(currentPokemon).toBeInTheDocument();
      userEvent.click(nextButton);
    });

    const firstPokemon = screen.getByText(pokemonList[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('apenas um pokémon é exibido por vez.', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();

    const otherPokemon = screen.queryByText(/charmander/i);
    expect(otherPokemon).not.toBeInTheDocument();
  });

  it('a pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(7);

    pokemonTypes.forEach((type) => {
      const currentButton = screen.getByRole('button', { name: type });
      expect(currentButton).toBeInTheDocument();

      userEvent.click(currentButton);
      const pokemonRendered = screen.getByTestId('pokemon-type');
      expect(pokemonRendered).toHaveTextContent(type);

      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();
    });
  });

  it('a pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    const firePokemon = screen.getByText(/charmander/i);
    expect(firePokemon).toBeInTheDocument();

    userEvent.click(buttonAll);
    const firstPokemon = screen.getByText(pokemonList[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });
});
