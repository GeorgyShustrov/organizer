import { Component } from '@angular/core';
import { DataService } from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent {
  constructor(public dateService: DataService) {}
  go(dir: number) {
    this.dateService.changeMonth(dir);
  }
}
