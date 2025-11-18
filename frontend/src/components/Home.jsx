import { useNavigate } from 'react-router-dom'
import AlgorithmCard from './AlgorithmCard'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  const algorithms = [
    {
      id: 'rail-fence',
      title: 'Rail Fence',
      description: 'Cifra de transposição que organiza o texto em zigue-zague',
      icon: '🚂',
      path: '/rail-fence',
      color: '#6366f1'
    },
    {
      id: 'playfair',
      title: 'Cifra Playfair',
      description: 'Cifra de substituição que usa pares de letras em uma matriz 5x5',
      icon: '🔐',
      path: '/playfair',
      color: '#8b5cf6'
    },
    {
      id: 'vigenere',
      title: 'Cifra de Vigenère',
      description: 'Cifra polialfabética que usa uma palavra-chave com deslocamentos variáveis',
      icon: '🔤',
      path: '/vigenere',
      color: '#a855f7'
    }
  ]

  return (
    <div className="home">
      <div className="container">
        <header className="header">
          <h1>🔒 Crypto Decifration</h1>
          <p>Explore algoritmos clássicos de criptografia</p>
        </header>

        <div className="algorithms-grid">
          {algorithms.map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              algorithm={algorithm}
              onClick={() => navigate(algorithm.path)}
            />
          ))}
        </div>

        <footer className="home-footer">
          <p>Selecione um algoritmo para começar a criptografar e descriptografar mensagens</p>
        </footer>
      </div>
    </div>
  )
}

export default Home

