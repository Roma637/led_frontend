function Chann({name, deletefunc, num}){

    // const num_to_stat = {0:'Cannot delete', 1:'Can delete'}

    return (<div key={num}> 
        {num + 1 } - {name} -     
        
        {/* there should not be a delete button if theyre not allowed to delete it */}
        <button onClick={() => deletefunc(num)}> Delete </button> 
        </div>)

}

export default Chann