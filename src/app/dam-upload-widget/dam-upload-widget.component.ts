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
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJseWdpYWJhb2tnMjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3MjU4NjIwMzksImV4cCI6MTcyNTk0ODQzOX0.UqZVS41RLPYpgUBWKbZi45mH-cPWXZ__ZROW7b6N6zc'
  private tenantId = "FF6D09DC-F54F-4F11-AFDE-556B2EC1A992";

  constructor(private uploadService: UploadService) {
    this.uploadService.setToken(this.token);
    this.uploadService.setTenantId(this.tenantId);
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

}
