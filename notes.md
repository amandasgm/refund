# Refund App Frontend
## Iniciando
- Instalando o react: ```npm create vite@latest```
- Apagando pastas e limpando arquivos:
  - App.css (apagamos)
  - App.tsx (limpamos)
  - index.css (limpamos)
  - main.tsx (limpamos)
  - /public/... (limpamos)
  - /assets/... (limpamos)
  - eslint.config.js (apagamos)
- Apagamos todas as configuraçoes do esLint que vem instalado
- Trocando o favIcon no HTML
- Importando fonte no HTML

## Tailwind CSS
- INSTALANDO: ```npm install tailwindcss @tailwindcss/vite```
- CONFIGURANDO: dentro de vite.cofig.ts:    
  ```
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [tailwindcss()], 
  }) 

- IMPORTANDO NO CSS: dentro do index.css:
  - ```@import "tailwindcss"``` 

### Extensao para Tailwind
- Tailwind CSS Intelicense (ja ta instalado)

### Customizando estilo
- No index.css:
```
@theme {
  --color-gray-100: #1f2523;
  --color-gray-200: #4d5c57;
  --color-gray-300: #cdd5d2;
  --color-gray-400: #e4ece9;
  --color-gray-500: #f9fbfa;

  --color-green-100: #1f8459;
  --color-green-200: #2cb178;

  --default-font-family: "Open Sans", serif;

  --text-xxs: 0.625rem;
}
```
- Ou pegamos alguma classe ja existente no tailwind e passamos outro valor, ou criamos uma classe do zero, tipo --text-xxs

