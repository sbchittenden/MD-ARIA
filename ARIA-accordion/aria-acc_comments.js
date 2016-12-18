var accordionApp = (function() {

  var accordion;
  var accButtons;
  var addPanels;

  function init() {
    //cacheDom
    accordion = document.querySelector('.accordion');
    console.log(accordion);
    accButtons = accordion.querySelectorAll('span[role="button"]');
    console.log(accButtons);
    addPanels = accordion.querySelectorAll('.accordion-panel');
    console.log(addPanels);
    // build event listeners
    _buildListeners();

    console.log("accordionApp initialized");
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
      console.log('button controls: ' + btnFor);
      panel = document.getElementById(btnFor);
      console.log('panel ID is: ' + panel.id);
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
    console.log(activeEl);
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
    console.log('active h3 is: ' + activeHeader.nodeName);
    var activeId = activeHeader.id;
    var prevHeader;
    var nextHeader;
    var prevChild;
    var nextChild;
    console.log('active hd ID is: ' + activeId);
    if (key === 37 || key === 38) { // left arrow or up arrow
      console.log(key);
      if (activeHeader === accButtons[0].parentNode) {
        activeHeader = accButtons[3].parentNode;
        prevChild = accButtons[3];
        prevChild.focus();
      } else {
        prevHeader = activeHeader.previousElementSibling.previousElementSibling;
        console.log('previous h3 is: ' + prevHeader.id);
        prevChild = prevHeader.firstChild;
        console.log('previous first element child is: ' + prevChild.nodeName);
        activeHeader = prevHeader;
        console.log('new active h3 is: ' + activeHeader.id);
        prevChild.focus();
      }
    } else if (key === 39 || key === 40) { // right arrow or down arrow
      console.log(key);
      if (activeHeader === accButtons[3].parentNode) {
        activeHeader = accButtons[0].parentNode;
        nextChild = accButtons[0];
        nextChild.focus();
      } else {
        nextHeader = activeHeader.nextElementSibling.nextElementSibling;
        console.log('next h3 is: ' + nextHeader.id);
        nextChild = nextHeader.firstChild;
        console.log('next first element child is: ' + nextChild.nodeName);
        activeHeader = nextHeader;
        console.log('new active h3 is: ' + activeHeader.id);
        nextChild.focus();
      }
    }
  }

  return {
    init: init
  };

})();

accordionApp.init();
