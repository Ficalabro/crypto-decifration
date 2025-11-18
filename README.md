# 🔒 Crypto Decifration

Aplicação web para exploração e demonstração de algoritmos clássicos de criptografia, desenvolvida com React.

## 📋 Sobre o Projeto

Este projeto é uma ferramenta educacional interativa que permite visualizar e entender o funcionamento de algoritmos clássicos de criptografia através de uma interface moderna e intuitiva.

### Algoritmos Implementados

1. **Rail Fence Cipher** 🚂
   - Cifra de transposição que organiza o texto em formato de zigue-zague
   - Suporta configuração de número de trilhos (rails)
   - Visualização passo a passo da construção da grade

2. **Playfair Cipher** 🔐
   - Cifra de substituição que usa uma matriz 5x5
   - Criptografa pares de letras
   - Customização da chave de criptografia
   - Visualização da matriz e processo de cifragem

3. **Cifra de Vigenère** 🔤
   - Cifra polialfabética com palavra-chave
   - Cada letra da chave determina um deslocamento diferente
   - Visualização dos deslocamentos e cálculos
   - Processo de cifragem letra por letra explicado
   - Conhecida como "cifra indecifrável" por 300 anos
   - 📖 **[Documentação Completa do Vigenère](VIGENERE.md)**

## 🚀 Como Executar

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

⚡ **[Ver Guia de Início Rápido](INICIO_RAPIDO.md)**

## 🏗️ Estrutura do Projeto

```
crypto-decifration/
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas dos algoritmos
│   │   ├── utils/         # Lógica dos algoritmos
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 Tecnologias Utilizadas

- **React** 18.2.0 - Biblioteca para construção da interface
- **Vite** 5.0.8 - Build tool e dev server
- **React Router** 6.20.0 - Gerenciamento de rotas
- **CSS3** - Estilização com variáveis CSS e gradientes

## ✨ Funcionalidades

- ✅ Interface moderna e responsiva
- ✅ Seção informativa em cada algoritmo (história e funcionamento)
- ✅ Visualização passo a passo dos algoritmos
- ✅ Suporte para criptografia e descriptografia
- ✅ Design dark mode
- ✅ Animações e transições suaves
- ✅ Feedback visual detalhado

## 📚 Aprendizado

Cada algoritmo inclui:
- **Explicação visual do processo** com coordenadas e índices
- **Passo a passo MUITO detalhado** (4-6 etapas por operação)
- **Visualizações textuais** de grades e matrizes
- **Exemplos pré-carregados** para teste rápido
- **Entrada e saída de dados** com informações em tempo real
- **Parâmetros configuráveis** (trilhos, chaves)

### 🎓 Recursos Didáticos

- ✅ **Visualização completa** das estruturas (grades, matrizes)
- ✅ **Coordenadas e índices** para facilitar o entendimento
- ✅ **Explicação de cada regra** antes de aplicar
- ✅ **Transformações detalhadas** letra por letra
- ✅ **Diferenças entre criptografar e descriptografar** claramente explicadas
- ✅ **Botão de exemplo** para começar rapidamente

📖 **[Ver Melhorias Didáticas Completas](MELHORIAS_DIDATICAS.md)**

## 📚 Documentação Adicional

- 📊 **[Resumo do Projeto](RESUMO_PROJETO.md)** - Visão geral executiva
- 📖 **[Instruções Detalhadas de Uso](frontend/INSTRUCOES.md)** - Como usar cada algoritmo
- 🏗️ **[Estrutura do Projeto](ESTRUTURA.md)** - Arquitetura e organização
- 🎓 **[Melhorias Didáticas](MELHORIAS_DIDATICAS.md)** - Detalhes das melhorias educacionais
- 📚 **[Contexto Histórico](CONTEXTO_HISTORICO.md)** - História e evolução das cifras
- 🔤 **[Documentação Vigenère](VIGENERE.md)** - História e funcionamento completo

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📝 Licença

Este projeto é desenvolvido para fins educacionais.