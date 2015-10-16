angular.module('app.filters',[])
  .filter('dinero',
  [ '$filter', '$locale', function(filter, locale) {
    var currencyFilter = filter('currency');
    var formats = locale.NUMBER_FORMATS;
    return function(amount, num, currencySymbol) {
      if (num===0) num = -1;
      var value = currencyFilter(amount, currencySymbol);
      var sep = value.indexOf(formats.DECIMAL_SEP)+1;
      var symbol = '';
      if (sep<value.indexOf(formats.CURRENCY_SYM)) symbol = ' '+formats.CURRENCY_SYM;
      return value.substring(0, sep+num)+symbol;
    };
  } ]);
