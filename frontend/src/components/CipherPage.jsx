import { Link } from 'react-router-dom'
import './CipherPage.css'

function CipherPage({ title, children }) {
  return (
    <div className="cipher-page">
      <div className="container">
        <Link to="/" className="back-button">
          ← Voltar
        </Link>

        <header className="header">
          <h1>{title}</h1>
        </header>

        {children}
      </div>
    </div>
  )
}

export default CipherPage

