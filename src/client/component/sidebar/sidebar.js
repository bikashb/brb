import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';


class Sidebar extends Component {
	constructor() {
		super();
		this.state = {

		};
		this.updateActiveTab = this.updateActiveTab.bind(this);
	}

	updateActiveTab(activeTab) {
		let tabs = ['.creationTab', '.studentsTab', '.exercisesTab', '.plansTab', '.viewAssignedTab'];
		$(document).ready(function() {
			tabs.map((tab) => {
				if(tab == activeTab) $(tab).addClass('active');
				else $(tab).removeClass('active');
			});
		});
	}

	render () {
		return (
			<div id="sidebar" className="sidebar">
				<div className="sidebar-menu nav-collapse">
					<div className="divide-20"></div>
					<div id="search-bar">
						<input className="search" type="text" placeholder="&nbsp;&nbsp;&nbsp; Search" />
						<i className="fa fa-search search-icon"></i>
					</div>
					<ul>
						<li className="active">
							<a href="JavaScript:Void(0);">
								<i className="fa fa-tachometer fa-fw"></i><span className="menu-text">Dashboard</span>
								<span className="selected"></span>
							</a>
						</li>
						<li className="has-sub">
							<a href="javascript:;" className="">
								<i className="fa fa-user fa-fw"></i> <span className="menu-text">Instructor</span>
								<span className="arrow"></span>
							</a>
							<ul className="sub">
								<li>
									<a className="" onClick={(e)=>{this.props.show(e, '#myProfile')}}>
										<span className="sub-menu-text">My Profile</span>
									</a>
								</li>
								<li>
									<a className="" onClick={(e)=>{this.props.show(e, '#myDashboard')}}>
										<span className="sub-menu-text">My Dashboard</span>
									</a>
								</li>
								<li>
									<a className="" onClick={(e)=>{
										this.updateActiveTab('.studentsTab');
										this.props.show(e, '#coursesAndWorkoutsTab');
									}}>
										<span className="sub-menu-text">Student List</span>
									</a>
								</li>
								<li>
									<a className="" onClick={(e)=>{
										this.updateActiveTab('.exercisesTab');
										this.props.show(e, '#coursesAndWorkoutsTab');
									}}>
										<span className="sub-menu-text">All Exercises</span>
									</a>
								</li>
								<li>
									<a className="" onClick={(e)=>{
										this.updateActiveTab('.plansTab');
										this.props.show(e, '#coursesAndWorkoutsTab');
									}}>
										<span className="sub-menu-text">All Plans</span>
									</a>
								</li>
								<li>
									<a className="" onClick={(e)=>{
										this.updateActiveTab('.viewAssignedTab');
										this.props.show(e, '#coursesAndWorkoutsTab');
									}}>
										<span className="sub-menu-text">View Assigned</span>
									</a>
								</li>
								<li>
									<a className="" data-toggle="modal" data-target="#groupMessageModal">
										<span className="sub-menu-text">Group Message</span>
									</a>
								</li>
								<li className="has-sub-sub">
									<a href="javascript:;" className=""><span className="sub-menu-text">Create</span>
										<span className="arrow"></span>
									</a>
									<ul className="sub-sub">
										<li>
											<a className="">
												<span className="sub-sub-menu-text">Create Exercise</span>
											</a>
										</li>
										<li>
											<a className="">
												<span className="sub-sub-menu-text">Create Workout</span>
											</a>
										</li>
										<li>
											<a className="">
												<span className="sub-sub-menu-text">Create Plan</span>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Sidebar;
