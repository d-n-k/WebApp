
(function($) {
	'use strict';
	$.ajax({

            url: 'data/config.json',
            dataType: 'json'

        })
        .done(function (response) {
            console.log(response);
            if (response && response !== '') {
                $notification.removeClass('hidden');
                $notification.text(response.notification);
                initDropDowns(response);
            }
        })
        .fail(function(error){
            $notification.addClass('hidden');
            $notification.text(error);
        });

	var $tabContainer = $('.tab-hdrs'),
		$notification = $('.notifications').eq(0),
		$expnd = $('.expand1'),
		$expnd1 = $('.expand2'),
		$expnd2 = $('.expand3'),
		$expnd3 = $('.expand4'),
		$allTabs = $('a[role="tab"]'),
		$cnclBtnQ = $('.cancel_btnQ'),
		$cnclBtnM = $('.cancel_btnM'),
		$submitBtnQ = $('.submit_btnQ'),
		$submitBtnM = $('.submit_btnM'),
		$inputName=$('input[type=text]'),
		$inputURL =$('input[type=url]'),
		$quickR = $('#quick-reports'),
		$fmyFolders = $('#fmy-folders'),
		$myteamReports = $('#my-team-folders'),
		local, storageReports = [],
		$selQ = $('#choose-report-selectQ'),
		$selM = $('#choose-report-selectM'),
		$setBtnQ = $('.settingsQ'),
		$setBtnM = $('.settingsM'),
		storage = JSON.parse(localStorage.getItem('storageReports')) || {};


	var selectElm = function () {
		if($quickR.attr('class').indexOf('active')> -1) {
			return $('#choose-report-selectQ');
		}
		else {
			return $('#choose-report-selectM');
		}
	};

	var getContFrame = function () {
		if($quickR.attr('class').indexOf('active')> -1) {
			return $('#tabQ');
		}
		if($myteamReports.attr('class').indexOf('active')> -1) {
			return $('#tabM');
		}
		if($fmyFolders.attr('class').indexOf('active')> -1) {
			return $('#tab2');
		}
		else {
			return $('#tab4');
		}
	};
	var settingsBtn = function () {
		if($quickR.attr('class').indexOf('active')> -1) {
			return $('.settingsQ');
		}
		else {
			return $('.settingsM');
		}
	};
	var repContent = function () {
		if($quickR.attr('class').indexOf('active')> -1) {
			return $('.content-reportsQ');
		}
		else {
			return $('.content-reportsM');
		}
	};
	var inpFocus = function () {
		if($quickR.attr('class').indexOf('active')> -1) {
			return $('.site-nameQ');
		}
		else {
			return $('.site-nameM');
		}
	};

	var getElmAttribute = function(elm) {
	    return elm.attr('href').split('#')[1];
	};


	var getMatchingPanel = function(tab){
		var tabAttr = getElmAttribute(tab),
			matchingPanel = document.getElementById(tabAttr);
			return matchingPanel;
	};

	var setTab = function(){
		var currentHash = location.hash.replace('panel-', '');

		if (currentHash === '') {
			currentHash =  $allTabs[0].getAttribute('href');
		}

		for (var i = 0; i < $allTabs.length; i++) {
			var currentElm = $allTabs.eq(i),
				currentElmAttr = getElmAttribute(currentElm),
				currentActivePanel = getMatchingPanel(currentElm);

			$(currentElm).removeClass('active').attr('aria-selected', 'true');
			$(currentActivePanel).removeClass('active').attr('aria-selected', 'false');
			$(currentActivePanel).attr('aria-hidden', 'false');
			$(currentElm).attr('aria-hidden', 'false');

			if(currentHash === ('#' + currentElmAttr)) {
				$(currentElm).addClass('active').attr('aria-selected', 'true');
				$(currentActivePanel).addClass('active').attr('aria-selected', 'true');
				$(currentActivePanel).attr('aria-hidden', 'false');
				$(currentElm).attr('aria-hidden', 'false');
			}
		}
		settingsBtn();
		repContent();
		inpFocus();
		selectElm();
		getContFrame();
		if ($selQ.html() !== '' || $selM.html() !== '') {
				$(settingsBtn()).removeClass('activeSet');
				$(repContent()).removeClass('activeRep');
			}
	};

	var changeHash = function(e){
		e.preventDefault();
		var $clicked = $(e.target),
			tabAttr = getElmAttribute($clicked);

		location.hash = 'panel-' + tabAttr.replace('#', '');


	};

	var toggleSettings = function(e) {
		e.preventDefault();
		var $target = $(e.target);
		$target.toggleClass('activeSet');
		repContent().toggleClass('activeRep');
		inpFocus().focus();
	};

	var cancelBtn = function(e) {
		e.preventDefault();
		settingsBtn().removeClass('activeSet');
		repContent().removeClass('activeRep');

	};

	var expand = function(e) {
		e.preventDefault();
		var curentIframe = getContFrame(),
			currentURL = $(curentIframe).attr('src');
		window.open(currentURL, '_blank');
		window.focus();
	};

	var validation = function(e) {
		e.preventDefault();

	/* jshint -W101 */
	    var re = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
	/* jshint +W101 */

			for (var i = 0; i < $inputName.length; i++) {

	            if ($inputName.eq(i).val() !== '' && $inputURL.eq(i).val() === '') {
	                $inputURL.eq(i).addClass('invalid');
	                $inputURL.eq(i).focus();
	            }
	            else if ($inputName.eq(i).val() === '' && $inputURL.eq(i).val() !== '') {
	                $inputName.eq(i).addClass('invalid');
	                $inputName.eq(i).focus();
	            }
	            else if($inputName.eq(i).val() !== '' && $inputURL.eq(i).val() !== '') {
	            	$inputName.eq(i).removeClass('invalid');
	            	$inputURL.eq(i).removeClass('invalid');

	            	if ($inputURL.eq(i).val().substring(0, 4) !== 'http') { // http protocol
					 	$inputURL.eq(i).val('http://' + $inputURL.eq(i).val());
				    }
				    if (re.test($inputURL.eq(i).val())){ // url validation
		    			$inputURL.eq(i).removeClass('invalid');
						if(($quickR.attr('class').indexOf('active') === -1) && i>2) {
							addToSelect(selectElm(), $inputName[i].value, $inputURL[i].value);
							addToStorage($inputName[i] , $inputURL[i]);
							changeIFrame(selectElm());
						}
						if(($quickR.attr('class').indexOf('active')> -1) && i<=2) {
							addToSelect(selectElm(), $inputName[i].value, $inputURL[i].value);
							addToStorage($inputName[i] , $inputURL[i]);
							changeIFrame(selectElm());
						}

						selectElm().show();
					}
					else {
		  				$inputName.eq(i).addClass('invalid');
		  			}
		  			$(settingsBtn()).removeClass('activeSet');
					$(repContent()).removeClass('activeRep');
	            }
	            $inputName.eq(i).keydown(keypressDelete);
	            $(settingsBtn()).removeClass('activeSet');
				$(repContent()).removeClass('activeRep');
	        }

        $(settingsBtn()).removeClass('activeSet');
		$(repContent()).removeClass('activeRep');
	};

	var addToSelect = function (selectElm, text, value) {
		if (!text || !value) {
			return false;
		}
		if($quickR.attr('class').indexOf('active')> -1) {
			createSelectOption($selQ, text, value);
		}
		else {
			createSelectOption($selM, text, value);
		}
	};
	var removeFromSelect = function () {
		selectElm().find('option:first-child').remove();

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
			tab: getContFrame().parent().attr('id'),
	    	name: name.value,
	    	url: url.value
	    	};
	    	storageReports.unshift(local);
			localStorage.setItem('storageReports', JSON.stringify(storageReports));
		}
	};

	var changeIFrame = function (select) {
			if ($quickR.attr('class').indexOf('active')> -1) {
				if (select !== null || undefined) {
					var selectedOptionValue = select.find('option').val();
					$('#tabQ').attr('src',selectedOptionValue);
				}
			}
			else if (select !== null || undefined) {
					var selectedOptionValue = select.find('option').val();
					$('#tabM').attr('src',selectedOptionValue);
			}
	};

	var storageToSelect = function() {
		for (var i = 0; i < storage.length; i++) {
			if (storage[i].tab ==='quick-reports') {
				createSelectOption($selQ, storage[i].name, storage[i].url);
			}
			if (storage[i].tab ==='my-team-folders') {
				createSelectOption($selM, storage[i].name, storage[i].url);
			}
		}
	};
	var createSelectOption = function (elm, text, value){
		var o = new Option(text, value);
		$(o).html(text);
		elm.append(o);
	};
	var formPopulation = function () {

		for (var i = 0; i < $inputName.length; i++) {
			if (i<=2) {
					$inputName.eq(i).val($selQ.children().eq(i).html());
					$inputURL.eq(i).val($selQ.children().eq(i).val());
					$inputName.eq(i).keydown(keypressDelete);
			}
			if (i>2) {
					$inputName.eq(i).val($selM.children().eq(i-3).html());
					$inputURL.eq(i).val($selM.children().eq(i-3).val());
					$inputName.eq(i).keydown(keypressDelete);
			}
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
			$(settingsBtn()).removeClass('activeSet');
			/*$(repContent()).removeClass('activeRep');*/
			if ($selQ.html() !== '') {
				$('#tabQ').attr('src', $selQ.find('option').val());
				$(settingsBtn()).removeClass('activeSet');
				/*$(repContent()).removeClass('activeRep');*/
			}
			if ($selM.html() !== '') {
				$('#tabM').attr('src', $selM.find('option').val());
				$(settingsBtn()).removeClass('activeSet');
				$(repContent()).removeClass('activeRep');
			}
		}
		else {
			$(settingsBtn()).addClass('activeSet');
			$(repContent()).addClass('activeRep');
			$selM.hide();
			$selQ.hide();
		}
		if ($selQ.html() === '') {
				$selQ.hide();
				$(settingsBtn()).addClass('activeSet');
				$(repContent()).addClass('activeRep');
			}
		if ($selM.html() === '') {
				$selM.hide();
				$(settingsBtn()).addClass('activeSet');
				$(repContent()).addClass('activeRep');
			}
	};
	var initDropDowns = function(response) {
			var quickActions = response.quickActions,
				src = $('#nav-sections').html(),
				template = Handlebars.compile(src),
				html = template(quickActions),
				$navigation = $('#navigation');

			$navigation.html(html);
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
	formPopulation();
	getContFrame();
	init();


	$setBtnQ.click(toggleSettings);
	$setBtnM.click(toggleSettings);
	$cnclBtnQ.click(cancelBtn);
	$cnclBtnM.click(cancelBtn);
	$expnd.click(expand);
	$expnd1.click(expand);
	$expnd2.click(expand);
	$expnd3.click(expand);
	$tabContainer.click(changeHash);
	$submitBtnQ.click(validation);
	$submitBtnM.click(validation);
	$tabContainer.keypress(keypressOpenTab);
	$(window).bind('hashchange',setTab);
	$(selectElm()).change(function () {changeIFrame($(selectElm()))});



})(jQuery);
