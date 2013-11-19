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

		it('should take view to number in model', function() {
			inject(function($compile, $rootScope, $sniffer) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);
				element.val('1.23');
				
				var inputEvent = ($sniffer.hasEvent('input') ? 'input' : 'change');
				element.triggerHandler(inputEvent);
				
				expect($rootScope.amount).toEqual(1.23);
			});
		});

		it('init as empty view and undefined model', function() {
			inject(function($compile, $rootScope) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);

				expect(element.val()).toEqual('');
				expect($rootScope.amount).not.toBeDefined(); 
			});
		});
	});

	describe('Format view to currency', function() {
		it('should format view on blur', function() {
			inject(function($compile, $rootScope, $sniffer) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);
				element.val('1234.5');
				var inputEvent = ($sniffer.hasEvent('input') ? 'input' : 'change');
				element.triggerHandler(inputEvent);
				element.triggerHandler('blur');

				expect(element.val()).toEqual('$1,234.50');
			});
		});

		it('format negative number with -', function() {
			inject(function($compile, $rootScope, $sniffer) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);
				element.val('-.5');
				var inputEvent = ($sniffer.hasEvent('input') ? 'input' : 'change');
				element.triggerHandler(inputEvent);
				element.triggerHandler('blur');

				expect(element.val()).toEqual('-$0.50');
			});
		});
	});

		
	describe('E2E view changes', function() {
		it('switch to invalid value', function() {
			inject(function($compile, $rootScope, $sniffer) {
				var element;
				element = $compile("<input type=\"text\" id-currency ng-model=\"amount\" />")($rootScope);
				var inputEvent = ($sniffer.hasEvent('input') ? 'input' : 'change');
				element.val('1');
				element.triggerHandler(inputEvent);
				expect($rootScope.amount).toEqual(1);
				expect(element.val()).toEqual('1');

				element.val('a');
				element.triggerHandler(inputEvent);
				expect(element.val()).toEqual('a');

				expect($rootScope.amount).not.toBeDefined(); 

				element.triggerHandler('blur');

				expect($rootScope.amount).not.toBeDefined(); 
				expect(element.val()).toEqual('');
			});
		});
	});
});