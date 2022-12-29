import Chann from "./Chann"

function ChannList(props) {

    // for code inside html, use {}

    //channlist is an array of arrays that goes [channelname, 1/0 for deletable]

    return(<div>  
        { props.channlist.map(
            (arr, ii, clist) =>
            <div> 
                <Chann name={arr[0]} num={ii} 
                deletefunc={(numm1) =>  
                    {
                     if (arr[1] === 0 ) 
                      {props.cfunc([...clist.slice(0,numm1), ...clist.slice(numm1+1) ])}
                      else {
                        alert(arr[0] + " Channel already in use")
                      }
                    }
                      } key={arr} ></Chann> 
            </div>) }
        </div>)
}

export default ChannList