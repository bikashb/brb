import React, { Component } from 'react';

export default class WorkoutItem extends Component {
  constructor() {
    super();
    this.state = {
      tooltipOpen: false
    };
  }
  render() {
    let { index, workout, setupEditWorkout, deleteWorkout } = this.props;
    let { tooltipOpen } = this.state;
    return (
      <tr>
        <td>{workout.title}</td>
        <td>{workout.description}</td>
        <td className='exCount'>
          <a
            onMouseOver={e => this.setState({tooltipOpen: true})}
            onMouseOut={e => this.setState({tooltipOpen: false})}>
            {workout.exercises.length}
          </a>
          <div className='exCountName' style={{display: tooltipOpen ? 'block' : 'none'}}>
            <ul>
              {
                workout.exercises.length > 0 ?
                workout.exercises.map((e, i) => <li key={i}>{i+1} - {e.title}</li>) :
                'No exercises available.'
              }
            </ul>
          </div>
        </td>
        <td>
          <a data-dismiss='modal' className="glyphicon glyphicon-pencil"
            onClick={(e)=>{
              setupEditWorkout(workout, index);
            }}></a>&nbsp; &nbsp;
          <a className="glyphicon glyphicon-remove-circle"
            onClick={(e)=>{deleteWorkout(workout.id, index)}}></a>
        </td>
      </tr>
    );
  }
}
