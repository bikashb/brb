import React, { Component } from 'react';

export default class CourseItem extends Component {
  constructor() {
    super();
    this.state = {
      tooltipOpen: false
    };
  }

  render() {
    let { index, course, setupEditCourse, deleteCourse } = this.props;
    let { tooltipOpen } = this.state;
    return (
      <tr>
        <td>{course.title}</td>
        <td>{course.description}</td>
        <td className='exCount'>
          <a
            onMouseOver={e => this.setState({tooltipOpen: true})}
            onMouseOut={e => this.setState({tooltipOpen: false})}>
            {course.workouts.length}
          </a>
          <div  className='exCountName' style={{display: tooltipOpen? 'block' : 'none'}}>
            {
              course.workouts.length > 0 ?
              course.workouts.map((w, i) => <div key={i}>{i+1} - {w.title}</div>) :
              'No workouts available.'
            }
          </div>
        </td>
        <td>
          <a data-dismiss='modal' className="glyphicon glyphicon-pencil"
            onClick={(e)=>{
              course.workouts = course.workouts;
              setupEditCourse(course, index);
            }}>
          </a>&nbsp; &nbsp;
          <a className="glyphicon glyphicon-remove-circle"
            onClick={(e)=>{deleteCourse(course.id, index)}}
            >
          </a>
        </td>
      </tr>
    );
  }
}
