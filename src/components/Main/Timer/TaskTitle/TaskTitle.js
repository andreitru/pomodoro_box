import React from "react";
import "./tasktitle.scss";
import PropTypes from "prop-types";

function TaskTitle({ title, className }) {
  return <span className={className}>{title}</span>;
}

TaskTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default TaskTitle;
