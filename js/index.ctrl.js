$(document).ready(function () {    

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'mapdiv',
        view: new ol.View({
            center: ol.proj.fromLonLat([-97.6114, 38.8403]), // center on Salinas, Kansas
            zoom: 4.6
        })
    });

    // Define markers as features and add them to the vector source of the vector layer
    var markers = [
        new ol.Feature({
            description: 'Irvine',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-117.8491357, 33.68315]))
        }),
        new ol.Feature({ 
            description: 'Lawrenceville',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-84.058846, 33.963502]))          
        }),
        new ol.Feature({
            description: 'San Diego',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-117.209298, 32.880391]))            
        }),
        new ol.Feature({ 
            description: 'Tampa',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-82.351164, 27.978778]))            
        })
    ];

    // Define marker style as image
    function markerStyle() {
        iconStyle = [new ol.style.Style({
            image: new ol.style.Icon(({
                scale: 0.25,
                src: 'images/marker-editor.png'
            }))
        })];
        return iconStyle;
    }

    var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: markers
        }),
        style: markerStyle()
    });
    map.addLayer(vectorLayer);

    // Set popup
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    map.on('singleclick', function (event) {
        if (map.hasFeatureAtPixel(event.pixel) === true) {
            console.log('event clicked:');
            console.log(event);
            var coordinate = event.coordinate;

            content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
            overlay.setPosition(coordinate);
        } else {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });


    //Add a selector control to the vectorLayer with popup functions
    //var controls = {
    //    selector: new ol.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
    //};

    //function createPopup(feature) {
    //    feature.popup = new ol.Popup.FramedCloud("pop",
    //        feature.geometry.getBounds().getCenterLonLat(),
    //        null,
    //        '<div class="markerContent">' + feature.attributes.description + '</div>',
    //        null,
    //        true,
    //        function () { controls['selector'].unselectAll(); }
    //    );
    //    //feature.popup.closeOnMove = true;
    //    map.addPopup(feature.popup);
    //}

    //function destroyPopup(feature) {
    //    feature.popup.destroy();
    //    feature.popup = null;
    //}

    //map.addControl(controls['selector']);
    //controls['selector'].activate();

});