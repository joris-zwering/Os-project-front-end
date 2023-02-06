import Head from "next/head";
import { Inter } from "@next/font/google";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import useSWR from "swr";
import moment from "moment";
import { useEffect, useState } from "react";

const getLogsFetcher = (url) =>
   fetch(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   }).then((res) => res.json());

const getAlertFetcher = (url) =>
   fetch(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   }).then((res) => res.json());

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

export const options = {
   animations: false,
   responsive: true,
   plugins: {
      legend: {
         position: "bottom" as const,
      },
   },
};
const labels = [
   "Moment 1",
   "Moment 2",
   "Moment 3",
   "Moment 4",
   "Moment 5",
   "Moment 6",
   "Moment 7",
   "Moment 8",
   "Moment 9",
   "Moment 10",
   "Moment 11",
   "Moment 12",
   "Moment 13",
   "Moment 14",
   "Moment 15",
   "Moment 16",
   "Moment 17",
   "Moment 18",
   "Moment 1",
   "Moment 2",
   "Moment 3",
   "Moment 4",
   "Moment 1",
   "Moment 2",
   "Moment 3",
];

// GET LOGS FROM last 5 min
const exampleResponse = [
   {
      nodeId: 1,
      logs: [
         {
            logId: 1,
            loggedAt: Date.now(),
            temperature: 20,
            humidity: 22,
            pressure: 20,
         },
      ],
   },
   {
      nodeId: 2,
      logs: [
         {
            logId: 1,
            loggedAt: Date.now(),
            temperature: 20,
            humidity: 22,
            pressure: 20,
         },
      ],
   },
   {
      nodeId: 3,
      logs: [
         {
            logId: 1,
            loggedAt: Date.now(),
            temperature: 20,
            humidity: 22,
            pressure: 20,
         },
      ],
   },
   {
      nodeId: 4,
      logs: [
         {
            logId: 1,
            loggedAt: Date.now(),
            temperature: 20,
            humidity: 22,
            pressure: 20,
         },
      ],
   },
   {
      nodeId: 5,
      logs: [
         {
            logId: 1,
            loggedAt: Date.now(),
            temperature: 20,
            humidity: 22,
            pressure: 20,
         },
      ],
   },
];

// export const data = {
//    labels,
//    datasets: [
//       {
//          label: "Node 1",
//          data: [22, 20, 20, 20.2, 20.3, 20],
//          borderColor: "rgb(255, 99, 132)/10",
//          backgroundColor: "#000",
//       },
//       {
//          label: "Node 2",
//          data: [20, 19, 19.8, 20.2, 20.3, 20],
//          borderColor: "blue",
//          backgroundColor: "blue",
//       },
//       {
//          label: "Node 3",
//          data: [18, 19, 20.5, 21.2, 19.3, 20],
//          borderColor: "red",
//          backgroundColor: "red",
//       },
//       {
//          label: "Node 4",
//          data: [19, 19, 20, 22.2, 17.3, 23],
//          borderColor: "green",
//          backgroundColor: "green",
//       },
//       {
//          label: "Node 5",
//          data: [19, 19, 20, 23.2, 17.3, 23],
//          borderColor: "orange",
//          backgroundColor: "orange",
//       },
//    ],
// };

const data2 = [
   {
      nodeId: 1,
      logs: [
         {
            logId: 1,
            temp: 30,
            pressure: 40,
            humidity: 20,
         },

         {
            logId: 2,
            temp: 30,
            pressure: 40,
            humidity: 20,
         },
         {
            logId: 3,
            temp: 30,
            pressure: 40,
            humidity: 20,
         },
         {
            logId: 4,
            temp: 20,
            pressure: 17,
            humidity: 37,
         },
         {
            logId: 5,
            temp: 30,
            pressure: 40,
            humidity: 20,
         },
         {
            logId: 6,
            temp: 30,
            pressure: 40,
            humidity: 20,
         },
         {
            logId: 7,
            temp: 30,
            pressure: 40,
            humidity: 20,
         },
      ],
   },
];

