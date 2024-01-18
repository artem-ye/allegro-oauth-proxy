const { join } = require('path');

module.exports = (URI_PREFIX = '') => {
	const applyUriPrefix = ({ router, options }) => {
		const { prefix: pref = '', ...rest } = options;
		const prefix = join(URI_PREFIX, pref);
		return { router, options: { ...rest, prefix } };
	};

	return URI_PREFIX ? applyUriPrefix : (e) => e;
};
