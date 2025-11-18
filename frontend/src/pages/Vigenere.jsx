import { useState } from 'react'
import CipherPage from '../components/CipherPage'
import { encryptVigenere, decryptVigenere } from '../utils/vigenere'

function Vigenere() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [key, setKey] = useState('KEY')
  const [steps, setSteps] = useState([])
  const [mode, setMode] = useState('encrypt') // 'encrypt' or 'decrypt'

  const handleEncrypt = () => {
    if (!key.trim()) {
      alert('Por favor, insira uma chave!')
      return
    }
    const { result, steps: newSteps } = encryptVigenere(inputText, key)
    setOutputText(result)
    setSteps(newSteps)
    setMode('encrypt')
  }

  const handleDecrypt = () => {
    if (!key.trim()) {
      alert('Por favor, insira uma chave!')
      return
    }
    const { result, steps: newSteps } = decryptVigenere(inputText, key)
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
    setInputText('ATTACK AT DAWN')
    setKey('LEMON')
    setOutputText('')
    setSteps([])
  }

  return (
    <CipherPage title="🔤 Cifra de Vigenère">
      <div className="algorithm-info">
        <div className="info-section">
          <h3>História</h3>
          <p>
            Descrita por Blaise de Vigenère em 1586 (baseada no trabalho de Bellaso, 1553), foi conhecida 
            como <strong>"le chiffre indéchiffrable"</strong> (a cifra indecifrável) por quase 300 anos! 
            Resistiu a todas as tentativas de quebra até que Charles Babbage (1854) e Friedrich Kasiski (1863) 
            desenvolveram métodos de criptoanálise. Foi usada pelos Confederados na Guerra Civil Americana 
            e permaneceu em uso militar até o século XX.
          </p>
        </div>
        <div className="info-section">
          <h3>Como Funciona</h3>
          <p>
            Uma palavra-chave é repetida até cobrir todo o texto. Cada letra da chave determina um 
            <strong> deslocamento César diferente</strong> (A=0, B=1, C=2... Z=25). Para cifrar, 
            soma-se a posição da letra do texto com a da chave (mod 26). Para decifrar, subtrai-se. 
            É uma cifra <strong>polialfabética</strong>: a mesma letra do texto é cifrada diferentemente 
            dependendo de sua posição, tornando análise de frequência ineficaz.
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
              placeholder="Ex: LEMON"
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
            <label>Sobre a Cifra de Vigenère</label>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(99, 102, 241, 0.1)', 
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              lineHeight: '1.6'
            }}>
              <div><strong>• Cifra polialfabética</strong> - usa múltiplas substituições</div>
              <div>• Cada letra da chave determina um deslocamento César</div>
              <div>• Muito mais segura que César simples</div>
              <div>• Conhecida como "cifra inquebrável" por séculos</div>
              <div>• Criada por Blaise de Vigenère (1586)</div>
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

export default Vigenere

