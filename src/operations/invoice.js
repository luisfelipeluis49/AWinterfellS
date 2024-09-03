import starkbank from 'starkbank';

const sampleNames =
[
    'Iron Bank S.A.',
    'Lannister Inc.',
    'Stark Enterprises',
    'Baratheon Ltd.',
    'Targaryen Corp.',
    'Greyjoy Holdings',
    'Tyrell Group',
    'Martell LLC',
    'Bolton Industries',
    'Frey & Co.',
    'Arryn Associates',
    'Tully Brothers',
    'Mormont Ventures',
    'Dorne Enterprises',
    'Hightower Holdings',
    'Reed & Sons',
    'Blackwood Ltd.',
    'Bracken Corp.',
    'Dayne Industries',
    'Florent Group',
    'Hornwood LLC',
    'Karstark & Co.',
    'Manderly Associates',
    'Umber Brothers'
];

const getRandomName = () =>
{
    const randomIndex = Math.floor( Math.random() * sampleNames.length );
    return sampleNames[ randomIndex ];
}

const generateCPF = () =>
{
    const randomDigits = () => Math.floor( Math.random() * 9 );
    const CPF = Array.from( { length: 9 }, randomDigits );

    const calculateCheckDigit = ( CPF, factor ) =>
    {
        const total = CPF.reduce( ( sum, digit, index ) => sum + digit * ( factor - index), 0 );
        const remainder = total % 11;

        return remainder < 2 ? 0 : 11 - remainder;
    }

    CPF.push( calculateCheckDigit( CPF, 10 ) );
    CPF.push( calculateCheckDigit( CPF, 11 ) );

    return CPF.join( '' );
}

const formatCPF = ( CPF ) =>
{
    return CPF.replace( /(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4' );
}

const generateInvoices = () =>
{
    const amount = Math.floor( Math.random() * 5 ) + 8;

    return Array.from( { length: amount }, () =>
    {
        return {
            amount: Math.floor( Math.random() * 1000000 ),
            taxId: formatCPF( generateCPF() ),
            name: getRandomName()
        }
    } );
}

export const invoices = async() =>
{
    const result = await starkbank.invoice.create(
        generateInvoices()
    );

    for( let invoice of result )
    {
        console.log( invoice );
    }
};
