import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FieldGroupsService, FormGroup, FormField } from '../../services/field-groups.service';

@Component({
  selector: 'app-field-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-groups.component.html',
  styleUrl: './field-groups.component.css'
})
export class FieldGroupsComponent {
  fieldGroups = [
    {
      name: 'AMC Report',
    },
    {
      name: 'HVAC Report',
    },
    {
      name: 'AMC Yearly',
    }
  ];

  formGroups: FormGroup[] = [];
  activeFormFields: FormField[] = [];

  constructor(private _fieldGroupsService: FieldGroupsService) {
    this.formGroups = this._fieldGroupsService.getFormGroups();

    // Subscribe to active form group changes
    this._fieldGroupsService.activeFormGroup$.subscribe((group) => {
      this.activeFormFields = group ? [...group.fields] : [];
      console.log({activeFormFields: this.activeFormFields})
    });
  }

  /** Create a new form group */
  addFormGroup() {
    this._fieldGroupsService.createNewFormGroup();
  }

  /** Change active form group */
  switchFormGroup(groupId: string) {
    console.log({groupId})
    console.log({formGroups: this.formGroups})
    this._fieldGroupsService.setActiveFormGroup(groupId);
  }

  /** Update fields when user makes changes */
  updateFields() {
    this._fieldGroupsService.updateActiveFormFields(this.activeFormFields);
  }

  /** Add a new field */
  addField(type: string, label: string) {
    this.activeFormFields.push({ id: `field-${Date.now()}`, type, label, value: '' });
    this.updateFields();
  } 
}
