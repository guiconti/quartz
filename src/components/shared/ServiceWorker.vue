<script>
import { mapGetters, mapActions } from 'vuex';
import serviceWorker from '../../utils/serviceWorker';

let installEvent;
export default {
  name: 'ServiceWorker',
  data() {
    return {
      showInstallBanner: false,
    };
  },
  created() {
    serviceWorker()
      .then(subscription => {
        if (!this.loggedUserContainsSubscription(subscription)) {
          this.registerNotification(subscription);
        } else {
          this.setNotificationSettings(subscription);
        }
      })
      .catch(err => {
        console.log(err);
      });
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installEvent = e;
      this.showInstallBanner = true;
    });
    window.addEventListener('push', e => {
      console.log(0);
      var options = {
        body: 'This notification was generated from a push!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2'
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close',
            icon: 'images/xmark.png'},
        ]
      };
      e.waitUntil(
        serviceWorker.registration.showNotification('Hello world!', options)
      );
    });
  },
  computed: {
    ...mapGetters('user', [
      'loggedUserContainsSubscription'
    ])
  },
  methods: {
    install() {
      this.showInstallBanner = false;
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    },
    ...mapActions('user', [
      'registerNotification',
      'setNotificationSettings'
    ]),
  }
};
</script>