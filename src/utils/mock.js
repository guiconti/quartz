import MockAdapter from 'axios-mock-adapter';

export default axios => {
  const mock = new MockAdapter(axios);

  mock.onPost('/auth/sign_up').reply(200, {
    msg: 'Hi'
  });

  mock.onPost('/auth/sign_in').reply(200, {
    msg: 'Hi'
  });

  mock.onPost('/auth/sign_out').reply(200, {
    msg: 'Hi'
  });

  mock.onGet('/user').reply(200, {
    msg: {
      _id: '5c3fc415ee6803a41dee74d7',
      username: 'teste'
    }
  });

  mock.onPost('/rooms').reply(200, {
    msg: {
      id: '1',
      name: 'teste',
      owner: '1',
      users: [],
      active: true
    }
  });

  mock.onGet('/rooms?active=true').reply(200, {
    msg: [
      {
        name: 'Testando',
        game: '',
        users: [
          {
            _id: '5c3fc415ee6803a41dee74d7',
            username: 'teste'
          }
        ],
        active: true,
        _id: '5c3fef22831588b451f2ae4a',
        owner: {
          _id: '5c3fc415ee6803a41dee74d7',
          username: 'teste'
        },
        __v: 1
      },
      {
        name: 'Super test',
        game: '',
        users: [
          {
            _id: '5c3fc415ee6803a41dee74d7',
            username: 'teste'
          },
          {
            _id: '5c3fc415ee6803a41dee74g7',
            username: 'jamil'
          },
          {
            _id: '5c3fc415ee6803a41dee71d7',
            username: 'gibimba'
          }
        ],
        active: true,
        _id: '5c449199a32aa8e0d9490bca',
        owner: {
          _id: '5c3fc415ee6803a41dee74d7',
          username: 'teste'
        },
        __v: 0
      }
    ]
  });

  mock.onGet(/\/rooms\/\w+/).reply(200, {
    msg: {
      name: 'Testando',
      game: '',
      users: [
        {
          _id: '5c3fc415ee6803a41dee74d7',
          username: 'teste'
        },
        {
          _id: '5c3fc415ee6803a41dee74g7',
          username: 'jamil'
        },
        {
          _id: '5c3fc415ee6803a41dee71d7',
          username: 'gibimba'
        }
      ],
      active: true,
      _id: '5c3fef22831588b451f2ae4a',
      owner: {
        _id: '5c3fc415ee6803a41dee74d7',
        username: 'teste'
      },
      __v: 1
    }
  });

  mock.onGet(/\/messages\/\w+/).reply(200, {
    msg: [
      {
        owner: {
          _id: '5c3fc415ee6803a41dee74d7',
          username: 'Teste teste'
        },
        text: 'Testestestesteste'
      },
      {
        owner: {
          _id: 'zxczxczxc',
          username: 'sadaste'
        },
        text: 'nxbvnxnbnxbvnxvbnbvxnxbvnbxv'
      },
      {
        owner: {
          _id: 'zxczxczxc',
          username: 'sadaste'
        },
        text: 'ASDJKLASDJHLKASJDKLASJKLDAJSLKDJASKL'
      },
      {
        owner: {
          _id: 'hghghgf',
          username: 'mmmmmmmmm'
        },
        text: 'asdasdas'
      },
      {
        owner: {
          _id: '5c3fc415ee6803a41dee74d7',
          username: 'Teste teste'
        },
        text: 'Testestestesteste'
      },
      {
        owner: {
          _id: 'zxczxczxc',
          username: 'sadaste'
        },
        text: 'nxbvnxnbnxbvnxvbnbvxnxbvnbxv'
      },
      {
        owner: {
          _id: 'zxczxczxc',
          username: 'sadaste'
        },
        text: 'ASDJKLASDJHLKASJDKLASJKLDAJSLKDJASKL'
      },
      {
        owner: {
          _id: 'hghghgf',
          username: 'mmmmmmmmm'
        },
        text: 'asdasdas'
      },
      {
        owner: {
          _id: '5c3fc415ee6803a41dee74d7',
          username: 'Teste teste'
        },
        text: 'Testestestesteste'
      },
      {
        owner: {
          _id: 'zxczxczxc',
          username: 'sadaste'
        },
        text: 'nxbvnxnbnxbvnxvbnbvxnxbvnbxv'
      },
      {
        owner: {
          _id: 'zxczxczxc',
          username: 'sadaste'
        },
        text: 'ASDJKLASDJHLKASJDKLASJKLDAJSLKDJASKL'
      },
      {
        owner: {
          _id: 'hghghgf',
          username: 'mmmmmmmmm'
        },
        text: 'asdasdas'
      }
    ]
  });
};
