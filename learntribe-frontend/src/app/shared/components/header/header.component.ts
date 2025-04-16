import { Component } from '@angular/core';
import {NavigatingService} from '../../../core/service/navigating/navigating.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  searchQuery: string = '';
  isSearchExpanded: boolean = false;

  constructor(
    public navigate: NavigatingService,
    public dialog: MatDialog) {}

  toggleSearch(): void {
    this.isSearchExpanded = !this.isSearchExpanded;
    if (this.isSearchExpanded) {
      // Focus the input when it expands
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        searchInput?.focus();
      }, 0);
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.navigate.goToPageWithQuery('lectures', { title: this.searchQuery.trim() });
    }
  }

  collapseSearch(): void {
    this.isSearchExpanded = false;
  }

}
