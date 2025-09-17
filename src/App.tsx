import React, { useState } from 'react';
import dados from './dados.json';
import './App.css';

const App: React.FC = () => {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [categoriaAtual, setCategoriaAtual] = useState<'animais' | 'livros' | 'pessoas'>('animais');

  const toggleFavorito = (id: string) => {
    setFavoritos(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const getItens = () => {
    switch (categoriaAtual) {
      case 'animais': return dados.animais;
      case 'livros': return dados.livros;
      case 'pessoas': return dados.pessoas;
      default: return [];
    }
  };

  const getFavoritos = () => {
    const todosItens = [...dados.animais, ...dados.livros, ...dados.pessoas];
    return todosItens.filter(item => favoritos.includes(item.id));
  };

  const renderItem = (item: any) => (
    <div key={item.id} className="item-card">
      <img 
        src={item.imagem || item.capa || item.foto || ''} 
        alt={item.nome || item.titulo || ''} 
        className="item-image" 
      />
      <div className="item-info">
        <h3>{item.nome || item.titulo || ''}</h3>
        {item.especie && <p>Espécie: {item.especie}</p>}
        {item.autor && <p>Autor: {item.autor}</p>}
        {item.area && <p>Área: {item.area}</p>}
      </div>
      <button 
        className={`favorito-btn ${favoritos.includes(item.id) ? 'favoritado' : ''}`}
        onClick={() => toggleFavorito(item.id)}
      >
        {favoritos.includes(item.id) ? '❤️' : '🤍'}
      </button>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <h1>📚 MultiCatálogo</h1>
        <nav className="nav">
          <button 
            className={categoriaAtual === 'animais' ? 'active' : ''}
            onClick={() => setCategoriaAtual('animais')}
          >
            🦁 Animais
          </button>
          <button 
            className={categoriaAtual === 'livros' ? 'active' : ''}
            onClick={() => setCategoriaAtual('livros')}
          >
            📖 Livros
          </button>
          <button 
            className={categoriaAtual === 'pessoas' ? 'active' : ''}
            onClick={() => setCategoriaAtual('pessoas')}
          >
            👥 Pessoas
          </button>
          <button 
            className="favoritos-btn"
            onClick={() => setCategoriaAtual('favoritos' as any)}
          >
            ❤️ Favoritos ({favoritos.length})
          </button>
        </nav>
      </header>

      <main className="main">
        <h2>
          {categoriaAtual === 'animais' && '🦁 Animais'}
          {categoriaAtual === 'livros' && '📖 Livros'}
          {categoriaAtual === 'pessoas' && '👥 Pessoas'}
          {categoriaAtual === 'favoritos' && '❤️ Meus Favoritos'}
        </h2>
        
        <div className="items-grid">
          {(categoriaAtual === 'favoritos' ? getFavoritos() : getItens()).map(renderItem)}
        </div>

        {categoriaAtual === 'favoritos' && getFavoritos().length === 0 && (
          <div className="empty">
            <p>Nenhum favorito ainda. Adicione alguns itens aos seus favoritos!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
