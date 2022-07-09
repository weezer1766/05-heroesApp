import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public login(): void{
    //Ir al backend para verificar que el usuario existe.
    //El backend debe devolver un usuario este debemos almacenarlo en un servicio
    //para que este disponible para toda la aplicación
    //Posterior debemos navegar a la pantalla de héroes

    this.authService.login(1).subscribe({
      next: response => {
        console.log(response);
        if(response.id){
          this.router.navigate(['./heroes']);
        }
      },
      error: err => {
        console.log(err);
      }
    });

  }

  public ingresarSinLogin(): void {
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}
