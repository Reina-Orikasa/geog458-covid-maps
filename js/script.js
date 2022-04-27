// initialize basemmap
mapboxgl.accessToken =
  "pk.eyJ1IjoicmVpbmEtb3Jpa2FzYSIsImEiOiJjbDJlamM1OG8wMTh0M2hubGd4dXZ4MzAyIn0.YAmcC3JIRoOVvOiQ9jZxsQ";

const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/reina-orikasa/cl2i5os3a001014msbnw9g59e",
});

map.on("load", () => {
  map.getCanvas().style.cursor = "default";
  const layers = [
    "0 - 4.492",
    "4.493 - 40.3",
    "40.3 - 76.2",
    "76.3 - 112.1",
    "112.2 - 147.9",
    "148 - 219.6",
    "219.7 - 291.297",
  ];

  const colors = [
    "#ffffd4",
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
});

map.on("mousemove", (event) => {
  const states = map.queryRenderedFeatures(event.point, {
    layers: ["us-covid-2020-rates-v2"],
  });

  document.getElementById("pd").innerHTML = states.length
    ? `<h3>${states[0].properties.county} County, ${states[0].properties.state}</h3>
    <p><strong><em>Case Rate: ${states[0].properties.rates}</strong></em></p>
    <p><strong>Cases: ${states[0].properties.cases}</strong></p>
    <p><strong>2018 Population: ${states[0].properties.pop18}</strong></p>
    `
    : `<p>Hover over a county!</p>`;
});
