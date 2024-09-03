import starkbank from 'starkbank';

export const webhook = async () =>
{
    const webhook = await starkbank.webhook.create(
        {
            url: 'https://webhook.site/f78b2a0a-bdcc-4599-b4a5-5a1fc836b232',
            subscriptions: [ 'invoice' ]
        }
    );

    console.log( webhook );
}