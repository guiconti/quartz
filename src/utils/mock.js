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

  mock.onPost('/messages').reply(200, {
    msg: 'Message sent'
  });

  mock.onPatch(/\/rooms\/\w+/).reply(200, {
    msg: 'User joined'
  });

  mock.onGet(/\/games\/\w+/).reply(200, {
    msg: {
      name: 'Testando',
      players: [
        {
          money: 0,
          cards: [],
          hasAnIdiotBook: false,
          currentTurn: true,
          _id: '5c474be776295e2460be203c',
          user: {
            _id: '5c464ee1ae18af00d0d6ea7e',
            username: 'Fuleco'
          },
          crystals: [
            {
              name: 'Quartzo',
              value: 1,
              amount: 0,
              _id: '5c474be776295e2460be2043'
            },
            {
              name: 'Rubelita',
              value: 2,
              amount: 0,
              _id: '5c474be776295e2460be2042'
            },
            {
              name: 'Esmeralda',
              value: 3,
              amount: 0,
              _id: '5c474be776295e2460be2041'
            },
            {
              name: 'Safira',
              value: 4,
              amount: 0,
              _id: '5c474be776295e2460be2040'
            },
            {
              name: 'Rubi',
              value: 6,
              amount: 0,
              _id: '5c474be776295e2460be203f'
            },
            {
              name: 'Âmbar',
              value: 8,
              amount: 0,
              _id: '5c474be776295e2460be203e'
            },
            {
              name: 'Autunita',
              value: 0,
              amount: 0,
              _id: '5c474be776295e2460be203d'
            }
          ],
          __v: 0
        },
        {
          money: 0,
          cards: [],
          hasAnIdiotBook: false,
          currentTurn: false,
          _id: '5c474be776295e2460be2044',
          user: {
            _id: '5c465456e016660483ae972b',
            username: 'Barnabeu'
          },
          crystals: [
            {
              name: 'Quartzo',
              value: 1,
              amount: 0,
              _id: '5c474be776295e2460be204b'
            },
            {
              name: 'Rubelita',
              value: 2,
              amount: 0,
              _id: '5c474be776295e2460be204a'
            },
            {
              name: 'Esmeralda',
              value: 3,
              amount: 0,
              _id: '5c474be776295e2460be2049'
            },
            {
              name: 'Safira',
              value: 4,
              amount: 0,
              _id: '5c474be776295e2460be2048'
            },
            {
              name: 'Rubi',
              value: 6,
              amount: 0,
              _id: '5c474be776295e2460be2047'
            },
            {
              name: 'Âmbar',
              value: 8,
              amount: 0,
              _id: '5c474be776295e2460be2046'
            },
            {
              name: 'Autunita',
              value: 0,
              amount: 0,
              _id: '5c474be776295e2460be2045'
            }
          ],
          __v: 0
        }
      ],
      _id: '5c474be776295e2460be204c',
      cave: {
        _id: '5c474be776295e2460be204d',
        crystals: [
          {
            name: 'Quartzo',
            value: 1,
            amount: 15,
            _id: '5c474be776295e2460be2054'
          },
          {
            name: 'Rubelita',
            value: 2,
            amount: 12,
            _id: '5c474be776295e2460be2053'
          },
          {
            name: 'Esmeralda',
            value: 3,
            amount: 10,
            _id: '5c474be776295e2460be2052'
          },
          {
            name: 'Safira',
            value: 4,
            amount: 7,
            _id: '5c474be776295e2460be2051'
          },
          {
            name: 'Rubi',
            value: 6,
            amount: 4,
            _id: '5c474be776295e2460be2050'
          },
          {
            name: 'Âmbar',
            value: 8,
            amount: 2,
            _id: '5c474be776295e2460be204f'
          },
          {
            name: 'Autunita',
            value: 0,
            amount: 18,
            _id: '5c474be776295e2460be204e'
          }
        ]
      },
      cardsBoard: [],
      cardsPile: [],
      cardsDiscarded: [],
      __v: 0
    }
  });
};
