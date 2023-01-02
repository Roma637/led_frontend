import Runplan from "./Runplan"

function RunplanList({rplist}) {
    return(<div>
        {rplist.map((exp,pos) =>
            <Runplan exp={exp} key={pos}></Runplan>
        )}
    </div>)
}

export default RunplanList