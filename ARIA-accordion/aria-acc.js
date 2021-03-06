var accordionApp = (function() {

  var accordion;
  var accButtons;
  var addPanels;

  function init() {
    //cacheDom
    accordion = document.querySelector('.accordion');
    accButtons = accordion.querySelectorAll('span[role="button"]');

    // build event listeners
    _buildListeners();
  }

  function _buildListeners() {
    accordion.addEventListener('click', _toggle);
    accordion.addEventListener('keyup', _handleKeyEvents);
  }

  function _toggle(e) {
    var tEl = e.target;
    var btnFor;
    var panel;
    if (tEl.hasAttribute('aria-controls')) {
      btnFor = tEl.getAttribute('aria-controls');
      panel = document.getElementById(btnFor);
      if (panel.getAttribute('aria-hidden') === "false") {
        panel.setAttribute('aria-hidden', true);
        tEl.setAttribute('aria-expanded', false);
      } else {
        panel.setAttribute('aria-hidden', false);
        tEl.setAttribute('aria-expanded', true);
      }
    }
  }

  function _handleKeyEvents(e) {
    var key = e.keyCode;
    var activeEl = e.target;
    if ((key === 32 || key === 13) && activeEl.getAttribute('role') === 'button') {
      _toggle(e);
    } else {
      _keyNav(e);
    }
  }

  function _keyNav(e) {

    var key = e.keyCode;
    var activeHeader = e.target.parentNode;
    var activeId = activeHeader.id;

    if (key === 37 || key === 38) { // left arrow or up arrow
      if (activeHeader === accButtons[0].parentNode) {
        accButtons[3].focus();
      } else {
        activeHeader.previousElementSibling.previousElementSibling.firstChild.focus();
      }
    } else if (key === 39 || key === 40) { // right arrow or down arrow
      if (activeHeader === accButtons[3].parentNode) {
        accButtons[0].focus();
      } else {
        activeHeader.nextElementSibling.nextElementSibling.firstChild.focus();
      }
    }
  }

  return {
    init: init
  };

})();

accordionApp.init();
