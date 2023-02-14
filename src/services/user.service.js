'use strict'

// export const userService = {
//     getUser
// }

// function getUser() {
//     const user = {
//         name: "Puki Ben David",
//         balance: 100,
//         transactions: []
//     }
//     return user
// }





import { utilService } from './util.service'
import { storageService } from './async-storage.service'
import { contactService } from './contact.service'
// import { httpService } from './http.service'

const STORAGE_KEY_USER = 'loggedinUser'

// const user = {
//     name: "Puki Ben David",
//     balance: 100,
//     transactions: [
//         {
//             toId: "d99e3u2ih329",
//             to: "Moshiko",
//             at: 2652712571,
//             amount: 2
//         },
//         {
//             toId: "d99e3u2ih329",
//             to: "Moshiko",
//             at: 2652712571,
//             amount: 2
//         },
//     ]
// }

export const userService = {
    getUser,
    saveUser,
    transferFunds,
    getTransactions,
}

// window.userService = userService

async function saveUser(userName) {
    try {
        const prevUser = await storageService.loadFromStorage(STORAGE_KEY_USER)
        if (!prevUser || prevUser.name !== userName) {
            const newUser = {
                name: userName,
                balance: 100,
                transactions: []
            }
            const savedUser = storageService.saveToStorage(STORAGE_KEY_USER, newUser)
            return savedUser
        } else {
            return prevUser
        }
    } catch (err) {
        console.log('err:', err)
    }
}

async function getUser() {
    try {
        const currUser = await storageService.loadFromStorage(STORAGE_KEY_USER)
        return currUser
    } catch (err) {
        console.log('err:', err)
    }
}

async function transferFunds(contact, fund) {
    console.log('transfer ervice:')
    try {
        if(fund === 0) return 'Please enter an amount'
        // console.log('fund:', fund)
        const currUser = await getUser()
        // console.log('currUser.balance:', currUser.balance)
        if(currUser.balance - fund <= 0) return 'Balance too low'
        const transaction = {
            id: utilService.makeId(),
            toId: contact._id,
            to: contact.name,
            fromId: currUser._id,
            from: currUser.name,
            at: Date.now(),
            amount: fund
        }

        currUser.transactions.unshift(transaction)
        currUser.balance = currUser.balance-fund
        storageService.saveToStorage(STORAGE_KEY_USER, currUser)

        contact.transactions.unshift(transaction)
        await contactService.saveContact(contact)

        return 'Transfer complete'
    } catch (err) {
        console.log('err:', err)
        throw new Error('Transfer failed') 
    }
}

async function getTransactions() {
    try {
        const currUser = await storageService.loadFromStorage(STORAGE_KEY_USER)
        return currUser.transactions
    } catch (err) {
        console.log('err:', err)
    }
}

// function remove(userId) {
//     return storageService.remove(STORAGE_KEY_USER, userId)
// }

async function updateUser(user) {
    try{
        await storageService.put('user', user)
        return user
    } catch(err){
        console.log('err:', err)
    }
}

// async function login(userCred) {
//     // const users = await storageService.query('user')
//     // const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
//     try {
//         const user = await httpService.post('auth/login', userCred)
//         if (user) {
//             // socketService.login(user._id)
//             console.log('user:', user)
//             return saveLocalUser(user)
//         }
//     } catch (err) {
//         console.dir(err)
//     }
// }

// async function signup(userCred) {
//     userCred.balance = 100
//     console.log('userCred:', userCred)
//     const user = await storageService.post('user', userCred)
//     return saveLocalUser(user)
// }

// async function logout() {
//     sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER)
//     // return await httpService.post('auth/logout')
// }

// // async function changeScore(by) {
// //     const user = getLoggedinUser()
// //     if (!user) throw new Error('Not loggedin')
// //     user.score = user.score + by || by
// //     await update(user)
// //     return user.score
// // }


// function saveLocalUser(user) {
//     user = { _id: user._id, fullname: user.fullname, username: user.username, imgUrl: user.imgUrl }
//     sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(user))
//     return user
// }

// function getLoggedinUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_IN_USER))
// }

// function getEmptyCredentials() {
//     return ({
//         fullname: '',
//         username: '',
//     })
// }






