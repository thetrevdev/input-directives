/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('id.currency',[]).
  directive('idCurrency', [ function idCurrencyInjectingFunction($filter) {

   function stripToNumber(num){
      num = num || '';
      var number = parseFloat(num.replace(/[^0-9|^\.|^-]+/g, ''));
      if (isNaN(number)){
        return 0;
      }
      return number;
   }
   
   function formatToCurrency(number){
     if(number<0){
      return '-' + $filter('currency')(number*-1);
     }
     return $filter('currency')(number);
    }
       

    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
  
        angular.element(element).bind('blur', function (e) {
            scope.$apply(function () {
              var viewValue = element.val();
              if(viewValue !== '' && viewValue !== undefined){
                var formatted = formatToCurrency(stripToNumber(viewValue));
                
                if (ctrl.$viewValue !== formatted) {
                    element.val(formatted);
                    ctrl.$setViewValue(formatted);
                }
              }
            });
        });
  
        function viewValueChange(viewValue) {
          var decimal = stripToNumber(viewValue);
          return decimal;
        }
  
        function modelChange(modelVal) {
          var val = modelVal;
          return formatToCurrency(val);
        }
        
        ctrl.$parsers.push(viewValueChange);
        ctrl.$formatters.unshift(modelChange);
        
        if(attr.min){
          var min = scope.$eval(attr.min);
          var minValidator = function (number) {
            if (number >= min) {
                ctrl.$setValidity('min', true);
            } else {
                ctrl.$setValidity('min', false);
            }
            return number;
          };
          
          ctrl.$parsers.push(minValidator);
          ctrl.$formatters.push(minValidator);
        }
    }
  };
}]);
