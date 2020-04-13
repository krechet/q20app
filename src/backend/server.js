var WebSocketServer = require('websocket').server;
var http = require('http');

const MAX_QUESTIONS = 3

var server = http.createServer(function(request, response) {
});

server.listen(1339, function() { });

const wsServer = new WebSocketServer({
	httpServer: server
});

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
  }

let channels = []

let session_id_seq = 1


function broadcast(session, msg) {
	session.channels.forEach(ch => ch.sendUTF(JSON.stringify(msg)))
}

let sessions = {}

wsServer.on('request', function(request) {

	let ch = request.accept(null, request.origin);


	ch.on('message', function(message) {


		console.log(message)

		
		if (message.type === 'utf8') {

			let msg = JSON.parse(message.utf8Data)

			if(msg.type === 'CONNECT') {

				if(msg.session_id && sessions[msg.session_id]) {

					console.log('requested connection, sending items')

					sessions[msg.session_id].channels.push(ch)

					ch.sendUTF(JSON.stringify({
						type: 'SESSION_CONNECTED',
						session_id: msg.session_id,
						session_key: sessions[msg.session_id].key
					}))	

					Object.keys(sessions[msg.session_id].messages).forEach(k => {
						ch.sendUTF(JSON.stringify(sessions[msg.session_id].messages[k] || '{}'))
					})
	

				} else if(!sessions[msg.session_id]) {

					ch.sendUTF(JSON.stringify({
						type: 'BAD_SESSION_ID',
						session_id: msg.session_id
					}))						

				}

				return


			}

			if(msg.type === 'START_NEW_SESSION') {

				console.log('Starting new session')

				let sid = session_id_seq++
				let key = uuidv4() 

				sessions[sid] = {
					messages: [],
					channels: [ch],
					total_questions: 0,
					status: 'playing',
					key,
					word: msg.word
				}

				ch.sendUTF(JSON.stringify({
					type: 'SESSION_STARTED',
					session_id: sid,
					session_key: key
				}))

				return
			}

			// Processing normal sessions

			let session = sessions[msg.session_id]

			if(msg.id && msg.answer) {

				session.messages[msg.id].answer = msg.answer
				broadcast(session, session.messages[msg.id])

				if(session.questionsDisabled && session.messages[msg.id].type === 'question') {

					let _msg = {
						id: uuidv4(),
						timestamp: Math.floor(new Date() / 1000),
						type: 'SYSTEM',
						action: 'DISABLE_QUESTIONS',
						text: 'No more questions allowed, only one guess attempt left'
					}
	
					session.messages[_msg.id] = _msg
					broadcast(session, _msg)	
				}

				return
			}

			if(!msg.id) {

				msg.timestamp = Math.floor(new Date() / 1000)
				msg.id = uuidv4()
	
				if(msg.type === 'guess') {
	
					if( session.word.toUpperCase() === msg.text.toUpperCase()) {

						msg.answer = 'yes'						
						session.state = 'finished'
						session.winner = 'Player 2'

						let _msg = {
							id: uuidv4(),
							timestamp: Math.floor(new Date() / 1000),
							type: 'SYSTEM',
							action: 'STOP_GAME',
							text: 'That was the correct word. Player2 wins.'
						}
	
						session.messages[_msg.id] = _msg
						broadcast(session, _msg)
						return

					} else if(session.questionsDisabled) {

						msg.answer = 'no'						
						session.state = 'finished'
						session.winner = 'Player 1'

						let _msg = {
							id: uuidv4(),
							timestamp: Math.floor(new Date() / 1000),
							type: 'SYSTEM',
							action: 'STOP_GAME',
							text: 'The last attempt was incorrect. Player 1 wins.'
						}
	
						session.messages[_msg.id] = _msg
						broadcast(session, _msg)
						return					
					} else {
						msg.answer = 'no'
					}

				} else if(msg.type === 'question') {

					console.log('-->')

					if(!!Object.keys(session.messages).find(k => {
						let i = session.messages[k]
						return i.type === 'question' && !i.answer
					})){
						return
					}

					console.log('-->2', msg)


					msg.question_number = ++session.total_questions


					if(msg.question_number == MAX_QUESTIONS) {

						console.log('Max questions number achieved')
						session.questionsDisabled = true

											
					}
	
					if(msg.question_number > MAX_QUESTIONS) {
						return
					}
					
				}
	
				session.messages[msg.id] = {...session.messages[msg.id], ...msg}
				
				broadcast(session, msg)
	
			}

		}
	});

	ch.on('close', function(connection) {
		console.log('Connection closed')
	});

	channels.push(ch)
});