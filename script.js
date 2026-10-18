const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealTargets = document.querySelectorAll(
  '.about-visual, .about-copy, .skills, .project-card, .contact-details, .contact-form'
);
revealTargets.forEach((element) => element.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('visible'));
}

const formNote = document.querySelector('#formNote');

const whatsappLink = document.querySelector(
  '.social-item[href*="wa.me"]'
);

document.querySelectorAll('[data-wa-message]').forEach((button) => {
  button.addEventListener('click', () => {
    const baseLink = whatsappLink?.getAttribute('href')?.trim();

    if (
      !baseLink ||
      !/^https:\/\/wa\.me\/\d+\/?$/.test(baseLink)
    ) {
      if (formNote) {
        formNote.textContent =
          'Please check your WhatsApp contact link in index.html.';
      }
      console.error('Invalid WhatsApp link:', baseLink);
      return;
    }

    const message = button.dataset.waMessage?.trim();

    if (!message) {
      console.error('This button has no WhatsApp message.');
      return;
    }

    const destination =
      `${baseLink.replace(/\/$/, '')}?text=${encodeURIComponent(message)}`;

    window.open(destination, '_blank', 'noopener,noreferrer');

    if (formNote) {
      formNote.textContent =
        'WhatsApp opened with your message ready. Press Send to contact Maryam.';
    }
  });
});

const rotatingQuote = document.querySelector('#rotatingQuote');
const heroQuotes = [
  'I bring imagination to life.',
  'Curiosity turns into creation.',
  'Small ideas, meaningful impact.',
  'Dream it. Design it. Build it.',
  'A little creativity changes everything.'
];
if (rotatingQuote) {
  let quoteIndex = 0;
  window.setInterval(() => {
    rotatingQuote.classList.add('quote-fading');
    window.setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % heroQuotes.length;
      rotatingQuote.textContent = heroQuotes[quoteIndex];
      rotatingQuote.classList.remove('quote-fading');
    }, 350);
  }, 7000);
}
