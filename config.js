// let jsondata = "";
// let apiUrl = "./mockData.json"

// async function getJson(url) {
//     let response = await fetch(url);
//     let data = await response.json()
//     return data;
// }

// async function main() {

//     //OPTION 2
//     jsondata = await getJson(apiUrl)
//     console.log(jsondata);
// }

// main();

let jsondata;
fetch('./mockData.json')
  .then(response => response.json())
  .then(newData => {
    console.log(newData)
    jsondata = newData;
  })
  .catch(err => console.log(error));

setTimeout(function(){ 
  console.log(jsondata.USW00003860); 
  const labels = [];
  jsondata.USW00003860.forEach(item => labels.push(item.Data_Date));
  const tmaxDataset = {
    data: [],
    borderColor: "#3e95cd",
    fill: false,
  };
  const tminDataset = {
    data: [],
    borderColor: "#8e5ea2",
    fill: false,
  };
  const prcpDataset = {
    data: [],
    borderColor: "#3cba9f",
    fill: false,
  };
  const datasets = [];
  jsondata.USW00003860.forEach(item => {
    tmaxDataset.data.push(item.tmax);
    tminDataset.data.push(item.tmin);
    prcpDataset.data.push(item.prcp);
    // const newTmaxDataset = Object.create(tmaxDataset)
    // const newTminDataset = Object.create(tminDataset)
    // const newPrcpDataset = Object.create(prcpDataset)
  });

  datasets.push(tmaxDataset, tminDataset, prcpDataset)

  
  console.log(datasets)

  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets
      // datasets: [{ 
      //     data: [86,114,106,106,107,111,133,221,783,2478],
      //     borderColor: "#3e95cd",
      //     fill: false
      //   }, { 
      //     data: [282,350,411,502,635,809,947,1402,3700,5267],
      //     borderColor: "#8e5ea2",
      //     fill: false
      //   }, { 
      //     data: [168,170,178,190,203,276,408,547,675,734],
      //     borderColor: "#3cba9f",
      //     fill: false
      //   }, { 
      //     data: [40,20,10,16,24,38,74,167,508,784],
      //     borderColor: "#e8c3b9",
      //     fill: false
      //   }, { 
      //     data: [6,3,2,2,7,26,82,172,312,433],
      //     borderColor: "#c45850",
      //     fill: false
      //   }
      // ]
    },
    options: {
      title: {
        display: false,
        text: 'World population per region (in millions)'
      }
    }
  });
}, 2000);