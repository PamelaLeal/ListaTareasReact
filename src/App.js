import React, { Component } from 'react';
import './App.css';
import { ListService } from './service/ListService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      Listbd: {
        id: null,
        date: null,
        description: null
      },
      selectedList : {

      }
    };
    this.items = [
      {
        label : 'Nuevo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.ListService = new ListService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.ListService.getAll().then(data => this.setState({Listbd: data}))
  }

  save() {
    this.ListService.save(this.state.List).then(data => {
      this.setState({
        visible : false,
        Listbd: {
          id: null,
          date: null,
          description: null
          
        }
      });
      this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.ListService.getAll().then(data => this.setState({Listbd: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.ListService.delete(this.state.selectedList.id).then(data => {
        this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.ListService.getAll().then(data => this.setState({Listbd: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="React CRUD App">
            <DataTable value={this.state.Listbd} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedList} onSelectionChange={e => this.setState({selectedListdescriptiondescription: e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="description" header="Description"></Column>
              <Column field="date" header="Date"></Column>
              
              
            </DataTable>
        </Panel>
        <Dialog header="Create list" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="list-form">
              <span className="p-float-label">
                <InputText type='number' value={this.state.Listbd.id} style={{width : '100%'}} id="id" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let Listbd = Object.assign({}, prevState.Listbd);
                        Listbd.id = val;

                        return { Listbd };
                    })}
                  } />
                <label htmlFor="ID">ID</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.inputText} style={{width : '100%'}} id="description" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let Listbd = Object.assign({}, prevState.Listbd);
                        Listbd.description = val

                        return { Listbd };
                    })}
                  } />
                <label htmlFor="description">Descripción</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.inputText} style={{width : '100%'}} id="date" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let Listbd = Object.assign({}, prevState.Listbd);
                        Listbd.date = val

                        return { Listbd };
                    })}
                  } />
                <label htmlFor="date">Fecha</label>
              </span>
              <br/>
             
            </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      Listbd: {
        id: null,
        date: null,
        description: null
      }
    });
    document.getElementById('list-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      Listbd : {
        id: this.state.selectedList.id,
        description: this.state.selectedList.description,
        date: this.state.selectedList.date
      }
    })
  }
}
