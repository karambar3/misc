// ==UserScript==
// @name         Alameda Redmine Commit Message Builder
// @version      0.1
// @description  Adds to Redmine issue pages a button to copy MR title to clipboard
// @author       zolotov
// @match        *://*redmine.nsd.ru/redmine/issues/*
// @exclude      *://*redmine.nsd.ru/redmine/issues/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var button = document.createElement('a');
    button.style.cursor = 'pointer';
    button.className = 'icon icon-copy';
    button.innerHTML = 'Copy MR title';
    button.onclick = function(){
        var issueId = document.querySelector('#content > h2').innerHTML.split('#');
        issueId = issueId[issueId.length - 1];
        var title = document.querySelector('#content div.subject h3').innerHTML;
        var str = 'refs #' + issueId + ' ' + title;
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    var contextual = document.querySelector('#content .contextual');
    contextual.appendChild(button);
})();
