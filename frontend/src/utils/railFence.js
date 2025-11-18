/**
 * Implementação do algoritmo Rail Fence Cipher
 */

export function encryptRailFence(text, rails) {
  if (!text || rails < 2) {
    return { result: '', steps: [] }
  }

  const steps = []
  const originalText = text
  text = text.replace(/\s/g, '').toUpperCase()
  
  steps.push({
    title: 'Passo 1: Preparação do Texto',
    description: `Texto original: "${originalText}"
Removemos os espaços e convertemos todas as letras para MAIÚSCULAS para facilitar a leitura.`,
    visual: `Texto limpo: ${text}
Total de caracteres: ${text.length}`
  })

  // Criar a grade com todas as posições
  const fullGrid = Array(rails).fill().map(() => Array(text.length).fill(''))
  let rail = 0
  let direction = 1

  // Preencher a grade em zigue-zague
  for (let i = 0; i < text.length; i++) {
    fullGrid[rail][i] = text[i]
    
    if (rail === 0) {
      direction = 1
    } else if (rail === rails - 1) {
      direction = -1
    }
    
    rail += direction
  }

  // Visualização do padrão zigue-zague
  let zigzagPattern = `Passo 2: Movimentação em Zigue-Zague\n\nO texto é escrito em ${rails} trilhos, descendo e subindo como em uma cerca:\n\n`
  
  for (let i = 0; i < rails; i++) {
    zigzagPattern += `Trilho ${i + 1}: `
    for (let j = 0; j < text.length; j++) {
      if (fullGrid[i][j]) {
        zigzagPattern += `[${fullGrid[i][j]}] `
      } else {
        zigzagPattern += ' .  '
      }
    }
    zigzagPattern += '\n'
  }
  
  zigzagPattern += `\nPosição:  `
  for (let j = 0; j < text.length; j++) {
    zigzagPattern += ` ${j}  `
  }
  
  steps.push({
    title: 'Passo 2: Padrão Zigue-Zague',
    description: `Cada letra é colocada em um trilho seguindo um movimento de zigue-zague:
• Começamos no trilho 1
• Descemos até o trilho ${rails}
• Subimos de volta ao trilho 1
• Repetimos até acabar o texto`,
    visual: zigzagPattern
  })

  // Criar a grade compacta (sem espaços)
  const fence = Array(rails).fill().map(() => [])
  rail = 0
  direction = 1

  for (let i = 0; i < text.length; i++) {
    fence[rail].push(text[i])
    
    if (rail === 0) {
      direction = 1
    } else if (rail === rails - 1) {
      direction = -1
    }
    
    rail += direction
  }

  // Visualização da leitura por trilhos
  let readingPattern = 'Passo 3: Leitura dos Trilhos\n\nAgora lemos cada trilho da esquerda para direita:\n\n'
  fence.forEach((row, idx) => {
    readingPattern += `Trilho ${idx + 1}: ${row.join(' ')} → "${row.join('')}"\n`
  })
  
  steps.push({
    title: 'Passo 3: Leitura dos Trilhos',
    description: 'Para criptografar, lemos cada trilho completamente, da esquerda para direita, começando pelo trilho 1.',
    visual: readingPattern
  })

  // Ler a grade linha por linha
  const encrypted = fence.flat().join('')
  
  let finalStep = `Concatenamos todos os trilhos em ordem:\n\n`
  fence.forEach((row, idx) => {
    finalStep += `Trilho ${idx + 1}: "${row.join('')}"\n`
  })
  finalStep += `\n${'='.repeat(40)}\n`
  finalStep += `TEXTO CIFRADO: ${encrypted}\n`
  finalStep += `${'='.repeat(40)}`
  
  steps.push({
    title: 'Passo 4: Resultado Final',
    description: `Juntamos todas as letras de todos os trilhos em sequência para obter o texto criptografado.`,
    visual: finalStep
  })

  return { result: encrypted, steps }
}

