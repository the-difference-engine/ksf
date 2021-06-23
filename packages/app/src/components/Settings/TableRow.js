import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { formatDateString } from '../../utils/formatDateString'


const TableRow = (props) => {
    const { grantCycle, onEdit, show, onResultsClick } = props;

    const timeDiff = (dateString) => {
        dateString = moment(dateString);
        const now = moment().startOf('day');
        return dateString.isAfter(now);
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
            <td> { grantCycle.name } </td>
            <td style={{width: '250px'}}>
                { grantCycle.nominations.length } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
            </td>
            <td><FontAwesomeIcon icon="arrow-right" onClick={() => onResultsClick(grantCycle)} size="1x" className={grantCycle.nominations.length ?"icon-table icon-right-arrow" : "icon-right-arrow-disabled" }/></td>
        </tr>
    )

}
 
export default TableRow;
