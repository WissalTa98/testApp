import { Component, signal } from '@angular/core';
import { ProductsList } from './components/products-list/products-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('testApp');
}