export default function Home() {
   const lastUpdated = new Date().toString();
   const { data, error } = useSWR("/api/logs", getLogsFetcher, {
      refreshInterval: 1,
   });
   const { data: alertsData, error: alertsError } = useSWR(
      "/api/alert",
      getLogsFetcher,
      {
         refreshInterval: 0.5,
      }
   );
   const [alerts, setAlerts] = useState();

   let temp = { labels, datasets: [] };
   let humidity = { labels, datasets: [] };
   const colors = ["blue", "red", "green", "orange", "pink"];
   let nodes = Object.keys(data || {});

   if (data) {
      const nodes = Object.keys(data);

      temp = {
         labels,
         datasets: nodes.map((node, key) => {
            return {
               label: `Lifevest #1 ${node}`,
               data: data?.[node]
                  ?.map((meting) => meting.temperature)
                  .slice(0, 25)
                  .reverse(),
               borderColor: colors[key - 1],
               backgroundColor: "#000",
            };
         }),
      };

      humidity = {
         labels,
         datasets: nodes.map((node, key) => {
            return {
               label: `Lifevest #1 ${node}`,
               data: data?.[node]
                  ?.map((meting) => meting.humidity)
                  .slice(0, 25)
                  .reverse(),
               borderColor: colors[key - 1],
               backgroundColor: "#000",
            };
         }),
      };
   }

   useEffect(() => {
      if (alertsData) {
         const alertLength = Object.keys(alertsData).length;
         console.log(alertLength);
         console.log(Object.values(alertsData));
         setAlerts(alertsData);
      }
   }, [alertsData]);

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main
            style={{
               background: "white",
               minHeight: "100vh",
               width: "100vw",
               height: "100%",
            }}
         >
            <div className="flex w-full bg-white justify-between px-4 border-b-2">
               <div className="text-black py-4">
                  <div className="font-medium text-lg bg-white inline px-2 py-2 rounded-md">
                     Kathmandu - Smart lifevests v1.0
                  </div>
               </div>
               <div className="text-black  flex items-center">
                  <div>Modus:</div>
                  <div className="bg-white px-2 py-2 rounded-md space-x-2">
                     <div className="font-semibold text-md bg-gray-100 py-2 px-3 text-black inline rounded-md">
                        <a href="/"> Live</a>
                     </div>
                     <div className="font-medium text-md bg-gray-100 py-2 px-3 text-black inline rounded-md border-gray-300 border-2">
                        <a href="/stats"> Stats</a>
                     </div>
                  </div>
               </div>
            </div>

            <div className="px-6">
               <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-12">
                  <div
                     key="0"
                     className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                  >
                     <dt className="truncate text-sm font-medium text-gray-500">
                        Active lifevests
                     </dt>
                     <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        {nodes?.length || 0}
                     </dd>
                  </div>
                  <div
                     key="1"
                     className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                  >
                     <dt className="truncate text-sm font-medium text-gray-500">
                        Recieved alerts (last 1 hour)
                     </dt>
                     <dd
                        className={`mt-1 text-3xl ${
                           Object.keys(alertsData || []).length > 0
                              ? "text-red-500"
                              : "text-green-500"
                        } font-semibold tracking-tight`}
                     >
                        {Object.keys(alertsData || []).length > 0
                           ? Object.keys(alertsData || []).length
                           : "Everyone is save"}
                     </dd>
                  </div>
                  <div
                     key="2"
                     className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                  >
                     <dt className="truncate text-sm font-medium text-gray-500">
                        Last updated
                     </dt>
                     <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        <span>
                           {moment(lastUpdated).format("MMMM Do, h:mm a")}
                        </span>
                     </dd>
                  </div>
               </dl>
               <AlertsTable alerts={Object.values(alertsData || []) || []} />
               <hr className="mt-16 mb-16" />
               <h1 className="text-black font-medium text-xl text-left mt-5 mb-3">
                  Temperature per lifejacket
               </h1>
               <Line height={100} options={options} data={temp} />;
               <hr className="mt-16 mb-16" />
               <h1 className="text-black font-medium text-xl text-left mt-5 mb-3">
                  Humidity per lifejacket
               </h1>
               <Line height={100} options={options} data={humidity} />;
               <hr />
            </div>
         </main>
      </>
   );
}

export function AlertsTable({
   alerts,
}: {
   alerts: {
      nodeId: number;
      temperature: number;
      humidity: number;
   }[];
}) {
   console.log(typeof alerts);

   return (
      <div className=" mt-16">
         <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
               <h1 className="text-xl font-semibold text-gray-900">Alerts</h1>
            </div>
         </div>
         <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
               <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                     {alerts?.length ? (
                        <table className="min-w-full divide-y divide-gray-300">
                           <>
                              <thead className="bg-gray-50">
                                 <tr className="divide-x divide-gray-200">
                                    <th
                                       scope="col"
                                       className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                       Lifevest
                                    </th>
                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                       Temperature
                                    </th>
                                    <th
                                       scope="col"
                                       className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                       Humidity
                                    </th>
                                 </tr>
                              </thead>

                              <tbody className="divide-y divide-gray-200 bg-white">
                                 {alerts.map((alert) => (
                                    <tr
                                       key={alert?.nodeId}
                                       className="divide-x divide-gray-200"
                                    >
                                       <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                          {alert?.nodeId}
                                       </td>
                                       <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                          {alert?.temperature}
                                       </td>
                                       <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                          {alert?.humidity}
                                       </td>
                                       <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                          <div
                                             onClick={() => {
                                                fetch(
                                                   `/api/alert?nodeId=${alert?.nodeId}`,
                                                   {
                                                      method: "DELETE",
                                                      headers: {
                                                         "Content-Type":
                                                            "application/json",
                                                      },
                                                   }
                                                );
                                             }}
                                             className="hover:bg-gray-700 cursor-pointer bg-black text-white  py-2 rounded-md text-center font-medium"
                                          >
                                             Resolve
                                          </div>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </>
                        </table>
                     ) : (
                        <div className="text-black px-3 py-3 font-medium text-xl flex items-center">
                           <div className="px-2 py-1 bg-green-400 rounded-md text-sm mr-3">
                              SAFE
                           </div>
                           No alerts, all kayakers are safe! 😃
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
