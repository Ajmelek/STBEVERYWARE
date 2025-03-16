import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  @Input() isSuperAdmin : string | any ;

  user : any;

  constructor(private router : Router) { }

  ngOnInit(): void {
this.user = localStorage.getItem("login");
if (this.user == "admin" && this.isSuperAdmin == "1" )
this.user = "Super Admin";
  }

  ShowHideMenu(){
    document.getElementsByTagName("body")[0].classList.toggle('toggle-sidebar');
  }

  goTo(a:string){
    this.router.navigate(['home',a]);
  }


  signOut(){
    this.router.navigateByUrl("/login");
  }
  
}
