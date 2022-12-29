function RoutData({entry, num, deletefunc}) {

    return(


            <tr>
                <td>{entry[0]}</td>
                <td>{entry[1]}</td>
                <td>{entry[2]}</td>
                <td><button onClick={() => deletefunc(num)}> Delete </button> </td>
            </tr>
            

    )

}

export default RoutData