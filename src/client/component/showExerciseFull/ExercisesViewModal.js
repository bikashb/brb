import React, { Component } from 'react';

export default class ExercisesViewModal extends Component {

	render () {
		return (
			<div>
				<ul className="list-group pull-left testDive2scrol2" id="testDiv4">
					{
						this.props.AllExercises.map((video, i) =>
						<li className="list-group-item  videomainLi odd temp2" key={i}>
							<div className="indiviVideo">
								<div className="videoAlign1">
									<video  controls>
										<source src={video.streaming_uri} type="video/mp4"/>
									</video>
								</div>
								<button data-dismiss='modal'
									onClick={(e)=>{this.props.setupEditExercise(video)}}>
									Edit
								</button>
								<button data-dismiss='modal'>
									Delete
								</button>
							</div>
							<div className="card wid_70Per">
								<div className="card-body">
									<div className="card-block">
										<h4 className="card-title">Video {i+1} [ <span>{video.title}</span> ]</h4><br/>
										<p className="card-text">
											{video.description}
										</p>
									</div>
									<ul className="list-group list-group-flush">
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-primary float-xs-right">{video.type}</span> Difficulty
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
