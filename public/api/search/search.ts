import Ajax from '../../modules/Ajax';

/** Search for name with url */
export async function search(url, name) {
    let items;

    await Ajax.post(
        {
            url,
            // @ts-ignore
            body: {
                query: name,
                amount: 5,
            },
            reject: (message) => {
                console.error('Artist request api error:', message);
            },
        },
    ).then((data) => {
        items = data;
    });

    return items;
}
