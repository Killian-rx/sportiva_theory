document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return; // exit if there is no form on this page
  const modal = document.getElementById('confirmation-modal');
  const yesBtn = document.getElementById('confirm-yes');
  const noBtn = document.getElementById('confirm-no');

  // form fields and error containers
  const nom = document.getElementById('nom');
  const prenom = document.getElementById('prenom');
  const email = document.getElementById('email');
  const telephone = document.getElementById('telephone');
  const message = document.getElementById('message');
  const nomError = document.getElementById('nom-error');
  const prenomError = document.getElementById('prenom-error');
  const emailError = document.getElementById('email-error');
  const telephoneError = document.getElementById('telephone-error');
  const messageError = document.getElementById('message-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop default submit
    // clear previous errors
    [nomError, prenomError, emailError, telephoneError, messageError].forEach(el => el.textContent = '');
    [nom, prenom, email, telephone, message].forEach(field => field.removeAttribute('aria-invalid'));

    let isValid = true;
    // name regex: letters, accents, spaces, hyphens
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
    if (!namePattern.test(nom.value.trim())) {
      nomError.textContent = 'Veuillez entrer un nom valide (au moins 2 lettres).';
      nom.setAttribute('aria-invalid', 'true');
      isValid = false;
    }
    if (!namePattern.test(prenom.value.trim())) {
      prenomError.textContent = 'Veuillez entrer un prénom valide (au moins 2 lettres).';
      prenom.setAttribute('aria-invalid', 'true');
      isValid = false;
    }
    // basic email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Veuillez entrer une adresse email valide.';
      email.setAttribute('aria-invalid', 'true');
      isValid = false;
    }
    // telephone optional but if filled must match
    const telPattern = /^\d{2} \d{2} \d{2} \d{2} \d{2}$/;
    if (telephone.value.trim() && !telPattern.test(telephone.value.trim())) {
      telephoneError.textContent = 'Format téléphone invalide. Ex: 06 12 34 56 78';
      telephone.setAttribute('aria-invalid', 'true');
      isValid = false;
    }
    if (!message.value.trim()) {
      messageError.textContent = 'Le message ne peut pas être vide.';
      message.setAttribute('aria-invalid', 'true');
      isValid = false;
    }
    if (!isValid) {
      // focus first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    // all valid: open confirmation modal
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

function toggleMenu() {
  const menu = document.getElementById("menu-principal");
  menu.classList.toggle("menu-collapse");
}

