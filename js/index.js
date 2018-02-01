const w = 1500;
const h = 750;
const padding = 80;

const xScale =  d3.scaleLinear()
                  .domain([d3.min(dataset, d=>d.Seconds), d3.max(dataset, d=>d.Year)])
                  .range([padding, w-padding]);

const yScale =  d3.scaleLinear()
                  .domain([0,d3.max(dataset,d=>d.Seconds)])
                  .range([h - padding, padding]);

const svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", h);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
   .attr("id","x-axis")
   .attr("transform","translate(0," + (h-padding)+")")
   .call(xAxis);

svg.append("g")
   .attr("id","y-axis")
   .attr("transform","translate(" + padding + ", 0)")
   .call(yAxis);

