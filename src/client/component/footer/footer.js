import React, { Component } from 'react';

export default class Footer extends Component {
	render () {
		return (
			<footer className="nb-footer temp_footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="about">
                <img src="images/resoltz-bright-log-text.png" className="img-responsive center-block" alt="Resoltz"/>
                <p>
									Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt laoreet dolore magna aliquam tincidunt erat volutpat laoreet dolore magna aliquam tincidunt erat volutpatLorem ipsum dolor sit amet,
                      consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt laoreet dolore magna aliquam tincidunt erat volutpat laoreet dolore magna aliquam tincidunt erat volutpat..
								</p>
                <div className="social-media">
                  <ul className="list-inline">
                    <li><a title=""><i className="fa fa-facebook"></i></a></li>
                    <li><a title=""><i className="fa fa-twitter"></i></a></li>
                    <li><a title=""><i className="fa fa-google-plus"></i></a></li>
                    <li><a title=""><i className="fa fa-linkedin"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Quick View</h2>
                <ul className="list-unstyled">
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Individual Assignment
										</a>
									</li>
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Plan Assignment
										</a>
									</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Create & View </h2>
                <ul className="list-unstyled">
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Create Exercise
										</a>
									</li>
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Create Workout
										</a>
									</li>
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Create Plan
										</a>
									</li>
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Student List
										</a>
									</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Others</h2>
                <ul className="list-unstyled">
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Terms Of Use
										</a>
									</li>
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Privacy Policy
										</a>
									</li>
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> Return / Refund Policy
										</a>
									</li>
                  <li>
										<a title="">
											<i className="fa fa-angle-double-right"></i> ipsum dolor sit
										</a>
									</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-info-single">
                <h2 className="title">Contact Details</h2>
                <p>
									Lorem ipsum dolor sit amet<br />
                  resoltz@resoltz.com<br />
                  <br />144-467-34 II Lane<br />
                  Lorem ipsumLo rem ipsum 2001-0242
								</p>
              </div>
            </div>
          </div>
        </div>
				<section className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
              	<p>Copyright © 2017. Resoltz. by Wipro</p>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
	      </section>
		  </footer>
		);
	}
}
