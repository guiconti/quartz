import Navmenu from './components/shared/Navmenu';
import Home from './components/Home';
import Room from './components/room/Room';
import Game from './components/game/Game';

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      'menu-top': Navmenu,
      default: Home
      // 'foot-compo': Footer
    }
  },
  {
    path: '/rooms/:id',
    name: 'Room',
    components: {
      'menu-top': Navmenu,
      default: Room
      // 'foot-compo': Footer
    }
  },
  {
    path: '/games/:id',
    name: 'Game',
    components: {
      'menu-top': Navmenu,
      default: Game
      // 'foot-compo': Footer
    }
  }
];

export default routes;
