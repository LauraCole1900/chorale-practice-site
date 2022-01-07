import { Table } from "react-bootstrap";
import "./style.css";

const RosterTable = ({ members }) => {
  console.log({ members })

  return (
    <Table striped border="true" hover className="rosterTable">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Preferred Name</th>
          <th>Birthday</th>
          <th>Active?</th>
          <th>Section leader</th>
          <th>Section</th>
          <th>Email 1</th>
          <th>Email 2</th>
          <th>Phone 1</th>
          <th></th>
          <th>Phone 2</th>
          <th></th>
          <th>Phone 3</th>
          <th></th>
          <th>Street Address</th>
          <th>City</th>
          <th>Zip</th>
        </tr>
      </thead>
      <tbody>
        {members.map(member => (
          <tr key={member._id}>
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
    </Table>
  )
}

export default RosterTable;