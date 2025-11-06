if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('sw.js')
          .then(reg => console.log('Service Worker zarejestrowany:', reg.scope))
          .catch(err => console.error('Błąd SW:', err));
      });
    }
