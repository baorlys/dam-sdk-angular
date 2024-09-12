import { Component } from '@angular/core';
import {UploadService} from "./service/upload.service";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dam-upload-widget',
  templateUrl: './dam-upload-widget.component.html',
  styleUrls: ['./dam-upload-widget.component.css'],
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    NgIf
  ],
})
export class DamUploadWidgetComponent {
  content: string = '';
  imagePath: string = '';
  videoPath: string = '';
  documentName: string = ''
  documentPath: string = ''
  selectedFile: File | null = null;
  uploadProgress: number = 0;


  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWlkYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcyNjEwOTY4NSwiZXhwIjoxNzI2MTk2MDg1fQ.rcg6p8bUt26INqklvrYnUXKkvXPxwdnXFrLmXBO_3Rg'
  private tenantId = "ec601bd9-9dc0-427c-b46e-3dce7d692a11";
  private authRefreshToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWlkYW5nQGdtYWlsLmNvbSIsImV4cCI6MTcyODcwMTY4NX0.Otetr74N2rY17wH4QBtAecyJG1ElR2NAbRrDmGd5acU'


  constructor(private uploadService: UploadService) {
    this.uploadService.setToken(this.token);
    this.uploadService.setTenantId(this.tenantId);
    this.uploadService.setRefreshToken(this.authRefreshToken);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type

      const video = document.createElement('video');
      const objectUrl = URL.createObjectURL(file);
      video.src = objectUrl;
      console.log(video);
      video.onloadeddata = () => {
        console.log(video.duration);
        console.log(video.videoWidth);
        console.log(video.videoHeight);
      }
      this.uploadService.uploadFile(file).subscribe(response => {
        const fileUrl = response.fileUrl;
        if (fileType.startsWith('image/')) {
          // Handle image file
          this.imagePath = fileUrl;
        } else if (fileType.startsWith('video/')) {
          // Handle video file
          this.videoPath = fileUrl;
        } else {
          // Handle other file types
          this.documentName = file.name;
          this.documentPath = fileUrl;
        }
      }, error => {
        console.error(error);
      });
    }
  }

  refreshToken() {
    this.uploadService.refreshToken();
  }
}
