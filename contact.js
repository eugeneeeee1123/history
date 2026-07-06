/* ============================================================
   THE ARCHIVUM · 史阅 — contact.js
   Pure front-end contact form: builds a mailto: link, since a
   static HTML/CSS/JS site has no server to receive submissions.
   Replace CONTACT_EMAIL with a real inbox before publishing.
   ============================================================ */
(function(){
  "use strict";
  const CONTACT_EMAIL = 'archive@thearchivum.dev';

  document.addEventListener('submit', (e)=>{
    if(e.target.id !== 'contactForm') return;
    e.preventDefault();
    const form = e.target;
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value.trim();
    if(!name || !email || !message) return;

    const mailSubject = encodeURIComponent(`[史阅 THE ARCHIVUM] ${subject} — ${name}`);
    const mailBody = encodeURIComponent(`来自：${name} (${email})\n主题：${subject}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    const success = document.getElementById('formSuccess');
    if(success) success.classList.add('active');
  });
})();
