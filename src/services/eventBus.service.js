'use strict'

function createEventEmitter(defaultHandler = null){
    const listenersMap = {}
    const defHandler = defaultHandler

    return {
        on(evName, listener){
            listenersMap[evName] = listenersMap[evName] ? [ ...listenersMap[evName], listener ] : [ listener ]
            return () => listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
        },
        emit(evName, payload){
            if(listenersMap[evName]) listenersMap[evName].forEach(listener => listener(payload))
            else if(defaultHandler) defaultHandler()
        }
    }
}
export const eventBus = createEventEmitter()

export function showUserMsg(msg) {
    eventBus.emit('user-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({txt, type: 'success', timeout: 2500,})
}
export function showErrorMsg(txt) {
    showUserMsg({txt, type: 'error', timeout: 2500,})
}