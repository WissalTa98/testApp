import { Component, signal } from '@angular/core';
import { ProductsList } from './components/products-list/products-list';
import { TableTokens } from './models/design.token.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('testApp');

  tableTokens: TableTokens = {
    colorPrimary: '#2E2E38',
    colorPrimaryHover: '#343440',
    colorAccent: '#FFE600',
    colorBackground: '#FAFAFC',
    colorRowHover: '#EAEAF2',
    borderRadius: '4px'
  };
}
