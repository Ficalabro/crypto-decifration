import { useState } from 'react'
import CipherPage from '../components/CipherPage'
import { encryptPlayfair, decryptPlayfair } from '../utils/playfair'

function Playfair() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [key, setKey] = useState('KEYWORD')
  const [steps, setSteps] = useState([])
  const [mode, setMode] = useState('encrypt') // 'encrypt' or 'decrypt'

  const handleEncrypt = () => {
    if (!key.trim()) {
      alert('Por favor, insira uma chave!')
      return
    }
    const { result, steps: newSteps } = encryptPlayfair(inputText, key)
    setOutputText(result)
    setSteps(newSteps)
    setMode('encrypt')
  }

  const handleDecrypt = () => {
    if (!key.trim()) {
      alert('Por favor, insira uma chave!')
      return
    }
    const { result, steps: newSteps } = decryptPlayfair(inputText, key)
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
    setKey('SECRET')
    setOutputText('')
    setSteps([])
  }

  return (
    <CipherPage title="🔐 Cifra Playfair">
      <div className="algorithm-info">
        <div className="info-section">
          <h3>História</h3>
          <p>
            Criada por Charles Wheatstone em 1854, mas promovida por Lord Playfair, essa cifra revolucionou 
            a criptografia ao ser a primeira a trabalhar com <strong>pares de letras</strong> em vez de letras 
            individuais. Foi usada extensivamente pelos britânicos na Primeira Guerra Mundial e pelos 
            australianos na Segunda Guerra Mundial. Era considerada "inquebrável" sem computadores pela 
            complexidade de trabalhar com digramas (pares).
          </p>
        </div>
        <div className="info-section">
          <h3>Como Funciona</h3>
          <p>
            Uma palavra-chave preenche uma matriz 5×5 seguida pelo alfabeto (J vira I para caber). 
            O texto é dividido em pares de letras. Três regras determinam a cifragem: 
            <strong>(1)</strong> mesma linha → move à direita, 
            <strong>(2)</strong> mesma coluna → move para baixo, 
            <strong>(3)</strong> retângulo → troca colunas. É uma cifra de <strong>substituição 
            polialfabética</strong>, onde cada par pode ter múltiplas substituições dependendo do contexto.
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
            <label htmlFor="key">Chave (Palavra-chave)</label>
            <input
              id="key"
              type="text"
              placeholder="Ex: KEYWORD"
              value={key}
              onChange={(e) => setKey(e.target.value)}
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
              <div>Chave: <strong>{key || '(não definida)'}</strong></div>
              <div>Caracteres: <strong>{outputText.length}</strong></div>
            </div>
          </div>

          <div className="control-group">
            <label>Observações</label>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(139, 92, 246, 0.1)', 
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              lineHeight: '1.6'
            }}>
              <div>• A letra J é substituída por I</div>
              <div>• X é inserido entre letras duplicadas</div>
              <div>• X é adicionado no final se necessário</div>
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
                  <div className="step-visual" style={{ whiteSpace: 'pre-wrap' }}>
                    {step.visual}
                  </div>
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

export default Playfair

