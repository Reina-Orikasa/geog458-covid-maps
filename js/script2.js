mapboxgl.accessToken =
  "pk.eyJ1IjoicmVpbmEtb3Jpa2FzYSIsImEiOiJjbDJlamM1OG8wMTh0M2hubGd4dXZ4MzAyIn0.YAmcC3JIRoOVvOiQ9jZxsQ";

// create map
const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/reina-orikasa/cl2gpgc9i003d14nv9n9i0ipo", // map style URL from Mapbox Studio
});

// wait for map to load before adjusting it
map.on("load", () => {
  // make a pointer cursor
  map.getCanvas().style.cursor = "default";

  // set map bounds to the continental US

  // define layer names
  const layers = [
    "0 - 103,151",
    "103,152 - 206,301",
    "206,302 - 309,451",
    "309,452 - 412,600",
    "412,601 - 498,553",
    "498,554 - 584,506",
    "584,507 - 756,412",
  ];
  const colors = [
    "#ffffe5",
    "#fff7bc",
    "#fee391",
    "#fec44f",
    "#fe9929",
    "#ec7014",
    "#cc4c02",
    "#8c2d04",
  ];

  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement("div");
    const key = document.createElement("span");
    key.className = "legend-key";
    key.style.backgroundColor = color;

    const value = document.createElement("span");
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  });

  //   // change info window on hover
  //   map.on("mousemove", (event) => {
  //     const states = map.queryRenderedFeatures(event.point, {
  //       layers: ["us-covid-2020-counts"],
  //     });
  //     document.getElementById("pd").innerHTML = states.length
  //       ? `<h3>${states[0].properties.county} County, ${states[0].properties.state}</h3><p><strong><em>${states[0].properties.cases}</strong> cases</em></p>`
  //       : `<p>Hover over a county!</p>`;
  //   });

  map.on("click", (event) => {
    const states = map.queryRenderedFeatures(event.point, {
      layers: ["us-covid-2020-counts"],
    });
    document.getElementById("pd").innerHTML = states.length
      ? `<h3>${states[0].properties.county} County, ${states[0].properties.state}</h3><p><strong><em>${states[0].properties.cases}</strong> cases</em></p>`
      : `<p><b>Click on a county (dot) to explore!</b></p>`;
  });
});
