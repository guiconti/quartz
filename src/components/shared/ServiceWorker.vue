<script>
import { mapGetters, mapActions } from 'vuex';
import { setupServiceWorker, setupSubscription } from '../../utils/serviceWorker';

let installEvent;
export default {
  name: 'ServiceWorker',
  data() {
    return {
      showInstallBanner: false,
      serviceWorker: {},
    };
  },
  created() {
    setupServiceWorker()
      .then(serviceWorker => {
        this.serviceWorker = serviceWorker;
        return setupSubscription(serviceWorker)
      })
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