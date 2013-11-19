describe('idCurrency', function() {
	var scope, compile;
	scope = null;
	beforeEach(module('id.currency'));
	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		compile = $compile;
	}));
	describe('function or plugin isn\'t found', function() {
		it('should not throw an error', function() {
			compile("<div id-currency ng-model=\"amount\"></div>")(scope);
		});
	});

});