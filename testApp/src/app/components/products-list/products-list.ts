import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductCategory, ProductStatus } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import {
  SortKey,
  SortDirection,
  filterProducts,
  sortProducts,
  paginate,
} from '../../utils/product.utils';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];

  categories: ProductCategory[] = [];
  statuses: ProductStatus[] = [];

  searchText = '';
  selectedCategory = '';
  selectedStatus = '';

  sortKey: SortKey = 'id';
  sortDirection: SortDirection = 'asc';

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  isLoading = true;
  private loadingTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.withLoading(() => {
      this.allProducts = this.productService.getProducts();
      this.categories = this.productService.getCategories();
      this.statuses = this.productService.getStatuses();
      this.applyFiltersSync();
    }, 1500);
  }

  applyFilters(): void {
    this.withLoading(() => this.applyFiltersSync());
  }

  private applyFiltersSync(): void {
    this.filteredProducts = filterProducts(
      this.allProducts,
      this.searchText,
      this.selectedCategory,
      this.selectedStatus,
    );
    this.applySortingSync();
  }

  onSort(key: SortKey): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.withLoading(() => this.applySortingSync());
  }

  getSortIcon(key: SortKey): string {
    if (this.sortKey !== key) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  private applySortingSync(): void {
    this.filteredProducts = sortProducts(this.filteredProducts, this.sortKey, this.sortDirection);
    this.currentPage = 1;
    this.updatePaginationSync();
  }

  private updatePaginationSync(): void {
    const result = paginate(this.filteredProducts, this.currentPage, this.pageSize);
    this.totalPages = result.totalPages;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.pagedProducts = result.items;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.withLoading(() => this.updatePaginationSync());
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.withLoading(() => this.updatePaginationSync());
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.sortKey = 'id';
    this.sortDirection = 'asc';
    this.withLoading(() => this.applyFiltersSync());
  }

  private withLoading(action: () => void, delay = 400): void {
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
    this.isLoading = true;
    this.loadingTimer = setTimeout(() => {
      action();
      this.isLoading = false;
      this.loadingTimer = null;
      this.cd.markForCheck();
    }, delay);
  }
}