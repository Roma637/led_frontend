import RoutData from "./RoutData"

function Rout({name, data, num, deletefunc, modifyFunc, channlist}){

    return (
    
        <div key={num}>

        {num+1} - {name}

        {/* there should not be a delete button if theyre not allowed to delete it */}
        <button onClick={() => deletefunc(num)}> Delete </button> 

        <table>

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

        <form onSubmit={(e1)=>{console.log(e1.target.tick, e1.target.chann, e1.target.intensity);}} >

            <input type='number' min='0' name='tick' ></input>
            <select name='chann' >
                {channlist.map((ch)=>
                    <option value={ch} > {ch} </option>
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