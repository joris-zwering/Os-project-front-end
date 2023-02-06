import { useCallback } from "react";
import { Handle, Position } from "reactflow";

export default function ESP32_NODE({ data }) {
   return (
      <div
         style={{
            //   backgroundColor: "#f3f4f6",
            //   padding: "10px 10px",
            width: "250px",
            borderRadius: "4px",
         }}
         className={`bg-white ${data.status === "alert" ? 'border-red-400' : 'border-green-400'}  border`}
      >
         <Handle type="target" position={Position.Top} />
         <div
            style={{
               color: "#000",
               padding: "10px 10px",
               fontWeight: "bolder",
            }}
            className={data.status !== "alert" ? "bg-green-300" : "bg-red-300"}
         >
            <p className="font-medium text-sm">Lifejacket #{data.label}</p>
         </div>
         {data.status === "alert" ? (
            <div className="py-2 px-3 text-center bg-white">
               <p className="text-black">In need of help!</p>
               <span className="text-gray-400 text-xs">See details ></span>
            </div>
         ) : (
            <div className="py-2 px-3 ">
               <div className="">
                  <div className="flex space-x-1">
                     <span className="font-semibold text-black text-sm">
                        Temp:{" "}
                     </span>
                     <p className="text-black text-sm">30°C</p>
                  </div>
                  <hr className="mt-2 mb-2" />
               </div>
               <div className="">
                  <div className="flex space-x-1">
                     <span className="font-semibold text-black text-sm">
                        Humidity:{" "}
                     </span>
                     <p className="text-black text-sm">30</p>
                  </div>
                  <hr className="mt-2 mb-2" />
               </div>
               <div className="">
                  <div className="flex space-x-1">
                     <span className="font-semibold text-black text-sm">
                        Pressure:{" "}
                     </span>
                     <p className="text-black text-sm">xxx</p>
                  </div>
               </div>
                <hr className="mt-2 mb-2" />
               <p className="text-black text-xs mt-3 text-gray-500">Last logged at: 4 feb 17:48</p>
            </div>
         )}

         <Handle type="source" position={Position.Bottom} id="a" />
      </div>
   );
}
