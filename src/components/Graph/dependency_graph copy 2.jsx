import React, { FC, useEffect, useRef, useState } from 'react';
import * as d3 from "d3";

// export interface chartDataPorps {
//   source: string;
//   target: string;
// }


// export interface graphPlotPorps {
//   data: chartDataPorps[];
//   width: number;
//   height: number;
//   marginTop: number;
//   marginRight: number;
//   marginBottom: number;
//   marginLeft: number;
//   children?: React.ReactNode;
// }
// const LinePlot: FC<graphPlotPorps> = (props) => {



// 缩放事件的回调函数

const LinePlot = (props) => {
  let {
    data,
    width = 1690,
    height = 1500,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20 } = props;
  const svgRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(true);
  // 在组件外部创建 <defs> 和 <g> 元素
  const { graph, nodeArray } = data;
  const types = Array.from(new Set(nodeArray.map(d => d.type)));
  const links = graph.map(d => Object.create(d))
  const gdefs = d3.create("svg:defs");
  const gLink = d3.create("svg:g");
  const gNode = d3.create("svg:g");
  var nominal_stroke = 1.5;
  var max_stroke = 4.5;
  var min_zoom = 0.1;
  var max_zoom = 7;
  useEffect(() => {
    if (shouldRender) {
      const simulation = d3.forceSimulation(nodeArray)
        .force("link", d3.forceLink(graph).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("x", d3.forceX())
        .force("y", d3.forceY());
      const zoom = d3.zoom()
        .scaleExtent([1, 10]) // 设置缩放范围，1 表示原始大小，10 表示最大放大为原始大小的10倍
        .on("zoom", (d3) => zoomed(d3));
      const color = d3.scaleOrdinal(types, d3.schemeCategory10);


      const svg = d3.select(svgRef.current)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;")
        .call(zoom)

      // 在 useEffect 中选择 <g> 和 <defs> 元素
      svg.append(() => gdefs.node());
      const g = svg.append(() => gLink.node());
      const node_ = svg.append(() => gNode.node());
      // 创建 <defs> 元素并添加 <marker>
      gdefs.selectAll("marker")
        .data(types) // 使用 data() 方法绑定数据
        .join("marker") // 根据数据绑定状态对元素进行操作
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -0.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto") // 定义图形在路径上的朝向： auto-浏览器会自动根据路径的朝向来调整图形的朝向。
        .append("path") // append 添加 用于绘制路径，例如曲线、线段等。主要用于箭头
        .attr("fill", color)
        .attr("d", "M0,-5L10,0L0,5");
      // 创建 <g> 元素并添加链接（<path>）
      const link = gLink
        .attr("fill", "none")
        .attr("stroke-width", nominal_stroke)
        .selectAll("path")
        .data(graph)// 使用 data() 方法绑定数据
        .join("path")// 使用 join() 方法来创建 <path> 元素
        .attr("stroke", d => color(d.type))
        .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`)

      // 创建 <g> 元素并添加节点（<circle> 和 <text>）

      const node = gNode
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodeArray)
        .join("g")
        .call(drag(simulation));
      const circle = node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", nominal_stroke) //设置 SVG 元素的描边宽度的属性
        // .attr("r", d => d.weight * 40) 按照比重设置大小
        。
        .attr("fill", d => color(d.type))


      const text = node.append("text")
        .attr("x", 8)
        .attr("y", "0.31em")
        .text(d => d.id)
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3);

      // 节点拖动时，路径重新指向
      function linkArc(d) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
            M${d.source.x},${d.source.y}
            A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
          `;
      }

      // 定义缩放函数的回调
      function zoomed(event) {
        // 获取缩放和平移的变换
        const transform = event.transform;
        node.attr('transform', transform);
        link.attr('transform', transform);
        node_.attr('transform', transform)
       
      }
      function simulationUpdate(event) {
        var stroke = nominal_stroke;
        // debugger
        // let i = event;
        if (nominal_stroke * event.transform.k > max_stroke) stroke = max_stroke / event.transform.k;
        link.style("stroke-width", stroke)
          .attr("transform", d => `translate(${d.x},${d.y})`);;
        circle
          // style("r", d => d.weight * 40 * event.transform.k)
          .style("r", d => d.weight * 40 * event.transform.k)
          .attr("stroke-width", stroke)
          .attr("transform", d => `translate(${d.x},${d.y})`);
        g.attr("transform", d => `${event.transform.toString()}`);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
        // node.attr('transform', d => `translate(${event.transform.apply([d.x, d.y])})`);
      }
      // 拖动事件
      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3.drag()
          .on("start", (d3, d) => dragstarted(d3, d))
          .on("drag", (d3, d) => dragged(d3, d))
          .on("end", (d3, d) => dragended(d3, d));


      }

      simulation.on("tick", () => {
        
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
      });
      setShouldRender(false);
      return () => simulation.stop();
      // 设置 shouldRender 为 false，防止重复渲染

    }
  }, [data]);

  return (
    <div >
      {/* 将 SVG 元素插入到 DOM 中 */}
      <svg ref={svgRef} >
      </svg>
    </div>
  )
}
export default React.memo(LinePlot)