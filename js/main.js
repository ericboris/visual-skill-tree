// Initialize the status of each skill
const width = 1400;
const height = 820;

const links = skills.flatMap(d =>
  d.relatedSkills.map(target => ({ source: d.id, target }))
);

const simulation = d3.forceSimulation(skills)
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("link", d3.forceLink(links).id(d => d.id).distance(50))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("collide", d3.forceCollide(35)) // 30 is slightly more than the node diameter to prevent overlap
  .force("radial", d3.forceRadial(100, width / 2, height / 2));

const colorScale = d3.scaleOrdinal()
  .domain(["Central", "Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"])
  .range(["#FFD700", "#FF5733", "#33FF57", "#337AFF", "#FF33A1", "#FFAA33", "#33FFA9"]);

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const link = svg.append("g")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke", "#400")
  .attr("stroke-opacity", 1);

// Initialize the status of each skill
skills.forEach(skill => {
  if (skill.id === 1) {
    skill.status = "completed";
  } else if (skill.relatedSkills.includes(1) || skills[0].relatedSkills.includes(skill.id)) {
    skill.status = "in-progress";
  } else {
    skill.status = "locked";
  }
});

// Define the node color based on its status
function getNodeColor(d) {
  switch (d.status) {
    case "completed":
      return colorScale(d.category);
    case "in-progress":
      return d3.color(colorScale(d.category)).darker(1);  // Desaturated color
    case "locked":
    default:
      return "#C0C0C0";  // Gray
  }
}

const node = svg.append("g")
  .selectAll("circle")
  .data(skills)
  .join("circle")
  .attr("r", 30)
  .attr("fill", getNodeColor)
  .attr("stroke", "#400")
  .attr("stroke-width", 1.5)
  .on("click", function(event, d) {
    // Only act on "in-progress" nodes
    if (d.status === "in-progress") {
      d.status = "completed";
      d3.select(this).attr("fill", getNodeColor(d));

      // Set all nodes branching from the clicked node to "in-progress"
      links.forEach(link => {
        if (link.source.id === d.id) {
          let targetNode = skills.find(s => s.id === link.target.id);
          if (targetNode.status === "locked") {
            targetNode.status = "in-progress";
            d3.select("#label-" + targetNode.id).attr("visibility", "visible"); // Show label
          }
        }
      });
      // Redraw nodes to reflect new statuses
      node.attr("fill", getNodeColor);
    }
  })
  .call(drag(simulation));

const labels = svg.append("g")
  .selectAll("text")
  .data(skills)
  .join("text")
  .attr("id", d => "label-" + d.id)
  .attr("visibility", d => (d.status === "locked" ? "hidden" : "visible"))
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
