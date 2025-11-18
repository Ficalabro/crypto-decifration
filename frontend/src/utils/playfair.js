/**
 * Implementação do algoritmo Playfair Cipher
 */

function prepareKey(key) {
  // Remove espaços, converte para maiúsculas e substitui J por I
  key = key.replace(/\s/g, '').toUpperCase().replace(/J/g, 'I')
  
  // Remove duplicatas
  let uniqueKey = ''
  const seen = new Set()
  
  for (let char of key) {
    if (!seen.has(char) && /[A-Z]/.test(char)) {
      seen.add(char)
      uniqueKey += char
    }
  }
  
  // Adiciona o restante do alfabeto
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ' // Sem J
  for (let char of alphabet) {
    if (!seen.has(char)) {
      uniqueKey += char
    }
  }
  
  return uniqueKey
}

function createMatrix(key) {
  const preparedKey = prepareKey(key)
  const matrix = []
  
  for (let i = 0; i < 5; i++) {
    matrix.push(preparedKey.slice(i * 5, (i + 1) * 5).split(''))
  }
  
  return matrix
}

function findPosition(matrix, char) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j]
      }
    }
  }
  return null
}

function prepareText(text) {
  // Remove espaços, converte para maiúsculas e substitui J por I
  text = text.replace(/\s/g, '').toUpperCase().replace(/J/g, 'I')
  
  // Separa em pares e adiciona X entre letras duplicadas
  let prepared = ''
  for (let i = 0; i < text.length; i++) {
    if (!/[A-Z]/.test(text[i])) continue
    
    prepared += text[i]
    
    if (i < text.length - 1 && text[i] === text[i + 1]) {
      prepared += 'X'
    }
  }
  
  // Adiciona X no final se tiver número ímpar de caracteres
  if (prepared.length % 2 !== 0) {
    prepared += 'X'
  }
  
  return prepared
}

