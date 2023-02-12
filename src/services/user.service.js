'use strict'

export const userService = {
    getUser
}

function getUser(){
    const user = {
        name: "Puki Ben David",
        balance: 100,
        transactions: []
    }
    return user
}


