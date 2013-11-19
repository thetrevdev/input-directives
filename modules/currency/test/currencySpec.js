describe('idCurrency', function() {
	var scope, compile;
	scope = null;
	beforeEach(module('id.currency'));
	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		compile = $compile;
	}));
	describe('simple case', function() {
		it('should not throw an error', function() {
			compile("<input type=\"text\" id-currency ng-model=\"amount\" />")(scope);
		});

		it('should be able to format amount from the model', function() {
			inject(function($compile, $rootScope) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);
				$rootScope.$apply(function() {
					$rootScope.amount = 1.23;
				});
				expect(element.val()).toEqual("$1.23");
			});
		});

		it('no amount should render as empty string', function() {
			inject(function($compile, $rootScope) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);
				expect(element.val()).toEqual("");
			});
		});

		it('should format view to number', function() {
			inject(function($compile, $rootScope, $sniffer) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);
				//#TODO
				//element.val('1.23');
				//var inputEvent = ($sniffer.hasEvent('input') ? 'input' : 'change');
				//element[inputEvent]();

				//$rootScope.$apply();

				//expect(element.val()).toEqual(1.23);
			});
		});
	});
});