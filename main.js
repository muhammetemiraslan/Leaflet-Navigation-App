var map = L.map('map').setView([40.1848, 29.0115], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> katkıda bulunanlar'
}).addTo(map);

var startPoint, endPoint, routeControl;

document.getElementById('start-btn').addEventListener('click', function() {
    map.once('click', function(e) {
        if (startPoint) {
            map.removeLayer(startPoint); // birden fazla marker eklemeyi engelliyor.
        }
        startPoint = L.marker(e.latlng).addTo(map).bindPopup("Başlangıç Noktası").openPopup();
    });
});

document.getElementById('end-btn').addEventListener('click', function() {
    map.once('click', function(e) {
        if (endPoint) {
            map.removeLayer(endPoint); // birden fazla marker eklemeyi engelliyor.
        }
        endPoint = L.marker(e.latlng).addTo(map).bindPopup("Varış Noktası").openPopup();
    });
});

document.getElementById('route-btn').addEventListener('click', function() {
    if (startPoint && endPoint) {
        if (routeControl) {
            map.removeControl(routeControl);
        }
        routeControl = L.Routing.control({
            waypoints: [
                startPoint.getLatLng(),
                endPoint.getLatLng()
            ],
            createMarker: function(i, wp, nWps) {
                return L.marker(wp.latLng).bindPopup(i === 0 ? "Başlangıç Noktası" : "Varış Noktası");
            },
            routeWhileDragging: true
        }).addTo(map);
    } else {
        alert("Lütfen hem başlangıç hem de varış noktalarını seçin.");
    }
});


