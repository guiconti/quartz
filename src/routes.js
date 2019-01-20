import Navmenu from './components/shared/Navmenu';
import Home from './components/Home';
import Game from './components/game/Game';

const routes = [
  {
    path: '/',
    name: 'Game',
    components: {
      'menu-top': Navmenu,
      default: Home
      // 'foot-compo': Footer
    }
  }
];

export default routes;
