import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Potato (අල)', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Beet (බීට්)', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Carrot (කැරට්)', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Pumpkin (වට්ටක්කා)', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Cabbage (ගෝවා)', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Brinjal (වම්බටු)', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Beans (බෝංචි)', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Tomato (තක්කාලි)', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Chili (මිරිස්)', uv: 2390, pv: 3800, amt: 2500,
  },
];

export default class Poolanalysis extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}


