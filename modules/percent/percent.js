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
angular.module('id.percent',[]).
  directive('idPercent', ['$filter', function idCurrencyInjectingFunction($filter) {

   function stripToNumber(num){
      num = num || '';
      var number = parseFloat(num.replace(/[^0-9|^\.|^-]+/g, ''));
      if (isNaN(number)){
        return undefined;
      }
      return number;
   }

    function formatToPercent(number){
      if(isNaN(number)){
        return undefined;
      }
       if(number<0){
        return '-' + $filter('number')(number*-1,2)+'%';
       }
       return $filter('number')(number,2)+'%';
    }

    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {


        element.on('blur', function () {
            scope.$apply(function () {
                var viewValue = element.val();
                var number = stripToNumber(viewValue);

                var formatted = formatToPercent(number);
                if (ctrl.$viewValue !== formatted) {
                    element.val(formatted);
                    ctrl.$setViewValue(formatted);
                }

            });
        });

        function viewValueChange(viewValue) {
          var decimal = stripToNumber(viewValue);
          if(!isNaN(decimal)){
            decimal = decimal/100.0;
          }
          ctrl.$setValidity('validPercent', !isNaN(decimal));
          return decimal;
        }
  
        function modelChange(val) {
          ctrl.$setValidity('validPercent', !isNaN(val));
          return formatToPercent(val*100.0);
        }

        ctrl.$parsers.push(viewValueChange);
        ctrl.$formatters.unshift(modelChange);
    }
  };
}]);
