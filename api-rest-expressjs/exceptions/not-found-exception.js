class NotFoundException extends Error {
  constructor(message) {
    super(message || 'Not found')
  }
}

module.exports = NotFoundException
