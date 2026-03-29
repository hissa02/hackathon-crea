const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { JSDOM } = require('jsdom'); // Para ler o HTML real

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/art/:numero', (req, res) => {
  const numeroArt = req.params.numero;
  // Caminho para a pasta que você mostrou na imagem
  const filePath = path.join(__dirname, '..', 'banco_de_dados_da_ART', `${numeroArt}.html`);

  if (fs.existsSync(filePath)) {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    // EXTRAÇÃO REAL DOS DADOS DO HTML
    // Buscando o nome do profissional (geralmente está na seção 1 em negrito)
    const nomeProfissional = document.querySelector('.section-title + .row b')?.textContent || "Não identificado";
    
    // Buscando o número da ART no cabeçalho
    const headerRight = document.querySelector('.header-right')?.textContent || "";
    const numeroEncontrado = headerRight.match(/Nº\s+(\w+)/)?.[1] || numeroArt;

    res.json({
      success: true,
      numero_art: numeroEncontrado,
      profissional: nomeProfissional,
      status: "REGISTRADA",
      // O caminho para o iframe carregar do frontend/public
      url_html: `/banco_de_dados_da_ART/${numeroArt}.html`
    });
  } else {
    res.status(404).json({
      success: false,
      message: `ART ${numeroArt} não localizada no banco de dados físico.`
    });
  }
});

app.listen(3001, () => console.log("🚀 Server Real rodando na porta 3001"));