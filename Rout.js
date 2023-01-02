import RoutData from "./RoutData"

function Rout({name, data, num, deletefunc, modifyFunc, channlist, channOper, addDataFunc}){

    return (
    
        <div key={num}>

        {num+1} - {name}

        <button onClick={() => { 
            data.map((tk) => channOper(tk[1], -1));
            deletefunc(num)}}> Delete rout </button> 

        <table border="1">

            <th></th>

        {data.map((tk, pos, tklist) => 
            <RoutData 
            entry={tk} 
            key={pos}
            num={pos}
            deletefunc={(numm1) => {modifyFunc(num, {"name" : name, "data" : [...tklist.slice(0,numm1), ...tklist.slice(numm1+1) ]}) ;} }
            channOper={channOper}
            ></RoutData>
        )}

        </table>

        <form onSubmit={(e1)=>{
            addDataFunc(num, [e1.target.tick.value, e1.target.chann.value, e1.target.intensity.value, e1.target.modify.value]);
            channOper(e1.target.chann.value,1);
            e1.preventDefault();}} >

            <input type='number' min='0' name='tick' ></input>
            <select name='chann' >
                {channlist.map((ch)=>
                    <option value={ch[0]} > {ch[0]} </option>
                )}
            </select>
            <input type='number' min='0' max='255' name='intensity' ></input>
            <input type='text' name='modify' placeholder="Ramp"></input>

            <button type='submit' > Add </button>

        </form>

        <br></br>
        
        </div>
        )

}

export default Rout