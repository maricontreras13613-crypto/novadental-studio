// Validación y mejoras del formulario de contacto

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;

  // Agregar validación en tiempo real
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  // Envío del formulario
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      submitForm();
    }
  });
});

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.getAttribute('name');
  let isValid = true;

  // Limpiar clase de error
  field.classList.remove('error');

  // Validación por tipo
  if (fieldName === 'nombre') {
    isValid = value.length >= 3;
  } else if (fieldName === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value) && value.length > 0;
  } else if (fieldName === 'asunto') {
    isValid = value.length >= 5;
  } else if (fieldName === 'mensaje') {
    isValid = value.length >= 10;
  } else if (fieldName === 'telefono' && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    isValid = phoneRegex.test(value);
  }

  if (!isValid && value !== '') {
    field.classList.add('error');
  }

  return isValid || !value || fieldName === 'telefono';
}

function submitForm() {
  const form = document.getElementById('contactForm');
  const button = form.querySelector('.btn-submit');
  const originalText = button.innerHTML;

  // Deshabilitar botón
  button.disabled = true;
  button.innerHTML = '<span>Enviando...</span>';

  // Simular envío (reemplazar con tu endpoint real)
  setTimeout(() => {
    button.innerHTML = '<span>✓ Mensaje enviado</span>';
    button.style.background = 'linear-gradient(135deg, var(--secondary) 0%, #25a895 100%)';
    
    setTimeout(() => {
      form.reset();
      button.disabled = false;
      button.innerHTML = originalText;
      button.style.background = '';
    }, 2000);
  }, 1500);
}

// Agregar estilo para campos con error
const style = document.createElement('style');
style.textContent = `
  .contact-form input.error,
  .contact-form textarea.error {
    border-color: #ff6b6b !important;
    background-color: #fff5f5 !important;
  }

  .contact-form input.error:focus,
  .contact-form textarea.error:focus {
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1), inset 0 2px 4px rgba(0,0,0,0.02) !important;
  }

  .btn-submit:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);
