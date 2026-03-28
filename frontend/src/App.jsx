// src/App.jsx
import { useState, useRef } from 'react'
import Sidebar       from './components/Sidebar.jsx'
import Topbar        from './components/Topbar.jsx'
import ViewProcess   from './components/ViewProcess.jsx'
import ViewHistory   from './components/ViewHistory.jsx'
import ViewReports   from './components/ViewReports.jsx'
import { initialValidationSteps } from './data/validationSteps.js'

export default function App() {
  const [activeTab, setActiveTab]           = useState('process')
  const [uploadState, setUploadState]       = useState('idle') // idle | uploading | processing | done
  const [progress, setProgress]             = useState(0)
  const [rightTab, setRightTab]             = useState('validacao')
  const [selectedDocument, setSelectedDocument] = useState('atestado')

  const fileInputRef = useRef(null)

  const [sitacArt, setSitacArt]       = useState('')
  const [isArtLinked, setIsArtLinked] = useState(false)

  const [validationSteps, setValidationSteps] = useState(initialValidationSteps)

  // ── Handlers ──────────────────────────────────────────

  const handleLinkArt = () => {
    if (sitacArt.trim() === '') setSitacArt('MA20250012345')
    setIsArtLinked(true)
  }

  const triggerFileSelect = () => {
    if (!isArtLinked) {
      alert('Atenção: Você precisa vincular a ART no Passo 1 primeiro para a IA saber com o que comparar!')
      return
    }
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) startProcessingSimulation()
  }

  const startProcessingSimulation = () => {
    setUploadState('uploading')
    setProgress(0)
    const uploadInterval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(uploadInterval)
          setUploadState('processing')
          simulateAIProcessing()
          return 100
        }
        return old + 20
      })
    }, 400)
  }

  const simulateAIProcessing = () => {
    setProgress(0)
    const processInterval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(processInterval)
          setUploadState('done')
          return 100
        }
        return old + 10
      })
    }, 300)
  }

  const resetProcess = () => {
    setUploadState('idle')
    setProgress(0)
    setRightTab('validacao')
    setIsArtLinked(false)
    setSitacArt('')
    setSelectedDocument('atestado')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleJustificationChange = (id, text) => {
    setValidationSteps((steps) =>
      steps.map((step) => step.id === id ? { ...step, justification: text } : step)
    )
  }

  const toggleComment = (id) => {
    setValidationSteps((steps) =>
      steps.map((step) => step.id === id ? { ...step, showComment: !step.showComment } : step)
    )
  }

  // ── Render ─────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <div className="flex-1 overflow-auto bg-slate-50 p-6 lg:p-8 custom-scrollbar">
          {activeTab === 'process' && (
            <ViewProcess
              uploadState={uploadState}
              progress={progress}
              sitacArt={sitacArt}
              setSitacArt={setSitacArt}
              isArtLinked={isArtLinked}
              setIsArtLinked={setIsArtLinked}
              handleLinkArt={handleLinkArt}
              fileInputRef={fileInputRef}
              triggerFileSelect={triggerFileSelect}
              handleFileChange={handleFileChange}
              resetProcess={resetProcess}
              rightTab={rightTab}
              setRightTab={setRightTab}
              validationSteps={validationSteps}
              toggleComment={toggleComment}
              handleJustificationChange={handleJustificationChange}
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
            />
          )}
          {activeTab === 'history' && <ViewHistory />}
          {activeTab === 'reports' && <ViewReports />}
        </div>
      </main>
    </div>
  )
}
