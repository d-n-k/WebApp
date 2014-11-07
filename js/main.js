

UTILS.ajax('data/notification.txt', {
	method: 'GET',
	done: function(response) {
		document.getElementById("notification").innerHTML = response;
	},
	fail: function (err) {
		document.getElementById("notification").style.display = "none";

	}

});
