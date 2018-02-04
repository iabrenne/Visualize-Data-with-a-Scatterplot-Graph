const w = 1500;
const h = 750;
const padding = 80;
const circleRadius = 8;

minYear = d3.min(dataset, d=>d.Year);
maxYear = d3.max(dataset, d=>d.Year);
const xRange = maxYear - minYear;

minSeconds = d3.min(dataset, d=>d.Seconds);
maxSeconds = d3.max(dataset, d=>d.Seconds);
const yRange = maxSeconds - minSeconds;


const xScale =  d3.scaleLinear()
                  .domain([minYear - (xRange * .05), maxYear +  (xRange * .05)])
                  .range([padding, w-padding]);

const yScale =  d3.scaleLinear()
                  .domain( [maxSeconds + (yRange * .05), minSeconds - (yRange * .05) ])
                  .range([h - padding, padding]);



const svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", h);


const mmssParser = d3.timeParse("%M:%S");

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", (d) => xScale(d.Year))
   .attr("cy",(d) => yScale(d.Seconds))
   .attr("r", (d) => circleRadius)
   .attr("stroke","black")
   .attr("class","dot")
   .attr("data-xvalue", d=>
         Number (d.Year.toString().replace(",",""))
        )
   .attr("data-yvalue", d=>mmssParser(d.Time));

const xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format("d") );

const yAxis = d3.axisLeft(yScale)
                // take seconds and convert to MM:SS format for the ticks on the Y-Scale
                .tickFormat( d=> d3.timeFormat("%M:%S")(d3.timeParse("%s")(d3.format("d")(d)) ));


svg.append("g")
   .attr("id","x-axis")
   .attr("transform","translate(0," + (h-padding) + ")")
   .call(xAxis);

svg.append("g")
   .attr("id","y-axis")
   .attr("transform","translate(" + padding + ", 0)")
   .call(yAxis);


// Create a legend 

const ordinal = d3.scaleOrdinal()
                .domain(["Has Doping Allegations", "No Doping Allegations"])
                .range(["rgb(169, 110, 91", "rgb(150,206,180)"]);


svg.append("g")
   .attr("id","legend")
   .attr("transform","translate(1200,20)");

const legendOrdinal = d3.legendColor()
                        .shape("rect")
                        .scale(ordinal);

svg.select("#legend")
   .call(legendOrdinal);
                                