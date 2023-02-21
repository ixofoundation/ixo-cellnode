interface session {
    id: string;
    dateTime: string;
    count: number;
    duration: string;
    proof: {
        type: string;
        value: string;
    };
}

interface claim {
    type: string;
    status: string;
    evidence: {
        fuelSale: {
            type: string;
            value: string;
            unitCode: string;
            name: string;
            dateTime: string;
        };
        customer: {
            identifier: string;
            verfiableCredential: {
                id: string;
                type: string;
            };
            payment: {
                type: string[];
                identifier: string;
                name: string;
                method: string;
                provider: string;
                amount: {
                    value: number;
                    currency: string;
                };
                data: {
                    type: string;
                    sessions: session[];
                };
            };
        };
    };
}

const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generateClaims = (amount: number) => {
    const claims: any[] = [];
    for (let num = 0; num < amount; num++) {
        const sessionAmount = randomInt(1, 11);
        const sessionArr: session[] = [];
        for (let num = 0; num < sessionAmount; num++) {
            const session: session = {
                id: (randomInt(num, sessionAmount)).toString(),
                dateTime: new Date().toString(),
                count: 0,
                duration: randomInt(50, 9999).toString(),
                proof: {
                    type: "",
                    value: "",
                },
            };
            sessionArr.push(session);
        }
        const claim: claim = {
            type: "emerging:cleanCooking",
            status: "",
            evidence: {
                fuelSale: {
                    type: "schema:quantitativeValue",
                    value: "30",
                    unitCode: "kg",
                    name: "biomassPellets",
                    dateTime: "",
                },
                customer: {
                    identifier: randomInt(1, 10000000).toString(),
                    verfiableCredential: {
                        id: "",
                        type: "ixo:verifiableCredential",
                    },
                    payment: {
                        type: [
                            "schema:paymentTransaction",
                            "schema:paymentMethod",
                            "schema:priceSpecification",
                        ],
                        identifier: `MP${randomInt(1, 999999)}.${randomInt(1, 9999)}.L${randomInt(1, 99999)}`,
                        name: "transactionId",
                        method: "telco",
                        provider: "airtel",
                        amount: {
                            value: randomInt(10, 1000),
                            currency: "ZMW",
                        },
                        data: {
                            type: "emerging:cookingSessions",
                            sessions: sessionArr,
                        },
                    },
                },
            },
        };
        claims.push({
            "@context": {
                ixo: "https://w3id.org/ixo/ns/protocol/claim",
                schema: "https:schema.org/",
                emerging: "https://w3id/org/emerging/ns/attributes/v1",
                "@id": "type",
            },
            protocol: {
                id: "did:ixo:...",
                type: "ixo:verifiableClaim",
            },
            issuer: "did:ixo:123...",
            issuanceDate: "2023-01-01T19:23:24Z",
            claimSubject: {
                identifier: "",
                verfiableCredential: {
                    id: "",
                    type: "ixo:verifiableCredential",
                },
            },
            claim: { ...claim },
        });
    }
    return claims;
};
