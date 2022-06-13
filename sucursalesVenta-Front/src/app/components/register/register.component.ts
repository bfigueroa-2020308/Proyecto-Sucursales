import { Component, OnInit } from '@angular/core';
import { BusinessModel } from 'src/app/models/business.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:BusinessModel;
  

  constructor(
    private userRest: UserRestService
  ) { 
    this.user = new BusinessModel('', '', '', '', '', '', '');
  }
  ngOnInit(): void {
  }

  register(registerForm:any){
    this.userRest.register(this.user).subscribe({
      next: (response:any)=>{
      alert(response.message);
        registerForm.reset()
      },
      error: (err)=> {
        registerForm.reset();
        return alert(err.error.message || err.error);
        
      }
    })
  }


}

  
