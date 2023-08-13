/**
 * Initializes the status of each skill based on certain conditions.
 * @param {Array} skills - The array of skills data.
 * @returns {Array} - The updated skills data.
 */
function initializeData(skills) {
  skills.forEach(skill => {
    if (skill.id === 1) {
      skill.status = "completed";
    } else if (skill.relatedSkills.includes(1) || skills[0].relatedSkills.includes(skill.id)) {
      skill.status = "in-progress";
    } else {
      skill.status = "locked";
    }
  });
  return skills;
}

/**
 * Creates and returns a force simulation.
 * @param {Array} skills - The array of skills data.
 * @param {Array} links - The array of links between skills.
 * @param {number} width - The width of the visualization canvas.
 * @param {number} height - The height of the visualization canvas.
 * @returns {Object} - The D3 force simulation.
 */
function createSimulation(skills, links, width, height) {
  return d3.forceSimulation(skills)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink(links).id(d => d.id).distance(50))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("collide", d3.forceCollide(35))
    .force("radial", d3.forceRadial(100, width / 2, height / 2));
}

/**
 * Appends an SVG to the specified parent element and sets its dimensions.
 * @param {string} parentSelector - The selector for the parent element.
 * @param {number} width - The width of the SVG.
 * @param {number} height - The height of the SVG.
 * @returns {Object} - The D3 SVG selection.
 */
function createSVG(parentSelector, width, height) {
  return d3.select(parentSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
}

/**
 * Renders the nodes on the SVG and handles click interactions.
 * @param {Object} svg - The D3 SVG selection.
 * @param {Array} skills - The array of skills data.
 * @param {Array} links - The array of links between skills.
 * @param {Object} colorScale - The D3 color scale.
 * @param {Object} simulation - The D3 force simulation.
 * @returns {Object} - The D3 node selection.
 */
function renderNodes(svg, skills, links, colorScale, simulation) {
  return svg.append("g")
    .selectAll("circle")
    .data(skills)
    .join("circle")
    .attr("r", 30)
    .attr("fill", d => getNodeColor(d, colorScale))
    .attr("stroke", "#400")
    .attr("stroke-width", 1.5)
    .on("click", function(event, d) {
      // Only act on "in-progress" nodes
      if (d.status === "in-progress") {
        d.status = "completed";
        d3.select(this).attr("fill", getNodeColor(d, colorScale));

        // Set all nodes branching from the clicked node to "in-progress"
        links.forEach(link => {
          if (link.source === d) {
            let targetNode = link.target; // Directly get the target node
            if (targetNode.status === "locked") {
              targetNode.status = "in-progress";
              d3.select("#label-" + targetNode.id).attr("visibility", "visible"); // Show label
            }
          }
        });
        // Redraw nodes to reflect new statuses
        svg.selectAll("circle").attr("fill", d => getNodeColor(d, colorScale));
      }
    })
    .call(drag(simulation));
}

/**
 * Renders the links on the SVG.
 * @param {Object} svg - The D3 SVG selection.
 * @param {Array} links - The array of links between skills.
 * @returns {Object} - The D3 link selection.
 */
function renderLinks(svg, links) {
  return svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#400")
    .attr("stroke-opacity", 1);
}

/**
 * Renders the labels for each skill.
 * @param {Object} svg - The D3 SVG selection.
 * @param {Array} skills - The array of skills data.
 * @returns {Object} - The D3 label selection.
 */
function renderLabels(svg, skills) {
  return svg.append("g")
    .selectAll("text")
    .data(skills)
    .join("text")
    .attr("id", d => "label-" + d.id)
    .attr("visibility", d => (d.status === "locked" ? "hidden" : "visible"))
    .text(d => d.name);
}

/**
 * Attaches the tick event to the simulation and updates link, node, and label positions.
 * @param {Object} simulation - The D3 force simulation.
 * @param {Object} link - The D3 link selection.
 * @param {Object} node - The D3 node selection.
 * @param {Object} label - The D3 label selection.
 */
function handleTick(simulation, link, node, label) {
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle");
  });
}

/**
 * Handles drag events for nodes.
 * @param {Object} simulation - The D3 force simulation.
 * @returns {Function} - The D3 drag behavior.
 */
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

/**
 * Determines the color for a given skill.
 * @param {Object} skill - The skill data.
 * @param {Object} colorScale - The D3 color scale.
 * @returns {string} - The color string.
 */
function getNodeColor(skill, colorScale) {
  switch (skill.status) {
    case "completed":
      return colorScale(skill.category);
    case "in-progress":
      return d3.color(colorScale(skill.category)).darker(1);
    case "locked":
    default:
      return "#C0C0C0";
  }
}

/**
 * Creates and returns a color scale.
 * @returns {Object} - The D3 color scale.
 */
function createColorScale() {
  return d3.scaleOrdinal()
    .domain(["Central", "Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6"])
    .range(["#FFD700", "#FF5733", "#33FF57", "#337AFF", "#FF33A1", "#FFAA33", "#33FFA9"]);
}

/**
 * Calls all the functions in the right order to render the skill tree.
 * @param {string} parentSelector - The selector for the parent element.
 * @param {Array} skillsData - The array of skills data.
 * @param {number} width - The width of the visualization canvas.
 * @param {number} height - The height of the visualization canvas.
 */
function renderSkillTree(parentSelector, skillsData, width, height) {
  const skills = initializeData(skillsData);
  const links = skills.flatMap(d => d.relatedSkills.map(target => ({ source: d.id, target })));
  const simulation = createSimulation(skills, links, width, height);
  const svg = createSVG(parentSelector, width, height);
  const colorScale = createColorScale();
  const link = renderLinks(svg, links);
  const node = renderNodes(svg, skills, links, colorScale, simulation);
  const label = renderLabels(svg, skills);
  handleTick(simulation, link, node, label);
}

renderSkillTree("body", skills, 1400, 820);

