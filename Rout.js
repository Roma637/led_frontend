import RoutData from "./RoutData"

function Rout({name, data, num, deletefunc, modifyFunc, channlist, addDataFunc}){

    return (
    
        <div key={num}>

        {num+1} - {name}

        {/* there should not be a delete button if theyre not allowed to delete it */}
        <button onClick={() => deletefunc(num)}> Delete </button> 

        <table border="1">

            <th></th>

        {data.map((tk, pos, tklist) => 
            <RoutData 
            entry={tk} 
            key={pos}
            num={pos}
            deletefunc={(numm1) => {modifyFunc(num, {"name" : name, "data" : [...tklist.slice(0,numm1), ...tklist.slice(numm1+1) ]}) ;} }
            ></RoutData>
        )}

        </table>

        <form onSubmit={(e1)=>{addDataFunc(num, [e1.target.tick.value, e1.target.chann.value, e1.target.intensity.value]); e1.preventDefault();}} >

            <input type='number' min='0' name='tick' ></input>
            <select name='chann' >
                {channlist.map((ch)=>
                    <option value={ch[0]} > {ch[0]} </option>
                )}
            </select>
            <input type='number' min='0' max='255' name='intensity' ></input>

            <button type='submit' > Add </button>

        </form>

        <br></br>
        
        </div>
        )

}

export default Rout