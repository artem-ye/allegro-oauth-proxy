const routes = require('../../src/http/routes');

test('routes is array', () => {
	expect(Array.isArray(routes)).toEqual(true);
});

test('routes items is objects', () => {
	for (const routeObj of routes) {
		expect(typeof routeObj === 'object').toBeTruthy();
		expect('router' in routeObj).toBeTruthy();
		expect(typeof routeObj.router === 'function').toBeTruthy();

		expect('options' in routeObj).toBeTruthy();
		expect(typeof routeObj.options === 'object').toBeTruthy();
	}
});

console.log(routes);
