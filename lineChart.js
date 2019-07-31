
function computeD(data, xAxis, yAxis)
{
    let xA = (xAxis.pos[xAxis.pos.length-1] - xAxis.pos[0]) / (xAxis.val[xAxis.val.length-1] - xAxis.val[0]);
    let xB = xAxis.pos[0] - xA * xAxis.val[0];
    function scaleX(val) {return xA * val + xB;}
    let yA = - (yAxis.pos[yAxis.pos.length-1] - yAxis.pos[0]) / (yAxis.val[yAxis.val.length-1] - yAxis.val[0]);
    let yB = yAxis.pos[yAxis.pos.length-1] - yAxis.pos[0] + yA * yAxis.val[0];
    function scaleY(val) {return yA * val + yB;}

    let d = "M" + scaleX(data.x[0]) + " " + scaleY(data.y[0]);
    for (let i=1; i<data.x.length; i++)
        d = d + " L" + scaleX(data.x[i]) + " " + scaleY(data.y[i]);
    return d;
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
        let xAxisData = computeAxis(data.x, chartWidth);
        let yAxisData = computeAxis(data.y, chartHeight);
        // update chart
        chart.innerHTML = '<svg class="LineChartSvg" width="' + chartWidth + 'px" height="' + chartHeight + 'px">'
                        + '  <path d="' + computeD(data, xAxisData, yAxisData) + '"></path>'
                        + '</svg>';
        chart.appendChild(buildAxisDom("x", xAxisData.val));
        chart.appendChild(buildAxisDom("y", yAxisData.val));
        chart.style.backgroundSize = xAxisData.pos[1] + "px " + yAxisData.pos[1] + "px";
        chart.style.backgroundImage = "linear-gradient(to right, red 1px, transparent 1px, transparent " + (xAxisData.pos[1]-2) + "px),"
                                    + "linear-gradient(to top,   red 1px, transparent 1px, transparent " + (yAxisData.pos[1]-2) + "px)";
    }
}

var link = document.createElement( "link" );
link.href = "lineChart.css";
link.type = "text/css";
link.rel = "stylesheet";
link.media = "screen,print";
document.getElementsByTagName( "head" )[0].appendChild( link );

window.onload = renderLineCharts;

