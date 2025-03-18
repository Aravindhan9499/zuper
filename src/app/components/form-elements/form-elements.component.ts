import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldGroupsService, FormField } from '../../services/field-groups.service';

@Component({
  selector: 'app-form-elements',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './form-elements.component.html',
  styleUrl: './form-elements.component.css'
})
export class FormElementsComponent {
  formFields: FormField[] = [];
  activeGroupName: string = '';

  constructor(private _fieldGroupsService: FieldGroupsService) {}

  ngOnInit() {
    this._fieldGroupsService.activeFormGroup$.subscribe((group) => {
      if (group) {
        this.formFields = [...group.fields];
        this.activeGroupName = group.name;
      }
    });
  }

  updateGroupName() {
    this._fieldGroupsService.updateGroupName(this.activeGroupName);
  }

  drop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
    } else {
      const draggedField = event.item.data;
      const newElement: FormField = {
        ...draggedField,
        id: Date.now(),
        value: '', 
        options: draggedField.options ? JSON.parse(JSON.stringify(draggedField.options)) : [] // Deep clone options
      };

      this.formFields.splice(event.currentIndex, 0, newElement);
      console.log({formFields: this.formFields})
    }
    this._fieldGroupsService.updateActiveFormFields(this.formFields);
  }
  
  onFileSelect(event: any, field: FormField) {
    const file = event.target.files[0];
    field.value = file ? file.name : '';
  }

  duplicateField(field: FormField) {
    this.formFields.push({ ...field, id: this.generateUniqueId() });
  }

  deleteField(field: FormField) {
    this.formFields = this.formFields.filter(f => f.id !== field.id);
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
