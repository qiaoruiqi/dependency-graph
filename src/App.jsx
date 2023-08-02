import { useState, useEffect } from 'react'
import './App.css'
import LinePlot from './components/Graph';
import useDebounce from './hooks/useDebounce'
import axios from 'axios';
function App() {
  const [count, setCount] = useState(0)
  const chartData = {
    svgNode: null,
    scales: null
  };
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const debounceValue = useDebounce(inputValue, 500);
  /**
   * 键盘按下去的事件 
   */
  const handleKeyDown = (e) => {
    console.log(77,inputValue)
    if(e.keyCode===13) {
      const apiUrl = 'http://localhost:4000/';
      axios.get(apiUrl)
      .then(response => {
        // 请求成功，将数据保存到state中
        console.log(response, 2222)
        setData(response.data);
      })
      .catch(error => {
        // 请求失败，处理错误
        console.error('Error fetching data:', error);
      });
    }

  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    // 定义后端API的URL
    const apiUrl = 'http://localhost:4000/';
    // 使用axios发起GET请求
    axios.get(apiUrl)
      .then(response => {
        // 请求成功，将数据保存到state中
        console.log(response, 2222)
        setData(response.data);
      })
      .catch(error => {
        // 请求失败，处理错误
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
      <div className="graph-input" >
        {/* {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>} */}
        <input
          className="graph-input-inner"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {data && (
        <LinePlot data={data} />
      )}


    </>
  )
}

export default App
