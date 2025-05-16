
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const modal = document.getElementById('confirmation-modal');
  const yesBtn = document.getElementById('confirm-yes');
  const noBtn = document.getElementById('confirm-no');

  let lastFocused;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop submit
    lastFocused = document.activeElement;
    openModal();
  });

  function openModal() {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    yesBtn.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocused) lastFocused.focus();
  }

  yesBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    form.submit();
  });

  noBtn.addEventListener('click', () => {
    closeModal();
  });

  // Gestion clavier : Entrée / Échap
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        form.submit();
      }
    }
  });
});
