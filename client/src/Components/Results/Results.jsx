import React from 'react';
import './App.css';

const Results = (props) => (
  <div>
    <div className="col s6">
      <h4 className="title" value={JSON.stringify(props.results)}>
        Title: {props.results.Title}
      </h4>
      <p className="sum">Description: {props.results.Description}</p>
      <p>Length: {props.results.Length}</p>
      <p>Year: {props.results.Year}</p>
      <p>Genre: {props.results.Genre}</p>

      <h4>
        <a className="btn save" onClick={props.save}>
          Save Movie
        </a>
      </h4>
    </div>
    <div className="col s6">
      <p>
        <a className="link">
          <img alt={props.results.Title} src={props.results.Poster} />
        </a>
      </p>
    </div>
  </div>
);

export default Results;
