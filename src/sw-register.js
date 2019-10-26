if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {
        scope: '/'
    })
    .then(registeration => {
        console.log('registered successfully');
    })
};