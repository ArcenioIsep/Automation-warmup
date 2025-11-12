export const USERS = {
  valid: {
    username: 'test',
    password: 'password123',
    expectedMessage: 'User successfully logged in! Redirecting...',
  },
  blocked: {
    username: 'testblock',
    password: 'password123',
    expectedMessage: 'User successfully logged in! Redirecting...',

  },
  invalid: {
    username: 'invalidUser',
    password: 'password123',
     expectedMessage: 'User successfully logged in! Redirecting...',

  },
  wrongPassword: {
    username: 'test',
    password: 'password1234',
    expectedMessage: 'User successfully logged in! Redirecting...',

  },
};