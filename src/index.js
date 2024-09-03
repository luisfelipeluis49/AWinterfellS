import starkbank from 'starkbank';
import express from 'express';
import project from './enviroment/user.js';
import operations from './operations/operations.js';

starkbank.user = project;
starkbank.language = 'en-US';

const server = express();

server.use( express.raw( { type: '*/*' } ) );

const port = 3000;

server.get( '/', async ( req, res ) =>
    {
        try
        {
            const event = await starkbank.event.parse(
                {
                    content: req.body.toString(),
                    signature: req.headers[ 'Digital-signature' ]
                }
            );

            if ( event.subscription === 'invoice' )
            {
                const invoice = event.log.invoice;

                console.log( invoice );

                if ( invoice.status === 'credited' )
                {
                    await operations.transfer( parseInt( invoice.amount ) );
                }
            }

            res.end();
        }
        catch( error )
        {
            console.error( error );
            res.status( 400 ).end();
        }
    }
);

const tryOperation = async () =>
{
    try
    {
        await operations.invoices();
    }
    catch ( error )
    {
        console.error( 'Error calling invoices:', error );
    }
}

const scheduleInvoices = async () =>
{
    console.log( 'Scheduling invoices for the next 24 hours' );

    const MS_IN_HOUR = 60 * 60 * 1000;
    const interval = 3 * MS_IN_HOUR;
    const duration = 24 * MS_IN_HOUR;

    await tryOperation();
    const intervalId = setInterval(
        tryOperation,
        interval
    );

    setTimeout(
        () =>
        {
            clearInterval( intervalId );
            console.log( 'Stopped scheduling invoices after 24 hours' );
        },
        duration
    );
}

server.listen(
    port,
    () =>
    {
        console.log( `Server listening on port ${port}` );
        scheduleInvoices();
    }
);


export default server;
