import { Component, OnInit } from '@angular/core';
import { BusinessModel } from 'src/app/models/business.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:BusinessModel;

  constructor(
    private userRest: UserRestService,
    private router: Router
  ) { 
    this.user = new BusinessModel('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  login(){
    this.userRest.login(this.user).subscribe({
      next: (res:any)=>{
        Swal.fire('Listo!', res.message, 'success');
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.empresaEncontrada));
        this.router.navigateByUrl('/sucursales')
      },
      error: (err:any)=> Swal.fire('Error',err.error.message || err.error,'error')
    })
  }

}
