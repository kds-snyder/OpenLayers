$(document).ready(function () {    

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'mapdiv',
        view: new ol.View({
            center: ol.proj.fromLonLat([-97.6114, 38.8403]),
            maxZoom: 18,
            zoom: 5
        })
    });

    // Define markers as "features" of the vector layer:
    var features = [
        new ol.Feature(
            new ol.geom.Point(ol.proj.fromLonLat([-117.8491357, 33.68315])),
            { description: 'Irvine' }
        ),
        new ol.Feature(
            new ol.geom.Point(ol.proj.fromLonLat([-84.058846, 33.963502])),
            { description: 'Lawrenceville' }
        ),
        new ol.Feature(
            new ol.geom.Point(ol.proj.fromLonLat([-117.209298, 32.880391])),
            { description: 'San Diego' },
        ),

        new ol.Feature(
            new ol.geom.Point(ol.proj.fromLonLat([-82.351164, 27.978778])),
            { description: 'Tampa' },
        )
    ];

    function iconStyleFunc() {
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
            features: features
        }),
        style: iconStyleFunc()
    });

    map.addLayer(vectorLayer);


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