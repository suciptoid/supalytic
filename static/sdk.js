(function () {
  var endpoint = document.currentScript.getAttribute('data-endpoint');
  var title = document.title;
  var ref = document.referrer.indexOf(location.origin) < 0 ? document.referrer : '';

  function track(event_name = 'page_view', customData = {}) {
    var data = {
      title: title,
      host: location.hostname,
      path: location.pathname,
      ua: navigator.userAgent,
      sw: window.innerWidth,
      loc:
        navigator.languages && navigator.languages.length
          ? navigator.languages[0]
          : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en'
    };

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
  }

  function watchTitle() {
    const callback = ([entry]) => {
      title = entry && entry.target ? entry.target.text : undefined;
    };

    const observer = new MutationObserver(callback);

    const node = document.querySelector('head > title');

    if (node) {
      observer.observe(node, {
        subtree: true,
        characterData: true,
        childList: true
      });
    }
  }

  function checkLink(el) {
    return el && el.tagName && el.tagName.toLowerCase() === 'a';
  }
  function findLink(link) {
    if (link && (!checkLink(link) || !link.href)) {
      link = link.parentNode;
    }
    return link;
  }

  function handleClick(e) {
    const link = findLink(e.target);

    if (link && link.href && link.host && link.host !== location.host) {
      track('click_outbound', {
        click_outbound: link.href
      });
    }
  }

  window.track = track;

  watchTitle();

  track();

  window.addEventListener('hashchange', function () {
    track();
  });

  document.addEventListener('click', handleClick);

  var history = window.history;
  if (history.pushState) {
    var originalFn = history['pushState'];
    history.pushState = function () {
      // ref = window.location.href;
      originalFn.apply(this, arguments);

      if (ref != window.location.href) {
        setTimeout(function () {
          track();
        }, 500);
      }
    };

    window.addEventListener('popstate', function (e) {
      track();
    });
  }
})();
