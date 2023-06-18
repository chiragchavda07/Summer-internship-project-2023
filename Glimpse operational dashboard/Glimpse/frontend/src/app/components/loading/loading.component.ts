import { Component, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent {
  public flag:boolean | undefined;
  constructor()
  {
    this.flag = false;
  }

  setFlag(val:boolean)
  {
    this.flag = val;
    console.log('flag '+this.flag);
  }
  getFlag()
  {
    return this.flag;
  }
}
