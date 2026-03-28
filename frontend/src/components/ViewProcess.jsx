// src/components/ViewProcess.jsx
import StepSitac       from './StepSitac.jsx'
import StepUpload      from './StepUpload.jsx'
import ProcessingState from './ProcessingState.jsx'
import DocumentViewer  from './DocumentViewer.jsx'
import AutomaticReview from './AutomaticReview.jsx'
import { documents }   from '../data/documents.js'

export default function ViewProcess({
  uploadState, progress,
  sitacArt, setSitacArt,
  isArtLinked, setIsArtLinked, handleLinkArt,
  fileInputRef, triggerFileSelect, handleFileChange,
  resetProcess,
  rightTab, setRightTab,
  validationSteps, toggleComment, handleJustificationChange,
  selectedDocument, setSelectedDocument,
}) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full min-h-[600px] fade-in">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Validação de Atestado Técnico e ART</h1>
          <p className="text-slate-500 mt-1">
            Cruze os PDFs comprobatórios diretamente com a página da ART no sistema do CREA.
          </p>
        </div>
        {uploadState === 'done' && (
          <button
            onClick={resetProcess}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
          >
            Nova Análise
          </button>
        )}
      </div>

      {uploadState === 'idle' && (
        <div className="flex flex-col space-y-6">
          <StepSitac
            sitacArt={sitacArt} setSitacArt={setSitacArt}
            isArtLinked={isArtLinked} setIsArtLinked={setIsArtLinked}
            handleLinkArt={handleLinkArt}
          />
          <StepUpload
            isArtLinked={isArtLinked}
            fileInputRef={fileInputRef}
            triggerFileSelect={triggerFileSelect}
            handleFileChange={handleFileChange}
          />
        </div>
      )}

      {(uploadState === 'uploading' || uploadState === 'processing') && (
        <ProcessingState uploadState={uploadState} progress={progress} />
      )}

      {uploadState === 'done' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in h-full">
          <DocumentViewer
            documents={documents}
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
          />
          <AutomaticReview
            rightTab={rightTab} setRightTab={setRightTab}
            validationSteps={validationSteps}
            toggleComment={toggleComment}
            handleJustificationChange={handleJustificationChange}
          />
        </div>
      )}
    </div>
  )
}
