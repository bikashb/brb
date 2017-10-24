import React, { Component } from 'react';
import axios from 'axios';


class ShowExercise extends Component {
	constructor() {
		super();
		this.state = {

		};
	}
	render () {
		const { exercise } = this.props;
		return (
			<div>
				<div className="video_mas1">
					<video  controls>
						<source src={exercise.streaming_uri} type="video/mp4"/>
					</video>
				</div>
				<div className="videoBtmTypo"> <span>Title :</span> {exercise.title}</div>
				<div className="videoBtmTypo"> <span>Description :</span><p>{exercise.description}</p></div>
				<div className="videoBtmTypo last1"> <span>Type :</span> {exercise.type}</div>
			</div>
		)
	}
}

export default ShowExercise;
