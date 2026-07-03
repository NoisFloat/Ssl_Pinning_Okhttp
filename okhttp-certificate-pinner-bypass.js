Java.perform(function () {
    var CertificatePinner = Java.use('okhttp3.CertificatePinner');

    // check$okhttp es el método EXACTO del stacktrace (línea 200)
    CertificatePinner['check$okhttp'].implementation = function (hostname, cleanedPeerCertificatesFn) {
        console.log('[BYPASS] check$okhttp neutralizado para: ' + hostname);
        return; // no valida -> pinning saltado
    };

    // check() público por si alguna ruta lo usa directo
    CertificatePinner.check.overloads.forEach(function (o) {
        o.implementation = function () {
            console.log('[BYPASS] check() neutralizado para: ' + arguments[0]);
            return;
        };
    });

    console.log('[BYPASS] Hooks de CertificatePinner instalados');
});