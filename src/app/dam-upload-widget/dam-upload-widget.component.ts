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
  selectedFile: File | null = null;
  private token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJseWdpYWJhb2tnMjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3MjU2MTU5NzIsImV4cCI6MTcyNTcwMjM3Mn0.VEpOKm9TFfgSAIP61ICo8Hk4Xado8DPv1HQ-FNS_Q2s"
  private tenantId = "FF6D09DC-F54F-4F11-AFDE-556B2EC1A992";

  constructor(private uploadService: UploadService) {
    this.uploadService.setToken(this.token);
    this.uploadService.setTenantId(this.tenantId);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadService.uploadFile(file).subscribe(response => {
        const imageUrl = response.fileUrl;
        this.insertImage(imageUrl);
        this.imagePath = imageUrl;
      }, error => {
        console.error(error);
      });
    }
  }

  insertImage(imageUrl: string): void {
    const imgTag = `<img src="${imageUrl}" alt="Image" />`;

    // Insert the image tag at the current cursor position
    this.content += imgTag;
    console.log(this.content);
  }
}
