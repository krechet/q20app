import {
    getCookie,
    setCookie,
    clearAllCookies
} from './helpers'

let webSocketsService = {}

webSocketsService.install = function(Vue, options) {

    let ws = null
    let reconnectInterval = options.reconnectInterval || 1000

    Vue.prototype.$webSocketsConnect = () => {

		ws = new WebSocket(options.url)

		ws.onopen = () => {
			// Restart reconnect interval
			reconnectInterval = options.reconnectInterval || 1000
		}
	
		ws.onmessage = (event) => {
			// New message from the backend - use JSON.parse(event.data)
			handleMessage(event)
		}
	
		ws.onclose = (event) => {
			if (event) {
				// Event.code 1000 is our normal close event
				if (event.code !== 1000) {
					let maxReconnectInterval = options.maxReconnectInterval || 3000
					setTimeout(() => {
						if (reconnectInterval < maxReconnectInterval) {
							// Reconnect interval can't be > x seconds
							reconnectInterval += 1000
						}
						Vue.prototype.$webSocketsConnect()
					}, reconnectInterval)
				}
			}
		}
	
		ws.onerror = (error) => {
			console.log(error)
			ws.close()
		}
    }

    Vue.prototype.$webSocketsDisconnect = () => {
        // Our custom disconnect event
        ws.close()
    }

    Vue.prototype.$webSocketsSend = (data) => {
        ws.send(JSON.stringify(data))
    }

    function handleMessage(params) {

        let msg = JSON.parse(params.data)

        if (msg.type === 'SYSTEM') {
            if (msg.action) {
                options.store.dispatch(`messages/${msg.action}`)
            }
        }

        if (msg.type === 'BAD_SESSION_ID') {
            options.router.push(`/`)
            return
        }

        if (msg.type === 'SESSION_STARTED' && msg.session_id) {
            setCookie('session_key', msg.session_key, 1)
            setCookie('session_word', msg.word, 1)
            options.store.dispatch('messages/setRole', 'owner')
            options.store.dispatch('messages/setWord', msg.word)
            options.router.push(`/session/${msg.session_id}`)
            return
        }

        if (msg.type === 'SESSION_CONNECTED' && msg.session_key) {

            if (getCookie('session_key') !== msg.session_key) {
                console.log('PLAYER')
                clearAllCookies()
                options.store.dispatch('messages/setRole', 'player')
            } else {
                options.store.dispatch('messages/setRole', 'owner')
                options.store.dispatch('messages/setWord', getCookie('session_word'))
            }
            return
        }


        options.store.dispatch('messages/setItems', msg)
	}
	
	Vue.prototype.$webSocketsConnect()
}

export default webSocketsService