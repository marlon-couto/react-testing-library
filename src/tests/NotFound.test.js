import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound.', () => {
  it('a página contém um heading h2 com o texto "Page requested not found".', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.queryByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('a página mostra a imagem correta.', () => {
    renderWithRouter(<NotFound />);

    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageNotFound = screen.queryByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(imageNotFound.src).toBe(imageUrl);
  });
});
