import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('NeonRealms');
  });

  it('should render the tagline', () => {
    render(<Home />);

    expect(screen.getByText('RPG Assincrono com Mestre IA')).toBeInTheDocument();
  });

  it('should render the description', () => {
    render(<Home />);

    expect(screen.getByText(/Em um mundo onde a linha entre humano e maquina/i)).toBeInTheDocument();
  });

  it('should render the create campaign button', () => {
    render(<Home />);

    const createButton = screen.getByRole('button', { name: /criar campanha/i });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveClass('bg-neon-pink');
  });

  it('should render the join campaign button', () => {
    render(<Home />);

    const joinButton = screen.getByRole('button', { name: /entrar em campanha/i });
    expect(joinButton).toBeInTheDocument();
    expect(joinButton).toHaveClass('border-neon-blue');
  });

  it('should render the GitHub link', () => {
    render(<Home />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/9-realms-koder/prompts-and-dragons');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have proper accessibility structure', () => {
    render(<Home />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('flex', 'min-h-screen');
  });
});
