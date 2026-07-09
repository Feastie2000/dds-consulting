// auth.js — include on every admin page
(function() {
  const script = document.createElement('script');
  script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
  script.onload = function() {
    netlifyIdentity.init({
      APIUrl: 'https://dds-consulting.pt/.netlify/identity'
    });
    netlifyIdentity.on('init', user => {
      if (!user) {
        window.location.href = '/admin/index.html';
      }
    });
    netlifyIdentity.on('logout', () => {
      window.location.href = '/admin/index.html';
    });
  };
  document.head.appendChild(script);
})();