import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './services/auth/auth.service';
import {RequestHandlerService} from './services/request-handler.service';
import { AuthGuard } from './guards/auth.guard';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { InjectionToken } from '@angular/core';
import { FirebaseOptions } from 'firebase/app';
import { LoadingComponent } from './components/loading/loading.component';
import { DailyClientComponent } from './components/daily-client/daily-client.component';
import { ConsolidateOutputComponent } from './components/consolidate-output/consolidate-output.component';
import { DailyOutputComponent } from './components/daily-output/daily-output.component';
import { MonthlyOutputComponent } from './components/monthly-output/monthly-output.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { DownloadComponent } from './components/download/download.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowfileComponent } from './components/showfile/showfile.component';

// OR
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export const FIREBASE_OPTIONS = new InjectionToken<FirebaseOptions>('FirebaseOptions');

// import { SnackbarComponent } from './snackbar/snackbar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    NotFoundComponent,
    LoadingComponent,
    DailyClientComponent,
    ConsolidateOutputComponent,
    DailyOutputComponent,
    MonthlyOutputComponent,
    NavbarComponent,
    FooterComponent,
    DashHomeComponent,
    DownloadComponent,
    ShowfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // MatGridListModule,
    // MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    // OR
    // NoopAnimationsModule
  ],
  exports: [
    LoginComponent, // Export LoginComponent for use in other modules
  ],
  providers: [AuthGuard,AuthService,RequestHandlerService],
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
