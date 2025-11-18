import { useState } from 'react'
import CipherPage from '../components/CipherPage'
import { encryptRailFence, decryptRailFence } from '../utils/railFence'

function RailFence() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [rails, setRails] = useState(3)
  const [steps, setSteps] = useState([])
  const [mode, setMode] = useState('encrypt') // 'encrypt' or 'decrypt'

  const handleEncrypt = () => {
    const { result, steps: newSteps } = encryptRailFence(inputText, rails)
    setOutputText(result)
    setSteps(newSteps)
    setMode('encrypt')
  }

  const handleDecrypt = () => {
    const { result, steps: newSteps } = decryptRailFence(inputText, rails)
    setOutputText(result)
    setSteps(newSteps)
    setMode('decrypt')
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setSteps([])
  }

  const handleExample = () => {
    setInputText('HELLO WORLD')
    setRails(3)
    setOutputText('')
    setSteps([])
  }

  return (
    <CipherPage title="🚂 Rail Fence Cipher">
      <div className="algorithm-info">
        <div className="info-section">
          <h3>História</h3>
          <p>
            A cifra Rail Fence (ou "Cerca de Trilhos") é uma das cifras de transposição mais antigas 
            e simples. Foi usada desde a antiguidade clássica e ganhou destaque na Guerra Civil Americana 
            para comunicações militares. O nome vem do padrão visual criado, que se assemelha a uma cerca 
            de trilhos vista de lado.
          </p>
        </div>
        <div className="info-section">
          <h3>Como Funciona</h3>
          <p>
            O texto é escrito em zigue-zague através de múltiplos "trilhos" (linhas). Imagine escrever 
            as letras descendo e subindo entre as linhas, como se desenhasse ondas. Para criptografar, 
            você lê cada trilho da esquerda para direita. Para descriptografar, reconstrói o padrão 
            zigue-zague e lê de forma diagonal. É uma cifra de <strong>transposição</strong>, 
            mudando a ordem das letras sem alterá-las.
          </p>
        </div>
      </div>
      <div className="cipher-controls">
        <div className="input-section">
          <h2>Entrada</h2>
          <textarea
            className="input-field"
            placeholder={mode === 'encrypt' ? "Digite o texto para criptografar..." : "Digite o texto para descriptografar..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          
          <div className="control-group">
            <label htmlFor="rails">Número de Trilhos (Rails)</label>
            <input
              id="rails"
              type="number"
              min="2"
              max="10"
              value={rails}
              onChange={(e) => setRails(parseInt(e.target.value) || 2)}
            />
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={handleEncrypt}>
              Criptografar
            </button>
            <button className="btn btn-primary" onClick={handleDecrypt}>
              Descriptografar
            </button>
          </div>
          
          <div className="button-group">
            <button className="btn btn-secondary" onClick={handleExample}>
              Ver Exemplo
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Limpar
            </button>
          </div>
        </div>

        <div className="output-section">
          <h2>Resultado</h2>
          <textarea
            className="output-field"
            placeholder="O resultado aparecerá aqui..."
            value={outputText}
            readOnly
          />
          
          <div className="control-group">
            <label>Informações</label>
            <div style={{ 
              padding: '1rem', 
              background: 'var(--bg-color)', 
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              <div>Modo: <strong>{mode === 'encrypt' ? 'Criptografia' : 'Descriptografia'}</strong></div>
              <div>Trilhos: <strong>{rails}</strong></div>
              <div>Caracteres: <strong>{outputText.length}</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div className="steps-section">
        <h2>Passo a Passo</h2>
        {steps.length > 0 ? (
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-header">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-title">{step.title}</span>
                </div>
                <div className="step-content">{step.description}</div>
                {step.visual && (
                  <div className="step-visual">{step.visual}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-steps">
            <div className="empty-steps-icon">🔍</div>
            <p>Execute uma operação para ver o passo a passo do algoritmo</p>
          </div>
        )}
      </div>
    </CipherPage>
  )
}

export default RailFence

