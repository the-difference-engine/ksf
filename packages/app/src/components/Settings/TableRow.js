import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const TableRow = (props) => {
    const { grantCycle, onEdit, show, onResultsClick } = props;

    const formatDateString = date => {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        const result = `${month}-${day}-${year}`;
        return result;
    }

    const timeDiff = (dateString) => {
        return new Date(dateString) - new Date() >= 0 ? true : false;
    }

    
    return (
        <tr>
            <td>
                { formatDateString(grantCycle.openedOn) } &nbsp;&nbsp;
                {timeDiff(grantCycle.openedOn) ? <FontAwesomeIcon onClick={() => onEdit(grantCycle)} icon="pencil-alt" className="icon-table"/> : ""}
                
            </td>
            <td>
                { formatDateString(grantCycle.closedOn) } &nbsp;&nbsp;
                {timeDiff(grantCycle.closedOn) ? <FontAwesomeIcon onClick={() => onEdit(grantCycle)} icon="pencil-alt" className="icon-table"/> : ""}
            </td>
            <td>
                { grantCycle.nominations.length } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
            </td>
            <td><FontAwesomeIcon icon="arrow-right" onClick={() => onResultsClick(grantCycle)} size="1x" className={grantCycle.nominations.length ?"icon-table icon-right-arrow" : "icon-right-arrow-disabled" }/></td>
        </tr>
    )

}
 
export default TableRow;