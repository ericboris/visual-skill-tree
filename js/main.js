const width = 1400;
const height = 820;

const links = skills.flatMap(d =>
  d.relatedSkills.map(target => ({ source: d.id, target }))
);

const simulation = d3.forceSimulation(skills)
  .force("link", d3.forceLink(links).id(d => d.id).distance(80))
  .force("charge", d3.forceManyBody().strength(-400))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collide", d3.forceCollide(30)) // 30 is slightly more than the node diameter to prevent overlap
  .force("radial", d3.forceRadial(30, width / 2, height / 2));

const colorScale = d3.scaleOrdinal()
  .domain(["Central", "Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"])
  .range(["#FFD700", "#FF5733", "#33FF57", "#337AFF", "#FF33A1", "#FFAA33", "#33FFA9"]);

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const node = svg.append("g")
  .selectAll("circle")
  .data(skills)
  .join("circle")
  .attr("r", 20)
  .attr("fill", d => colorScale(d.category))
  .call(drag(simulation));

const link = svg.append("g")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6);

const labels = svg.append("g")
  .selectAll("text")
  .data(skills)
  .join("text")
  .text(d => d.name);

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  labels
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle");
});

svg.attr("viewBox", [0, 0, width, height])
  .attr("preserveAspectRatio", "xMidYMid meet")
  .classed("svg-content-responsive", true);

function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}
