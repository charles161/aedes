'use strict'

function validateTopic (topic, message) {
  const end = topic.length - 1
  const endMinus = end - 1
  const slashInPreEnd = endMinus >= 0 && topic.charCodeAt(endMinus) !== 47
  if (topic.length === 0) { // [MQTT-3.8.3-3]
    return new Error('impossible to ' + message + ' to an empty topic')
  }
  for (var i = 0; i < topic.length; i++) {
    switch (topic.charCodeAt(i)) {
      case 35: // #
        var notAtTheEnd = i !== end
        if (notAtTheEnd || slashInPreEnd) {
          return new Error('# is only allowed in ' + message + ' in the last position')
        }
        break
      case 43: // +
        var pastChar = i < end - 1 && topic.charCodeAt(i + 1) !== 47
        var preChar = i > 1 && topic.charCodeAt(i - 1) !== 47
        if (pastChar || preChar) {
          return new Error('+ is only allowed in ' + message + ' between /')
        }
        break
    }
  }
}

module.exports = {
  validateTopic
}
