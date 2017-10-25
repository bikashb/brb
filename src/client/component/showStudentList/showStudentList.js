import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

export default class ShowStudentList extends Component {
	constructor() {
		super();
		this.state = {
			offset: 4,
			currentPage: 0,
			AllStudents: [],
			searchText: ''
		};
	}

	componentWillMount(){
		this.setState({AllStudents: this.props.AllStudents})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({AllStudents: nextProps.AllStudents})
	}

	render () {
		let { AllStudents, currentPage, offset, searchText } = this.state;
		let StudentsCopy = searchText.length ?
			AllStudents.filter(student =>
				student.first_name.toLowerCase()
				.startsWith(searchText.toLowerCase())) :
			[...AllStudents];
		return (
			<div>
				{
					this.state.AllStudents.length ?
						StudentsCopy.length ?
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
							 <form>
	 							<input type="text" placeholder="name" value={searchText}
	 								onChange={(e)=>this.setState({searchText: e.target.value})} />
	 							<button
	 								onClick={(e)=> {
	 									e.preventDefault();
	 									this.setState({searchText: ''});
	 								}}>
	 								Cancel
	 							</button>
	 						</form>
						</div> :
						<div id="testDiv1">
							<form>
							 <input type="text" placeholder="name" value={searchText}
								 onChange={(e)=>this.setState({searchText: e.target.value})} />
							 <button
								 onClick={(e)=> {
									 e.preventDefault();
									 this.setState({searchText: ''});
								 }}>
								 Cancel
							 </button>
						 </form>
							<h2 className="nocsv">
								No results found.
							</h2>
						</div> :
					<h2 className="nocsv">
						Currently students list is not available. Please upload the data file below !
					</h2>
				}
			</div>
		)
	}
}
