// src/data/validationSteps.js
export const initialValidationSteps = [
  {
    id: 1,
    title: '1. Data do Atestado',
    desc: 'A data de expedição foi identificada e é posterior ao período da obra.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 2,
    title: '2. Responsável Técnico',
    desc: 'O nome do responsável técnico e a titulação conferem exatamente com a ART vinculada.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 3,
    title: '3. Contratante (Empresa ou Pessoa Física)',
    desc: 'A empresa contratada foi verificada no atestado e na ART. Identificada como Pessoa Jurídica.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 4,
    title: '4. Endereço da Obra',
    desc: 'DIVERGÊNCIA ENCONTRADA: O Atestado indica "Rua das Flores, 100", mas a ART indica "Avenida Principal, S/N". Ação sugerida: INVALIDAR.',
    status: 'error', justification: '', showComment: true,
  },
  {
    id: 5,
    title: '5. Período da Obra',
    desc: 'O período executado no atestado é igual ou está contido no período da ART.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 6,
    title: '6. Serviço Executado',
    desc: 'Os serviços listados no atestado possuem o mesmo sentido técnico da observação da ART.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 7,
    title: '7. Assinatura do Documento',
    desc: 'Assinatura digital ICP-Brasil validada e clicável no PDF.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 8,
    title: '8. Laudo Técnico (se houver)',
    desc: 'Nenhum laudo técnico identificado neste upload (Não é obrigatório para este serviço).',
    status: 'neutral', justification: '', showComment: false,
  },
  {
    id: 9,
    title: '9. Separação de Documentos',
    desc: 'O Atestado e o Contrato estão devidamente separados em PDFs distintos.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 10,
    title: '10. Coerência entre Contrato e Atestado',
    desc: 'O serviço, o período e as partes envolvidas condizem perfeitamente entre os arquivos.',
    status: 'pass', justification: '', showComment: false,
  },
  {
    id: 11,
    title: '11. Verificação Externa (Google)',
    desc: 'Foram encontrados indícios da obra realizada através de pesquisa no Google, compatíveis com o período da ART.',
    status: 'pass', justification: '', showComment: false,
  },
]
