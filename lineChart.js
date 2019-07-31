
function computeD(data, width, height) {
    return "M0 300 L100 200 L200 20 L450 280";
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

