import Rout from "./Rout"

function RoutList({routlist,cfunc, channlist}) {

    // for code inside html, use {}
    //routlist is a list of objects

    console.log("routlist=" + routlist)
    return(<div> 

        { routlist.map((rt, pos, rlist) =>
                <Rout 
                name={rt["name"]} 
                data={rt["data"]}
                num={pos} 
                modifyFunc={(numm1, ab1) => { cfunc([...rlist.slice(0,numm1), ab1, ...rlist.slice(numm1+1) ]) ;}}
                deletefunc={(numm1) => {cfunc([...rlist.slice(0,numm1), ...rlist.slice(numm1+1) ]) ;}} 
                channlist={channlist}
                key={pos}
                >
                  </Rout>) }

        </div>)

    // return(<div>  
    // { props.channlist.map((it1)=><h2 key={it1}> {it1} </h2>) }
    // </div>)
}

export default RoutList