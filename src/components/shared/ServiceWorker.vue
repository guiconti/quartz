<script>
let installEvent;
export default {
  name: 'ServiceWorker',
  data() {
    return {
      showInstallBanner: false,
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installEvent = e;
      this.showInstallBanner = true;
    });
    window.addEventListener('push', e => {
      console.log(e);
    });
  },
  methods: {
    install() {
      this.showInstallBanner = false;
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    }
  }
};
</script>