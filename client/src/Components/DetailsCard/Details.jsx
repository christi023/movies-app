import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import './DetailsCard.css';

const DetailsCard = props => {
  return (
    <div className="card-body">
      <Card>
        <div className="card-body">
          <h4 className="title">
            {props.title}
            <Button
              className="btn btn-danger"
              data-title="{{title}}"
              data-sum="{{sum}}"
              data-link="{{link}}"
              data-id="{{_id}}"
              onClick={() => props.delete(props._id)}
            >
              Delete
            </Button>
          </h4>
        </div>
        <br />
        <CardBody>
          <div className="col s6">
            <img src={props.Poster} alt="" />
          </div>
          <br />

          <div className="collapsible-body">
            <div className="col s6">
              <p>
                <strong>Title: </strong> {props.Title}
              </p>
              <p>
                <strong>Year: </strong> {props.Year}
              </p>
              <p>
                <strong>Genre: </strong>
                {props.Genre}
              </p>
              <p>
                <strong>Actors: </strong>
                {props.Actors}
              </p>
              <p>
                <strong>Plot: </strong> {props.Plot}
              </p>
              <p>
                <strong>Awards: </strong> {props.Awards}
              </p>

              <br />
            </div>

            <br />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailsCard;