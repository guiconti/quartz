import MockAdapter from 'axios-mock-adapter';

export default axios => {
  const mock = new MockAdapter(axios);

  mock
    .onPost('/auth/sign_up')
    .reply(200, {
      msg: 'Hi'
    });

  mock
    .onPost('/auth/sign_in')
    .reply(200, {
      msg: 'Hi'
    });

  mock
    .onPost('/auth/sign_out')
    .reply(200, {
      msg: 'Hi'
    });

};
