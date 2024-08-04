
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Card1({title,img,body}) {
  return (
    <Card className="rounded-lg mb-24" style={{ width: '18rem' }}>
      <Card.Img variant="top" className=" border-b-2  place-content-center "src={img} />
      <Card.Body>
        <Card.Title><h1 className="text-3xl">{title}</h1></Card.Title>
        <Card.Text className=" text-xs">
        {body}
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}

export default Card1;