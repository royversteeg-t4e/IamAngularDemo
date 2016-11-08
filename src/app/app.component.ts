import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { IamService } from './iam.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  response;

  constructor(private iamService: IamService, translate: TranslateService){  
    translate.setDefaultLang('en-US');  
    console.log('using ' + navigator.language + ' as language!' );        
    translate.use(navigator.language);
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
