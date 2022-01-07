import { useState } from "react";
import "./style.css";

const RosterTable = ({ members }) => {
  const [focus, setFocus] = useState(false);

  const getFocus = (e) => {
    const thisClicked = e.currentTarget;
    if (!focus) {
      setFocus(true);
      if (thisClicked.style.backgroundColor === "#cacaca") {
        return thisClicked.style.backgroundColor = "#f9e3aa";
      } else {
        return thisClicked.style.backgroundColor = "#fff6b8";
      }
    } else {
      setFocus(false);
      if (thisClicked.style.backgroundColor === "#f9e3aa") {
        return thisClicked.style.backgroundColor = "#cacaca";
      } else {
        return thisClicked.style.backgroundColor = "#e2e2e2";
      }
    }
  }

  return (
    <table striped="true" border="true" hover="true" className="rosterTable">
      <thead>
        <tr>
          <th className="fName">Full Name</th>
          <th className="pName">Preferred Name</th>
          <th className="bday">Bday</th>
          <th className="isActive">A?</th>
          <th className="sLeader">SL</th>
          <th className="section">Section</th>
          <th className="email">Email 1</th>
          <th className="email">Email 2</th>
          <th className="phone">Phone 1</th>
          <th className="phType"></th>
          <th className="phone">Phone 2</th>
          <th className="phType"></th>
          <th className="phone">Phone 3</th>
          <th className="phType"></th>
          <th className="address">Street Address</th>
          <th className="city">City</th>
          <th className="zip">Zip</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, i) => (
          <tr key={member._id} onClick={getFocus}>
            <td>{member.fullName}</td>
            <td>{member.preferredName}</td>
            <td>{member.birthday}</td>
            {member.isActive
              ? <td className="active">Y</td>
              : <td className="inactive">N</td>}
            {member.position === "section leader"
              ? <td className="leader">X</td>
              : <td></td>}
            <td>{member.section}</td>
            <td>{member.email1}</td>
            <td>{member.email2}</td>
            <td>{member.phone1}</td>
            <td>{member.phone1Type}</td>
            {member.phone2
              ? <>
                <td>{member.phone2}</td>
                <td>{member.phone2Type}</td>
              </>
              : <>
                <td></td>
                <td></td>
              </>}
            {member.phone3
              ? <>
                <td>{member.phone3}</td>
                <td>{member.phone3Type}</td>
              </>
              : <>
                <td></td>
                <td></td>
              </>}
            <td>{member.streetAddress}</td>
            <td>{member.city}</td>
            <td>{member.zipCode}</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  )
}

export default RosterTable;