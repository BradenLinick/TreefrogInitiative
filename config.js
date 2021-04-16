

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
    center: [-103, 44], // Sets center point of view using longitude,latitude
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

  let myLineChart;
  function executeIdentifyTask(event) {
    
    // hide tooltip
    
    var tooltipSpan = document.getElementById('tooltip-span');
    tooltipSpan.style.display = 'none';

    params.geometry = event.mapPoint;
    params.mapExtent = view.extent;
    // document.getElementById("viewDiv").style.cursor = "wait";
    newTask
      .execute(params)
      .then(function (response) {
        var results = response.results;

        if (results && results.length > 0) {
          var feature = results[0].feature;
          // Braden, Malli, I will call your code here passing the city_ID
          // alert(
          //   "You have picked up city " +
          //   feature.attributes.Name +
          //   ". The code will send for the backend service by the city Id: " +
          //   feature.attributes.ID
          //   //Use the above variable for the city id for api call
          // );
          console.warn("Hello event ", event)
          var tooltipSpan = document.getElementById('tooltip-span');
          var x = event.x;
          var y = event.y;
          tooltipSpan.style.display = 'block';
          tooltipSpan.style.top = (y + 20) + 'px';
          tooltipSpan.style.left = (x - 100) + 'px';
          var newCityID = feature.attributes.ID;
          // callData(newCityID);

          const api_url =`http://sfi.gotdns.com:8080/Hackathon1/city/getCityTemperature?cityId=${newCityID}&month=1`;

          // fetch(api_url)
          //   .then((response) => response.json())
          //   .then((newData) => {
          //     console.log('newData', newData);
          //     //console.log(newData);
          //     jsondata = newData;
          //     generate_chart(jsondata);
          //   })
          //   .catch((err) => console.log(error));

          const someData = {
            "hottopic": [
                {
                    "travel": 8.9,
                    "education": 4.5,
                    "food": 6,
                    "music": 5.2,
                    "shopping": 9.1
                }
            ]
          }

          console.log(someData.hottopic[0])

          const trendData = [];
          for (const [key, value] of Object.entries(someData.hottopic[0])) {
            trendData.push(value);
          }

          console.log(trendData);

            // console.log('jsondata.cityTemperature', jsondata.cityTemperature);
            // const labels = [];
            // const cityId = jsondata.cityId;

            // const cityTemp = jsondata.cityTemperature;
            // cityTemp.forEach((item) => labels.push(item.year));
            // const tmaxDataset = {
            //   label: 'Max-Temperature',
            //   data: [],
            //   borderColor: '#3e95cd',
            //   fill: false,
            // };
            // const tminDataset = {
            //   label: 'Min-Temperature',
            //   data: [],
            //   borderColor: '#8e5ea2',
            //   fill: false,
            // };
            // const prcpDataset = {
            //   label: 'Precipitation',
            //   data: [],
            //   borderColor: '#3cba9f',
            //   fill: false,
            // };
            // const datasets = [];
            // cityTemp.forEach((item) => {
            //   tmaxDataset.data.push(item.tmax);
            //   tminDataset.data.push(item.tmin);
            //   prcpDataset.data.push(item.prcp);
            // });

            // datasets.push(tmaxDataset, tminDataset, prcpDataset);

            // console.log(datasets);

          if (myLineChart !== undefined) {
            myLineChart.destroy();
          }

          myLineChart = new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
              labels: ["Travel", "Education", "Food", "Music", "Shopping"],
              datasets: [
                {
                  label: '',
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: trendData
                }
              ]
            },
            options: {
              legend: { display: false },
              title: {
                display: false
              }
            }
        });
        }
      })

    // function showPopup(response) {
    //   if (response.length > 0) {
    //     view.popup.open({
    //       features: response,
    //       location: event.mapPoint,
    //     });
    //   }
    //   document.getElementById("viewDiv").style.cursor = "auto";
    // }

  }
  // Shows the results of the Identify in a popup once the promise is resolved
});


function callData(id) {

  // const api_url =
  //   `http://sfi.gotdns.com:8080/Hackathon1/city/getCityTemperature?cityId=${id}&month=1`;

  // let jsondata;

  // let generate_chart = (jsondata) => {
  //   console.log('jsondata.cityTemperature', jsondata.cityTemperature);
  //   const labels = [];
  //   const cityId = jsondata.cityId;

  //   const cityTemp = jsondata.cityTemperature;
  //   cityTemp.forEach((item) => labels.push(item.year));
  //   const tmaxDataset = {
  //     label: 'Max-Temperature',
  //     data: [],
  //     borderColor: '#3e95cd',
  //     fill: false,
  //   };
  //   const tminDataset = {
  //     label: 'Min-Temperature',
  //     data: [],
  //     borderColor: '#8e5ea2',
  //     fill: false,
  //   };
  //   const prcpDataset = {
  //     label: 'Precipitation',
  //     data: [],
  //     borderColor: '#3cba9f',
  //     fill: false,
  //   };
  //   const datasets = [];
  //   cityTemp.forEach((item) => {
  //     tmaxDataset.data.push(item.tmax);
  //     tminDataset.data.push(item.tmin);
  //     prcpDataset.data.push(item.prcp);
  //   });

  //   datasets.push(tmaxDataset, tminDataset, prcpDataset);

  //   console.log(datasets);

  // };

  // fetch(api_url)
  //   .then((response) => response.json())
  //   .then((newData) => {
  //     console.log('newData', newData);
  //     //console.log(newData);
  //     jsondata = newData;
  //     generate_chart(jsondata);
  //   })
  //   .catch((err) => console.log(error));
};