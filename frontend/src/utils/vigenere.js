/**
 * Implementação do algoritmo Vigenère Cipher
 * Cifra de substituição polialfabética que usa uma palavra-chave
 */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function prepareKey(key) {
  // Remove espaços e converte para maiúsculas
  return key.replace(/\s/g, '').toUpperCase().replace(/[^A-Z]/g, '')
}

function prepareText(text) {
  // Remove espaços e converte para maiúsculas, mantém apenas letras
  return text.replace(/\s/g, '').toUpperCase().replace(/[^A-Z]/g, '')
}

function extendKey(text, key) {
  // Repete a chave até cobrir todo o texto
  let extendedKey = ''
  for (let i = 0; i < text.length; i++) {
    extendedKey += key[i % key.length]
  }
  return extendedKey
}

function getLetterPosition(letter) {
  return ALPHABET.indexOf(letter)
}

function getLetterFromPosition(position) {
  return ALPHABET[position % 26]
}

export function encryptVigenere(text, key) {
  if (!text || !key) {
    return { result: '', steps: [] }
  }

  const steps = []
  const originalText = text
  const originalKey = key
  
  // Passo 1: Preparação
  text = prepareText(text)
  key = prepareKey(key)
  
  if (key.length === 0) {
    return { result: '', steps: [{ title: 'Erro', description: 'A chave deve conter pelo menos uma letra!', visual: '' }] }
  }
  
  let preparationInfo = `Texto original: "${originalText}"\n`
  preparationInfo += `Chave original: "${originalKey}"\n\n`
  preparationInfo += `Regras aplicadas:\n`
  preparationInfo += `• Texto limpo (apenas letras): ${text}\n`
  preparationInfo += `• Chave limpa: ${key}\n`
  preparationInfo += `• Total de caracteres: ${text.length}`
  
  steps.push({
    title: 'Passo 1: Preparação',
    description: 'Removemos espaços e caracteres especiais, mantendo apenas letras maiúsculas.',
    visual: preparationInfo
  })

  // Passo 2: Estender a chave
  const extendedKey = extendKey(text, key)
  
  let keyExtension = `Passo 2: Extensão da Chave\n\n`
  keyExtension += `Chave original: ${key} (${key.length} letras)\n`
  keyExtension += `Texto tem: ${text.length} letras\n\n`
  keyExtension += `Repetimos a chave até cobrir todo o texto:\n\n`
  keyExtension += `Posição:  `
  for (let i = 0; i < text.length; i++) {
    keyExtension += `${i.toString().padStart(3)} `
  }
  keyExtension += `\nTexto:    `
  for (let i = 0; i < text.length; i++) {
    keyExtension += ` ${text[i]}  `
  }
  keyExtension += `\nChave:    `
  for (let i = 0; i < text.length; i++) {
    keyExtension += ` ${extendedKey[i]}  `
  }
  keyExtension += `\n\nChave estendida: ${extendedKey}`
  
  steps.push({
    title: 'Passo 2: Extensão da Chave',
    description: 'A chave é repetida até ter o mesmo tamanho do texto. Cada letra do texto será cifrada com a letra correspondente da chave.',
    visual: keyExtension
  })

  // Passo 3: Tabela de deslocamentos
  let shiftsTable = `Passo 3: Cálculo dos Deslocamentos\n\n`
  shiftsTable += `Cada letra da chave determina um DESLOCAMENTO no alfabeto:\n`
  shiftsTable += `A=0, B=1, C=2, ..., Z=25\n\n`
  shiftsTable += `Chave estendida: ${extendedKey}\n`
  shiftsTable += `Deslocamentos:   `
  
  const shifts = []
  for (let i = 0; i < extendedKey.length; i++) {
    const shift = getLetterPosition(extendedKey[i])
    shifts.push(shift)
    shiftsTable += `${shift.toString().padStart(2)} `
  }
  
  shiftsTable += `\n\nExemplo: Se a chave é 'C', deslocamos 2 posições (A→C, B→D, etc.)`
  
  steps.push({
    title: 'Passo 3: Deslocamentos da Chave',
    description: 'Convertemos cada letra da chave em um número que representa quantas posições vamos deslocar no alfabeto.',
    visual: shiftsTable
  })

  // Passo 4: Processo de cifragem detalhado
  let encrypted = ''
  let detailedProcess = `Passo 4: Cifragem Letra por Letra\n\n`
  detailedProcess += `Fórmula: (Texto + Chave) mod 26\n`
  detailedProcess += `${'='.repeat(60)}\n\n`
  
  for (let i = 0; i < text.length; i++) {
    const textLetter = text[i]
    const keyLetter = extendedKey[i]
    const textPos = getLetterPosition(textLetter)
    const keyPos = getLetterPosition(keyLetter)
    const encryptedPos = (textPos + keyPos) % 26
    const encryptedLetter = getLetterFromPosition(encryptedPos)
    
    encrypted += encryptedLetter
    
    detailedProcess += `Posição ${i}:\n`
    detailedProcess += `  Texto: ${textLetter} (posição ${textPos})\n`
    detailedProcess += `  Chave: ${keyLetter} (deslocamento ${keyPos})\n`
    detailedProcess += `  Cálculo: ${textPos} + ${keyPos} = ${textPos + keyPos}`
    if (textPos + keyPos >= 26) {
      detailedProcess += ` → ${encryptedPos} (mod 26)\n`
    } else {
      detailedProcess += `\n`
    }
    detailedProcess += `  Resultado: ${encryptedLetter}\n`
    detailedProcess += `  Alfabeto: `
    
    // Mostrar alfabeto com destaque
    for (let j = 0; j < 26; j++) {
      if (j === textPos) {
        detailedProcess += `[${ALPHABET[j]}]`
      } else if (j === encryptedPos) {
        detailedProcess += `{${ALPHABET[j]}}`
      } else {
        detailedProcess += ` ${ALPHABET[j]} `
      }
    }
    detailedProcess += `\n            [origem] → {destino}\n\n`
  }
  
  steps.push({
    title: 'Passo 4: Cifragem Detalhada',
    description: 'Cada letra do texto é deslocada no alfabeto de acordo com a letra correspondente da chave. Se passar de Z, voltamos para A.',
    visual: detailedProcess
  })

  // Passo 5: Visualização da transformação
  let transformationView = `Passo 5: Visualização Completa da Transformação\n\n`
  transformationView += `Texto original:  ${text.split('').join(' ')}\n`
  transformationView += `Chave estendida: ${extendedKey.split('').join(' ')}\n`
  transformationView += `Deslocamentos:   ${shifts.map(s => s.toString().padStart(2)).join(' ')}\n`
  transformationView += `Texto cifrado:   ${encrypted.split('').join(' ')}\n\n`
  transformationView += `Transformações:\n`
  
  for (let i = 0; i < text.length; i++) {
    transformationView += `${text[i]} + ${extendedKey[i]} → ${encrypted[i]}`
    if ((i + 1) % 5 === 0) transformationView += '\n'
    else transformationView += '  |  '
  }
  
  steps.push({
    title: 'Passo 5: Visão Geral',
    description: 'Resumo de todas as transformações realizadas.',
    visual: transformationView
  })

  // Passo 6: Resultado final
  let finalResult = `${'='.repeat(60)}\n`
  finalResult += `TEXTO ORIGINAL:  ${text}\n`
  finalResult += `CHAVE USADA:     ${key} (repetida como ${extendedKey})\n`
  finalResult += `TEXTO CIFRADO:   ${encrypted}\n`
  finalResult += `${'='.repeat(60)}\n\n`
  finalResult += `✅ Criptografia concluída com sucesso!\n`
  finalResult += `📊 ${text.length} letras cifradas`
  
  steps.push({
    title: 'Passo 6: Resultado Final',
    description: 'Texto completamente criptografado usando a cifra de Vigenère!',
    visual: finalResult
  })

  return { result: encrypted, steps }
}

