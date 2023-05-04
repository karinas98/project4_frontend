import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CloudinaryImage from "./CloudinaryImage";

const UserProductCard = ({ elem }) => {
  return (
    <div>
      <Card className="profile-card" style={{ width: "20rem" }}>
        <CloudinaryImage img_url={elem.img_url} />
        <Card.Body>
          <Link to={`/products/${elem.id}`}>
            <Card.Title>{elem.title}</Card.Title>
          </Link>
          <Card.Text>{`${elem.price} $`}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProductCard;
