$(document).ready(function () {    

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'mapdiv',
        view: new ol.View({
            center: ol.proj.fromLonLat([-0.1279688, 51.5077286]),
            maxZoom: 18,
            zoom: 12
        })
    });

    //var epsg4326 = new ol.Projection("EPSG:4326"); //WGS 1984 projection
    //var projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

    var vectorLayer = new ol.layer.Vector("Overlay");

    // Define markers as "features" of the vector layer:
    var feature = new ol.Feature.Vector(
        //new ol.geom.Point(-0.1279688, 51.5077286).transform(epsg4326, projectTo),
        new ol.geom.Point(-0.1279688, 51.5077286),
        { description: 'This is the value of<br>the description attribute' },
        { externalGraphic: 'images/marker-editor.svg', graphicHeight: 25, graphicWidth: 21, graphicXOffset: -12, graphicYOffset: -25 }
    );
    vectorLayer.addFeatures(feature);

    var feature = new ol.Feature.Vector(
        //new ol.geom.Point(-0.1244324, 51.5006728).transform(epsg4326, projectTo),
        new ol.geom.Point(-0.1244324, 51.5006728),
        { description: 'Big Ben' },
        { externalGraphic: 'images/marker-editor.svg', graphicHeight: 25, graphicWidth: 21, graphicXOffset: -12, graphicYOffset: -25 }
    );
    vectorLayer.addFeatures(feature);

    var feature = new ol.Feature.Vector(
        //new ol.geom.Point(-0.119623, 51.503308).transform(epsg4326, projectTo),
        new ol.geom.Point(-0.119623, 51.503308),
        { description: 'London Eye' },
        { externalGraphic: 'images/marker-editor.svg', graphicHeight: 25, graphicWidth: 21, graphicXOffset: -12, graphicYOffset: -25 }
    );
    vectorLayer.addFeatures(feature);


    map.addLayer(vectorLayer);


    //Add a selector control to the vectorLayer with popup functions
    var controls = {
        selector: new ol.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
    };

    function createPopup(feature) {
        feature.popup = new ol.Popup.FramedCloud("pop",
            feature.geometry.getBounds().getCenterLonLat(),
            null,
            '<div class="markerContent">' + feature.attributes.description + '</div>',
            null,
            true,
            function () { controls['selector'].unselectAll(); }
        );
        //feature.popup.closeOnMove = true;
        map.addPopup(feature.popup);
    }

    function destroyPopup(feature) {
        feature.popup.destroy();
        feature.popup = null;
    }

    map.addControl(controls['selector']);
    controls['selector'].activate();

});