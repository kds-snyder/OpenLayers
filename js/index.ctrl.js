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
            address: '18100 Von Karman Avenue, Suite 1000',
            code: 'Irvine',
            city: 'Irvine, CA 92612, USA',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-117.8491357, 33.68315])),
            title: 'Irvine Towers',            
            type: 'click'
        }),
        new ol.Feature({ 
            address: '1485 Lakes Parkway',
            code: 'Lawrenceville',
            city: 'Lawrenceville, GA 30043, USA',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-84.058846, 33.963502])),
            title: 'Lawrenceville (Waypoint) remote office', 
            type: 'click'
        }),
        new ol.Feature({
            address: '9520 Towne Centre Drive',
            code: 'SanDiego',
            city: 'San Diego, CA 92121, USA',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-117.209298, 32.880391])),
            title: 'San Diego (Daymon) office',
            type: 'click'
        }),
        new ol.Feature({ 
            address: '3922 Coconut Palm Drive, #300',
            code: 'Tampa',
            city: 'Tampa, FL 33610, USA',
            title: 'Tampa (Advantage Solutions) office',
            geometry: new ol.geom.Point(ol.proj.fromLonLat([-82.351164, 27.978778])),
            type: 'click'
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
    var popupElement = document.getElementById('popup');
    var popup = new ol.Overlay({
        element: popupElement
    });
    popup.setOffset([0, -55]);
    map.addOverlay(popup);

    // when map clicked, get feature if marker clicked
    map.on('click', function (evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
                return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            popup.setPosition(coordinates);
            $('#popup-content').empty();
            $('#popup-content').append
                ('<h2>' + feature.get('title') + '</h2>' +
                    '<p>' + feature.get('address') + '</p>' +
                    '<p>' + feature.get('city') + '</p>');
            $(popupElement).show();
        } else {
            console.log('hiding popupElement');
            $(popupElement).hide();
        }
    });

    // close event for popup close
    var popupCloser = document.getElementById('popup-closer');
    popupCloser.addEventListener('click', function (evt) {
        $(popupElement).hide();
        evt.preventDefault();
    }, false);

    // change mouse cursor to hand when over marker
    map.on('pointermove', function (e) {
        if (e.dragging) {
            //console.log(e);
            $(popupElement).hide();
            return;
        }
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        if (hit) {
            $('#mapdiv').css('cursor', 'pointer');
        }
        else {
            $('#mapdiv').css('cursor', '');
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