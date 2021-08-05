import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './services/api.service';
import { Card } from './models/model';

@Component({
  templateUrl: 'table.component.html'
})
export class TableComponent {
  title = 'Table'
  items: Card[];
  constructor(
    private itemsService: ApiService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemsService.getItems()
      .subscribe(
        items => {
          this.items = items;
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error in Save data', error.message);
        }
      );
  }
}
