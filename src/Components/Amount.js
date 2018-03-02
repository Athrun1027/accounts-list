import React, {Component} from 'react';
import axios from 'axios'

class Amount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            date: '',
            description: '',
            amount: ''
        }
    }

    ChangeRecord(event) {
        event.preventDefault();
        let obj={};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    postRecord(event) {
        event.preventDefault();
        this.setState({
            load: false
        });
        const data_body = {
            date: this.state.date,
            description: this.state.description,
            amount: Number.parseInt(this.state.amount, 10)
        };
        axios.post('https://5a9826915217dd0012c78891.mockapi.io/api/v1/amounts', data_body).then(
            response => {
                this.props.uploadList(response.data);
                this.setState({
                    load: true,
                    date: '',
                    description: '',
                    amount: ''
                })
            }
        ).catch(
            error => {
                this.setState({
                    load: true,
                    error: error.message
                })
            }
        )
    }

    valid(){
        return this.state.date&&this.state.description&&this.state.amount
    }

    render() {
        let error='';
        let loading='';
        if(this.state.error){
            error = <div className="alert alert-danger ml-1 mb-0" role="alert">
                {this.state.error}
            </div>
        }
        if(!this.state.load){
            loading = <i className="fa fa-spinner fa-pulse ml-2 fa-2x"/>
        }
        return (
            <div className="container mb-2">
                <form className="form-inline" onSubmit={(e) => this.postRecord(e)}>
                    <input type="text" className="form-control mr-3" placeholder="Date" name="date"
                           onChange={(e) => this.ChangeRecord(e)} value={this.state.date}/>
                    <input type="text" className="form-control mr-3" placeholder="Description" name="description"
                           onChange={(e) => this.ChangeRecord(e)} value={this.state.description}/>
                    <input type="text" className="form-control mr-3" placeholder="Amount" name="amount"
                           onChange={(e) => this.ChangeRecord(e)} value={this.state.amount}/>
                    <button type="submit" className="btn btn-primary"
                            disabled={!this.valid()}>Create record
                    </button>
                    {loading}
                    {error}
                </form>
            </div>
        );
    }
}

export default Amount;