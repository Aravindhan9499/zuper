import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FormField {
  id: string;
  label: string;
  type: string;
  value?: any;
  options?: string[];
}

export interface FormGroup {
  id: string;
  name: string;
  fields: FormField[];
}

@Injectable({
  providedIn: 'root'
})
export class FieldGroupsService {
  private formGroups: FormGroup[] = [];
  private activeFormGroup = new BehaviorSubject<FormGroup | null>(null);
  activeFormGroup$ = this.activeFormGroup.asObservable();
  private lastActiveGroupId: string | null = null

  constructor() {
    this.createNewFormGroup(); // Create initial form group
  }

  /** Get all form groups */
  getFormGroups() {
    return this.formGroups;
  }

  /** Create a new form group */
  createNewFormGroup() {
    const newGroup: FormGroup = {
      id: `group-${Date.now()}`,
      name: `New Form ${this.formGroups.length + 1}`,
      fields: [],
    };
    this.formGroups.push(newGroup);
    this.setActiveFormGroup(newGroup.id);
  }

  /** Set active form group */
  setActiveFormGroup(groupId: string) {
    if (this.lastActiveGroupId) {
      this.saveCurrentGroup(); // Save before switching
    }

    const group = this.formGroups.find((g) => g.id === groupId);
    if (group) {
      this.activeFormGroup.next({ ...group }); // Emit new group
      this.lastActiveGroupId = groupId;
    }
  }

  updateGroupName(newName: string) {
    const activeGroup = this.activeFormGroup.getValue();
    if (activeGroup) {
      activeGroup.name = newName;
      this.activeFormGroup.next({ ...activeGroup });

      // Update the left panel list
      const index = this.formGroups.findIndex((g) => g.id === activeGroup.id);
      if (index !== -1) {
        this.formGroups[index].name = newName;
      }
    }
  }

  /** Save the current group before switching */
  private saveCurrentGroup() {
    const activeGroup = this.activeFormGroup.getValue();
    if (!activeGroup) return;

    // Find and update the stored group
    const index = this.formGroups.findIndex((g) => g.id === activeGroup.id);
    console.log({index})
    console.log({activeGroup})
    console.log({formGroups:this.formGroups})
    if (index !== -1) {
      this.formGroups[index] = { ...activeGroup };
    }
  }

  /** Update form fields for the active group */
  updateActiveFormFields(fields: FormField[]) {
    const activeGroup = this.activeFormGroup.getValue();
    if (activeGroup) {
      activeGroup.fields = fields;
      this.activeFormGroup.next({ ...activeGroup }); // Emit change
    }
  }
}
