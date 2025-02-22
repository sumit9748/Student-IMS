import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { StudentComponent } from './components/student/student.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateMarksComponent } from './components/update-marks/update-marks.component';

const routes: Routes = [
  { path: '', redirectTo: '/students-list', pathMatch: 'full' },
  { path: 'students-list', component: StudentListComponent },
  { path: 'students-list/:id', component: StudentComponent },
  { path: 'students-list/:id/update', component: UpdateMarksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  NavbarComponent,
  StudentListComponent,
  TeacherListComponent,
  StudentComponent,
];
