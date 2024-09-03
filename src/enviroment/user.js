import starkbank from 'starkbank';

const privateKeyContent = `
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIHo0zyfJXXrUT7UCvEgsvQbw0MiWzJLUo1nGlliZhMpkoAcGBSuBBAAK
oUQDQgAE+C/H514PmgOQsSWLYFGS13wCPjDhxkETT4ONzvJWArImgE2GAji0YDzO
kFNEe3qWdjL5Va6cqDEBbYP1IABGDA==
-----END EC PRIVATE KEY-----
`

const project = new starkbank.Project(
    {
        environment: 'sandbox',
        id: '5804654722023424',
        privateKey: privateKeyContent
    }
);

export default project;