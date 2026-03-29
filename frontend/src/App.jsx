import React, { useState, useRef } from 'react';
import ViewProcess from './components/ViewProcess';

function App() {
  // --- ESTADOS GLOBAIS DO PROCESSO ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('analise');
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, done
  const [progress, setProgress] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [artData, setArtData] = useState(null); // Dados REAIS vindos do HTML
  const [reportStatus, setReportStatus] = useState('idle'); // idle, sending, sent

  // Referência para o input de arquivo escondido
  const fileInputRef = useRef(null);

  // --- PASSOS DE VALIDAÇÃO (SIMULADOS PELA IA) ---
  const [validationSteps, setValidationSteps] = useState([
    { 
      id: 1, 
      title: 'Vigência da ART', 
      desc: 'Verificando se a ART está baixada ou ativa no sistema SITAC.', 
      status: 'pass', 
      showComment: false, 
      justification: '' 
    },
    { 
      id: 2, 
      title: 'Coerência de Atividades', 
      desc: 'Cruzando atividades da ART com as descritas no Atestado Técnico.', 
      status: 'error', 
      showComment: true, 
      justification: 'A quantidade de alvenaria no atestado (200m²) diverge da ART (250m²).' 
    },
    { 
      id: 3, 
      title: 'Assinaturas Digitais', 
      desc: 'Validando autenticidade das assinaturas do contratante e profissional.', 
      status: 'pass', 
      showComment: false, 
      justification: '' 
    }
  ]);

  // --- FUNÇÕES DE LÓGICA ---

  // 1. BUSCA REAL DA ART NO BACKEND
  const fetchArtData = async (numero) => {
    if (!numero) return alert("Por favor, digite o número da ART.");

    try {
      const response = await fetch(`http://localhost:3001/api/art/${numero}`);
      const data = await response.json();

      if (data.success) {
        // Define os dados extraídos do HTML real
        setArtData({
          numero_art: data.numero_art,
          profissional: data.profissional,
          status: data.status
        });
        console.log("ART Localizada:", data.profissional);
      } else {
        alert(data.message);
        setArtData(null);
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      alert("Erro ao conectar com o servidor. Verifique se o backend está rodando na porta 3001.");
    }
  };

  // 2. CONTROLE DE UPLOAD
  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadState('uploading');
    
    // Simulação de progresso de upload
    let interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('done');
          
          // Cria as URLs para visualização no Iframe
          const newDocs = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            url: URL.createObjectURL(file)
          }));
          
          setDocuments(newDocs);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // 3. RESETAR O PROCESSO
  const resetProcess = () => {
    setUploadState('idle');
    setProgress(0);
    setDocuments([]);
    setArtData(null);
    setSelectedDocument(null);
  };

  // 4. AÇÕES DO ANALISTA
  const toggleComment = (id) => {
    setValidationSteps(steps => steps.map(s => 
      s.id === id ? { ...s, showComment: !s.showComment } : s
    ));
  };

  const handleJustificationChange = (id, text) => {
    setValidationSteps(steps => steps.map(s => 
      s.id === id ? { ...s, justification: text } : s
    ));
  };

  const handleSendReport = () => {
    setReportStatus('sending');
    setTimeout(() => setReportStatus('sent'), 1500);
  };

  // --- RENDERIZAÇÃO ---
  return (
    <ViewProcess 
      // Estados
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      uploadState={uploadState}
      progress={progress}
      fileInputRef={fileInputRef}
      documents={documents}
      selectedDocument={selectedDocument}
      setSelectedDocument={setSelectedDocument}
      artData={artData}
      validationSteps={validationSteps}
      reportStatus={reportStatus}
      
      // Funções
      triggerFileSelect={triggerFileSelect}
      handleFileChange={handleFileChange}
      fetchArtData={fetchArtData}
      resetProcess={resetProcess}
      toggleComment={toggleComment}
      handleJustificationChange={handleJustificationChange}
      handleSendReport={handleSendReport}
    />
  );
}

export default App;