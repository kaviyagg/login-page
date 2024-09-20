import { Component, computed, effect, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  firstName = signal('Jane');
  lastName = signal('Doe');

  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  counter = signal(0);
  counter$: Observable<number> = toObservable(this.counter);

  constructor() {
    effect(() => console.log('Name changed:', this.fullName()));

    this.counter$.subscribe(value => {
      console.log('Counter value as observable:', value);
    });
  }
  setName(newName: string) {
    this.firstName.set(newName);
  }
  increment() {
    this.counter.update(value => value + 1);
  }
}