export function encryptPlayfair(text, key) {
  if (!text || !key) {
    return { result: '', steps: [] }
  }

  const steps = []
  const originalText = text
  
  // Explicar a preparação da chave
  const preparedKey = prepareKey(key)
  steps.push({
    title: 'Passo 1: Preparação da Chave',
    description: `Chave original: "${key}"
    
Regras aplicadas:
• Convertemos para MAIÚSCULAS
• Removemos espaços e caracteres especiais
• Substituímos J por I (alfabeto fica com 25 letras)
• Removemos letras duplicadas
• Completamos com o resto do alfabeto`,
    visual: `Chave processada: ${preparedKey}
Total de letras únicas: ${preparedKey.length}`
  })
  
  // Preparar a matriz
  const matrix = createMatrix(key)
  let matrixVisual = 'Passo 2: Construção da Matriz 5x5\n\nA chave processada preenche a matriz da esquerda para direita:\n\n'
  matrixVisual += '     Col 0  Col 1  Col 2  Col 3  Col 4\n'
  matrixVisual += '   +------+------+------+------+------+\n'
  matrix.forEach((row, idx) => {
    matrixVisual += `${idx} |  ${row.join('  |  ')}  |\n`
    matrixVisual += '   +------+------+------+------+------+\n'
  })
  
  steps.push({
    title: 'Passo 2: Matriz 5x5',
    description: `Criamos uma matriz 5x5 com a chave e o alfabeto completo. Esta matriz será usada para todas as substituições.`,
    visual: matrixVisual
  })

  // Preparar o texto
  const prepared = prepareText(text)
  
  let textPreparation = `Texto original: "${originalText}"\n\n`
  textPreparation += `Regras aplicadas:\n`
  textPreparation += `• Convertido para MAIÚSCULAS\n`
  textPreparation += `• Removidos espaços\n`
  textPreparation += `• J substituído por I\n`
  textPreparation += `• X inserido entre letras duplicadas\n`
  textPreparation += `• X adicionado no final se ímpar\n\n`
  textPreparation += `Texto preparado: ${prepared}\n`
  textPreparation += `Pares formados: ${prepared.match(/.{1,2}/g).join(' ')}`
  
  steps.push({
    title: 'Passo 3: Preparação do Texto',
    description: 'O texto é preparado e dividido em pares de letras para a cifragem.',
    visual: textPreparation
  })

  // Criptografar cada par
  let encrypted = ''
  const pairs = prepared.match(/.{1,2}/g) || []
  
  steps.push({
    title: 'Passo 4: Regras de Cifragem',
    description: `O Playfair usa 3 regras baseadas na posição das letras na matriz:

1️⃣ MESMA LINHA: Move ambas as letras 1 posição à direita
   (volta ao início se chegar no fim)

2️⃣ MESMA COLUNA: Move ambas as letras 1 posição para baixo
   (volta ao topo se chegar no fim)

3️⃣ RETÂNGULO: Troca as colunas, mantendo as linhas
   (forma um retângulo na matriz)`,
    visual: `Vamos aplicar essas regras em cada par...`
  })
  
  let pairsDetail = 'Passo 5: Cifragem de Cada Par\n\n'
  
  for (let pair of pairs) {
    const [char1, char2] = pair.split('')
    const [row1, col1] = findPosition(matrix, char1)
    const [row2, col2] = findPosition(matrix, char2)
    
    let newChar1, newChar2
    let rule = ''
    let explanation = ''
    
    if (row1 === row2) {
      // Mesma linha - move para direita
      newChar1 = matrix[row1][(col1 + 1) % 5]
      newChar2 = matrix[row2][(col2 + 1) % 5]
      rule = 'MESMA LINHA'
      explanation = `${char1} está em (linha ${row1}, col ${col1})\n`
      explanation += `${char2} está em (linha ${row2}, col ${col2})\n`
      explanation += `Movemos 1 posição à direita:\n`
      explanation += `${char1} → ${newChar1} (col ${col1} → ${(col1 + 1) % 5})\n`
      explanation += `${char2} → ${newChar2} (col ${col2} → ${(col2 + 1) % 5})`
    } else if (col1 === col2) {
      // Mesma coluna - move para baixo
      newChar1 = matrix[(row1 + 1) % 5][col1]
      newChar2 = matrix[(row2 + 1) % 5][col2]
      rule = 'MESMA COLUNA'
      explanation = `${char1} está em (linha ${row1}, col ${col1})\n`
      explanation += `${char2} está em (linha ${row2}, col ${col2})\n`
      explanation += `Movemos 1 posição para baixo:\n`
      explanation += `${char1} → ${newChar1} (linha ${row1} → ${(row1 + 1) % 5})\n`
      explanation += `${char2} → ${newChar2} (linha ${row2} → ${(row2 + 1) % 5})`
    } else {
      // Retângulo - troca colunas
      newChar1 = matrix[row1][col2]
      newChar2 = matrix[row2][col1]
      rule = 'RETÂNGULO'
      explanation = `${char1} está em (linha ${row1}, col ${col1})\n`
      explanation += `${char2} está em (linha ${row2}, col ${col2})\n`
      explanation += `Formam um retângulo! Trocamos as colunas:\n`
      explanation += `${char1} → ${newChar1} (mantém linha ${row1}, vai p/ col ${col2})\n`
      explanation += `${char2} → ${newChar2} (mantém linha ${row2}, vai p/ col ${col1})`
    }
    
    pairsDetail += `Par "${pair}" → "${newChar1}${newChar2}" [${rule}]\n`
    pairsDetail += explanation + '\n'
    pairsDetail += '─'.repeat(50) + '\n\n'
    
    encrypted += newChar1 + newChar2
  }
  
  steps.push({
    title: 'Passo 5: Cifragem Detalhada',
    description: 'Aplicamos as regras do Playfair em cada par de letras:',
    visual: pairsDetail
  })

  let finalVisual = `Todos os pares cifrados:\n\n`
  const originalPairs = prepared.match(/.{1,2}/g)
  const encryptedPairs = encrypted.match(/.{1,2}/g)
  
  originalPairs.forEach((pair, idx) => {
    finalVisual += `${pair} → ${encryptedPairs[idx]}\n`
  })
  
  finalVisual += `\n${'='.repeat(40)}\n`
  finalVisual += `TEXTO CIFRADO: ${encrypted}\n`
  finalVisual += `${'='.repeat(40)}`

  steps.push({
    title: 'Passo 6: Resultado Final',
    description: 'Texto completamente criptografado usando a cifra Playfair!',
    visual: finalVisual
  })

  return { result: encrypted, steps }
}

