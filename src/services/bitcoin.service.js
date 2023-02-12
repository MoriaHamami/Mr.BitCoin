'use strict'

import axios from 'axios'
// import { dbService } from './db.service.js'
import { storageService } from './storage.service.js'

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

// getRate()
// getMarketPriceHistory() 

// console.log('getRate():', ())
async function getRate() {
    try {
        
        let rate = await storageService.load('rate')
        console.log('here:', rate)
        if (!rate) {
            console.log('here1:')
            const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
            rate = res.data
            storageService.save('rate', rate)
        }
        // console.log('rate:', rate)
        return rate
    } catch(err) {
        console.log('Could not get rate:', err)
    }
}

async function getMarketPriceHistory() {
    try {
        let priceHistory = await storageService.load('priceHistory')
        console.log('here:', priceHistory)
        if (!priceHistory) {
            console.log('here2:')
            const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true')
            // const res = await axios.get('https://api.blockchain.info/charts/marketprice?timespan=5months&format=json&cors=true')
            priceHistory = res.data
            storageService.save('priceHistory', priceHistory)
        }
        console.log('priceHistory:', priceHistory)
        return priceHistory
    } catch(err) {
        console.log('Could not get price history:', err)
    }
}

async function getAvgBlockSize() {
    try {
        
        let avgBlockSize = await storageService.load('avgBlockSize')
        console.log('here:', avgBlockSize)
        if (!avgBlockSize) {
            console.log('here3:')
            const res = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
            avgBlockSize = res.data
            storageService.save('avgBlockSize', avgBlockSize)
        }
        return avgBlockSize
    } catch(err) {
        console.log('Could not get avg block size:', err)
    }
}

// function query(filterBy = getDefaultFilter()) {
//     const queryParams = `?vendor=${filterBy.vendor}&minSpeed=${filterBy.minSpeed}&pageIdx=${filterBy.pageIdx}`
//     return axios.get(BASE_URL + queryParams)
//         .then(res => res.data)
// }

// function get(carId) {
//     return axios.get(BASE_URL + carId).then(res => res.data)
// }

// function remove(carId) {
//     return axios.delete(BASE_URL + carId).then(res => res.data)
// }

// function save(car) {
//     const url = (car._id) ? BASE_URL + `${car._id}` : BASE_URL
//     const method = (car._id) ? 'put' : 'post'
//     return axios[method](url, car).then(res => res.data)
// }

