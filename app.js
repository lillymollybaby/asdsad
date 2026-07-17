const dialog = document.querySelector('#editor-dialog');
const form = document.querySelector('#editor-form');
const input = document.querySelector('#editor-input');
const title = document.querySelector('#editor-title');
const label = document.querySelector('#editor-label');
const amount = document.querySelector('#amount-value');
const name = document.querySelector('#recipient-name');
let activeEditor = 'amount';

const editorConfig = {
  amount: { title: 'Изменить сумму', label: 'Сумма в тенге', value: () => amount.textContent, inputMode: 'numeric' },
  name: { title: 'Изменить имя', label: 'Имя получателя', value: () => name.textContent, inputMode: 'text' }
};

document.querySelectorAll('.edit-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    activeEditor = trigger.dataset.editor;
    const config = editorConfig[activeEditor];
    title.textContent = config.title;
    label.textContent = config.label;
    input.value = config.value();
    input.inputMode = config.inputMode;
    dialog.showModal();
    input.focus();
    input.select();
  });
});

document.querySelector('.receipt').addEventListener('click', () => {
  window.location.href = 'receipt.html';
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
form.addEventListener('submit', event => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  if (activeEditor === 'amount') {
    amount.textContent = value.replace(/[^0-9]/g, '') || '0';
    localStorage.setItem('transfer-amount', amount.textContent);
  } else {
    name.textContent = value;
    localStorage.setItem('transfer-recipient', value);
  }
  dialog.close();
});

const storedAmount = localStorage.getItem('transfer-amount');
const storedName = localStorage.getItem('transfer-recipient');
if (storedAmount) amount.textContent = storedAmount;
if (storedName) name.textContent = storedName;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
