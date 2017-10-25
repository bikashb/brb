import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default class ShowStudentList extends Component {
	constructor() {
		super();
		this.state = {
			offset: 4,
			currentPage: 0,
			AllStudents: []
		};
	}

	componentWillMount(){
		this.setState({AllStudents: this.props.AllStudents})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({AllStudents: nextProps.AllStudents})
	}

	render () {
		let { AllStudents, currentPage, offset } = this.state;
		let StudentsCopy = [...AllStudents];
		return (
			<div>
				{
					this.state.AllStudents.length ?
					<div id="testDiv1">
						{
							StudentsCopy.splice(currentPage*offset, offset).map((student, i) =>
								<blockquote className="blockquote odd border-left-red  mt-1" key={i}>
									<div className="media">
										<div className="media-left">
											<div className="rounded-circle">{student.first_name[0].toUpperCase()}</div>
										</div>
										<div className="media-body">
											<h3 className="stu_name">{student.first_name}</h3>
											<ul>
												<li>Age :<span>{student.age}</span></li>
											</ul>
										</div>
									</div>
								</blockquote>
							)
						}
						<ReactPaginate
							 previousLabel={'previous'}
	             nextLabel={'next'}
	             breakLabel={<a>...</a>}
	             breakClassName={'break-me'}
	             pageCount={StudentsCopy.length/offset}
	             pageRangeDisplayed={5}
	             onPageChange={(page)=>this.setState({currentPage: page.selected-1})}
	             containerClassName={'pagination'}
	             subContainerClassName={'pages pagination'}
	             activeClassName={'active'} />
					</div> :
					<h2 className="nocsv">
						Currently students list is not available. Please upload the data file below !
					</h2>
				}
			</div>
		)
	}
}
