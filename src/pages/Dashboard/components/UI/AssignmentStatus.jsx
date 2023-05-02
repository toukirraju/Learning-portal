import React from "react";
import { useDispatch } from "react-redux";
import { filterSubmitedAssignmet } from "../../../../redux/featuers/filter/filterSlice";

const AssignmentStatus = ({ data }) => {
  const { total, pending, published } = data || {};

  const dispatch = useDispatch();
  return (
    <ul className="assignment-status ">
      <li
        className="cursor-pointer hover:bg-blue-600"
        onClick={() => dispatch(filterSubmitedAssignmet(""))}
      >
        Total <span>{total}</span>
      </li>
      <li
        className="cursor-pointer hover:bg-green-600 "
        onClick={() => dispatch(filterSubmitedAssignmet("pending"))}
      >
        Pending <span>{pending}</span>
      </li>
      <li
        className="cursor-pointer hover:bg-orange-500 "
        onClick={() => dispatch(filterSubmitedAssignmet("published"))}
      >
        Mark Sent <span>{published}</span>
      </li>
    </ul>
  );
};

export default AssignmentStatus;
