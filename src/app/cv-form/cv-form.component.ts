import { Component, EventEmitter, OnInit, Output, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {
  softwareEngineerCvForm: FormGroup;
  @Output() submittedData = new EventEmitter<{}>();
  constructor(private formBuilder: FormBuilder) {
    this.softwareEngineerCvForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      summary: ['', Validators.required],
      skills: this.formBuilder.array([]),
      experience: this.formBuilder.array([]),
      education: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
  
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

    this.softwareEngineerCvForm.controls['skills'].updateValueAndValidity();
    this.softwareEngineerCvForm.controls['experience'].updateValueAndValidity();
    this.softwareEngineerCvForm.controls['education'].updateValueAndValidity();
  
  
  if(this.softwareEngineerCvForm.invalid){
    alert('invalid form')
    return;
  }
  
  this.submittedData.emit(this.softwareEngineerCvForm.value)
  }
}
