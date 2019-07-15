import React from "react";

//TODO: Connect up arrows for pagnation
const TVTable = props => {
  const { tvElements, tvNext, tvPrevious } = props;

  return (
    <table className="ui celled padded table  ">
      <thead className="">
        <tr className="">
          <th className="ui medium header ">Cover</th>
          <th className="ui medium header">Title</th>
          <th className="ui medium header">Year</th>
          <th className="ui medium header">Average</th>
          <th className="ui medium header">Language</th>
          <th className="ui medium header">Add/Remove</th>
        </tr>
      </thead>
      <tbody className="">{tvElements}</tbody>
      <tfoot className="">
        <tr className="">
          <th colSpan="6" className="">
            <div className="ui pagination right floated menu">
              <div className="icon item" onClick={tvPrevious}>
                <i aria-hidden="true" className="chevron left icon"></i>
              </div>
              <div className="icon item" onClick={tvNext}>
                <i aria-hidden="true" className="chevron right icon"></i>
              </div>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
};

export default TVTable;
