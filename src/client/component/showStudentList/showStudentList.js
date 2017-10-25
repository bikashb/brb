import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ShowStudentList extends Component {
	constructor() {
		super();
		this.state = {
			AllStudents:[],
			selectedStudent:[],
			dataPerPage:null,
			pageCount:null,
			selectedPage:null,
			pageFrom:0,
			pageTo:null
		};
	}
	componentWillMount(){
		this.setState({AllStudents:this.props.AllStudents, selectedStudent:this.props.selectedStudent,pageCount:this.props.AllStudents.length/this.props.dataPerPage, pageTo:this.props.dataPerPage, dataPerPage:this.props.dataPerPage})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({AllStudents: nextProps.AllStudents, selectedStudent:nextProps.selectedStudent,pageCount:nextProps.AllStudents.length/nextProps.dataPerPage, dataPerPage:nextProps.dataPerPage})
	}
	selectStudentChanged = (newStudent) =>{
		this.props.selectStudentChanged(newStudent);
	}
	handlePageClick=(data)=>{
		this.setState({selectedPage:data.selected+1, pageFrom:this.state.dataPerPage*(data.selected), pageTo:this.state.dataPerPage*(data.selected+1)})
	}
	pagenation=()=>{
		console.log('came')
		const { pageFrom, pageTo, AllStudents } = this.state;
		let data = AllStudents.map((student, index)=>{
			if(index>=pageFrom && index<pageTo){
				return(
						<blockquote className="blockquote odd border-left-red  mt-1" key={index}>
							<div className="media">
								<div className="media-left">
									<div className="rounded-circle">{student.first_name[0].toUpperCase()}</div>
								</div>
								<div className="media-body">
									{/*<Checkbox value={student} className="inputchk4wrkout" />*/}
									<h3 className="stu_name">{student.first_name}</h3>
									<ul>
										<li>Age :<span>{student.age}</span></li>
										{/*<li>Weight : <span>{student.current_weight}</span></li>*/}
									</ul>
								</div>
							</div>
						</blockquote>
					)
			}
		})
		return(data);
	}
	render () {
		const { AllStudents } = this.state;
		return (
			<div>
			{this.state.AllStudents.length?
				<div id="testDiv1">
					<ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={4}
                       pageRangeDisplayed={2}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
                    />
					{this.pagenation()}
				</div>:<h2 className="nocsv">Currently students list not available please upload the data file below !</h2>}
			</div>
		)
	}
}

export default ShowStudentList;
