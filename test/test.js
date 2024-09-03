import test from 'node:test';
import assert from 'node:assert';
import operations from '../src/operations/operations.js';
import express from 'express';
import request from 'supertest';
import starkbank from 'starkbank';
import sinon from 'sinon';
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

    await t.test( 'should handle invoice events', async () =>
        {
            const parseStub = sinon.stub( starkbank.event, 'parse' ).returns(
                {
                    subscription: 'invoice',
                    log: {
                        invoice: {
                            status: 'credited',
                            amount: '1000'
                        }
                    }
                }
            );

            const event =
            {
                subscription: 'invoice',
                log: {
                    invoice: {
                        status: 'paid',
                        amount: '1000'
                    },
                    type: 'credited'
                }
            };

            await request( app )
                .get( '/' )
                .send( event )
                .set('Digital-signature', 'mock-signature')
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

            parseStub.restore();
        }
    );
    }
);