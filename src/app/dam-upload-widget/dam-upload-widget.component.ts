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
  selectedFile: File | null = null;
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWlkYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcyNTg3MzMxNSwiZXhwIjoxNzI1OTU5NzE1fQ.Z2K-pNZDthPJEra0zkuZ4f1-Fh4sPPC6fq9ko0B6AAg'
  private tenantId = "ec601bd9-9dc0-427c-b46e-3dce7d692a11";
  private authRefreshToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWlkYW5nQGdtYWlsLmNvbSIsImV4cCI6MTcyODQ2NTMxNX0.2WyXeJNF-9Bd5WYd-jBwwezUmDxUQJ0G0ycURqnVRGA'

  constructor(private uploadService: UploadService) {
    this.uploadService.setToken(this.token);
    this.uploadService.setTenantId(this.tenantId);
    this.uploadService.setRefreshToken(this.authRefreshToken);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type
      this.uploadService.uploadFile(file).subscribe(response => {
        const fileUrl = response.fileUrl;
        if (fileType.startsWith('image/')) {
          // Handle image file
          this.imagePath = fileUrl;
        } else if (fileType.startsWith('video/')) {
          // Handle video file
          this.videoPath = fileUrl;
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
