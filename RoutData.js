function RoutData({entry, num, deletefunc, channOper}) {

    console.log("under routdata"+entry)

    return(


            <tr>
                <td>{entry[0]}</td>
                <td>{entry[1]}</td>
                <td>{entry[2]}</td>
                <td>{entry[3]}</td>

                <td><button onClick={(e1) => {
                    deletefunc(num);
                    channOper(entry[1], -1);
                    e1.preventDefault();}}> Delete </button> </td>
            </tr>
            

    )

}

export default RoutData