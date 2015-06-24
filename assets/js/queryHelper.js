var queryHelper = {
	getQueries: function() {
		"use strict";

		var queryString = window.location.search.replace("?", ""),
			queryObj = {};

		if (queryString === "") {
			console.log('No query yet... return empty.');
			return queryObj;
		}

		var	urlSettings = queryString.split('&'),
			urlIdKeyVals, soundSettings, soundSetting,
			urlId, urlKey, urlVal,
			i, l, j, k;

		for (i = 0, l = urlSettings.length; i < l; i = i + 1) {
			soundSettings = urlSettings[i].split('=');
			urlId = soundSettings[0];
			soundSetting = soundSettings[1].split(';');

			for (j = 0, k = soundSetting.length; j < k; j = j + 1) {
				urlIdKeyVals = soundSetting[j].split(':');
				urlKey = urlIdKeyVals[0];
				urlVal = urlIdKeyVals[1];

				if (queryObj[urlId] === undefined) {
					queryObj[urlId] = {};
				}

				queryObj[urlId][urlKey] = urlVal;
			}
		}

		return queryObj;
	},
	getUrl: function(queries) {
		"use strict";

		if (queries === undefined) {
			queries = this.getQueries();
		}

		var lastQueryKey = Object.keys(queries)[Object.keys(queries).length - 1],
			lastQuerySegmentKey,
			url = '?',
			i, l;

		for (i in queries) {
			lastQuerySegmentKey = Object.keys(queries[i])[Object.keys(queries[i]).length - 1];
			url = url + i + '=';

			for (l in queries[i]) {
				url = url + l + ':' + queries[i][l];

				if (lastQuerySegmentKey !== l) {
					url = url + ';';
				}
			}

			if (lastQueryKey !== i) {
				url = url + '&';
			}
		}

		return url;
	},
	changeParameter: function(urlId, urlKey, urlVal) {
		"use strict";

		var queries = this.getQueries(),
			newUrl;

		if (queries[urlId] === undefined) {
			queries[urlId] = {};
		}

		queries[urlId][urlKey] = urlVal;


		newUrl = queryHelper.getUrl(queries);

		history.pushState(null, null, newUrl);
	}
};