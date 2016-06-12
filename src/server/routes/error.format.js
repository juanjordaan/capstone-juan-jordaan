'use strict';

let errorFormatter = function () {};

errorFormatter.prototype.getResponse = function (validationResult) {
  let formatted = [];

  if(validationResult.errors){
    console.log('validationResult.errors = ' + JSON.stringify(validationResult.errors, null, '\t'));
    for( let index in validationResult.errors ){
      if( validationResult.errors[index].properties ){
        switch (validationResult.errors[index].properties.type){
            case 'required':
              formatted.push(validationResult.errors[index].path.charAt(0).toUpperCase() + validationResult.errors[index].path.slice(1) + ' is required.');
            break;

            case 'user defined':
              if(validationResult.errors[index].path != 'username'){
                var msg = '';
                var valueIndex = validationResult.errors[index].message.indexOf(' Value: ');
                if( valueIndex ){
                  var msg = validationResult.errors[index].message.substr(0, valueIndex);

                  // console.log('msg.startsWith 1');
                  if(msg.startsWith('Error, ')){
                    // console.log('msg.startsWith 2');
                    msg = msg.substr('Error, '.length, msg.length);
                  }

                  msg = msg.charAt(0).toUpperCase() + msg.slice(1);
                }
                else{
                  msg = validationResult.errors[index].message.charAt(0).toUpperCase() + validationResult.errors[index].message.slice(1);
                }

                formatted.push( msg );
              }
            break;

            default:
              return ['Unexpected Error Occured `' + validationResult.errors[index].properties.type + '` received. Please Contact support with this message'];
        }
      }
      else{
        formatted.push('Please select a valid ' + validationResult.errors[index].path);
      }
    }
  }
  else {
    console.log('validationResult = ' + JSON.stringify(validationResult, null, '\t'));
    formatted.push(validationResult.errmsg);
  }

  return formatted;
};

exports.errorFormatter = new errorFormatter();
