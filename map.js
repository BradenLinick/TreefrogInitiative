require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/tasks/IdentifyTask",
  "esri/tasks/support/IdentifyParameters",
  "esri/widgets/Search"
], function (
  Map,
  MapView,
  FeatureLayer,
  IdentifyTask,
  IdentifyParameters,
  Search
) {
  var map = new Map({
    basemap: "topo-vector",
  });
  var view = new MapView({
    container: "viewDiv", 
    map: map, 
    zoom: 4, 
    center: [15, 65], // Sets center point of view using longitude,latitude
  });
  var featureLayer = new FeatureLayer({
    url:
      "https://sfi.gotdns.com:8081/arcgis/rest/services/usda/cities/MapServer/0",
  });
  map.add(featureLayer);

  var searchWidget = new Search({
    view: view
  });

  // Add the search widget to the top right corner of the view
  view.ui.add(searchWidget, {
    position: "top-right"
  });


  view.when(function () {
    // executeIdentifyTask() is called each time the view is clicked
    view.on("click", executeIdentifyTask);

    // Create identify task for the specified map service
    newTask = new IdentifyTask(
      "https://sfi.gotdns.com:8081/arcgis/rest/services/usda/cities/MapServer/"
    );

    // Set the parameters for the Identify
    params = new IdentifyParameters();
    params.tolerance = 3;
    params.layerIds = [0, 1, 2];
    params.layerOption = "top";
    params.width = view.width;
    params.height = view.height;
  });

  function executeIdentifyTask(event) {
    params.geometry = event.mapPoint;
    params.mapExtent = view.extent;
    // document.getElementById("viewDiv").style.cursor = "wait";
    newTask
      .execute(params)
      .then(function (response) {
        var results = response.results;

        return results.find(function (result) {
          var feature = result.feature;
          var layerName = result.layerName;

          // Braden, Malli, I will call your code here passing the city_ID
          alert(
            "You have picked up city " +
              feature.attributes.Name +
              ". The code will send for the backend service by the city Id: " +
              feature.attributes.ID
          );
          newCityID = feature.attributes.ID

          // feature.attributes.layerName = layerName;
          // feature.popupTemplate = {
          //   // autocasts as new PopupTemplate()
          //   title: "Cities Selected",
          //   content:
          //     "<ul><li>City Name: {Name}</li>" + "<li>ID: {ID} </li><ul>",
          // };

          // return feature;
        });
      })
      // .then(showPopup); // Send the array of features to showPopup()

    function showPopup(response) {
      if (response.length > 0) {
        view.popup.open({
          features: response,
          location: event.mapPoint,
        });
      }
      document.getElementById("viewDiv").style.cursor = "auto";
    }

  }
  // Shows the results of the Identify in a popup once the promise is resolved
});
