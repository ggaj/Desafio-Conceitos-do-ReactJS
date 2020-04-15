import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    try {
      const { data } = await api.post('repositories', {
        title: `title n. ${Date.now()}`
      })
      setRepositories([...repositories, data])
    } catch (error) {
      console.error(error.message)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      const repositoryIndex = repositories.findIndex( repository => repository.id === id )
      const data = repositories.splice(repositoryIndex, 1)
      setRepositories([...repositories, data])  
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          repository.id && (<li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))) }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
