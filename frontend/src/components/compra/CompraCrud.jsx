import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'shopping-basket',
    title: 'Compras',
    subtitle: 'Compras OBA!'
}

const baseUrl = 'http://localhost:3001/compras'
const initialState = {
    compras: {id_user: '', id_product: '', quantity:'', price:'', data:'' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ compra: initialState.compra })
    }

    save() {
        const compra = this.state.compra
        const method = compra.id ? 'put' : 'post'
        const url = compra.id ? `${baseUrl}/${compra.id}` : baseUrl
        axios[method](url, compra)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ compra: initialState.compra, list })
            })
    }

    getUpdatedList(compra, add = true) {
        const list = this.state.list.filter(u => u.id !== compra.id)
        if(add) list.unshift(compra) //Insere na primeira posiçao da lista
        return list
    }

    updateField(event) {
        const compra = { ...this.state.compra }
        compra[event.target.name] = event.target.value
        this.setState({ compra })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Usuario</label>
                            <input type="text" className="form-control"
                                name="user"
                                value={this.state.compra.id_user}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o usuario..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.compra.id_product}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o id do produto..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(compra) {
        this.setState({ compra })
    }

    remove(compra) {
        axios.delete(`${baseUrl}/${compra.id}`).then(resp => {
            const list = this.getUpdatedList(compra, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(compra => {
            return (
                <tr key={compra.id}>
                    <td>{compra.id_user}</td>
                    <td>{compra.id_product}</td>
                    <td>{compra.quantity}</td>
                    <td>{compra.price}</td>
                    <td>{compra.data}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(compra)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(compra)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}