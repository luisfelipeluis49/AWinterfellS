import starkbank from 'starkbank';

const [ privateKey, publicKey ] = starkbank.key.create( `C:/Users/luisf/dev/winterfel/castle/keys.pem` );

console.log( privateKey );
console.log( publicKey );
