const JSDOMEnvironment = require('jest-environment-jsdom').default;

class MyJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args) {
    super(...args);

    this.global.Request = Request;
    this.global.Response = Response;
    this.global.TextEncoder = TextEncoder; // Had to add this
    this.global.TextDecoder = TextDecoder; // Had to add this
    this.global.fetch = fetch;
    this.global.structuredClone = structuredClone;
  }
}

module.exports = MyJSDOMEnvironment;
