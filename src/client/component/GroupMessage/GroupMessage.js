import React, { Component } from 'react';


export default class GroupMessage extends Component {

  constructor() {
    super();
    this.state = {
      message: '',
      selectedPlanIndex: 0,
      plans: [
        {
          id: 1,
          students: [
            {name: 'Abhi', email: 'abhi@mailinator.com'},
            {name: 'subhi', email: 'subhi@mailinator.com'}
          ]
        },
        {
          id: 2,
          students: [
            {name: 'Vikash', email: 'vikash@mailinator.com'},
            {name: 'Mukesh', email: 'mukesh@mailinator.com'}
          ]
        },
        {
          id: 3,
          students: [
            {name: 'Ramesh', email: 'ramesh@mailinator.com'},
            {name: 'Suresh', email: 'suresh@mailinator.com'}
          ]
        }
      ]
    };
  }

  render() {
    let { state } = this;
    return (
      <div id="groupMessageModal" className="modal fade" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Group Message</h4>
          </div>
          <div className="modal-body createCourse">
            <form >
                <div className="form-group">
                  <label>Select Plan</label>
                  <select value={state.selectedPlanIndex}
                    onChange={(e)=>this.setState({selectedPlanIndex: e.target.value})}>
                    {
                      state.plans.map((plan, index)=>{
                        return (
                          <option value={index} key={index}
                            defaultValue={state.selectedPlanIndex == index}>
                            {plan.id}
                          </option>
                        )
                      })
                    }
                  </select>
                  <span className="help-block"></span>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message"
                    value={state.message}
                    onChange={(e)=>this.setState({message: e.target.value})}>
                  </textarea>
                  <span className="help-block"></span>
                </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="form-actions">
              <button className="btn btn-login"
                id="modalClose"
                data-dismiss="modal">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
