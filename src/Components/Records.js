import React, {Component} from 'react';
import '../Css/Records.css';
import Header from './Header'
import Balance from './Balance'
import Amount from './Amount'
import ListTable from './ListTable'

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upload: '',
            credit: 100,
            debit: ''
        }
    }

    uploadList(response){
        this.setState({
            upload: response,
            edit: false
        })
    }

    countDebit(debit){
        this.setState({
            debit: debit
        })
    }

    render() {
        return (
            <div className="App h-100">
                <Header head="Records"/>
                <Balance credit={this.state.credit} debit={this.state.debit} />
                <Amount uploadList={this.uploadList.bind(this)}/>
                <ListTable upload={this.state.upload}
                           edit={this.state.edit}
                           countDebit={this.countDebit.bind(this)}/>
            </div>
        );
    }
}

export default Records;