export function decryptVigenere(text, key) {
  if (!text || !key) {
    return { result: '', steps: [] }
  }

  const steps = []
  const originalCipher = text
  const originalKey = key
  
  // Passo 1: Preparação
  text = prepareText(text)
  key = prepareKey(key)
  
  if (key.length === 0) {
    return { result: '', steps: [{ title: 'Erro', description: 'A chave deve conter pelo menos uma letra!', visual: '' }] }
  }
  
  let preparationInfo = `Texto cifrado: "${originalCipher}"\n`
  preparationInfo += `Chave: "${originalKey}"\n\n`
  preparationInfo += `⚠️ IMPORTANTE: Use a MESMA chave da criptografia!\n\n`
  preparationInfo += `Texto limpo: ${text}\n`
  preparationInfo += `Chave limpa: ${key}\n`
  preparationInfo += `Total de caracteres: ${text.length}`
  
  steps.push({
    title: 'Passo 1: Preparação',
    description: 'Para decifrar, precisamos da MESMA chave usada na criptografia!',
    visual: preparationInfo
  })

  // Passo 2: Estender a chave
  const extendedKey = extendKey(text, key)
  
  let keyExtension = `Passo 2: Extensão da Chave\n\n`
  keyExtension += `Assim como na criptografia, repetimos a chave:\n\n`
  keyExtension += `Posição:  `
  for (let i = 0; i < text.length; i++) {
    keyExtension += `${i.toString().padStart(3)} `
  }
  keyExtension += `\nCifrado:  `
  for (let i = 0; i < text.length; i++) {
    keyExtension += ` ${text[i]}  `
  }
  keyExtension += `\nChave:    `
  for (let i = 0; i < text.length; i++) {
    keyExtension += ` ${extendedKey[i]}  `
  }
  keyExtension += `\n\nChave estendida: ${extendedKey}`
  
  steps.push({
    title: 'Passo 2: Extensão da Chave',
    description: 'Repetimos a chave para cobrir todo o texto cifrado.',
    visual: keyExtension
  })

  // Passo 3: Tabela de deslocamentos
  let shiftsTable = `Passo 3: Deslocamentos INVERSOS\n\n`
  shiftsTable += `Para DECIFRAR, fazemos o processo INVERSO:\n`
  shiftsTable += `Subtraímos ao invés de somar!\n\n`
  shiftsTable += `Chave estendida: ${extendedKey}\n`
  shiftsTable += `Deslocamentos:   `
  
  const shifts = []
  for (let i = 0; i < extendedKey.length; i++) {
    const shift = getLetterPosition(extendedKey[i])
    shifts.push(shift)
    shiftsTable += `${shift.toString().padStart(2)} `
  }
  
  shiftsTable += `\n\nEm vez de AVANÇAR no alfabeto, vamos VOLTAR!`
  
  steps.push({
    title: 'Passo 3: Deslocamentos Inversos',
    description: 'Os deslocamentos são os mesmos, mas agora vamos SUBTRAIR em vez de somar.',
    visual: shiftsTable
  })

  // Passo 4: Processo de decifragem detalhado
  let decrypted = ''
  let detailedProcess = `Passo 4: Decifragem Letra por Letra\n\n`
  detailedProcess += `Fórmula INVERSA: (Cifrado - Chave + 26) mod 26\n`
  detailedProcess += `O +26 garante que não temos números negativos\n`
  detailedProcess += `${'='.repeat(60)}\n\n`
  
  for (let i = 0; i < text.length; i++) {
    const cipherLetter = text[i]
    const keyLetter = extendedKey[i]
    const cipherPos = getLetterPosition(cipherLetter)
    const keyPos = getLetterPosition(keyLetter)
    const decryptedPos = (cipherPos - keyPos + 26) % 26
    const decryptedLetter = getLetterFromPosition(decryptedPos)
    
    decrypted += decryptedLetter
    
    detailedProcess += `Posição ${i}:\n`
    detailedProcess += `  Cifrado: ${cipherLetter} (posição ${cipherPos})\n`
    detailedProcess += `  Chave: ${keyLetter} (deslocamento ${keyPos})\n`
    detailedProcess += `  Cálculo: ${cipherPos} - ${keyPos} = ${cipherPos - keyPos}`
    if (cipherPos - keyPos < 0) {
      detailedProcess += ` + 26 = ${cipherPos - keyPos + 26}`
    }
    detailedProcess += ` → ${decryptedPos}\n`
    detailedProcess += `  Resultado: ${decryptedLetter}\n`
    detailedProcess += `  Alfabeto: `
    
    // Mostrar alfabeto com destaque
    for (let j = 0; j < 26; j++) {
      if (j === cipherPos) {
        detailedProcess += `[${ALPHABET[j]}]`
      } else if (j === decryptedPos) {
        detailedProcess += `{${ALPHABET[j]}}`
      } else {
        detailedProcess += ` ${ALPHABET[j]} `
      }
    }
    detailedProcess += `\n            [origem] → {destino}\n\n`
  }
  
  steps.push({
    title: 'Passo 4: Decifragem Detalhada',
    description: 'Cada letra cifrada é "voltada" no alfabeto de acordo com a chave. O +26 garante que não temos valores negativos.',
    visual: detailedProcess
  })

  // Passo 5: Visualização da transformação
  let transformationView = `Passo 5: Visualização Completa da Decifragem\n\n`
  transformationView += `Texto cifrado:    ${text.split('').join(' ')}\n`
  transformationView += `Chave estendida:  ${extendedKey.split('').join(' ')}\n`
  transformationView += `Deslocamentos:    ${shifts.map(s => s.toString().padStart(2)).join(' ')}\n`
  transformationView += `Texto decifrado:  ${decrypted.split('').join(' ')}\n\n`
  transformationView += `Transformações:\n`
  
  for (let i = 0; i < text.length; i++) {
    transformationView += `${text[i]} - ${extendedKey[i]} → ${decrypted[i]}`
    if ((i + 1) % 5 === 0) transformationView += '\n'
    else transformationView += '  |  '
  }
  
  steps.push({
    title: 'Passo 5: Visão Geral',
    description: 'Resumo de todas as transformações inversas realizadas.',
    visual: transformationView
  })

  // Passo 6: Resultado final
  let finalResult = `${'='.repeat(60)}\n`
  finalResult += `TEXTO CIFRADO:   ${text}\n`
  finalResult += `CHAVE USADA:     ${key} (repetida como ${extendedKey})\n`
  finalResult += `TEXTO DECIFRADO: ${decrypted}\n`
  finalResult += `${'='.repeat(60)}\n\n`
  finalResult += `✅ Decifragem concluída com sucesso!\n`
  finalResult += `📊 ${text.length} letras decifradas\n\n`
  finalResult += `💡 Mensagem original recuperada!`
  
  steps.push({
    title: 'Passo 6: Resultado Final',
    description: 'Texto completamente decifrado! Mensagem original recuperada.',
    visual: finalResult
  })

  return { result: decrypted, steps }
}

