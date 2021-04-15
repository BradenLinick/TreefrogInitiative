let jsondata;
fetch('./mockData.json')
  .then(response => response.json())
  .then(newData => {
    console.log(newData)
    jsondata = newData;
  })
  .catch(err => console.log(error));

setTimeout(() => { 
  console.log(jsondata.cityTemperature); 
  const labels = [];
  const cityTemp = jsondata.cityTemperature
  cityTemp.forEach(item => labels.push(item.Data_Date));
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
  cityTemp.forEach(item => {
    tmaxDataset.data.push(item.tmax);
    tminDataset.data.push(item.tmin);
    prcpDataset.data.push(item.prcp);
  });

  datasets.push(tmaxDataset, tminDataset, prcpDataset)

  
  console.log(datasets)

  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options: {
      title: {
        display: false,
        text: 'World population per region (in millions)'
      }
    }
  });
}, 2000);