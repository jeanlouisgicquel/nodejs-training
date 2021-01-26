const { hashPassword, checkPassword } = require('./server/utils')
const bcrypt = require('bcryptjs')

console.log(hashPassword('old'))
console.assert(
  checkPassword(
    'olds',
    '$2a$10$Af/UopvmSmLyAx75OILbKOIARIK8U5MTMWU8lY.daeTXBasmpYnjS'
  )
)
console.assert(
  bcrypt.compareSync(
    '$2a$10$Af/UopvmSmLyAx75OILbKOIARIK8U5MTMWU8lY.daeTXBasmpYnjS',
    '$2a$10$kZwEAyG4n./m6eXYLYbNLeEyJ/BHICwd2PzRTgW4LAubpYV9SATZe'
  )
)
