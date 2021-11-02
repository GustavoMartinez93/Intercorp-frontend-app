import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore) { }

  agregarCliente(cliente: any): Promise<any> {
    return this.firestore.collection('clientes').add(cliente);
  }

  getClientes(): Observable<any> {
    return this.firestore.collection('clientes', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarCliente(id: string): Promise<any> {
    return this.firestore.collection('clientes').doc(id).delete();
  }

  getCliente(id: string): Observable<any> {
    return this.firestore.collection('clientes').doc(id).snapshotChanges();
  }

  actualizarCliente(id: string, data:any): Promise<any> {
    return this.firestore.collection('clientes').doc(id).update(data);
  }

}
