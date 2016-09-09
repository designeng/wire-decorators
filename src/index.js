import wire from 'essential-wire';
import mainSpec from './main.spec';

wire(mainSpec)
    .then(context => {
        console.log("CTX:::", context);
    })
    .otherwise(error => console.log("ERROR::::", error))