import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldGroupsComponent } from './components/field-groups/field-groups.component';
import { FormElementsComponent } from './components/form-elements/form-elements.component';
import { FieldPropertiesComponent } from './components/field-properties/field-properties.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldGroupsComponent, FormElementsComponent, FieldPropertiesComponent, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zuper-app';
}
