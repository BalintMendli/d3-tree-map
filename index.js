document.addEventListener('DOMContentLoaded', () => {
  d3.json(
    'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json'
  ).then(data => {
    d3.select('#container')
      .append('h1')
      .text('Video Game Sales')
      .attr('id', 'title');

    d3.select('#container')
      .append('h2')
      .text('Top 100 Most Sold Video Games Grouped by Platform')
      .attr('id', 'title');

    const width = 960;
    const height = 600;

    const root = d3.hierarchy(data);
    root
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    const treemap = d3
      .treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    treemap(root);

    const color = d3.scaleOrdinal().range(d3.schemePaired);

    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .selectAll('.node')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    g.append('rect')
      .style('width', d => d.x1 - d.x0)
      .style('height', d => d.y1 - d.y0)
      .style('fill', d => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .style('opacity', 0.6);

    g.append('text')
      .attr('text-anchor', 'start')
      .attr('x', 5)
      .attr('dy', 30)
      .attr('font-size', '10px')
      .attr('class', 'node-label')
      .text(d => `${d.data.name}`);
  });
});
