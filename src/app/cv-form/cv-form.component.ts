import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent {
  softwareEngineerCvForm: FormGroup;
  jobDescriptionForm: FormGroup;
  @Output() submittedData = new EventEmitter<{}>();
  constructor(private formBuilder: FormBuilder) {

    this.jobDescriptionForm=this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.softwareEngineerCvForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      summary: ['', Validators.required],
      skills: this.formBuilder.array([]),
      experience: this.formBuilder.array([]),
      education: this.formBuilder.array([]),
      certifications: this.formBuilder.array([]),
    });
  }
  addEducation() {
    const educationControl = this.softwareEngineerCvForm.controls['education'] as FormArray;
    if (educationControl) {
      educationControl.controls.push(this.formBuilder.group({
        degree: ['', Validators.required],
        institution: ['', Validators.required],
        year: ['', Validators.required]
      }))
    }
  }
  addExperience() {
    const experienceControl = this.softwareEngineerCvForm.controls['experience'] as FormArray;
    if (experienceControl) {
      experienceControl.controls.push(this.formBuilder.group({
        Organization: ['', Validators.required],
        NoOfYears: ['', Validators.required],
        Role: ['', Validators.required],
        Responsibilities: ['', Validators.required]
      }))
    }
  }

  addCertifications() {
    const certificationControl = this.softwareEngineerCvForm.controls['experience'] as FormArray;
    if (certificationControl) {
      certificationControl.controls.push(this.formBuilder.group({
        Organization: ['', Validators.required],
        CertificationName: ['', Validators.required],
        Year: ['', Validators.required],
      }))
    }
  }
  addSkill() {
    const skillsControl = this.softwareEngineerCvForm.controls['skills'] as FormArray;
    if (skillsControl) {
      skillsControl.controls.push(this.formBuilder.group({
        skill: ['', Validators.required],
        level: ['', Validators.required]
      }))
    }
  }

  getControls(controlName: string) {
    return (this.softwareEngineerCvForm.get(controlName) as FormArray).controls as FormGroup[];
  }
  onSubmit() {
    console.log(this.softwareEngineerCvForm.value);
    this.submittedData.emit(this.softwareEngineerCvForm.value)
  }
}
