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

function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}

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
  let data_ = data.map(l => [l.source, l.target]).flat()
  const nodes = Array.from(new Set(data_), id => ({ id }),{fx: null, fy: null});
  const types = Array.from(new Set(data.map(d => d.type)));
  const links = data.map(d => Object.create(d))

  useEffect(() => {
    if (shouldRender) {
      const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

      const color = d3.scaleOrdinal(types, d3.schemeCategory10);
     
      const svg = d3.select(svgRef.current)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;")
      
        const zoom = d3.zoom()
        .scaleExtent([1, 10]) // 设置缩放范围，1 表示原始大小，10 表示最大放大为原始大小的10倍
        .on("zoom", zoomed);
      // 定义缩放函数的回调
      function zoomed(event) {
        debugger
        // 获取缩放和平移的变换
        const transform = event.transform;

        // 更新链接和节点的位置
        link.attr('d', linkArc);
        node.attr('transform', d => `translate(${transform.apply([d.x, d.y])})`);
      }

      
      // 创建 <defs> 元素并添加 <marker>
      svg.append("defs").selectAll("marker")
        .data(types) // 使用 data() 方法绑定数据
        .join("marker")
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -0.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", d => color)
        .attr("d", "M0,-5L10,0L0,5");

      // 创建 <g> 元素并添加链接（<path>）
      const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(links)// 使用 data() 方法绑定数据
        .join("path")// 使用 join() 方法来创建 <path> 元素
        .attr("stroke", d => color(d.type))
        .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);

      // 创建 <g> 元素并添加节点（<circle> 和 <text>）
       const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .call(drag(simulation));

      node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", 4);

      node.append("text")
        .attr("x", 8)
        .attr("y", "0.31em")
        .text(d => d.id)
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3);

      // .call(zoom.transform, d3.zoomIdentity);;
      // 在 useEffect 中选择 <g> 和 <defs> 元素
      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          const nodeObject = nodes.find(node => node.id === d.id);
          if (nodeObject) {
            nodeObject.fx = nodeObject.x;
            nodeObject.fy = nodeObject.y;
          }
        }
      
        function dragged(event, d) {
          const nodeObject = nodes.find(node => node.id === d.id);

          if (nodeObject) {
            nodeObject.fx = event.x;
            nodeObject.fy = event.y;
          }
        }
      
        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          const nodeObject = nodes.find(node => node.id === d.id);

          if (nodeObject) {
            nodeObject.fx = null;
            nodeObject.fy = null;
          }
        }
      
        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
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
export default LinePlot