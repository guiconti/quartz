import Game from './components/game/Game';

const routes = [
  {
    path: '/',
    name: 'Game',
    components: {
      // 'menu-top': Navmenu,
      default: Game
      // 'foot-compo': Footer
    }
  }
];

export default routes;
