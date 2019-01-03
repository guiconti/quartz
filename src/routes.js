import Example from './components/Example';
import Room from './components/game/room/Room';

const routes = [
  {
    path: '/',
    name: 'Room',
    components: {
      // 'menu-top': Navmenu,
      default: Room
      // 'foot-compo': Footer
    }
  }
];

export default routes;
