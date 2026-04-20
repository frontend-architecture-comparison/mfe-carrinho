import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    standalone: true,
    template: `
    <div class="loading">
      <p>{{ message }}</p>
    </div>
  `,
    styles: [`
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    .loading p {
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      color: #666;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `]
})
export class LoadingComponent {
  @Input() message = 'Carregando...';
}
