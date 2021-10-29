import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DomainItem = (props) => {
    const {
        domain,
        onEdit,
        onDelete
    } = props;

    return (
        <div key={domain.id}>
          {domain.name}
          <FontAwesomeIcon
            onClick={() => onEdit(domain)} 
            icon="pencil-alt"
            className="icon-table-arrow"
            style={{marginRight: "1rem", marginLeft: "1rem"}}
          />
          <FontAwesomeIcon
            onClick={() => onDelete(domain)} 
            icon="trash-alt"
            className="icon-table-trash"
          />
        </div>
    );
};

export default DomainItem;