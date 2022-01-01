import { Card } from "react-bootstrap";
import dayjs from "dayjs";
import "./style.css";

const TracksCard = ({ concert }) => {
  const formatDate = (dates) => {
    const formattedDate = dates.map(date => dayjs(date, "MM-DD-YYYY").format("dddd, MMM D, YYYY"));
    return formattedDate.length > 1 ? formattedDate.join(" & ") : formattedDate[0].toString();
  }

  const dates = formatDate(concert.date);
  const times = concert.time.length > 1 ? concert.time.join(" & ") : concert.time[0].toString();
  const venues = concert.venue.length > 1 ? concert.venue.join(" & ") : concert.venue[0].toString();

  return(
    <>
    <Card className="tracksCard">
      <Card.Header className="tracksTitle">
        <h2>{concert.name}</h2>
        <p>{dates}</p>, {times}, at {venues}
      </Card.Header>
      <Card.Body className="cardBody">
        <p>Cards for each selection, containing practice track & video URLs, go here</p>
      </Card.Body>
    </Card>
    </>
  )
}

export default TracksCard;