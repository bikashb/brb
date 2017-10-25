import React, { Component } from 'react';

export default class ExerciseList extends Component {

	render () {
		return (
			<div>
				<ul className="list-group pull-left testDive2scrol2" id="testDiv4">
					{
						this.props.AllExercises.map((exercise, i) =>
						<li className="list-group-item  videomainLi odd temp2" key={i}>
							<div className="indiviVideo">
								<div className="videoAlign1a">
									<video controls>
										<source src={exercise.streaming_uri} type="video/mp4"/>
									</video>
								</div>
								
							</div>
							<div className="card wid_50Per">
								<div className="card-body">
									<div className="card-block">
									
										<h4 className="card-title">Video {i+1} [ <span>{exercise.title}</span> ]</h4>
										<div className="editBtnMas1">
											<a data-dismiss='modal' className="glyphicon glyphicon-pencil"
													onClick={(e)=>{this.props.setupEditExercise(exercise, i)}}>
													
												</a>&nbsp;
												<a  className="glyphicon glyphicon-trash"
													onClick={(e)=>{this.props.deleteExercise(i)}}>
													
												</a>
										</div>	
										<br/>
										<p className="card-text">
											{exercise.description}
										</p>
									</div>
									<ul className="list-group list-group-flush">
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-primary float-xs-right">{exercise.type}</span> Difficulty
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-info float-xs-right">medium</span> Average Difficulty
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-warning float-xs-right">30 mins</span> Average Video Length
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-success float-xs-right">75%</span> Noise Friendly
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-danger float-xs-right">500 calories</span> Calories Required/Day
										</li>
									</ul>
								</div>
							</div>
						</li>
					)}
				</ul>
      </div>
		)
	}
}
