import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  clientes: any[] = [];
  promedio = 0;
  desviacion = 0;

  constructor(private _clienteService: ClienteService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getClientes()
  }

  getClientes() {
    let total = 0;
    let i = 0;
    let arr: any[] = [];
    this._clienteService.getClientes().subscribe(data => {
      this.clientes = [];
      data.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        total = total + parseInt(element.payload.doc.data().edad, 10);
        arr.push(parseInt(element.payload.doc.data().edad, 10))
        i++;
      });

      //Promedio
      this.promedio = total / i;

      //Desviacion
      let mean = arr.reduce((acc, curr)=>{
        return acc + curr
      }, 0) / arr.length;
      arr = arr.map((k)=>{
        return (k - mean) ** 2
      })
     let sum = arr.reduce((acc, curr)=> acc + curr, 0);
     this.desviacion = Math.sqrt(sum / arr.length);

      console.log(this.clientes);
    });


  }

  eliminarCliente(id: string) {
    this._clienteService.eliminarCliente(id).then(() => {
      console.log('cliente eliminado con exito');
      this.toastr.error('El cliente fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