export function decryptPlayfair(text, key) {
  if (!text || !key) {
    return { result: '', steps: [] }
  }

  const steps = []
  const originalCipher = text
  
  // Explicar a preparação da chave
  const preparedKey = prepareKey(key)
  steps.push({
    title: 'Passo 1: Preparação da Chave',
    description: `Para decifrar, precisamos da MESMA chave usada na cifragem!
    
Chave: "${key}"`,
    visual: `Chave processada: ${preparedKey}
Total de letras: ${preparedKey.length}

⚠️ IMPORTANTE: A chave deve ser EXATAMENTE a mesma usada na criptografia!`
  })
  
  // Preparar a matriz
  const matrix = createMatrix(key)
  let matrixVisual = 'Passo 2: Reconstrução da Matriz\n\nRecriamos a matriz 5x5 idêntica à usada na cifragem:\n\n'
  matrixVisual += '     Col 0  Col 1  Col 2  Col 3  Col 4\n'
  matrixVisual += '   +------+------+------+------+------+\n'
  matrix.forEach((row, idx) => {
    matrixVisual += `${idx} |  ${row.join('  |  ')}  |\n`
    matrixVisual += '   +------+------+------+------+------+\n'
  })
  
  steps.push({
    title: 'Passo 2: Matriz de Decifragem',
    description: `Usamos a mesma matriz da cifragem. Ela é essencial para reverter o processo!`,
    visual: matrixVisual
  })

  // Preparar o texto
  text = text.replace(/\s/g, '').toUpperCase()
  
  let cipherInfo = `Texto cifrado recebido: "${originalCipher}"\n\n`
  cipherInfo += `Texto limpo: ${text}\n`
  cipherInfo += `Total de caracteres: ${text.length}\n`
  cipherInfo += `Pares a decifrar: ${text.match(/.{1,2}/g).join(' ')}`
  
  steps.push({
    title: 'Passo 3: Texto Cifrado',
    description: 'Preparamos o texto cifrado e o dividimos em pares para processar.',
    visual: cipherInfo
  })

  steps.push({
    title: 'Passo 4: Regras INVERSAS de Decifragem',
    description: `Para DECIFRAR, invertemos as regras da cifragem:

1️⃣ MESMA LINHA: Move ambas as letras 1 posição à ESQUERDA
   (ao invés de direita)

2️⃣ MESMA COLUNA: Move ambas as letras 1 posição para CIMA
   (ao invés de baixo)

3️⃣ RETÂNGULO: Troca as colunas (MESMA regra!)
   (o retângulo é simétrico)`,
    visual: `As regras 1 e 2 são invertidas, mas a regra 3 permanece igual!`
  })

  // Descriptografar cada par
  let decrypted = ''
  const pairs = text.match(/.{1,2}/g) || []
  
  let pairsDetail = 'Passo 5: Decifragem de Cada Par\n\n'
  
  for (let pair of pairs) {
    const [char1, char2] = pair.split('')
    const [row1, col1] = findPosition(matrix, char1)
    const [row2, col2] = findPosition(matrix, char2)
    
    let newChar1, newChar2
    let rule = ''
    let explanation = ''
    
    if (row1 === row2) {
      // Mesma linha - move para esquerda
      newChar1 = matrix[row1][(col1 + 4) % 5]
      newChar2 = matrix[row2][(col2 + 4) % 5]
      rule = 'MESMA LINHA'
      explanation = `${char1} está em (linha ${row1}, col ${col1})\n`
      explanation += `${char2} está em (linha ${row2}, col ${col2})\n`
      explanation += `Movemos 1 posição à ESQUERDA:\n`
      explanation += `${char1} → ${newChar1} (col ${col1} → ${(col1 + 4) % 5})\n`
      explanation += `${char2} → ${newChar2} (col ${col2} → ${(col2 + 4) % 5})`
    } else if (col1 === col2) {
      // Mesma coluna - move para cima
      newChar1 = matrix[(row1 + 4) % 5][col1]
      newChar2 = matrix[(row2 + 4) % 5][col2]
      rule = 'MESMA COLUNA'
      explanation = `${char1} está em (linha ${row1}, col ${col1})\n`
      explanation += `${char2} está em (linha ${row2}, col ${col2})\n`
      explanation += `Movemos 1 posição para CIMA:\n`
      explanation += `${char1} → ${newChar1} (linha ${row1} → ${(row1 + 4) % 5})\n`
      explanation += `${char2} → ${newChar2} (linha ${row2} → ${(row2 + 4) % 5})`
    } else {
      // Retângulo - troca colunas (mesma regra!)
      newChar1 = matrix[row1][col2]
      newChar2 = matrix[row2][col1]
      rule = 'RETÂNGULO'
      explanation = `${char1} está em (linha ${row1}, col ${col1})\n`
      explanation += `${char2} está em (linha ${row2}, col ${col2})\n`
      explanation += `Formam um retângulo! Trocamos as colunas:\n`
      explanation += `${char1} → ${newChar1} (mantém linha ${row1}, vai p/ col ${col2})\n`
      explanation += `${char2} → ${newChar2} (mantém linha ${row2}, vai p/ col ${col1})`
    }
    
    pairsDetail += `Par "${pair}" → "${newChar1}${newChar2}" [${rule}]\n`
    pairsDetail += explanation + '\n'
    pairsDetail += '─'.repeat(50) + '\n\n'
    
    decrypted += newChar1 + newChar2
  }
  
  steps.push({
    title: 'Passo 5: Decifragem Detalhada',
    description: 'Aplicamos as regras INVERSAS do Playfair em cada par:',
    visual: pairsDetail
  })

  let finalVisual = `Todos os pares decifrados:\n\n`
  const cipherPairs = text.match(/.{1,2}/g)
  const decryptedPairs = decrypted.match(/.{1,2}/g)
  
  cipherPairs.forEach((pair, idx) => {
    finalVisual += `${pair} → ${decryptedPairs[idx]}\n`
  })
  
  finalVisual += `\n${'='.repeat(40)}\n`
  finalVisual += `TEXTO DECIFRADO: ${decrypted}\n`
  finalVisual += `${'='.repeat(40)}\n\n`
  finalVisual += `💡 Lembre-se: Remova os X extras que foram adicionados na cifragem!`

  steps.push({
    title: 'Passo 6: Resultado Final',
    description: 'Texto completamente decifrado! Mensagem original recuperada.',
    visual: finalVisual
  })

  return { result: decrypted, steps }
}
