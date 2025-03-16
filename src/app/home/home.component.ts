import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {


  hasRequest = false 

  constructor() {


  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
  }

  changeStatusRequest(){
    this.hasRequest = !this.hasRequest 
  }

  changeStatusRequestMenu(){
    this.hasRequest = true 
  }



}
