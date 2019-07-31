
function buildPath(data, xAxis, yAxis)
{
    let svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const xA = (xAxis.pos[xAxis.pos.length-1] - xAxis.pos[0]) / (xAxis.val[xAxis.val.length-1] - xAxis.val[0]);
    const xB = xAxis.pos[0] - xA * xAxis.val[0];
    function scaleX(val) {return xA * val + xB;}
    const yA = - (yAxis.pos[yAxis.pos.length-1] - yAxis.pos[0]) / (yAxis.val[yAxis.val.length-1] - yAxis.val[0]);
    const yB = yAxis.pos[yAxis.pos.length-1] - yAxis.pos[0] + yA * yAxis.val[0];
    function scaleY(val) {return yA * val + yB;}

    let d = "M" + scaleX(data.x[0]) + " " + scaleY(data.y[0]);
    for (let i=1; i<data.x.length; i++)
        d = d + " L" + scaleX(data.x[i]) + " " + scaleY(data.y[i]);
    svgPath.setAttribute('d', d);
    return svgPath;
}

function buildGrid(xAxis, yAxis)
{
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute('class', 'ChartGrid');
    for (let i=0; i<xAxis.pos.length; i++) {
        let vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        vLine.setAttribute('x1', xAxis.pos[i] + 0.5);
        vLine.setAttribute('y1', yAxis.pos[0]);
        vLine.setAttribute('x2', xAxis.pos[i] + 0.5);
        vLine.setAttribute('y2', yAxis.pos[yAxis.pos.length-1]);
        g.appendChild(vLine);
    }
    for (let i=0; i<yAxis.pos.length; i++) {
        let hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        hLine.setAttribute('x1', xAxis.pos[0]);
        hLine.setAttribute('y1', yAxis.pos[i] + 0.5);
        hLine.setAttribute('x2', xAxis.pos[xAxis.pos.length-1]);
        hLine.setAttribute('y2', yAxis.pos[i] + 0.5);
        g.appendChild(hLine);
    }
    return g;
}

function computeAxis(values, displayLength)
{
    const minVal = Math.min.apply(Math, values);
    const maxVal = Math.max.apply(Math, values);
    const ticks = 5;
    const stepVal = (maxVal - minVal) / (ticks - 1);
    const stepPos = displayLength / (ticks - 1);
    let axisData = {val: new Array(ticks), pos: new Array(ticks)};
    for (let i=0; i<ticks; i++) {
        axisData.val[i] = minVal + stepVal * i;
        axisData.pos[i] = stepPos * i;
    }
    return axisData;
}

function buildAxisDom(orientation, axisData)
{
    let axis = document.createElement("div");
    axis.className = orientation + '-axis';
    for (let i=0; i<axisData.length; i++) {
        let label = document.createElement("div");
        label.innerHTML = axisData[i];
        axis.appendChild(label);
    }
    return axis;
}

function renderLineCharts()
{
    let lineCharts = document.getElementsByClassName("LineChart");
    for (let i=0; i<lineCharts.length; i++) {
        // get base parameters
        let chart = lineCharts[i];
        const data = eval(chart.getAttribute("data-curve1-values"));
        const chartWidth = chart.clientWidth;
        const chartHeight = chart.clientHeight;
        // compute axis
        let xAxisData = computeAxis(data.x, chartWidth);
        let yAxisData = computeAxis(data.y, chartHeight);
        // clear old chart content
        while (chart.firstChild)
            chart.removeChild(chart.firstChild);
        // update chart content
        let svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgNode.setAttribute('class', 'LineChartSvg');
        svgNode.setAttribute('width', chartWidth + 'px');
        svgNode.setAttribute('height', chartHeight + 'px');
        svgNode.appendChild(buildGrid(xAxisData, yAxisData));
        svgNode.appendChild(buildPath(data, xAxisData, yAxisData));
        chart.appendChild(svgNode);
        chart.appendChild(buildAxisDom("x", xAxisData.val));
        chart.appendChild(buildAxisDom("y", yAxisData.val));
    }
}

var link = document.createElement( "link" );
link.href = "lineChart.css";
link.type = "text/css";
link.rel = "stylesheet";
link.media = "screen,print";
document.getElementsByTagName( "head" )[0].appendChild( link );

window.onload = renderLineCharts;

