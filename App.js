import ChannList from "./ChannList"
import RoutList from "./RoutList"
import RunplanList from "./RunplanList"
import { useState } from "react";
//usestate is a hook that helps you change the state of something (in this case, the state of the channel)

function App() {

  //so here channs is a stateful value that holds the channels that have been input so far
  //and setchanns is the function you have to use to update the channels

  // const r2d2arr = {
  //   "CHANN" : {"RED" : {"COUNT" : 1, "DRIVER" : "LED"}, "GREEN" : {"COUNT" : 1, "DRIVER" : "LED"}}, 
  //   "ROUT " : [{"PQR" : [[10, "RED", 20], [10, "RED", 20]]},
  //              {"ABC" : [[10, "RED", 20], [10, "RED", 20]]}], 
  //   "RUNPLAN " : []}

  //const r2d2arr = {"CHANN":{}, "ROUT ":[], "RUNPLAN ":[]}
  // const [r2d2, setR2d2] = useState(r2d2arr)
  //        <ChannList channlist={Object.keys(r2d2arr["CHANN"])} ></ChannList>

  const [channs, setChanns] = useState([["RED",0],["GREEN",1]]) 
  //list of strings
  const [routs, setRouts] = useState([{"name" : "PQR", "data" : [[10, "RED", 20], [10, "BLUE", 20]]},
                                      {"name" : "ABC", "data" : [[12, "RED", 300], [100, "BLUE", 150]]},]) 
  //list of JS objects that have name:string and data:[[tick,chann,intensity],[tick,chann,intensity]]
  const [runplans, setRunplans] = useState(['ABC + PQR', 'ABC * 3 << PQR'])
  //list of strings

  //why is everything printed twice?
  console.log('channs is'+channs)
  console.log('routs is '+routs)
  console.log('runplans is'+runplans)

  //have to return just one HTML tag so the trick is to have one div tag and dump everything in there
  return (  
    <div>
      <div>
        <h1>Chann!</h1>
        <ChannList channlist={channs} cfunc={setChanns}></ChannList>
        {/* i dont know what e1 */}
        <form onSubmit={(e1) => {setChanns([...channs, [e1.target.chname.value,0]]); e1.preventDefault(); }}>
          <input type='text' name='chname'></input>
          <button type='submit'> Add </button>
        </form>
      </div>

      <div>
        <h1>Rout!</h1>
        <RoutList routlist={routs} cfunc={setRouts} channlist={channs}></RoutList>
        <form onSubmit={(e1) => {setRouts([...routs, {'name':e1.target.rtname.value, 'data':[]}]); e1.preventDefault(); }}>
          <input type='text' name='rtname'></input>
          <button type='submit'> Add </button>
        </form>
      </div>

      <div>
        <h1>Runplans!</h1>
        {/* <RunplanList rplist={runplans} cfunc={setRunplans}></RunplanList> */}
        <RunplanList rplist={runplans}></RunplanList>
        <form onSubmit={(e1) => {setRunplans([...runplans, e1.target.rplan.value]); e1.preventDefault(); }}>
          <input type='text' name='rplan'></input>
          <button type='submit'> Add </button>
        </form>
      </div>

    </div>
  );
}

export default App;
