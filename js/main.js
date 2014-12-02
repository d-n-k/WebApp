/*globals UTILS*/
window.onload = (function() {
	UTILS.ajax('data/notification.txt', {
		method: 'GET',
		done: function(response) {
			document.getElementById("notification").innerHTML = response;
		},
		fail: function (err) {
			document.getElementById("notification").style.display = "none";
		}
	});
	var tabContainer = UTILS.qs('.tab-hdrs'),
		expnd = UTILS.qs('.expand'),
		repContent = UTILS.qs('.content-reports'),
		allTabs = UTILS.qsa('a[role="tab"]'),
		tabBody = UTILS.qsa('div[role="tabpanel"]'),
		settingsBtn = UTILS.qs('.settings'),
		cnclBtn = UTILS.qs('.cancel_btn'),
		inpFocus = UTILS.qs('.site-name');


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
	};

	var changeHash = function(e){
		e.preventDefault();
		var clicked = e.target,
			tabAttr = getElmAttribute(clicked);

		location.hash = 'panel-' + tabAttr.replace('#', '');
	};

	var toggleSettings = function(e) {
		e.preventDefault();
		var target = e.target;
		UTILS.addClass(target,'activeSet');
		UTILS.addClass(repContent,'activeRep');
		inpFocus.focus();
	};

	var cancelBtn = function(e) {
		e.preventDefault();
		UTILS.removeClass(settingsBtn,'activeSet');
		UTILS.removeClass(repContent,'activeRep');

	};

	var expand = function(e) {
		e.preventDefault();
		var curentIframe = UTILS.qs('#tab1'),
			currentURL = curentIframe.src;
		window.open(currentURL, '_blank');
		window.focus();
	};

/*
	var keypressOpenTab = function(e){
		e.preventDefault();
		var focused = e.target,
			tabAttr = getElmAttribute(focused);

		if (e.keyCode === 13 || e.keyCode === 32) {
			location.hash = 'panel-' + tabAttr.replace('#', '');
		}
	};

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

	UTILS.addEvent(settingsBtn, 'click', toggleSettings);
	UTILS.addEvent(cnclBtn, 'click', cancelBtn);
	UTILS.addEvent(expnd, 'click', expand);
	UTILS.addEvent(tabContainer, 'click', changeHash);
	/*UTILS.addEvent(tabContainer, 'keypress', keypressOpenTab);*/
	UTILS.addEvent(window, 'hashchange', setTab);


})();
