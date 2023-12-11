import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  myFav: any;
  constructor(
    private _FavoritesService: FavoritesService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAllFav();
  }

  getAllFav() {
    this._FavoritesService.onGetAllFav().subscribe({
      next: (res) => {
        console.log(res);
        this.myFav = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  onRemoveFav(id: number) {
    this._FavoritesService.onRemoveFav(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._ToastrService.success('Removed from your Favorites', 'Done');
        this.getAllFav()
      },
    });
  }
}
