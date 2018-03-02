import React, {Component} from 'react';
import axios from 'axios'

class ItemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            load: true,
            date:this.props.date,
            description: this.props.description,
            amount: this.props.amount
        }
    }

    handleEdit(event) {
        event.preventDefault();
        this.setState({
            edit: !this.state.edit
        })
    }

    putChange(event, key){
        event.preventDefault();
        this.setState({
            load: false
        });
        let put_body={
            date: this.state.date,
            description: this.state.description,
            amount: Number.parseInt(this.state.amount, 10)
        };
        axios.put('https://5a9826915217dd0012c78891.mockapi.io/api/v1/amounts/'+key, put_body).then(
            response => {
                this.setState({
                    edit: false,
                    load: true
                });
                this.props.putChange(response.data)
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

    deleteRecord(event, key){
        event.preventDefault();
        this.setState({
            load: false
        });
        axios.delete('https://5a9826915217dd0012c78891.mockapi.io/api/v1/amounts/'+key).then(
            response => {
                this.setState({
                    edit: false,
                    load: true
                });
                this.props.deleteRecord(response.data)
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

    onChange(event){
        event.preventDefault();
        let obj={};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    clearError(event){
        event.preventDefault();
        this.setState({
            edit: false,
            error: false
        })
    }

    render() {
        if(!this.state.load){
            return <tr>
                <th scope="row"><i className="fa fa-spinner fa-pulse"/></th>
                <td><i className="fa fa-spinner fa-pulse"/></td>
                <td><i className="fa fa-spinner fa-pulse"/></td>
                <td><i className="fa fa-spinner fa-pulse"/></td>
                <td><i className="fa fa-spinner fa-pulse"/></td>
            </tr>
        }
        if(this.state.error) {
            return <tr>
                <th scope="row"><i className="fa fa-spinner fa-pulse"/></th>
                <td><i className="fa fa-spinner fa-pulse"/></td>
                <td><i className="fa fa-spinner fa-pulse"/></td>
                <td><i className="fa fa-spinner fa-pulse"/></td>
                <td>
                    <i className="fa fa-warning"/> {this.state.error}
                    <button type="button"
                            onClick={(e) => this.clearError(e)}
                            className="btn btn-outline-danger btn-sm ml-2">返回
                    </button>
                </td>
            </tr>
        }
        if (this.state.edit) {
            return <tr>
                <th scope="row">{this.props.id}</th>
                <td><input className="form-control" type="text"
                           onChange={(e) => this.onChange(e)}
                           value={this.state.date} name="date"/></td>
                <td><input className="form-control" type="text"
                           onChange={(e) => this.onChange(e)}
                           value={this.state.description} name="description"/></td>
                <td><input className="form-control" type="text"
                           onChange={(e) => this.onChange(e)}
                           value={this.state.amount} name="amount"/></td>
                <td>
                    <button type="button"
                            onClick={(e) => this.putChange(e, this.props.id)}
                            className="btn btn-outline-success btn-sm mr-2">更新
                    </button>
                    <button type="button"
                            onClick={(e) => this.handleEdit(e)}
                            className="btn btn-outline-danger btn-sm">取消
                    </button>
                </td>
            </tr>
        } else {
            return <tr>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.date}</td>
                <td>{this.props.description}</td>
                <td>{this.props.amount}</td>
                <td>
                    <button type="button"
                            onClick={(e) => this.handleEdit(e)}
                            className="btn btn-outline-success btn-sm mr-2">编辑
                    </button>
                    <button type="button"
                            onClick={(e) => this.deleteRecord(e, this.props.id)}
                            className="btn btn-outline-danger btn-sm">删除
                    </button>
                </td>
            </tr>
        }
    }
}

export default ItemTable;