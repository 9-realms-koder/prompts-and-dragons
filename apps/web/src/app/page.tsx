import type { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="mb-4 font-display text-6xl font-bold text-neon-blue text-glow">
          NeonRealms
        </h1>
        <p className="mb-8 text-xl text-gray-400">RPG Assíncrono com Mestre IA</p>

        <div className="mb-12 rounded-lg border border-neon-pink/30 bg-cyber-dark p-8">
          <p className="text-lg text-gray-300">
            Em um mundo onde a linha entre humano e máquina se dissolve,
            <br />
            suas escolhas definem quem você é.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            className="rounded-lg bg-neon-pink px-6 py-3 font-bold text-white transition hover:bg-neon-pink/80 hover:shadow-lg hover:shadow-neon-pink/50"
          >
            Criar Campanha
          </button>
          <button
            type="button"
            className="rounded-lg border border-neon-blue px-6 py-3 font-bold text-neon-blue transition hover:bg-neon-blue/10"
          >
            Entrar em Campanha
          </button>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Em desenvolvimento - Veja o progresso no{' '}
          <a
            href="https://github.com/9-realms-koder/prompts-and-dragons"
            className="text-neon-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </main>
  );
}
