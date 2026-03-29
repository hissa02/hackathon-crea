// src/App.jsx
import React, { useState, useRef } from 'react'
import ViewProcess from './components/ViewProcess'
import { initialValidationSteps } from './data/validationSteps'
import { analisarProcessoMock } from './services/mockService'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const [activeMenu, setActiveMenu] = useState('analise')
  const [uploadState, setUploadState] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const fileInputRef = useRef(null)
  const [documents, setDocuments] = useState([])

  const [validationSteps, setValidationSteps] = useState(initialValidationSteps)
  const [artData, setArtData] = useState(null)
  const [artNumber, setArtNumber] = useState('')

  const [reportStatus, setReportStatus] = useState('idle')

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const fetchArtData = (numero) => {
    if (!numero) return
    setTimeout(() => {
      setArtData({ profissional: 'Eng.  Marcelo Ribeiro Costa ' })
      setArtNumber(numero)
    }, 500)
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

          const docs = Array.from(files).map((file, index) => ({
            id: index,
            name: file.name,
            file: file,
            url: URL.createObjectURL(file)
          }))

          setDocuments(docs)
          setSelectedDocument(docs[0]?.id)

          analisarProcessoMock(docs).then((resultado) => {
            setValidationSteps(steps =>
              steps.map((step, index) => {
                const mock = resultado.checklist[index]
                if (!mock) return step

                return {
                  ...step,
                  status: mock.ok ? 'pass' : 'error',
                  showComment: !mock.ok,
                  justification: mock.ok ? '' : 'Inconsistência encontrada automaticamente'
                }
              })
            )
          })

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
    setSelectedDocument(null)
    setReportStatus('idle')

    setValidationSteps(
      initialValidationSteps.map(step => ({
        ...step,
        justification: step.justification,
        showComment: step.status === 'error'
      }))
    )
  }

  const toggleComment = (id) => {
    setValidationSteps(steps =>
      steps.map(step =>
        step.id === id
          ? { ...step, showComment: !step.showComment }
          : step
      )
    )
  }

  const handleJustificationChange = (id, text) => {
    setValidationSteps(steps =>
      steps.map(step =>
        step.id === id
          ? { ...step, justification: text }
          : step
      )
    )
  }

  const handleSendReport = () => {
    setReportStatus('sending')
    setTimeout(() => {
      setReportStatus('sent')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 relative">
      <ViewProcess
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        uploadState={uploadState}
        progress={progress}
        fileInputRef={fileInputRef}
        triggerFileSelect={triggerFileSelect}
        handleFileChange={handleFileChange}
        resetProcess={resetProcess}
        validationSteps={validationSteps}
        toggleComment={toggleComment}
        handleJustificationChange={handleJustificationChange}
        selectedDocument={selectedDocument}
        setSelectedDocument={setSelectedDocument}
        documents={documents}
        artData={artData}
        fetchArtData={fetchArtData}
        reportStatus={reportStatus}
        handleSendReport={handleSendReport}
      />
    </div>
  )
}