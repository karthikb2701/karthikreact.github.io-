import React from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import '../sass/component/Graph.scss'
const Graph = ({ dataG }) => {
  let data = {
    labels: ['Confirmed', 'Recovered', 'Deaths'],

    datasets: [
      {
        label: '',
        data: [dataG[1], dataG[2], dataG[3]],
        // backgroundColor: ['#fbe6e880', '#e4f4e855', '#6d767e5e'],
        backgroundColor: ['#e84118', '#487eb0', '#c23616'],
        // borderColor: ['red', '#28a745', '#6d767e'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="graph">
      <div className="pie ">
        <Pie data={data} />
      </div>
      <div className="bar">
        <Bar data={data} />
      </div>
    </div>
  )
}

export default Graph
