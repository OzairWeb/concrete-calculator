(function () {
  var pieChart = null;

  window.calculateMaterials = function () {
    var concreteGrade = document.getElementById('concreteGrade').value;
    var inputVolumeChecked = document.getElementById('inputVolume').checked;
    var volume = 0;

    if (inputVolumeChecked) {
      volume = parseFloat(document.getElementById('concreteVolume').value);
      var volumeUnit = document.getElementById('volumeUnit').value;
      if (volumeUnit === 'cubic_feet') {
        volume *= 0.0283168;
      }
    } else {
      var length = parseFloat(document.getElementById('length').value);
      var width = parseFloat(document.getElementById('width').value);
      var depth = parseFloat(document.getElementById('depth').value);
      var dimensionsUnit = document.getElementById('dimensionsUnit').value;
      volume = length * width * depth;
      if (dimensionsUnit === 'feet') {
        volume *= 0.0283168;
      }
    }

    if (isNaN(volume) || volume <= 0) {
      alert('Please enter a valid volume or dimensions');
      return;
    }

    volume *= 1.54;

    var mixRatios = {
      'M5': [1, 5, 10],
      'M7.5': [1, 4, 8],
      'M10': [1, 3, 6],
      'M15': [1, 2, 4],
      'M20': [1, 1.5, 3],
      'M25': [1, 1, 2]
    };

    var ratios = mixRatios[concreteGrade];
    var cementRatio = ratios[0],
        sandRatio = ratios[1],
        aggregateRatio = ratios[2];
    var totalRatio = cementRatio + sandRatio + aggregateRatio;

    var cement = (cementRatio / totalRatio) * volume;
    var sand = (sandRatio / totalRatio) * volume;
    var aggregate = (aggregateRatio / totalRatio) * volume;

    var cementCft = cement / 0.0283168;
    var cementBags = cementCft / 1.226;
    var sandCft = sand / 0.0283168;
    var aggregateCft = aggregate / 0.0283168;

    var volumeInCubicMeters = volume.toFixed(4);
    var volumeInCubicFeet = (volume * 35.3147).toFixed(3);

    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('cementResult').innerText = cementCft.toFixed(2) + " cft (" + cementBags.toFixed(2) + " bags)";
    document.getElementById('sandResult').innerText = sandCft.toFixed(2) + " cft (" + sand.toFixed(2) + " m³)";
    document.getElementById('aggregateResult').innerText = aggregateCft.toFixed(2) + " cft (" + aggregate.toFixed(2) + " m³)";
    document.getElementById('dryVolume').innerText = volumeInCubicMeters + " m³ (" + volumeInCubicFeet + " ft³)";

    updatePieChart([
      (cementRatio / totalRatio) * 100,
      (sandRatio / totalRatio) * 100,
      (aggregateRatio / totalRatio) * 100
    ]);
  };

  window.toggleInput = function (type) {
    document.getElementById('volumeSection').style.display = (type === 'volume') ? 'block' : 'none';
    document.getElementById('dimensionsSection').style.display = (type === 'dimensions') ? 'block' : 'none';
  };

  function updatePieChart(data) {
    var ctx = document.getElementById('myPieChart').getContext('2d');
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Cement', 'Sand', 'Aggregate'],
        datasets: [{
          data: data,
          backgroundColor: ['#3498db', '#f39c12', '#2ecc71']
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    });
  }
})();
