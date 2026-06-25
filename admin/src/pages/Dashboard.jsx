import { Building, Building2, LucideBuilding2, PersonStandingIcon } from "lucide-react";
import DashCard from "../components/ui/dashCard";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,PieChart,Pie} from 'recharts'
const items = [
  {
    name: "Total salles",
    value: 8,
    icon: Building2,
    iconCol: "text-blue-500",
    border: "",
    bg: "bg-zinc-950",
    iconbg: 'bg-blue-200/20',
     hover: 'hover:bg-blue-500/10'
  },
  {
    name: "Salles actives",
    value: 17,
    icon: Building,
    iconCol: "text-green-500",
    border: "border-green-200",
    bg: "bg-zinc-950",
    iconbg: 'bg-green-200/20',
     hover: 'hover:bg-green-500/10'
  },
  {
    name: "Salles inactives",
    value: 3,
    icon: Building,
    iconCol: "text-green-500",
    border: "border-green-200",
    bg: "bg-zinc-950",
    iconbg: 'bg-green-200/20',
     hover: 'hover:bg-green-500/10'
  },
  {
    name: "Gérants",
    value: 8,
    icon: LucideBuilding2,
    iconCol: "text-orange-500",
    border: "border-orange-200",
    bg: "bg-zinc-950",
    iconbg: 'bg-orange-200/20',
     hover: 'hover:bg-orange-500/10'
  },
  {
    name: "Total adhérents",
    value: 120,
    icon: PersonStandingIcon,
      iconCol: "text-gray-500",
    border: "border-gray-200",
    bg: "bg-zinc-950",
    iconbg: 'bg-gray-200/20',
    hover: 'hover:bg-gray-500/10'
  },
  {
    name: "Paiements totaux",
    value: "2 450 000 FCFA",
    icon: Building,
    iconCol: "text-sky-500",
    border: "border-sky-200",
    bg: "bg-zinc-950",
    iconbg: 'bg-sky-200/20',
    hover: 'hover:bg-sky-500/10'
  },
];

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">
        Vue d'ensemble
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <DashCard key={item.name} item={item} />
        ))}
      </div>

      <div className="mt-10 grid ">
    
       
           <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="uv" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
   
    </BarChart>


   <PieChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
    >
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        isAnimationActive={true}
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#82ca9d"
        label
        isAnimationActive={true}
      />

  
    </PieChart>
  
      </div>
    </div>
  );
};

export default Dashboard;