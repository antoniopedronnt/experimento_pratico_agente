import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import { ShuffledExam } from './shuffleService';
import { ExamHeader, TipoIdentificacao } from '../models';

interface PDFGenerationOptions {
  titulo: string;
  header: ExamHeader;
  tipoIdentificacao: TipoIdentificacao;
}

/**
 * Gera PDF de uma prova individual
 */
export function generateExamPDF(
  prova: ShuffledExam,
  options: PDFGenerationOptions
): Readable {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 }
  });

  let currentPage = 1;
  const totalPages = Math.ceil(prova.questoesEmbaralhadas.length / 3) + 1; // Estimativa

  // Função para adicionar cabeçalho
  const addHeader = () => {
    doc.fontSize(16).font('Helvetica-Bold').text(options.titulo, { align: 'center' });
    doc.moveDown(0.5);
    
    doc.fontSize(10).font('Helvetica');
    doc.text(`Disciplina: ${options.header.disciplina}`, 50, doc.y);
    doc.text(`Professor: ${options.header.professor}`, 300, doc.y - 12);
    doc.text(`Data: ${options.header.data}`, 50, doc.y);
    if (options.header.instituicao) {
      doc.text(`Instituição: ${options.header.instituicao}`, 300, doc.y - 12);
    }
    
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);
  };

  // Função para adicionar rodapé
  const addFooter = () => {
    const footerY = 780;
    doc.fontSize(9).font('Helvetica').text(
      `Prova Nº ${prova.numeroProva} - Página ${currentPage}`,
      50,
      footerY,
      { align: 'center' }
    );
  };

  // Adicionar cabeçalho inicial
  addHeader();

  // Adicionar questões
  prova.questoesEmbaralhadas.forEach((questao, qIndex) => {
    // Verificar se precisa de nova página
    if (doc.y > 650) {
      addFooter();
      doc.addPage();
      currentPage++;
      addHeader();
    }

    // Número da questão e enunciado
    doc.fontSize(11).font('Helvetica-Bold');
    doc.text(`Questão ${qIndex + 1}:`, { continued: false });
    doc.moveDown(0.3);
    
    doc.fontSize(10).font('Helvetica');
    doc.text(questao.questao.enunciado, { align: 'justify' });
    doc.moveDown(0.5);

    // Alternativas
    questao.alternativasEmbaralhadas.forEach(alt => {
      doc.text(
        `(${alt.novoIdentificador}) ${alt.alternativa.descricao}`,
        { indent: 20 }
      );
      doc.moveDown(0.3);
    });

    // Espaço para resposta
    doc.moveDown(0.5);
    doc.fontSize(9).font('Helvetica-Oblique');
    if (options.tipoIdentificacao === TipoIdentificacao.LETRAS) {
      doc.text('Resposta (indique as letras): ______________________________');
    } else {
      doc.text('Resposta (indique a soma): ______________________________');
    }
    doc.moveDown(1);
  });

  // Página final com dados do aluno
  addFooter();
  doc.addPage();
  currentPage++;
  addHeader();

  doc.fontSize(12).font('Helvetica-Bold');
  doc.text('IDENTIFICAÇÃO DO ALUNO', { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(11).font('Helvetica');
  doc.text('Nome completo:', 50, doc.y);
  doc.moveDown(0.3);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(2);

  doc.text('CPF:', 50, doc.y);
  doc.moveDown(0.3);
  doc.moveTo(50, doc.y).lineTo(300, doc.y).stroke();
  doc.moveDown(2);

  doc.text('Assinatura:', 50, doc.y);
  doc.moveDown(0.3);
  doc.moveTo(50, doc.y).lineTo(300, doc.y).stroke();

  addFooter();

  // Finalizar documento
  doc.end();

  return doc;
}

/**
 * Gera múltiplos PDFs
 */
export function generateMultiplePDFs(
  provas: ShuffledExam[],
  options: PDFGenerationOptions
): Readable[] {
  return provas.map(prova => generateExamPDF(prova, options));
}
