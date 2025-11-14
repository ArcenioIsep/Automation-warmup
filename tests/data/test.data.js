export const USERS = {
  valid: {
    username: 'test',
    password: 'password123',
    expectedMessage: 'User successfully logged in! Redirecting...',
  },
  blocked: {
    username: 'testblock',
    password: 'password123',
     expectedMessage: 'User blocked!',

  },
  invalid: {
    username: 'invalidUser',
    password: 'password123',
    expectedMessage: 'User not found!',

  },
  wrongPassword: {
    username: 'test',
    password: 'password1234',
        expectedMessage: 'Incorrect username or password!',

  },
  temporaryBlock: {
    username: 'test',
    password: 'password1234',
        expectedMessage: 'User temporarily blocked!',

  },

};