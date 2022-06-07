const usersDb = [
    {
        id: 1,
        name: "Delivery App Admin",
        email: "adm@deliveryapp.com",
        role: "administrator"
    },
    {
        id: 2,
        name: "Fulana Pereira",
        email: "fulana@deliveryapp.com",
        role: "seller"
    },
    {
        id: 3,
        name: "Cliente Zé Birita",
        email: "zebirita@email.com",
        role: "customer"
    },
];
const sellersDb= [
    {
        id: 2,
        name: "Fulana Pereira",
        email: "fulana@deliveryapp.com",
        role: "seller"
    },
]

module.exports = { 
    usersDb,
    sellersDb,
}