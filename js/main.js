/*globals UTILS*/
window.onload = (function() {
	'use strict';
	UTILS.ajax('data/notification.txt', {
		method: 'GET',
		done: function(response) {
			document.getElementById('notification').innerHTML = response;
		},
		fail: function (err) {
			document.getElementById('notification').style.display = 'none';
		}
	});
	var tabContainer = UTILS.qs('.tab-hdrs'),
		expnd = UTILS.qs('.expand'),
		allTabs = UTILS.qsa('a[role="tab"]'),
		cnclBtn = UTILS.qs('.cancel_btn'),
		submitBtnQ = UTILS.qs('.submit_btnQ'),
		submitBtnM = UTILS.qs('.submit_btnM'),
		inputName = UTILS.qsa('input[type=text]'),
		inputURL = UTILS.qsa('input[type=url]'),
		quickR = UTILS.qs('#quick-reports'),
		local, storageReports = [],
		setBtnQ = UTILS.qs('.settingsQ'),
		setBtnM = UTILS.qs('.settingsM'),
		storage = JSON.parse(localStorage.getItem('storageReports')) || {};


	/*var selectElm = (quickR.getAttribute('class').indexOf('active')> -1) ? 	+
	UTILS.qs('#choose-report-selectQ') : UTILS.qs('#choose-report-selectM');
	var settingsBtn = (quickR.getAttribute('class').indexOf('active')> -1) ? 	+
	UTILS.qs('.settingsQ') : UTILS.qs('.settingsM');*/

	var selectElm = function () {
		if(quickR.getAttribute('class').indexOf('active')> -1) {
			return UTILS.qs('#choose-report-selectQ');
		}
		else {
			return UTILS.qs('#choose-report-selectM');
		}
	};
	var settingsBtn = function () {
		if(quickR.getAttribute('class').indexOf('active')> -1) {
			return UTILS.qs('.settingsQ');
		}
		else {
			return UTILS.qs('.settingsM');
		}
	};
	var repContent = function () {
		if(quickR.getAttribute('class').indexOf('active')> -1) {
			return UTILS.qs('.content-reportsQ');
		}
		else {
			return UTILS.qs('.content-reportsM');
		}
	};
	var inpFocus = function () {
		if(quickR.getAttribute('class').indexOf('active')> -1) {
			return UTILS.qs('.site-nameQ');
		}
		else {
			return UTILS.qs('.site-nameM');
		}
	};

	var getElmAttribute = function(elm) {
	    return elm.getAttribute('href').split('#')[1];
	};


	var getMatchingPanel = function(tab){
		var tabAttr = getElmAttribute(tab),
			matchingPanel = document.getElementById(tabAttr);
			return matchingPanel;
	};

	var setTab = function(){
		var currentHash = location.hash.replace('panel-', '');

		if (currentHash === '') {
			currentHash =  allTabs[0].getAttribute('href');
		}

		for (var i = 0; i < allTabs.length; i++) {
			var currentElm = allTabs[i],
				currentElmAttr = getElmAttribute(currentElm),
				currentActivePanel = getMatchingPanel(currentElm);

			UTILS.removeClass(currentElm,'active');
			UTILS.removeClass(currentActivePanel, 'active');
			currentActivePanel.removeAttribute('aria-selected', 'true');
			currentElm.removeAttribute('aria-selected', 'true');
			currentActivePanel.setAttribute('aria-hidden', 'false');
			currentElm.setAttribute('aria-hidden', 'false');


			if(currentHash === ('#' + currentElmAttr)) {
				UTILS.addClass(currentElm,'active');
				UTILS.addClass(currentActivePanel,'active');
				currentActivePanel.setAttribute('aria-selected', 'true');
				currentElm.setAttribute('aria-selected', 'true');
				currentActivePanel.removeAttribute('aria-hidden', 'true');
				currentElm.removeAttribute('aria-hidden', 'true');
			}
		}
		settingsBtn();
		repContent();
		inpFocus();
		selectElm();
	};

	var changeHash = function(e){
		e.preventDefault();
		var clicked = e.target,
			tabAttr = getElmAttribute(clicked);

		location.hash = 'panel-' + tabAttr.replace('#', '');

	};

	var toggleSettings = function(e) {
		e.preventDefault();

		var target = e.target,
			targetAtt = target.getAttribute('class');

		UTILS.addClass(target,'activeSet');
		UTILS.addClass(repContent(),'activeRep');
		inpFocus().focus();


		if (targetAtt.indexOf('activeSet') > -1) {
			UTILS.removeClass(target,'activeSet');
		    UTILS.removeClass(repContent(),'activeRep');
		}
	};

	var cancelBtn = function(e) {
		e.preventDefault();
		UTILS.removeClass(settingsBtn(),'activeSet');
		UTILS.removeClass(repContent(),'activeRep');

	};

	var expand = function(e) {
		e.preventDefault();
		var curentIframe = UTILS.qs('#tab1'),
			currentURL = curentIframe.src;
		window.open(currentURL, '_blank');
		window.focus();
	};

	var validation = function(e) {
		e.preventDefault();

	/* jshint -W101 */
	    var re = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
	/* jshint +W101 */

		for (var i = 0; i < inputName.length; i++) {

            if (inputName[i].value !== '' && inputURL[i].value === '') {
                UTILS.addClass(inputURL[i],'invalid');
                inputURL[i].focus();
            }
            else if (inputName[i].value === '' && inputURL[i].value !== '') {
                UTILS.addClass(inputName[i],'invalid');
                inputName[i].focus();
            }
            else if(inputName[i].value !== '' && inputURL[i].value !== '') {
            	UTILS.removeClass(inputName[i] ,'invalid');
            	UTILS.removeClass(inputURL[i] ,'invalid');
            	UTILS.addEvent(inputName[i],'keydown',keypressDelete);
            	if (inputURL[i].value.substring(0, 4) !== 'http') { // http protocol
				 		inputURL[i].value = 'http://' + inputURL[i].value;
			    }
			    if (re.test(inputURL[i].value)){ // url validation
	    			UTILS.removeClass(inputURL[i] ,'invalid');
	    			addToSelect(selectElm(),inputName[i].value,inputURL[i].value);
					addToStorage(inputName[i] , inputURL[i]);
					changeIFrame(selectElm());
					selectElm().style.display = 'block';
				}

				else {
	  				UTILS.addClass(inputName[i],'invalid');

	  			}
	  			UTILS.removeClass(settingsBtn,'activeSet');
				UTILS.removeClass(repContent(),'activeRep');
            }

        }

        /*UTILS.removeClass(settingsBtn,'activeSet');
		UTILS.removeClass(repContent,'activeRep');*/
	};

	var addToSelect = function (selectElm, text, value) {
		if (!text || !value) {
			return false;
		}
		var option = document.createElement('option');

		option.text = text;
		option.value = value;
		selectElm.add(option);
	};
	var removeFromSelect = function () {
		selectElm.removeChild(selectElm.firstChild);
	};

	//check if local storage is supported
	var localStorageSupported = function () {
		if (!Modernizr.localstorage) {
			console.error('Your browser does not support localStorage');
			return false;
		}
		return true;
	};
	var addToStorage = function (name, url) {
		if (localStorageSupported()) {
			local = {
	    	name: name.value,
	    	url: url.value
	    	};
	    	storageReports.unshift(local);
			localStorage.setItem('storageReports', JSON.stringify(storageReports));
		}
	};

	var changeIFrame = function (select) {

		var selectedOptionValue = select.options[select.selectedIndex].value,
		    getContFrame = UTILS.qs('#tab1');
		getContFrame.src = selectedOptionValue;
	};

	var storageToSelect = function() {

		var option = document.createElement('option');
		for (var i = 0; i < storage.length; i++) {
			option.text = storage[i].name;
			option.value = storage[i].url;
			selectElm().add(option);
		}
	};


	var keypressOpenTab = function(e){
		e.preventDefault();
		var focused = e.target,
			tabAttr = getElmAttribute(focused);

		if (e.keyCode === 13 || e.keyCode === 32) {
			location.hash = 'panel-' + tabAttr.replace('#', '');
		}
	};
	var keypressDelete = function(e){
		// e.preventDefault();
		if (e.keyCode === 46 || e.keyCode === 8) {
			removeFromSelect();
		}
	};
	var init = function () {
		if (localStorage.getItem('storageReports')) {
			UTILS.removeClass(settingsBtn(),'activeSet');
			UTILS.removeClass(repContent(),'activeRep');
			changeIFrame(selectElm());
		}
		else {
			UTILS.addClass(settingsBtn(),'activeSet');
			UTILS.addClass(repContent(),'activeRep');
			selectElm().style.display = 'none';
		}
	};
/*
	var escToClose = function(e){
		var target = e.target;
		if(e.keyCode === 27){
			qrSettings.classList.add('hidden');
			qrSettingsBtn.classList.remove('active');
			qrSettingsClass = true;
			mtfClass = true;
		}
	};*/


	setTab();
	storageToSelect();
	init();

	// UTILS.addEvent(settingsBtn(), 'click', toggleSettings);
	UTILS.addEvent(setBtnQ, 'click', toggleSettings);
	UTILS.addEvent(setBtnM, 'click', toggleSettings);
	UTILS.addEvent(cnclBtn, 'click', cancelBtn);
	UTILS.addEvent(expnd, 'click', expand);
	UTILS.addEvent(tabContainer, 'click', changeHash);
	// UTILS.addEvent(submitBtn,'click', validation);
	UTILS.addEvent(submitBtnQ,'click', validation);
	UTILS.addEvent(submitBtnM,'click', validation);
	UTILS.addEvent(tabContainer, 'keypress', keypressOpenTab);
	UTILS.addEvent(window, 'hashchange', setTab);
	UTILS.addEvent(selectElm(), 'change', function () {
		changeIFrame(this);
	});



})();
