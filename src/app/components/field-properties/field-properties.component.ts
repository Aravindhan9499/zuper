import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-field-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './field-properties.component.html',
  styleUrl: './field-properties.component.css'
})
export class FieldPropertiesComponent {
  searchTerm: string = '';
  fieldCategories = [
    {
      name: 'Text',
      fields: [
        { type: 'text', label: 'Single Line Text', description: 'Single text area', icon: 'fa fa-font' },
        { type: 'textarea', label: 'Multi Line Text', description: 'Multi text area', icon: 'fa fa-align-left' },
        { type: 'number', label: 'Integer', description: 'Integer type area', icon: 'fa fa-hashtag' },
      ],
    },
    {
      name: 'Date',
      fields: [
        { type: 'date', label: 'Date', description: 'Select date from datepicker.', icon: 'fa fa-calendar' },
        { type: 'time', label: 'Time', description: 'Select time from timepicker.', icon: 'fa fa-clock' },
        { type: 'datetime', label: 'Date & Time', description: 'Select date & time from picker.', icon: 'fa fa-calendar-alt' },
      ],
    },
    {
      name: 'Multi',
      fields: [
        { type: 'radio', label: 'Single Selection', description: 'Select single option.', icon: 'fa fa-dot-circle' },
        { type: 'checkbox', label: 'Multi Selection', description: 'Select multiple options.', icon: 'fa fa-check-square' },
        { type: 'dropdown', label: 'Dropdown', description: 'Select options from dropdown.', icon: 'fa fa-caret-down' },
      ],
    },
    {
      name: 'Media',
      fields: [
        { type: 'file', label: 'Upload', description: 'Upload documents/media files.', icon: 'fa fa-upload' },
      ],
    },
  ];

  get filteredCategories() {
    if (!this.searchTerm) return this.fieldCategories;

    const searchLower = this.searchTerm.toLowerCase();
    
    return this.fieldCategories
      .map(category => ({
        ...category,
        fields: category.fields.filter(field =>
          field.label.toLowerCase().includes(searchLower) ||
          field.description.toLowerCase().includes(searchLower)
        )
      }))
      .filter(category => category.fields.length > 0);
  }
}
