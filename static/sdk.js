(function () {
  var endpoint = document.currentScript.getAttribute('data-endpoint');

  window.track = function (event_name = 'page_view', customData = {}) {
    var data = {
      title: document.title,
      host: location.hostname,
      path: location.pathname,
      ua: navigator.userAgent,
      sw: window.innerWidth,
      loc:
        navigator.languages && navigator.languages.length
          ? navigator.languages[0]
          : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en'
    };

    var ref = document.referrer.indexOf(location.origin) < 0 ? document.referrer : '';
    if (ref !== '') {
      data.ref = ref;
    }
    if (location.hash !== '') {
      data.hash = location.hash;
    }
    if (window.location.search != '') {
      var urlSearchParams = new URLSearchParams(window.location.search);
      data.params = Object.fromEntries(urlSearchParams.entries());
    }

    var payload = {
      event_name,
      data: {
        ...data,
        ...customData
      }
    };

    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  track();

  window.addEventListener('hashchange', function () {
    track();
  });

  window.addEventListener('popstate', function (e) {
    track();
  });

  var history = window.history;
  if (history.pushState) {
    var pushState = history.pushState;
    history.pushState = function (state) {
      if (typeof history.onpushstate == 'function') {
        history.onpushstate({ state: state });
      }
      var ref = window.location.href;
      pushState.apply(this, arguments);

      track(undefined, { ref });
    };
  }
})();