export function decryptRailFence(text, rails) {
  if (!text || rails < 2) {
    return { result: '', steps: [] }
  }

  const steps = []
  const originalCipher = text
  text = text.replace(/\s/g, '').toUpperCase()
  
  steps.push({
    title: 'Passo 1: Texto Cifrado Recebido',
    description: `Recebemos o texto criptografado que precisa ser decifrado.`,
    visual: `Texto cifrado: ${text}
Total de caracteres: ${text.length}
Número de trilhos: ${rails}`
  })

  // Criar a grade vazia e marcar posições
  const fence = Array(rails).fill().map(() => Array(text.length).fill(''))
  
  // Marcar as posições que serão preenchidas
  let rail = 0
  let direction = 1
  
  for (let i = 0; i < text.length; i++) {
    fence[rail][i] = '*'
    
    if (rail === 0) {
      direction = 1
    } else if (rail === rails - 1) {
      direction = -1
    }
    
    rail += direction
  }

  // Mostrar o padrão antes de preencher
  let emptyPattern = `Passo 2: Identificação do Padrão\n\nPrimeiro, identificamos onde cada letra deve estar no padrão zigue-zague:\n\n`
  
  for (let i = 0; i < rails; i++) {
    emptyPattern += `Trilho ${i + 1}: `
    for (let j = 0; j < text.length; j++) {
      if (fence[i][j] === '*') {
        emptyPattern += '[?] '
      } else {
        emptyPattern += ' .  '
      }
    }
    emptyPattern += '\n'
  }
  
  emptyPattern += `\nCada [?] representa uma posição que será preenchida.`
  
  steps.push({
    title: 'Passo 2: Mapeamento das Posições',
    description: `Primeiro descobrimos ONDE cada letra deve estar, seguindo o padrão zigue-zague de ${rails} trilhos.`,
    visual: emptyPattern
  })

  // Calcular quantas letras vão em cada trilho
  let railLengths = Array(rails).fill(0)
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < text.length; j++) {
      if (fence[i][j] === '*') {
        railLengths[i]++
      }
    }
  }

  let distributionInfo = 'Passo 3: Distribuição das Letras\n\nContamos quantas letras vão em cada trilho:\n\n'
  let startIdx = 0
  railLengths.forEach((len, idx) => {
    const endIdx = startIdx + len - 1
    distributionInfo += `Trilho ${idx + 1}: ${len} letras → posições ${startIdx}-${endIdx} do texto cifrado\n`
    distributionInfo += `           Letras: "${text.substring(startIdx, startIdx + len)}"\n\n`
    startIdx += len
  })

  steps.push({
    title: 'Passo 3: Divisão do Texto Cifrado',
    description: 'Dividimos o texto cifrado em partes, uma para cada trilho, baseado no padrão.',
    visual: distributionInfo
  })

  // Preencher a grade com o texto cifrado
  let index = 0
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < text.length; j++) {
      if (fence[i][j] === '*' && index < text.length) {
        fence[i][j] = text[index++]
      }
    }
  }

  let filledPattern = 'Passo 4: Grade Preenchida\n\nAgora preenchemos a grade com as letras:\n\n'
  
  for (let i = 0; i < rails; i++) {
    filledPattern += `Trilho ${i + 1}: `
    for (let j = 0; j < text.length; j++) {
      if (fence[i][j] && fence[i][j] !== '') {
        filledPattern += `[${fence[i][j]}] `
      } else {
        filledPattern += ' .  '
      }
    }
    filledPattern += '\n'
  }
  
  steps.push({
    title: 'Passo 4: Reconstrução da Grade',
    description: `Colocamos cada letra do texto cifrado na sua posição correspondente na grade.`,
    visual: filledPattern
  })

  // Ler em zigue-zague para descriptografar
  let decrypted = ''
  rail = 0
  direction = 1
  
  let readingProcess = 'Passo 5: Leitura em Zigue-Zague\n\nAgora lemos seguindo o padrão zigue-zague:\n\n'
  
  for (let i = 0; i < text.length; i++) {
    decrypted += fence[rail][i]
    readingProcess += `Posição ${i}: Trilho ${rail + 1} → letra "${fence[rail][i]}"\n`
    
    if (rail === 0) {
      direction = 1
    } else if (rail === rails - 1) {
      direction = -1
    }
    
    rail += direction
  }
  
  steps.push({
    title: 'Passo 5: Leitura do Texto Original',
    description: 'Para decifrar, lemos a grade seguindo o movimento zigue-zague, descendo e subindo pelos trilhos.',
    visual: readingProcess
  })

  let finalResult = `${'='.repeat(40)}\n`
  finalResult += `TEXTO DECIFRADO: ${decrypted}\n`
  finalResult += `${'='.repeat(40)}\n\n`
  finalResult += `Texto original recuperado com sucesso!`
  
  steps.push({
    title: 'Passo 6: Resultado Final',
    description: `Texto completamente decifrado! Recuperamos a mensagem original.`,
    visual: finalResult
  })

  return { result: decrypted, steps }
}
