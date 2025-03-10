export function getOneCapAccountLink(oneCapEnvironment: string, accountId: string) {
    if (oneCapEnvironment.toLowerCase() === 'prod') {
        return `https://cwk.lightning.force.com/lightning/r/Account/${accountId}/view`;
    } else {
        return `https://cwk--${oneCapEnvironment.toLowerCase()}.sandbox.lightning.force.com/lightning/r/Account/${accountId}/view`;
    }
}

export function getOneCapContactLink(oneCapEnvironment: string, contactId: string) {
    if (oneCapEnvironment.toLowerCase() === 'prod') {
        return `https://cwk.lightning.force.com/lightning/r/Contact/${contactId}/view`;
    } else {
        return `https://cwk--${oneCapEnvironment.toLowerCase()}.sandbox.lightning.force.com/lightning/r/Contact/${contactId}/view`;
    }
}