import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<i [class]="'bi bi-' + name" [ngClass]="additionalClasses"></i>`,
  styles: []
})
export class IconComponent {
  @Input() name!: string;
  @Input() additionalClasses: string = '';
}
