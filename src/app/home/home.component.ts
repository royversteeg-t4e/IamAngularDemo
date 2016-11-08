import { Component, OnInit } from '@angular/core';
import { IamService } from '../iam.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response;
  
  constructor(private iamService: IamService){  
  }

  ngOnInit(){
    this.iamService.doIamRequest( 'examples/test_lib/test_func', {input: "Value of input parameter"})
      .subscribe(result=>
      {
        this.response = result.output;
      }, error => {
        console.log(error);
        this.response = "ERROR reading IAM";
      });
  }

}
