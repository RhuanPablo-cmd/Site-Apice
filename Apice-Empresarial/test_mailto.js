// Test script to reproduce mailto URL generation from contato.js
const selected = [
  { name: 'NR10 – Segurança Elétrica', price: 300 },
  { name: 'Direção Defensiva', price: 200 }
];
const nome = 'João Silva';
const email = 'joao@example.com';
const telefone = '(31) 9 9999-9999';
const cpf = '000.000.000-00';
const cnpj = '';
const assunto = 'Solicitar Orçamento';
const mensagem = 'Olá, gostaria de informações sobre turmas e valores.';
const total = 'R$ 500,00';

let coursesText = 'Nenhum curso selecionado.';
if (selected.length) {
  coursesText = selected.map(c => `${c.name} - R$ ${c.price.toFixed(2).replace('.', ',')}`).join('\n');
}

const bodyLines = [
  `Nome: ${nome}`,
  `E-mail do remetente: ${email}`,
  `Telefone: ${telefone}`,
  `CPF: ${cpf}`,
  `CNPJ: ${cnpj}`,
  `Assunto: ${assunto}`,
  '',
  'Mensagem:',
  mensagem,
  '',
  'Cursos de interesse:',
  coursesText,
  '',
  `Total estimado: ${total}`
];

const subject = `Contato - ${assunto} - ${nome}`;
const body = encodeURIComponent(bodyLines.join('\n'));
const to = 'apiceempresarial@gmail.com';
const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;

console.log('--- Generated mailto URL ---');
console.log(mailto);
console.log('\n--- Decoded subject ---');
console.log(decodeURIComponent(encodeURIComponent(subject)));
console.log('\n--- Decoded body ---');
console.log(decodeURIComponent(body));
