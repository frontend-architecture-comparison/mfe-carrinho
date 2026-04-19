import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = 'Modal';
  @Input() closeOnOverlayClick = true;

  @Output() closed = new EventEmitter<void>();

  closeModal(): void {
    this.closed.emit();
  }

  onOverlayClick(): void {
    if (this.closeOnOverlayClick) {
      this.closeModal();
    }
  }
}
