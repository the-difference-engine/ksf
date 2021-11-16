import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DomainItem = (props) => {
  const {
    domain,
    onEdit,
    onDelete
  } = props;

  return (
    <tr>
      <td>{domain.name}</td>
      <td>
        <FontAwesomeIcon
          onClick={() => onEdit(domain)}
          icon="pencil-alt"
          className="icon-table-arrow"
        />
      </td>
      <td>
        <FontAwesomeIcon
          onClick={() => onDelete(domain)}
          icon="trash-alt"
          className="icon-table-trash"
        />
      </td>
    </tr>
  );
};

export default DomainItem;