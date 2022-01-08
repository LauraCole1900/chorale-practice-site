import { useState } from "react";
import "./style.css";

const RosterTable = ({ members }) => {


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
          <th className="position">Position</th>
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
          <tr key={member._id} tabIndex={0}>
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
            <td>{member.position}</td>
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