// src/App.jsx
import React, { useState, useRef } from 'react'
import ViewProcess from './components/ViewProcess'
import { initialValidationSteps } from './data/validationSteps'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) 

  const [activeMenu, setActiveMenu] = useState('analise') 
  const [uploadState, setUploadState] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [selectedDocument, setSelectedDocument] = useState('atestado')
  const fileInputRef = useRef(null)
  const [documents, setDocuments] = useState([])
  
  const [validationSteps, setValidationSteps] = useState(initialValidationSteps)
  const [artData, setArtData] = useState(null)
  const [artNumber, setArtNumber] = useState('')

  // ESTADO NOVO: Controle do envio do relatório
  const [reportStatus, setReportStatus] = useState('idle') // 'idle', 'sending', 'sent'

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  const fetchArtData = (numero) => {
    if (!numero) return;
    setTimeout(() => {
      setArtData({ profissional: 'Eng. Carlos Eduardo Silva' });
      setArtNumber(numero);
    }, 500); 
  }

  const triggerFileSelect = () => { 
    if (fileInputRef.current) fileInputRef.current.click() 
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (!files || files.length === 0 || !artNumber) return

    setUploadState('uploading')
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadState('done')
          
          setDocuments([
            { id: 'atestado', name: 'Atestado Técnico' },
            { id: 'pagina_art', name: 'Página da ART' },
            { id: 'contrato', name: 'Contrato' },
            { id: 'declaracao', name: 'Declaração' },
            { id: 'laudo', name: 'Laudo Técnico' },
            { id: 'art_laudo', name: 'ART do Laudo' }
          ])

          setValidationSteps(steps => steps.map(step => {
            if (step.id === 4) return { ...step, status: 'error', showComment: true };
            if (step.id === 6) return { ...step, status: 'error', showComment: true };
            return step;
          }))

          return 100
        }
        return prev + 20 
      })
    }, 400) 
  }

  const resetProcess = () => {
    setUploadState('idle')
    setProgress(0)
    setDocuments([])
    setArtData(null)
    setArtNumber('')
    setSelectedDocument('atestado')
    setReportStatus('idle') // Reseta o botão de enviar relatório
    setValidationSteps(initialValidationSteps.map(step => ({ ...step, justification: step.justification, showComment: step.status === 'error' })))
  }

  const toggleComment = (id) => {
    setValidationSteps(steps => steps.map(step => step.id === id ? { ...step, showComment: !step.showComment } : step))
  }

  const handleJustificationChange = (id, text) => {
    setValidationSteps(steps => steps.map(step => step.id === id ? { ...step, justification: text } : step))
  }

  // FUNÇÃO NOVA: Simula o envio do relatório
  const handleSendReport = () => {
    setReportStatus('sending');
    setTimeout(() => {
      setReportStatus('sent');
    }, 1500); // Demora 1.5 segundos simulando envio
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 relative">
      <ViewProcess
        isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} 
        activeMenu={activeMenu} setActiveMenu={setActiveMenu}
        uploadState={uploadState} progress={progress} fileInputRef={fileInputRef}
        triggerFileSelect={triggerFileSelect} handleFileChange={handleFileChange}
        resetProcess={resetProcess} validationSteps={validationSteps} 
        toggleComment={toggleComment} handleJustificationChange={handleJustificationChange}
        selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} documents={documents}
        artData={artData} fetchArtData={fetchArtData}
        reportStatus={reportStatus} handleSendReport={handleSendReport} /* Props Novas */
      />
    </div>
  )
}