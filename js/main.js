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
		qrSettings = UTILS.qs('.tab-content'),
		repContent = UTILS.qs('content-reports'),
		allTabs = UTILS.qsa('a[role="tab"]'),
		tabBody = UTILS.qsa('div[role="tabpanel"]'),
		settingsBtn = UTILS.qs('settings'),
		inpFocus = UTILS.qs('site-name');


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
				/*currentActivePanel.removeAttribute('aria-selected', 'true');
				currentElm.removeAttribute('aria-selected', 'true');
				currentActivePanel.setAttribute('aria-hidden');
				currentElm.setAttribute('aria-hidden');*/
			}

			if(currentHash === ('#' + currentElmAttr)) {
				UTILS.addClass(currentElm,'active');
				UTILS.addClass(currentActivePanel,'active');
				/*currentActivePanel.setAttribute('aria-selected', 'true');
				currentElm.setAttribute('aria-selected', 'true');
				currentActivePanel.removeAttribute('aria-hidden');
				currentElm.removeAttribute('aria-hidden');*/
			}
	};

	var changeHash = function(e){
		e.preventDefault();
		var clicked = e.target,
			tabAttr = getElmAttribute(clicked);

		location.hash = 'panel-' + tabAttr.replace('#', '');
	};

	/*var toggleSettings = function(e) {
		e.preventDefault();
		var target = e.target;
		UTILS.addClass(target,'activeSet');
		UTILS.addclass(repContent,'activeRep');
		inpFocus.focus();
	};*/

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

	/*var toggleSettings = function(e){
		e.preventDefault();

		if (qrSettingsClass || mtfClass){
			this.classList.add('active');
			qrSettings.classList.remove('hidden');
			mtfSettings.classList.remove('hidden');
			qrSettingsClass = false;
			mtfClass = false;
			inputFieldsQr[0].focus();
		} else {
			this.classList.remove('active');
			qrSettings.classList.add('hidden');
			mtfSettings.classList.add('hidden');
			qrSettingsClass = true;
			mtfClass = true;
		}
	};*/

	setTab();

	/*UTILS.addEvent(settingsBtn, 'click', toggleSettings);*/
	/*UTILS.addEvent(mtfSettingsBtn, 'click', toggleSettings);*/
	UTILS.addEvent(tabContainer, 'click', changeHash);
	/*UTILS.addEvent(tabContainer, 'keypress', keypressOpenTab);*/
	UTILS.addEvent(window, 'hashchange', setTab);


})();
