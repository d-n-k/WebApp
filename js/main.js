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
		/*mtfSettings = UTILS.qs('.js-mtfTabSettings'),*/
		allTabs = UTILS.qsa('a[role="tab"]'),
		tabBody = UTILS.qsa('div[role="tabpanel"]');

console.log(allTabs);

	var getElmAttribute = function(elm) {
	    return elm.getAttribute('href').split('#')[1];
	};


	var getMatchingPanel = function(tab){
		var tabAttr = getElmAttribute(tab),
			matchingPanel = document.getElementById(tabAttr);
			return matchingPanel;
	};

	/*var addClass = function(nodeElm){
		nodeElm.classList.add('active');
		nodeElm.setAttribute('aria-selected', 'true');
		nodeElm.removeAttribute('aria-hidden');
		return nodeElm;
	};*/

	/*var removeClass = function(nodeElm){
		nodeElm.classList.remove('active');
		nodeElm.setAttribute('aria-hidden', 'true');
		nodeElm.removeAttribute('aria-selected');
		return nodeElm;
	};*/
	var qrSettingsClass = UTILS.hasClass(qrSettings, 'hidden');
	   /* mtfClass = UTILS.hasClass(mtfSettings, 'hidden');*/

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

			if(currentHash === ('#' + currentElmAttr)){
				UTILS.addClass(currentElm,'active');
				UTILS.addClass(currentActivePanel,'active');
			}
		}
	};

	var changeHash = function(e){
		e.preventDefault();
		var clicked = e.target,
			tabAttr = getElmAttribute(clicked);

		location.hash = 'panel-' + tabAttr.replace('#', '');
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

	/*UTILS.addEvent(qrSettingsBtn, 'click', toggleSettings);
	UTILS.addEvent(mtfSettingsBtn, 'click', toggleSettings);*/
	UTILS.addEvent(tabContainer, 'click', changeHash);
	/*UTILS.addEvent(tabContainer, 'keypress', keypressOpenTab);*/
	UTILS.addEvent(window, 'hashchange', setTab);


})();
