import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Roles } from './componentes/Roles/Roles';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario = AuthServiceService.usuario;

  public appPages = [
    /*     { title: 'logIn', url: '/folder/Log In', icon: 'log-in', rol: '' },
    
     */ 
    {
      title: 'Principal',
      url: '/folder/Principal',
      icon: 'home',
      rol: ''
    },
    {
      title: 'Alta Empleado',
      url: '/folder/Alta Empleado',
      icon: 'construct',
      rol: Roles.Administrador,
    },
    {
      title: 'Alta Empleado',
      url: '/folder/Alta Empleado',
      icon: 'construct',
      rol: Roles.Dueño,
    },
    {
      title: 'Alta Mesa',
      url: '/folder/Alta Mesa',
      icon: '',
      rol: Roles.Administrador,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/1019203.png?alt=media&token=1175dadb-4282-497a-9ae8-9fc65a70a900',
    },
    {
      title: 'Alta Mesa',
      url: '/folder/Alta Mesa',
      icon: '',
      rol: Roles.Dueño,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/1019203.png?alt=media&token=1175dadb-4282-497a-9ae8-9fc65a70a900',
    },
    {
      title: 'Registrarse',
      url: '/folder/Alta Cliente',
      icon: 'person-add',
      rol: '',
    },
    {
      title: 'Listado Cliente',
      url: '/folder/Listado Cliente',
      icon: '',
      rol: Roles.Administrador,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/listadoClientes.png?alt=media&token=af3333ae-4098-4836-88b5-ecb3d264efc2',
    },
    {
      title: 'Listado Cliente',
      url: '/folder/Listado Cliente',
      icon: '',
      rol: Roles.Dueño,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/listadoClientes.png?alt=media&token=af3333ae-4098-4836-88b5-ecb3d264efc2',
    },
    {
      title: 'Alta Producto',
      url: '/folder/Alta Producto',
      icon: 'fast-food',
      rol: Roles.Administrador,
    },
    {
      title: 'Alta Producto',
      url: '/folder/Alta Producto',
      icon: 'fast-food',
      rol: Roles.Cocinero,
    },
    {
      title: 'Lista de Espera',
      url: '/folder/Lista de Espera',
      icon: '',
      rol: Roles.Administrador,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/waiting-list.png?alt=media&token=cd09d437-c465-46fe-a527-04cc20e8ceda'
    },
    {
      title: 'Lista de Espera',
      url: '/folder/Lista de Espera',
      icon: '',
      rol: Roles.Metre,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/waiting-list.png?alt=media&token=cd09d437-c465-46fe-a527-04cc20e8ceda'
    },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    {
      title: 'Menú',url: '/folder/Menú', icon: '', rol: Roles.Cliente, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/coloredMenu.png?alt=media&token=f390f2e6-24bb-4c38-8b80-46c558a29d52'
    },
    {
      title: 'Chat',url: '/folder/Chat', icon: '', rol: Roles.Cliente, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/chatMozo.png?alt=media&token=57061520-1b47-468b-bdef-c123688ba38b'
    },
    {
      title: 'Chat',url: '/folder/Chat', icon: '', rol: Roles.Mozo, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/chatMozo.png?alt=media&token=57061520-1b47-468b-bdef-c123688ba38b'
    },
    {
      title: 'Order',url: '/folder/Order', icon: '', rol: Roles.Mozo, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/4057741.png?alt=media&token=0537f82c-9b42-4b42-98b3-34e0baf546a2'
    },
    {
      title: 'Order',url: '/folder/Order', icon: '', rol: Roles.Bartender, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/4057741.png?alt=media&token=0537f82c-9b42-4b42-98b3-34e0baf546a2'
    },
    {
      title: 'Order',url: '/folder/Order', icon: '', rol: Roles.Cocinero, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/4057741.png?alt=media&token=0537f82c-9b42-4b42-98b3-34e0baf546a2'
    },
    {
      title: 'Order',url: '/folder/Order', icon: '', rol: Roles.Cliente, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/4057741.png?alt=media&token=0537f82c-9b42-4b42-98b3-34e0baf546a2'
    },
    {
      title: 'Pagar',url: '/folder/Pagar', icon: '', rol: Roles.Cliente, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/1052814.png?alt=media&token=3a4f1cd4-9128-46b0-b07d-8cc23bf68539'
    },
    {
      title: 'Pagos',url: '/folder/Pagar', icon: '', rol: Roles.Mozo, img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/1052814.png?alt=media&token=3a4f1cd4-9128-46b0-b07d-8cc23bf68539'
    }

    //https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/1052814.png?alt=media&token=3a4f1cd4-9128-46b0-b07d-8cc23bf68539
    
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {}
}
