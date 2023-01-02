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

  // const r2d2arr = fetch('http://127.0.0.1:5000/sample')

  // const [channs, setChanns] = useState([["RED",11],["GREEN",12]]) 
  const [channs, setChanns] = useState([['RED',11,'LED'],['GREEN',12,'LED']]) 
  
  const [routs, setRouts] = useState([{"name" : "PQR", "data" : [[10, "RED", 20], [10, "GREEN", 20]]},
                                      {"name" : "ABC", "data" : [[12, "RED", 300], [100, "GREEN", 150]]},]) 
  
  const [runplans, setRunplans] = useState(['ABC + PQR', 'ABC * 3 << PQR'])

  const [channcount, setChannCount] = useState({"RED":2, "GREEN":2})

  const [confFiles, setConfFiles] = useState([])

  const [currentfile, setCurrentFile] = useState('')

  let resetData = (filename) =>{setChanns([]); setRouts([]); setRunplans([]); setChannCount({}); setConfFiles([]); setCurrentFile(filename)}
  
  
  //why is everything printed twice?
  console.log('channs is'+channs)
  console.log('routs is '+JSON.stringify(routs))
  console.log('runplans is'+runplans)
  console.log('channcount is'+JSON.stringify(channcount))

  const fdata= (url01) => {fetch(url01)
           .then((response) => {  return(response.json())})
           .then((data) => {console.log(data); 
            setRunplans(data["RUNPLAN "]);  
            setRouts(data["ROUT "]);
            setChanns(data["CHANN"]);
            let hh1 = {};
            data['ROUT '].map(
              (rt) => rt['data'].map(
                (tk) => {if (tk[1] in hh1) {hh1[tk[1]] = hh1[tk[1]] + 1} else {hh1[tk[1]] = 1}})
              )
            setChannCount({...hh1}) 
            console.log(channcount)})}

  const saveData = {"CHANN" : channs, "ROUT" : routs, "RUNSEQ" : runplans, 'filename' : currentfile}

  //have to return just one HTML tag so the trick is to have one div tag and dump everything in there
  return (  
    <div>
       <div>
        {/* <button onClick={() => fetch("/sample").then((response) => {  return(response.json())}).then((data) => {console.log(data); setRunplans(data["RUNPLAN "]);  setRouts(data["ROUT "]);setChanns(data["CHANN"]);  })}>Get Data</button>
        <button onClick={() => fetch("/sample").then((response) => {  return(response.text())}).then((data) => {console.log(data);   })}>Get Data Debug</button> */}
         <br/>
        <button onClick={() => fetch("/files").then((response) => {  return(response.json())}).then((data) => {console.log(data); setConfFiles(data["FILES"]);})  }>Get Files</button>
        <button onClick={() => fetch("/files").then((response) => {  return(response.text())}).then((data) => {console.log(data); })  }>Get Files Debug</button>
        {/* <button onClick={() => fetch("http://localhost:3000/sample").then((response) => {  return(response.text())}).then((data) => {console.log(data); setRunplans(data["RUNPLAN "])})}>Get Data</button> */}
        <h1>Files</h1>

        { confFiles.map((ii) =>  
        <div key={ii}><button onClick={() => {fdata("/getfile?filename=" + ii); setCurrentFile(ii)}}> Load {ii} </button></div> ) }

        <br/>

        <form onSubmit={(e1) => {resetData(e1.target.newfilename.value); e1.preventDefault();}}>
          <input type='text' name='newfilename' placeholder="new file name"></input>
          <button type='submit'> Create new file </button>
        </form>

        <button onClick={() => fetch("/savedata", {headers: {'Accept': 'application/json','Content-Type': 'application/json'}, method:'POST', body: JSON.stringify(saveData)}).then((response) => {console.log(response)})} > Save file </button>
        <button onClick={() => fetch("/savedata", {headers: {'Accept': 'application/json','Content-Type': 'application/json'}, method:'POST', body: JSON.stringify(saveData)}).then((response) => {console.log(response)})} > Save file debug </button>

        <h1>Currently on file {currentfile}</h1>

        <h1>Chann!</h1>
        <ChannList channlist={channs} cfunc={setChanns} channcount={channcount}></ChannList>
        {/* i dont know what e1 */}

        <form onSubmit={(e1) => {let hh1={}; setChanns([...channs, [e1.target.chname.value, e1.target.pin.value, e1.target.driver.value ] ]); hh1[e1.target.chname.value] = 0; setChannCount({...channcount, ...hh1}); e1.preventDefault();}}>
        {/* setChannCount({...channcount, e1.target.chname.value : 0});  */}
        {/* this is supposed to go in the onSubmit but vscode wont let me do it */}
          <input type='text' name='chname'></input>
          <input type='number' name='pin' ></input>
          <input type='text' name='driver' ></input>
          <button type='submit'> Add </button>
        </form>
      </div>

      <div>
        <h1>Rout!</h1>
        <RoutList routlist={routs} cfunc={setRouts} channlist={channs} channOper={(ch1, num) => {let hh1 = {}; hh1[ch1] =  (channcount[ch1] + num);setChannCount({...channcount, ...hh1}); console.log("channcount is "+channcount); } }></RoutList>
        <form onSubmit={(e1) => {setRouts([...routs, {'name':e1.target.rtname.value, 'data':[]}]); e1.preventDefault(); }}>
          <input type='text' name='rtname'></input>
          <button type='submit'> Add </button>
        </form>
      </div>

      <div>
        <h1>Runplans!</h1>
        {/* <RunplanList rplist={runplans} cfunc={setRunplans}></RunplanList> */}
        <RunplanList rplist={runplans}></RunplanList>
        <form onSubmit={(e1) => {setRunplans([...runplans, e1.target.rplan.value]); e1.preventDefault();}}>
          <input type='text' name='rplan'></input>
          <button type='submit'> Add </button>
        </form>
      </div>

      <br/>
    </div>
  );
}

export default App;
