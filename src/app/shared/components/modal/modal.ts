import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  open = input(false);
  title = input('Modal');
  closeOnOverlayClick = input(true);

  closed = output<void>();

  closeModal(): void {
    this.closed.emit();
  }

  onOverlayClick(): void {
    if (this.closeOnOverlayClick()) {
      this.closeModal();
    }
  }
}
