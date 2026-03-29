export function analisarProcessoMock(files) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "Processamento concluído",
        checklist: [
          { regra: "Contrato separado do atestado", ok: true },
          { regra: "ART vinculada corretamente", ok: true },
          { regra: "Datas compatíveis", ok: false },
          { regra: "Empresa contratada informada", ok: true },
          { regra: "Atestado assinado", ok: true },
          { regra: "Compatibilidade contrato x atestado", ok: false },
        ],
        relatorio: {
          aprovado: false,
          mensagem: "Pendências encontradas no processo",
        },
      });
    }, 2000);
  });
}