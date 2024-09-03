import test from 'node:test';
import assert from 'node:assert';
import operations from '../src/operations/operations.js';
import express from 'express';
import request from 'supertest';
import server from '../src/index.js';

test( 'Invoices function should create invoices', async ( t ) =>
    {
        await t.test( 'should create invoices without errors', async () =>
            {
                try
                {
                    await operations.invoices();
                    assert.ok( true, 'Invoices created successfully' );
                }
                catch ( error )
                {
                    assert.fail( 'Invoices creation failed' );
                }
            }
        );
    }
);

test( 'Transfer function should create a transfer', async ( t ) =>
    {
        await t.test( 'should create a transfer without errors', async () =>
            {
                try
                {
                    await operations.transfer( 1000 );
                    assert.ok( true, 'Transfer created successfully' );
                }
                catch ( error )
                {
                    assert.fail( 'Transfer creation failed' );
                }
            }
        );
    }
);

test( 'Express server should handle requests', async ( t ) =>
    {
    const app = express();
    app.use( '/', server );

    await t.test( 'should respond to GET / with status 200', async () =>
        {
            await request( app )
                .get( '/' )
                .expect( 200 )
                .then( ( response ) =>
                    {
                        assert.ok( response, 'Server responded successfully' );
                    }
                )
                .catch( ( error ) => 
                    {
                        assert.fail( 'Server response failed' );
                    }
                );
        }
    );

    await t.test( 'should handle invoice events', async () =>
        {
            const event =
            {
                subscription: 'invoice',
                log: {
                    invoice: {
                        status: 'credited',
                        amount: '1000'
                    }
                }
            };

            await request( app )
                .post( '/' )
                .send( event )
                .expect( 200 )
                .then( ( response ) =>
                    {
                        assert.ok( response, 'Invoice event handled successfully' );
                    }
                )
                .catch( ( error ) =>
                    {
                        assert.fail( 'Invoice event handling failed' );
                    }
                );
        }
    );
    }
);