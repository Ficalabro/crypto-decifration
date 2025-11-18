# Crypto Decifration - Frontend

Frontend em React para exploração de algoritmos clássicos de criptografia.

## 🚀 Tecnologias

- **React** 18.2.0
- **Vite** 5.0.8
- **React Router** 6.20.0

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Home.jsx       # Página inicial
│   │   ├── AlgorithmCard.jsx  # Card de algoritmo
│   │   └── CipherPage.jsx # Template de página de cifra
│   ├── pages/             # Páginas específicas
│   │   ├── RailFence.jsx  # Página Rail Fence
│   │   └── Playfair.jsx   # Página Playfair
│   ├── utils/             # Lógica dos algoritmos
│   │   ├── railFence.js   # Algoritmo Rail Fence
│   │   └── playfair.js    # Algoritmo Playfair
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos globais
│   ├── main.jsx           # Ponto de entrada
│   └── index.css          # Estilos base
├── index.html
├── vite.config.js
└── package.json
```

## 🔐 Algoritmos Implementados

### Rail Fence Cipher
Cifra de transposição que organiza o texto em um padrão de zigue-zague através de múltiplos "trilhos".

### Playfair Cipher
Cifra de substituição que utiliza uma matriz 5x5 para criptografar pares de letras.

## 🎨 Recursos

- Interface moderna e responsiva
- Visualização passo a passo dos algoritmos
- Suporte para criptografia e descriptografia
- Design dark mode com gradientes
- Animações e transições suaves

## 📝 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

