let setupServiceWorker = () => {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator
      && 'PushManager' in window
      && process.env.NODE_ENV === 'production') 
    {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(serviceWorker => {
          console.log('Service Worker Registered!');
          return resolve(serviceWorker);
        });
    } else {
      console.log('Browser don`t support service worker');
      return reject(false);
    }
  });
};

let setupSubscription = serviceWorker => {
  return new Promise((resolve, reject) => {
    serviceWorker.pushManager.getSubscription()
      .then(subscription => {
        if (subscription === null) {
          console.log('Not subscribed');
          return askPermission()
        } else {
          console.log('Subscribed');
          return resolve(subscription);
        }
      })
      .then(permission => {
        if (permission) {
          console.log('Subscribing');
          const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              'BBDfJvzAcS7CCnavWWzExpePOyHM3-CES_L6lUtc4bsneCJKf-Ot6Cur_pIVsWIhh3POyyd1g39liZzdp6lUDoc'
            )
          };
          return serviceWorker.pushManager.subscribe(subscribeOptions)
        } else {
          return reject(false);
        }
      })
      .then(subscription => {
        console.log('User is subscribed:', subscription);
        return resolve(subscription);
      })
      .catch(err => {
        console.log('Failed to subscribe the user: ', err);
        return reject(err);
      });
  });
};

function askPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        console.log('Permission not granted');
        return reject(false);
      }
      console.log('Permission granted');
      return resolve(true);
    });
  });
}

/**
 * urlBase64ToUint8Array
 *
 * @param {string} base64String a public vavid key
 */
function urlBase64ToUint8Array(base64String) {
  let padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  let base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  let rawData = window.atob(base64);
  let outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

self.addEventListener('push', function(event) {
  console.log(event);
});

export { setupServiceWorker, setupSubscription };
