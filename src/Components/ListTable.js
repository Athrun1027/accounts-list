import React, {Component} from 'react';
import axios from 'axios'
import ItemTable from './ItemTable'

class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            load: false,
            edit: false
        }
    }

    handleDebit() {
        let debit = 0;
        this.state.response.map((item) => debit += item.amount);
        this.props.countDebit(-1 * debit)
    }

    reflashList(){
        this.setState({
            edit: false,
            load: false
        });
        axios.get('https://5a9826915217dd0012c78891.mockapi.io/api/v1/amounts').then(
            response => {
                this.setState({
                    response: response.data,
                    load: true
                });
                this.handleDebit()
            }
        ).catch(
            error => {
                this.setState({
                    error: error.message,
                    load: true
                })
            }
        )
    }

    deleteRecord(data){
        this.setState({
            response: this.state.response.filter((item) => !(item.id === data.id)),
            load: true
        });
        this.handleDebit()
    }

    putChange(data){
        let new_response = this.state.response;
        let index = new_response.findIndex(item => item.id === data.id);
        new_response.splice(index, 1);
        new_response.push(data);
        new_response.sort((item_prev, item_next) => {
            return Number.parseInt(item_prev.id, 10) - Number.parseInt(item_next.id, 10)
        });
        this.setState({
            response: new_response,
        });
        this.handleDebit()
    }

    componentDidMount(){
        this.reflashList()
    }

    componentDidUpdate(prevProps, prevState) {
        if(!(this.props === prevProps) && !(this.props.upload === prevProps.upload)){
            this.reflashList()
        }
    }

    render() {
        let table_content = <tr />;
        let error_content = '';
        let loading_content = '';
        if (this.state.load) {
            if (!this.state.error) {
                table_content = this.state.response.map((item) =>
                    <ItemTable key={item.id}
                               id={item.id}
                               date={item.date}
                               description={item.description}
                               putChange={this.putChange.bind(this)}
                               deleteRecord={this.deleteRecord.bind(this)}
                               amount={item.amount}/>)
            } else {
                error_content = <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Error Happened!</h4>
                    <p>{this.state.error}</p>
                    <p>Whenever you need to, be sure to use correct address to access.</p>
                    <hr/>
                    <p className="mb-0">Network error</p>
                </div>
            }
        } else {
            loading_content = (<div>
                    <i className="fa fa-spinner fa-pulse fa-5x"/>
                </div>
            )
        }
        return (<div className="container mb-2">
            <table className="table table-hover table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {table_content}
                </tbody>
            </table>
            {loading_content}
            {error_content}
        </div>)
    }
}

export default ListTable;