var accordionApp = (function() {

  var accordion;
  var accButtons;
  var addPanels;

  function init() {
    //cacheDom
    accordion = document.querySelector('.accordion');
    accButtons = accordion.querySelectorAll('span[role="button"]');
    addPanels = accordion.querySelectorAll('.accordion-panel');
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
    var isHidden;
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
    var panel;
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
    var prevHeader;
    var nextHeader;
    var prevChild;
    var nextChild;
    if (key === 37 || key === 38) { // left arrow or up arrow
      if (activeHeader === accButtons[0].parentNode) {
        activeHeader = accButtons[3].parentNode;
        prevChild = accButtons[3];
        prevChild.focus();
      } else {
        prevHeader = activeHeader.previousElementSibling.previousElementSibling;
        prevChild = prevHeader.firstChild;
        activeHeader = prevHeader;
        prevChild.focus();
      }
    } else if (key === 39 || key === 40) { // right arrow or down arrow
      if (activeHeader === accButtons[3].parentNode) {
        activeHeader = accButtons[0].parentNode;
        nextChild = accButtons[0];
        nextChild.focus();
      } else {
        nextHeader = activeHeader.nextElementSibling.nextElementSibling;
        nextChild = nextHeader.firstChild;
        activeHeader = nextHeader;
        nextChild.focus();
      }
    }
  }

  return {
    init: init
  };

})();

accordionApp.init();
