// initialize basemmap
mapboxgl.accessToken =
  "pk.eyJ1IjoicmVpbmEtb3Jpa2FzYSIsImEiOiJjbDJlamM1OG8wMTh0M2hubGd4dXZ4MzAyIn0.YAmcC3JIRoOVvOiQ9jZxsQ";

const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/reina-orikasa/cl2gpq4w9001014l27jwoizbz",
});

map.on("load", () => {
  map.getCanvas().style.cursor = "default";
  const layers = ["0-56", "57-108", "109-160", "161-213", "214-290"];

  const colors = ["#ffffb2", "#feda76", "#feb24d", "#fd8b3a", "#ef3b1f"];

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
    layers: ["us-covid-2020-rates"],
  });

  document.getElementById("pd").innerHTML = states.length
    ? `<h3>${states[0].properties.county} County, ${states[0].properties.state}</h3>
    <p><strong><em>Case Rate: ${states[0].properties.rates}</strong></em></p>
    <p><strong>Cases: ${states[0].properties.cases}</strong></p>
    <p><strong>2018 Population: ${states[0].properties.pop18}</strong></p>
    `
    : `<p>Hover over a county!</p>`;
});
