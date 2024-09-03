import starkbank from 'starkbank';

export const transfer = async ( amount ) =>
{
    const result = await starkbank.transfer.create(
        [
            {
                amount: amount,
                name: 'Stark Bank S.A.',
                taxId: '20.018.183/0001-80',
                bankCode: '20018183',
                branchCode: '0001',
                accountNumber: '6341320293482496', // TODO: this does not match the required format
                accountType: 'payment'
            }
        ]
    );

    for ( let transfer of result )
    {
        console.log( transfer );
    }
}